import { useNavigate } from "react-router-dom";
import { TemplateSelector } from "@/components/TemplateSelector";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const ResumeTemplateSelect = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const navigate = useNavigate();
  
  // Blue color palette (matching with dashboard)
  const primaryBlue = '#1e4976';
  const secondaryBlue = '#e8f0f8';
  const accentBlue = '#4285f4';

  const handleNext = () => {
    navigate("/edit?template=" + selectedTemplate);
  };

  const handleDashboardClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#e8f0f8] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-300 px-6 py-4 flex items-center justify-between shadow-sm">
        <div 
          className="font-extrabold text-2xl text-[#1e4976] cursor-pointer hover:text-[#4285f4] transition-colors"
          onClick={handleDashboardClick}
        >
          Dashboard
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="bg-white shadow-xl rounded-xl w-full max-w-3xl p-8 flex flex-col items-center gap-6 border border-[#d5e5f6]">
          <div className="w-full mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1e4976] mb-2 text-center">Choose Your Resume Template</h2>
            <p className="text-gray-600 text-center">Select a template to start building your professional resume.</p>
          </div>
          
          <TemplateSelector 
            selectedTemplate={selectedTemplate} 
            onSelectTemplate={setSelectedTemplate} 
          />
          
          <Button 
            className="mt-6 w-40 h-12 text-base rounded-lg bg-[#1e4976] hover:bg-[#0d3c6e] transition-colors shadow-lg"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white py-4 text-center text-[#1e4976] text-sm border-t border-[#d5e5f6]">
        <p>Resume Builder © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default ResumeTemplateSelect;