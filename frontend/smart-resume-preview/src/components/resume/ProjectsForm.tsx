
import { Project } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import { SkillsForm } from "./SkillsForm";

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export const ProjectsForm = ({ projects, onChange }: ProjectsFormProps) => {
  const handleAdd = () => {
    const newProject: Project = {
      id: uuidv4(),
      title: "",
      description: "",
      link: "",
      technologies: [],
    };
    onChange([...projects, newProject]);
  };

  const handleRemove = (id: string) => {
    onChange(projects.filter((project) => project.id !== id));
  };

  const handleChange = (
    id: string,
    field: keyof Project,
    value: string | string[]
  ) => {
    onChange(
      projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id} className="relative">
          <Button
            type="button"
            onClick={() => handleRemove(project.id)}
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-7 w-7"
          >
            <X className="h-4 w-4" />
          </Button>
          <CardContent className="pt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`title-${project.id}`}>Project Title</Label>
              <Input
                id={`title-${project.id}`}
                value={project.title}
                onChange={(e) =>
                  handleChange(project.id, "title", e.target.value)
                }
                placeholder="E-commerce Website"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`description-${project.id}`}>Description</Label>
              <Textarea
                id={`description-${project.id}`}
                value={project.description}
                onChange={(e) =>
                  handleChange(project.id, "description", e.target.value)
                }
                placeholder="Developed a full-stack e-commerce platform with user authentication, product catalog, and payment processing..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`link-${project.id}`}>Project Link (optional)</Label>
              <Input
                id={`link-${project.id}`}
                value={project.link || ""}
                onChange={(e) =>
                  handleChange(project.id, "link", e.target.value)
                }
                placeholder="https://github.com/yourusername/project"
              />
            </div>

            <div className="space-y-2">
              <Label>Technologies Used</Label>
              <SkillsForm
                skills={project.technologies}
                onChange={(technologies) =>
                  handleChange(project.id, "technologies", technologies)
                }
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
        Add Project
      </Button>
    </div>
  );
};
