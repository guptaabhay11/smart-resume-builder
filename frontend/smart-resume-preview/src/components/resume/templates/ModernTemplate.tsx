
import { ResumeData } from "@/types/resume";
import { Badge } from "@/components/ui/badge";
import { Briefcase, School, Calendar, Link, Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

interface ModernTemplateProps {
  data: ResumeData;
}

export const ModernTemplate = ({ data }: ModernTemplateProps) => {
  const { personalInfo, skills, education, experience, projects } = data;

  return (
    <div className="flex flex-col w-full h-full bg-white text-slate-800 font-sans">
      {/* Header with sidebar layout */}
      <div className="flex">
        {/* Sidebar for contact and skills */}
        <div className="w-1/3 bg-slate-100 p-6 min-h-screen">
          {/* Profile */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 rounded-full bg-slate-300 mx-auto flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-slate-500">
                {personalInfo.fullName
                  ? personalInfo.fullName.charAt(0)
                  : "?"}
              </span>
            </div>
            <h1 className="font-bold text-xl mb-1">{personalInfo.fullName || "Your Name"}</h1>
            {personalInfo.title && <h2 className="text-slate-600 text-sm">{personalInfo.title}</h2>}
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <h3 className="font-bold text-sm uppercase mb-3 border-b border-slate-300 pb-1">Contact</h3>
            <div className="space-y-2 text-sm">
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}
              
              {personalInfo.github && (
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  <span>{personalInfo.github}</span>
                </div>
              )}
              
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h3 className="font-bold text-sm uppercase mb-3 border-b border-slate-300 pb-1">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="font-normal">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="w-2/3 p-6">
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-6">
              <h3 className="font-bold text-sm uppercase mb-3 border-b border-slate-300 pb-1">About Me</h3>
              <p className="text-sm">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-sm uppercase mb-3 border-b border-slate-300 pb-1">Work Experience</h3>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="pl-4 border-l-2 border-slate-300">
                    <h4 className="font-semibold">{exp.position}</h4>
                    <div className="flex justify-between items-center text-sm text-slate-600">
                      <span>{exp.company}</span>
                      <span>
                        {exp.startDate} - {exp.isCurrentJob ? "Present" : exp.endDate}
                      </span>
                    </div>
                    {exp.description && <p className="mt-2 text-sm">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-sm uppercase mb-3 border-b border-slate-300 pb-1">Education</h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="pl-4 border-l-2 border-slate-300">
                    <h4 className="font-semibold">
                      {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                    </h4>
                    <div className="flex justify-between items-center text-sm text-slate-600">
                      <span>{edu.institution}</span>
                      <span>
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    {edu.description && <p className="mt-2 text-sm">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h3 className="font-bold text-sm uppercase mb-3 border-b border-slate-300 pb-1">Projects</h3>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="pl-4 border-l-2 border-slate-300">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">{project.title}</h4>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 flex items-center">
                          <Link className="h-3 w-3 mr-1" />
                          <span>View</span>
                        </a>
                      )}
                    </div>
                    {project.description && <p className="mt-1 text-sm">{project.description}</p>}
                    
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="text-xs bg-slate-100 px-2 py-0.5 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
