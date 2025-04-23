
import { Education } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export const EducationForm = ({ education, onChange }: EducationFormProps) => {
  const handleAdd = () => {
    const newEducation: Education = {
      id: uuidv4(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    onChange([...education, newEducation]);
  };

  const handleRemove = (id: string) => {
    onChange(education.filter((edu) => edu.id !== id));
  };

  const handleChange = (
    id: string,
    field: keyof Education,
    value: string
  ) => {
    onChange(
      education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  return (
    <div className="space-y-4">
      {education.map((edu) => (
        <Card key={edu.id} className="relative">
          <Button
            type="button"
            onClick={() => handleRemove(edu.id)}
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-7 w-7"
          >
            <X className="h-4 w-4" />
          </Button>
          <CardContent className="pt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
              <Input
                id={`institution-${edu.id}`}
                value={edu.institution}
                onChange={(e) =>
                  handleChange(edu.id, "institution", e.target.value)
                }
                placeholder="University Name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                <Input
                  id={`degree-${edu.id}`}
                  value={edu.degree}
                  onChange={(e) =>
                    handleChange(edu.id, "degree", e.target.value)
                  }
                  placeholder="Bachelor of Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                <Input
                  id={`field-${edu.id}`}
                  value={edu.field}
                  onChange={(e) =>
                    handleChange(edu.id, "field", e.target.value)
                  }
                  placeholder="Computer Science"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                <Input
                  id={`startDate-${edu.id}`}
                  value={edu.startDate}
                  onChange={(e) =>
                    handleChange(edu.id, "startDate", e.target.value)
                  }
                  placeholder="Sept 2018"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                <Input
                  id={`endDate-${edu.id}`}
                  value={edu.endDate}
                  onChange={(e) =>
                    handleChange(edu.id, "endDate", e.target.value)
                  }
                  placeholder="June 2022"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`description-${edu.id}`}>
                Description (optional)
              </Label>
              <Textarea
                id={`description-${edu.id}`}
                value={edu.description}
                onChange={(e) =>
                  handleChange(edu.id, "description", e.target.value)
                }
                placeholder="Notable achievements, GPA, relevant coursework, etc."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        type="button"
        onClick={handleAdd}
        variant="outline"
        className="w-full mt-2"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
};
