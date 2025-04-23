
import { Experience } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";

interface ExperienceFormProps {
  experience: Experience[];
  onChange: (experience: Experience[]) => void;
}

export const ExperienceForm = ({ experience, onChange }: ExperienceFormProps) => {
  const handleAdd = () => {
    const newExperience: Experience = {
      id: uuidv4(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      isCurrentJob: false
    };
    onChange([...experience, newExperience]);
  };

  const handleRemove = (id: string) => {
    onChange(experience.filter((exp) => exp.id !== id));
  };

  const handleChange = (
    id: string,
    field: keyof Experience,
    value: string | boolean
  ) => {
    onChange(
      experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  return (
    <div className="space-y-4">
      {experience.map((exp) => (
        <Card key={exp.id} className="relative">
          <Button
            type="button"
            onClick={() => handleRemove(exp.id)}
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-7 w-7"
          >
            <X className="h-4 w-4" />
          </Button>
          <CardContent className="pt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`company-${exp.id}`}>Company</Label>
              <Input
                id={`company-${exp.id}`}
                value={exp.company}
                onChange={(e) =>
                  handleChange(exp.id, "company", e.target.value)
                }
                placeholder="Company Name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`position-${exp.id}`}>Position</Label>
              <Input
                id={`position-${exp.id}`}
                value={exp.position}
                onChange={(e) =>
                  handleChange(exp.id, "position", e.target.value)
                }
                placeholder="Software Engineer"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                <Input
                  id={`startDate-${exp.id}`}
                  value={exp.startDate}
                  onChange={(e) =>
                    handleChange(exp.id, "startDate", e.target.value)
                  }
                  placeholder="Jan 2020"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                <Input
                  id={`endDate-${exp.id}`}
                  value={exp.endDate}
                  onChange={(e) =>
                    handleChange(exp.id, "endDate", e.target.value)
                  }
                  placeholder="Present"
                  disabled={exp.isCurrentJob}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={`currentJob-${exp.id}`}
                checked={exp.isCurrentJob}
                onCheckedChange={(checked) =>
                  handleChange(exp.id, "isCurrentJob", Boolean(checked))
                }
              />
              <Label htmlFor={`currentJob-${exp.id}`} className="text-sm">
                This is my current job
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`description-${exp.id}`}>Description</Label>
              <Textarea
                id={`description-${exp.id}`}
                value={exp.description}
                onChange={(e) =>
                  handleChange(exp.id, "description", e.target.value)
                }
                placeholder="Describe your responsibilities and achievements..."
                rows={4}
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
        Add Experience
      </Button>
    </div>
  );
};
