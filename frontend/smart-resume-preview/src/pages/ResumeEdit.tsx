import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ResumeData } from "@/types/resume";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { PersonalInfoForm } from "@/components/resume/PersonalInfoForm";
import { SkillsForm } from "@/components/resume/SkillsForm";
import { EducationForm } from "@/components/resume/EducationForm";
import { ExperienceForm } from "@/components/resume/ExperienceForm";
import { ProjectsForm } from "@/components/resume/ProjectsForm";
import { EmailForm } from "@/components/resume/EmailForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { ChevronDown, Download, Mail, Save } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { PDFClassicTemplate } from "@/components/resume/pdf-template/ClassicPdf";
import { 
  useCreateResumeMutation, 
  useUpdateResumeMutation, 
  useUploadPdfMutation,
  useGetResumeByIdQuery 
} from "../services/api";

const emptyResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    summary: "",
    linkedin: "",
    github: "",
    website: "",
  },
  skills: [],
  education: [],
  experience: [],
  projects: [],
  url: ""
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResumeEdit = () => {
  const { id: resumeId } = useParams(); // Get resume ID from URL if editing
  const navigate = useNavigate();
  const query = useQuery();
  const selectedTemplate = query.get("template") || "classic";

  const [resumeData, setResumeData] = useState<ResumeData>(emptyResumeData);
  const [isDirty, setIsDirty] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const { toast } = useToast();
  const [pdfFile, setPdfFile] = useState<File | undefined>(undefined);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);

  const [createResume] = useCreateResumeMutation();
  const [updateResume] = useUpdateResumeMutation();
  const [uploadPdf] = useUploadPdfMutation();
  
  // Fetch resume data if in edit mode
  const { data: fetchedResume, isLoading, isError } = useGetResumeByIdQuery(
    resumeId || '', 
    { skip: !resumeId }
  );

  const sections = [
    { id: "personal", label: "Personal details" },
    { id: "summary", label: "Professional Summary" },
    { id: "experience", label: "Employment History" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
  ];

  // Load fetched resume data when available
  useEffect(() => {
    if (fetchedResume?.data) {
      setResumeData(fetchedResume.data);
    }
  }, [fetchedResume]);

  // Set first section as active on mount
  useEffect(() => {
    setActive(sections[0].id);
  }, []);

  // Calculate resume score
  useEffect(() => {
    let newScore = 0;
    const { personalInfo, skills, education, experience, projects } = resumeData;
    if (personalInfo.fullName) newScore += 15;
    if (personalInfo.email) newScore += 7;
    if (personalInfo.summary) newScore += 8;
    if (skills.length) newScore += 15;
    if (education.length) newScore += 15;
    if (experience.length) newScore += 30;
    if (projects.length) newScore += 10;
    setScore(Math.min(100, newScore));
  }, [resumeData]);

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const generatePdfFile = async () => {
    const blob = await pdf(<PDFClassicTemplate data={resumeData} />).toBlob();
    const file = new File([blob], `${resumeData.personalInfo.fullName || 'resume'}.pdf`, { type: blob.type });
    setPdfFile(file);
    return file;
  };

  const handleSaveResume = async () => {
    try {
      const file = await generatePdfFile();
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await uploadPdf(formData).unwrap();
      console.log("Upload response:", uploadResponse);

      const resumePayload = {
        ...resumeData,
        url: uploadResponse.data.url, // Ensure url is a string
      };

      if (resumeId) {
        // Update existing resume
        await updateResume({ id: resumeId, data: resumePayload }).unwrap();
        toast({
          title: "Resume Updated!",
          description: "Your resume has been updated successfully.",
        });
      } else {
        // Create new resume
        const response = await createResume(resumePayload).unwrap();
        const newId = response.data?.id || "";
        toast({
          title: "Resume Created!",
          description: "Your resume has been created successfully.",
        });
        // Navigate to edit URL for the new resume
       
      }

      setIsDirty(false);
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "Error",
        description: "Failed to save your resume.",
        variant: "destructive",
      });
    }
  };

  const handlePDFDownload = async () => {
    try {
      const file = await generatePdfFile();
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "Failed to download resume PDF.", 
        variant: "destructive" 
      });
    }
  };

  const updateResumeField = (updatedFields: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...updatedFields }));
    setIsDirty(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">Error loading resume data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e8f0f8] flex flex-col">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-300 px-6 py-2 flex flex-col md:flex-row items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center space-x-3 w-full md:w-max">
          <div 
            className="font-extrabold text-2xl text-[#1e4976] mr-6 cursor-pointer hover:text-[#4285f4]"
            onClick={handleDashboardClick}
          >
            Dashboard
          </div>
          <input
            className="font-bold text-2xl md:text-3xl focus:ring-0 border-0 bg-transparent outline-none placeholder-[#a3c2e2] text-[#1e4976]"
            value={resumeData.personalInfo.fullName || "Untitled"}
            placeholder="Untitled"
            onChange={e => updateResumeField({ 
              personalInfo: { ...resumeData.personalInfo, fullName: e.target.value } 
            })}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => window.location.href = "/"}>Customize</Button>
          <Button onClick={handleSaveResume} disabled={!isDirty}>
            <Save className="w-5 h-5" />
            {resumeId ? "Update" : "Save"}
          </Button>
          <Button onClick={handlePDFDownload}>
            <Download className="w-5 h-5" />
            Download PDF
          </Button>
          <Button onClick={() => setEmailDialogOpen(true)}>
            <Mail className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* SCORE BAR */}
      <div className="w-full flex justify-center bg-[#d5e5f6] py-3">
        <div className="flex items-center gap-3 w-full max-w-4xl px-1">
          <div className="w-40 flex-shrink-0 flex items-center gap-2">
            <span className="text-xs font-bold text-[#1e4976]">{score}%</span>
            <div className="w-full h-2 bg-[#a3c2e2] rounded-full">
              <div className="h-2 rounded-full" style={{ 
                width: `${score}%`, 
                background: "linear-gradient(90deg, #1e4976 0%, #4285f4 100%)" 
              }} />
            </div>
          </div>
          <span className="text-xs text-[#1e4976] flex-1">Your resume score</span>
        </div>
      </div>

      {/* MAIN */}
      <main className="flex-1 flex flex-col md:flex-row gap-4 px-2 py-6 md:px-8 max-w-[1600px] mx-auto w-full">
        <div className="w-full md:w-[48%] flex flex-col gap-4">
          {sections.map(sec => (
            <div key={sec.id} className="bg-white rounded-xl shadow border hover:shadow-lg transition group">
              <button 
                className="w-full flex items-center justify-between px-6 py-4 font-bold text-lg text-left" 
                onClick={() => setActive(active === sec.id ? null : sec.id)}
              >
                <span className="text-[#1e4976]">{sec.label}</span>
                <ChevronDown className={active === sec.id ? "rotate-180 transition" : "transition"} />
              </button>
              <div className={`px-6 pb-6 transition-all duration-200 overflow-hidden ${active === sec.id ? "block" : "hidden"}`}>
                {sec.id === "personal" && (
                  <PersonalInfoForm 
                    data={resumeData.personalInfo} 
                    onChange={data => updateResumeField({ personalInfo: data })} 
                  />
                )}
                {sec.id === "summary" && (
                  <textarea
                    className="w-full h-24 rounded-md border border-[#a3c2e2] px-3 py-2 text-sm bg-[#e8f0f8]"
                    value={resumeData.personalInfo.summary}
                    onChange={e => updateResumeField({ 
                      personalInfo: { ...resumeData.personalInfo, summary: e.target.value } 
                    })}
                    placeholder="Write a brief summary..."
                  />
                )}
                {sec.id === "experience" && (
                  <ExperienceForm 
                    experience={resumeData.experience} 
                    onChange={data => updateResumeField({ experience: data })} 
                  />
                )}
                {sec.id === "education" && (
                  <EducationForm 
                    education={resumeData.education} 
                    onChange={data => updateResumeField({ education: data })} 
                  />
                )}
                {sec.id === "skills" && (
                  <SkillsForm 
                    skills={resumeData.skills} 
                    onChange={data => updateResumeField({ skills: data })} 
                  />
                )}
                {sec.id === "projects" && (
                  <ProjectsForm 
                    projects={resumeData.projects} 
                    onChange={data => updateResumeField({ projects: data })} 
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full md:w-[54%] self-start sticky top-6">
          <ResumePreview data={resumeData} template={selectedTemplate} />
        </div>
      </main>

      {/* EMAIL DIALOG */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[#1e4976]">Send Resume via Email</DialogTitle>
          </DialogHeader>
          <EmailForm pdfFile={pdfFile} onSuccess={() => setEmailDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResumeEdit;