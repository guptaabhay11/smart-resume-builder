
import { useState, useRef } from "react";
import { TemplateSelector } from "@/components/TemplateSelector";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { SkillsForm } from "./SkillsForm";
import { EducationForm } from "./EducationForm";
import { ExperienceForm } from "./ExperienceForm";
import { ProjectsForm } from "./ProjectsForm";
import { ResumePreview } from "./ResumePreview";
import { EmailForm } from "./EmailForm";
import { ResumeData } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import generatePdf from "react-to-pdf";

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

export const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(emptyResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [activeTab, setActiveTab] = useState("template");
  const { toast } = useToast();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [pdfFile, setPdfFile] = useState<File | undefined>(undefined);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);

  const handleDownloadPDF = async () => {
    if (resumeData.personalInfo.fullName === "") {
      toast({
        title: "Missing information",
        description: "Please fill in at least your name before downloading.",
        variant: "destructive",
      });
      return;
    }
    
    try {
   
      if (resumeRef.current) {
        await generatePdf(() => resumeRef.current, { 
          filename: `${resumeData.personalInfo.fullName || "resume"}.pdf`,
          page: { 
            format: 'A4' 
          } 
        });
      }
      
      toast({
        title: "PDF Generated!",
        description: "Your resume has been downloaded.",
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "Error generating PDF",
        description: "There was an error creating your PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSendEmail = () => {
    if (resumeData.personalInfo.fullName === "") {
      toast({
        title: "Missing information",
        description: "Please fill in at least your name before sending.",
        variant: "destructive",
      });
      return;
    }
    setEmailDialogOpen(true);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-center">Smart Resume Builder</h1>
        </div>
      </header>

      <main className="flex flex-col md:flex-row flex-1 container mx-auto p-4 gap-6">
        {/* Form Section */}
        <div className="w-full md:w-1/2 space-y-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid grid-cols-6 mb-4">
              <TabsTrigger value="template">Template</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>

            <Card>
              <CardHeader>
                <CardTitle>
                  {activeTab === "template" && "Choose a Template"}
                  {activeTab === "personal" && "Personal Information"}
                  {activeTab === "skills" && "Skills"}
                  {activeTab === "education" && "Education"}
                  {activeTab === "experience" && "Experience"}
                  {activeTab === "projects" && "Projects"}
                </CardTitle>
                <CardDescription>
                  {activeTab === "template" && "Select a template for your resume"}
                  {activeTab === "personal" && "Add your personal and contact information"}
                  {activeTab === "skills" && "Add your relevant skills"}
                  {activeTab === "education" && "Add your educational background"}
                  {activeTab === "experience" && "Add your work experience"}
                  {activeTab === "projects" && "Add your projects"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TabsContent value="template" className="mt-0">
                  <TemplateSelector
                    onSelectTemplate={setSelectedTemplate}
                    selectedTemplate={selectedTemplate}
                  />
                </TabsContent>

                <TabsContent value="personal" className="mt-0">
                  <PersonalInfoForm
                    data={resumeData.personalInfo}
                    onChange={(personalInfo) =>
                      setResumeData((prev) => ({ ...prev, personalInfo }))
                    }
                  />
                </TabsContent>

                <TabsContent value="skills" className="mt-0">
                  <SkillsForm
                    skills={resumeData.skills}
                    onChange={(skills) =>
                      setResumeData((prev) => ({ ...prev, skills }))
                    }
                  />
                </TabsContent>

                <TabsContent value="education" className="mt-0">
                  <EducationForm
                    education={resumeData.education}
                    onChange={(education) =>
                      setResumeData((prev) => ({ ...prev, education }))
                    }
                  />
                </TabsContent>

                <TabsContent value="experience" className="mt-0">
                  <ExperienceForm
                    experience={resumeData.experience}
                    onChange={(experience) =>
                      setResumeData((prev) => ({ ...prev, experience }))
                    }
                  />
                </TabsContent>

                <TabsContent value="projects" className="mt-0">
                  <ProjectsForm
                    projects={resumeData.projects}
                    onChange={(projects) =>
                      setResumeData((prev) => ({ ...prev, projects }))
                    }
                  />
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>

          <div className="flex space-x-3">
            <Button 
              onClick={handleDownloadPDF} 
              className="flex-1"
            >
              Download PDF
            </Button>
            <Button 
              onClick={handleSendEmail} 
              variant="outline" 
              className="flex-1"
            >
              Send via Email
            </Button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-full md:w-1/2 h-[calc(100vh-12rem)] sticky top-4">
          <div className="bg-gray-100 p-4 rounded-md h-full overflow-hidden flex flex-col">
            <h2 className="text-lg font-semibold mb-2">Preview</h2>
            <div className="flex-1 overflow-auto">
              <ResumePreview
                ref={resumeRef}
                data={resumeData}
                template={selectedTemplate}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Resume via Email</DialogTitle>
          </DialogHeader>
          <EmailForm 
            pdfFile={pdfFile} 
            onSuccess={() => setEmailDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
