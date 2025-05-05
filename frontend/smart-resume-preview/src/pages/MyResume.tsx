import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeQuery, useGetResumeByIdQuery, useUpdateResumeMutation } from '../services/api';
import {
  FileText,
  Download,
  Eye,
  Edit,
  FileIcon,
  ChevronDown,
  ChevronUp,
  Save,
} from 'lucide-react';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { PersonalInfoForm } from '@/components/resume/PersonalInfoForm';
import { SkillsForm } from '@/components/resume/SkillsForm';
import { EducationForm } from '@/components/resume/EducationForm';
import { ExperienceForm } from '@/components/resume/ExperienceForm';
import { ProjectsForm } from '@/components/resume/ProjectsForm';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ResumeData } from '@/types/resume';
import { pdf } from '@react-pdf/renderer';
import { PDFClassicTemplate } from '@/components/resume/pdf-template/ClassicPdf';
import { useUploadPdfMutation } from '../services/api';

const MyResumeContent = () => {
  const { data: userData } = useMeQuery();
  const navigate = useNavigate();
  const { toast } = useToast();
  const resumeIds = userData?.data?.pdf || [];
  const [expandedResumeId, setExpandedResumeId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>('personal');
  const [isDirty, setIsDirty] = useState(false);
  const [updateResume] = useUpdateResumeMutation();
  const [uploadPdf] = useUploadPdfMutation();

  // State for editable resume data
  const [resumeData, setResumeData] = useState<ResumeData>({
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
    url: "",
  });

  // Fetch resume data when expanded with refetch capability
  const { data: resumeResponse, refetch: refetchResume } = useGetResumeByIdQuery(expandedResumeId || '', {
    skip: !expandedResumeId,
  });

  // Update local state when resume data is fetched
  useEffect(() => {
    if (resumeResponse?.data) {
      setResumeData(resumeResponse.data);
      setIsDirty(false);
    }
  }, [resumeResponse]);

  const toggleResumeExpansion = (resumeId: string) => {
    setExpandedResumeId(expandedResumeId === resumeId ? null : resumeId);
    setEditMode(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getResumeTitle = (resume: ResumeData | undefined, index: number) => {
    if (resume?.personalInfo?.fullName) {
      return resume.personalInfo.fullName;
    }
    return `Resume ${index + 1}`;
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setIsDirty(false);
  };

  const handleFieldChange = (field: string, value: any) => {
    setResumeData(prev => {
      const newData = { ...prev };
      // Handle nested personalInfo fields
      if (field.startsWith('personalInfo.')) {
        const personalInfoField = field.split('.')[1];
        newData.personalInfo = {
          ...newData.personalInfo,
          [personalInfoField]: value
        };
      } else {
        // Handle other fields
        newData[field as keyof ResumeData] = value;
      }
      return newData;
    });
    setIsDirty(true);
  };

  const generatePdfFile = async () => {
    const blob = await pdf(<PDFClassicTemplate data={resumeData} />).toBlob();
    return new File([blob], `${resumeData.personalInfo.fullName || 'resume'}.pdf`, { type: blob.type });
  };

  const handleSaveResume = async () => {
    try {
      if (!expandedResumeId) return;
      
      // Generate new PDF
      const file = await generatePdfFile();
      const formData = new FormData();
      formData.append("file", file);

      // Upload new PDF
      const uploadResponse = await uploadPdf(formData).unwrap();
      const newUrl = uploadResponse.data;

      // Update resume with new data and new URL
      const updateResponse = await updateResume({
        id: expandedResumeId,
        data: {
          ...resumeData,
          url: newUrl
        }
      }).unwrap();

      // Refresh the resume data
      await refetchResume();

      toast({
        title: "Resume Updated!",
        description: "Your resume has been updated successfully.",
      });
      setIsDirty(false);
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: "Error",
        description: "Failed to update resume.",
        variant: "destructive",
      });
    }
  };

  const sections = [
    { id: "personal", label: "Personal details" },
    { id: "summary", label: "Professional Summary" },
    { id: "experience", label: "Employment History" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
  ];

  if (editMode && expandedResumeId) {
    return (
      <div className="min-h-screen bg-[#e8f0f8] flex flex-col">
        {/* HEADER */}
        <header className="bg-white border-b border-gray-300 px-6 py-2 flex flex-col md:flex-row items-center justify-between gap-2 shadow-sm">
          <div className="flex items-center space-x-3 w-full md:w-max">
            <div 
              className="font-extrabold text-2xl text-[#1e4976] mr-6 cursor-pointer hover:text-[#4285f4]"
              onClick={toggleEditMode}
            >
              Back
            </div>
            <input
              className="font-bold text-2xl md:text-3xl focus:ring-0 border-0 bg-transparent outline-none placeholder-[#a3c2e2] text-[#1e4976]"
              value={resumeData.personalInfo.fullName || "Untitled"}
              placeholder="Untitled"
              onChange={(e) => handleFieldChange('personalInfo.fullName', e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleSaveResume} 
              disabled={!isDirty}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Save className="w-5 h-5" />
              Update
            </Button>
            <Button 
              onClick={() => { if (resumeData.url) window.open(resumeData.url, '_blank'); }}
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </Button>
          </div>
        </header>

        {/* MAIN EDIT CONTENT */}
        <main className="flex-1 flex flex-col md:flex-row gap-4 px-2 py-6 md:px-8 max-w-[1600px] mx-auto w-full">
          <div className="w-full md:w-[48%] flex flex-col gap-4">
            {sections.map(sec => (
              <div key={sec.id} className="bg-white rounded-xl shadow border hover:shadow-lg transition group">
                <button 
                  className="w-full flex items-center justify-between px-6 py-4 font-bold text-lg text-left" 
                  onClick={() => setActiveSection(activeSection === sec.id ? null : sec.id)}
                >
                  <span className="text-[#1e4976]">{sec.label}</span>
                  <ChevronDown className={activeSection === sec.id ? "rotate-180 transition" : "transition"} />
                </button>
                <div className={`px-6 pb-6 ${activeSection === sec.id ? "block" : "hidden"}`}>
                  {sec.id === "personal" && (
                    <PersonalInfoForm 
                      data={resumeData.personalInfo} 
                      onChange={(data) => handleFieldChange('personalInfo', data)} 
                    />
                  )}
                  {sec.id === "summary" && (
                    <textarea
                      className="w-full h-24 rounded-md border border-[#a3c2e2] px-3 py-2 text-sm bg-[#e8f0f8]"
                      value={resumeData.personalInfo.summary}
                      onChange={(e) => handleFieldChange('personalInfo.summary', e.target.value)}
                      placeholder="Write a brief summary..."
                    />
                  )}
                  {sec.id === "experience" && (
                    <ExperienceForm 
                      experience={resumeData.experience} 
                      onChange={(data) => handleFieldChange('experience', data)} 
                    />
                  )}
                  {sec.id === "education" && (
                    <EducationForm 
                      education={resumeData.education} 
                      onChange={(data) => handleFieldChange('education', data)} 
                    />
                  )}
                  {sec.id === "skills" && (
                    <SkillsForm 
                      skills={resumeData.skills} 
                      onChange={(data) => handleFieldChange('skills', data)} 
                    />
                  )}
                  {sec.id === "projects" && (
                    <ProjectsForm 
                      projects={resumeData.projects} 
                      onChange={(data) => handleFieldChange('projects', data)} 
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full md:w-[54%] self-start sticky top-6">
            <ResumePreview data={resumeData} template="classic" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-16 px-4">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-t-2xl p-6">
        <h1 className="text-3xl font-bold">My Resumes</h1>
        <p className="text-blue-100 mt-1">View, download, and edit your saved resumes</p>
      </div>

      <div className="bg-white rounded-b-2xl p-6 shadow-sm border border-gray-100">
        {resumeIds.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-blue-50 rounded-xl">
            <FileIcon className="w-16 h-16 text-gray-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-500">No resumes saved yet</h3>
            <p className="text-sm text-gray-400 mt-1">Create your first resume to see it here</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {resumeIds.map((resumeId: string, index: number) => (
              <div
                key={resumeId}
                className="rounded-xl border border-gray-200 p-4 transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleResumeExpansion(resumeId)}>
                  <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                    <FileText className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-medium truncate">
                      {getResumeTitle(resumeResponse?.data, index)}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {formatDate(resumeResponse?.data?.updatedAt || resumeResponse?.data?.createdAt || new Date().toISOString())}
                    </span>
                  </div>
                  <div className="text-gray-400">
                    {expandedResumeId === resumeId ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </div>

                {expandedResumeId === resumeId && resumeResponse?.data && (
                  <div className="mt-4 pl-2 border-l-2 border-blue-200 space-y-3">
                    {resumeResponse.data.personalInfo.title && (
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">Title:</span> {resumeResponse.data.personalInfo.title}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button
                        variant="outline"
                        onClick={() => resumeResponse.data.url && window.open(resumeResponse.data.url, '_blank')}
                        className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4" /> View PDF
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = resumeResponse.data.url;
                          link.download = `${resumeResponse.data.personalInfo.fullName || 'resume'}.pdf`;
                          link.click();
                        }}
                        className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        <Download className="w-4 h-4" /> Download PDF
                      </Button>
                      <Button
                        onClick={toggleEditMode}
                        className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Edit className="w-4 h-4" /> Edit Resume
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyResumeContent;