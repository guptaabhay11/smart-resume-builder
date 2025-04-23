
import { useNavigate } from "react-router-dom";
import { TemplateSelector } from "@/components/TemplateSelector";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const ResumeTemplateSelect = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/edit?template=" + selectedTemplate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-3xl p-8 flex flex-col items-center gap-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Choose Your Resume Template</h2>
        <p className="text-gray-500 mb-4 text-center">Select a template to start building your professional resume.</p>
        <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
        <Button className="mt-4 w-40 h-12 text-base rounded-lg bg-blue-500 hover:bg-blue-600"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ResumeTemplateSelect;
