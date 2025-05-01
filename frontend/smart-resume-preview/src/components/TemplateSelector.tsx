import { Template } from "@/types/resume";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface TemplateSelectorProps {
  onSelectTemplate: (templateId: string) => void;
  selectedTemplate: string;
}

export const TemplateSelector = ({
  onSelectTemplate,
  selectedTemplate,
}: TemplateSelectorProps) => {
  const templates: Template[] = [
    {
      id: "classic",
      name: "Classic",
      thumbnail: "/templates/classic.png",
    },
    {
      id: "modern",
      name: "Modern",
      thumbnail: "/templates/modern.png",
    },
    {
      id: "minimal",
      name: "Minimal",
      thumbnail: "/templates/minimal.png",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
      {templates.map((template) => (
        <Card
          key={template.id}
          className={cn(
            "cursor-pointer transition-all hover:border-primary relative overflow-hidden group",
            template.id === selectedTemplate
              ? "border-2 border-primary"
              : "border border-border"
          )}
          onClick={() => onSelectTemplate(template.id)}
        >
          <CardContent className="p-2 h-36 flex flex-col items-center justify-center">
            <div className="bg-gray-100 w-full h-24 flex items-center justify-center rounded-md mb-2">
              {/* This is where the actual template thumbnails would be shown */}
              <div className="text-xs text-gray-500">{template.name} Template</div>
            </div>
            <p className="text-sm font-medium">{template.name}</p>
            {template.id === selectedTemplate && (
              <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
