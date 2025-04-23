import { ResumeData } from "@/types/resume";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { forwardRef } from "react";

interface ResumePreviewProps {
  data: ResumeData;
  template: string;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ data, template }, ref) => {
    const renderTemplate = () => {
      switch (template) {
        case "classic":
          return <ClassicTemplate data={data} />;
        case "modern":
          return <ModernTemplate data={data} />;
        case "minimal":
          return <MinimalTemplate data={data} />;
        default:
          return <ClassicTemplate data={data} />;
      }
    };

    return (
      <div
        ref={ref}
        style={{
          width: "750px", 
          height: "1123px", 
          transform: "scale(0.8)",
          transformOrigin: "top center",
          backgroundColor: "white",
        }}
      >
        {renderTemplate()}
      </div>
    );
  }
);

ResumePreview.displayName = "ResumePreview";
