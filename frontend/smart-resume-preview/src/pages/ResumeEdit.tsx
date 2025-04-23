import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { ChevronDown, Download, Mail } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import PDFResumeDocument from "@/components/resume/PDFResumeDocument";
import { PDFClassicTemplate } from "@/components/resume/pdf-template/ClassicPdf";
import { useUploadPdfMutation } from "../services/api"; 

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
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResumeEdit = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const selectedTemplate = query.get("template") || "classic";
  const [resumeData, setResumeData] = useState<ResumeData>(emptyResumeData);
  const [active, setActive] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const { toast } = useToast();


  const [pdfFile, setPdfFile] = useState<File | undefined>(undefined);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [uploadPdf, { isLoading: isUploading }] = useUploadPdfMutation();

  // Blue color palette (matching with dashboard)
  const primaryBlue = '#1e4976';
  const secondaryBlue = '#e8f0f8';
  const accentBlue = '#4285f4';

  const sections = [
    { id: "personal", label: "Personal details" },
    { id: "summary", label: "Professional Summary" },
    { id: "experience", label: "Employment History" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
  ];

  useEffect(() => {
    setActive(sections[0].id);
  }, []);

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

  const handlePDFDownload = async () => {
    if (!resumeData.personalInfo.fullName) {
      toast({ title: "Missing information", description: "Please enter your name.", variant: "destructive" });
      return;
    }
  
    try {
      const blob = await pdf(<PDFClassicTemplate data={resumeData} />).toBlob();
      const file = new File([blob], `${resumeData.personalInfo.fullName || 'resume'}.pdf`, { type: blob.type });
      setPdfFile(file);
  
      // Download to user
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      // Upload to backend
      const formData = new FormData();
      formData.append("file", file);
  
      const response = await uploadPdf(formData).unwrap();
      console.log(response)
  
      toast({ title: "Resume Saved!", description: "Your resume has been uploaded successfully." });
  
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to save your resume.", variant: "destructive" });
    }
  };
  
  
  return (
    <div className="min-h-screen bg-[#e8f0f8] flex flex-col">
      <header className="bg-white border-b border-gray-300 px-6 py-2 flex flex-col md:flex-row items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center space-x-3 w-full md:w-max">
          <div 
            className="font-extrabold text-2xl text-[#1e4976] mr-6 cursor-pointer hover:text-[#4285f4] transition-colors"
            onClick={handleDashboardClick}
          >
            Dashboard
          </div>
          <div className="flex-1 flex items-center space-x-3">
            <input
              className="font-bold text-2xl md:text-3xl focus:ring-0 border-0 bg-transparent outline-none placeholder-[#a3c2e2] text-[#1e4976]"
              value={resumeData.personalInfo.fullName || "Untitled"}
              placeholder="Untitled"
              onChange={e => setResumeData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, fullName: e.target.value }
              }))}
            />
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto mt-3 md:mt-0 justify-end">
          <Button
            className="bg-[#e8f0f8] text-[#1e4976] hover:bg-[#d5e5f6] font-semibold px-5 py-2 rounded-lg shadow-none border border-[#a3c2e2]"
            variant="outline"
            onClick={() => window.location.href = "/"}
          >
            Customize
          </Button>
          <Button
            className="bg-[#1e4976] hover:bg-[#0d3c6e] font-bold px-6 py-2 text-white rounded-lg flex items-center gap-2 shadow-lg"
            onClick={handlePDFDownload}
          >
            <Download className="w-5 h-5" />
            Download PDF
          </Button>
          <Button
            className="bg-[#e8f0f8] hover:bg-[#d5e5f6] text-[#1e4976] font-semibold px-3 py-2 rounded-lg border border-[#a3c2e2]"
            variant="outline"
            onClick={() => setEmailDialogOpen(true)}
          >
            <Mail className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="w-full flex flex-col items-center py-3 bg-[#d5e5f6] border-b border-[#a3c2e2] gap-2">
        <div className="flex items-center gap-3 w-full max-w-4xl px-1">
          <div className="w-40 flex-shrink-0 flex items-center gap-2">
            <span className="text-xs font-bold text-[#1e4976]">{score}%</span>
            <div className="w-full h-2 bg-[#a3c2e2] rounded-full">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${score}%`,
                  background: "linear-gradient(90deg, #1e4976 0%, #4285f4 100%)"
                }}
              />
            </div>
          </div>
          <span className="text-xs text-[#1e4976] flex-1">Your resume score</span>
        </div>
        <div className="w-full max-w-4xl mt-1 px-2"></div>
      </div>

      <main className="flex-1 flex flex-col md:flex-row gap-4 bg-[#e8f0f8] px-2 py-6 md:px-8 max-w-[1600px] mx-auto w-full">
        <div className="w-full md:w-[48%] flex flex-col gap-4">
          {sections.map(sec => (
            <div
              key={sec.id}
              className="bg-white rounded-xl shadow border hover:shadow-lg transition group"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 font-bold text-lg text-left"
                onClick={() => setActive(active === sec.id ? null : sec.id)}
              >
                <span className="text-[#1e4976]">{sec.label}</span>
                <span className={active === sec.id ? "rotate-180 transition" : "transition"}>
                  <ChevronDown />
                </span>
              </button>
              <div
                className={`px-6 pb-6 transition-all duration-200 overflow-hidden ${active === sec.id ? "block" : "hidden"}`}
              >
                {sec.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personalInfo}
                    onChange={personalInfo =>
                      setResumeData(prev => ({ ...prev, personalInfo }))
                    }
                  />
                )}
                {sec.id === "summary" && (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#1e4976]">Professional Summary</label>
                    <textarea
                      className="w-full h-24 rounded-md border border-[#a3c2e2] px-3 py-2 text-sm bg-[#e8f0f8] focus:ring-2 focus:ring-[#4285f4] outline-none"
                      value={resumeData.personalInfo.summary}
                      onChange={e =>
                        setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, summary: e.target.value }
                        }))
                      }
                      placeholder="Write a brief summary that highlights your experience and skills."
                    />
                  </div>
                )}
                {sec.id === "experience" && (
                  <ExperienceForm
                    experience={resumeData.experience}
                    onChange={experience =>
                      setResumeData(prev => ({ ...prev, experience }))
                    }
                  />
                )}
                {sec.id === "education" && (
                  <EducationForm
                    education={resumeData.education}
                    onChange={education =>
                      setResumeData(prev => ({ ...prev, education }))
                    }
                  />
                )}
                {sec.id === "skills" && (
                  <SkillsForm
                    skills={resumeData.skills}
                    onChange={skills =>
                      setResumeData(prev => ({ ...prev, skills }))
                    }
                  />
                )}
                {sec.id === "projects" && (
                  <ProjectsForm
                    projects={resumeData.projects}
                    onChange={projects =>
                      setResumeData(prev => ({ ...prev, projects }))
                    }
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full md:w-[54%] self-start sticky top-6">
          <div className="w-full p-0 m-0">
            <ResumePreview
              data={resumeData}
              template={selectedTemplate}
            />
          </div>
        </div>
      </main>

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