import { ResumeData } from "@/types/resume";
import { Badge } from "@/components/ui/badge";

interface ClassicTemplateProps {
  data: ResumeData;
}

export const ClassicTemplate = ({ data }: ClassicTemplateProps) => {
  const { personalInfo, skills, education, experience, projects } = data;

  return (
    <div className="flex flex-col w-full h-full bg-white text-slate-800 p-10 font-sans">
      {/* Header */}
      <div className="text-center mb-8 pb-2 border-b-2 border-slate-200">
        <h1 className="text-4xl font-bold text-slate-900">{personalInfo.fullName || "Your Name"}</h1>
        {personalInfo.title && <h2 className="text-xl text-slate-600 mt-2 font-medium">{personalInfo.title}</h2>}
        
        {/* Contact Info */}
        <div className="flex justify-center items-center flex-wrap gap-4 mt-4 text-sm text-slate-700">
          {personalInfo.email && (
            <div className="hover:text-blue-600 transition-colors">
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="hover:text-blue-600 transition-colors">
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.location && (
            <div className="hover:text-blue-600 transition-colors">
              <span>{personalInfo.location}</span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="hover:text-blue-600 transition-colors">
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          
          {personalInfo.github && (
            <div className="hover:text-blue-600 transition-colors">
              <span>{personalInfo.github}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="hover:text-blue-600 transition-colors">
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-7">
          <h3 className="text-lg font-bold border-b border-slate-300 pb-1.5 mb-3 text-slate-800 flex items-center">
            <span className="bg-slate-100 px-2 py-0.5 rounded mr-2 text-slate-600 text-sm">SUMMARY</span>
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 break-words">{personalInfo.summary}</p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-7">
          <h3 className="text-lg font-bold border-b border-slate-300 pb-1.5 mb-3 text-slate-800 flex items-center">
            <span className="bg-slate-100 px-2 py-0.5 rounded mr-2 text-slate-600 text-sm">SKILLS</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge 
                key={skill} 
                variant="outline" 
                className="font-normal bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100 transition-colors"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-7">
          <h3 className="text-lg font-bold border-b border-slate-300 pb-1.5 mb-3 text-slate-800 flex items-center">
            <span className="bg-slate-100 px-2 py-0.5 rounded mr-2 text-slate-600 text-sm">PROFESSIONAL EXPERIENCE</span>
          </h3>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id} className="pb-3 border-b border-slate-100 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-md text-slate-900">{exp.position}</h4>
                    <div className="text-sm text-slate-600 mt-1">
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  <div className="text-sm flex items-center text-slate-600 bg-slate-50 px-2 py-0.5 rounded mr-11">
                    <span>
                      {exp.startDate} - {exp.isCurrentJob ? "Present" : exp.endDate}
                    </span>
                  </div>
                </div>
                {exp.description && <p className="mt-2 text-sm leading-relaxed text-slate-700">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-7">
          <h3 className="text-lg font-bold border-b border-slate-300 pb-1.5 mb-3 text-slate-800 flex items-center">
            <span className="bg-slate-100 px-2 py-0.5 rounded mr-2 text-slate-600 text-sm">EDUCATION</span>
          </h3>
          <div className="space-y-5">
            {education.map((edu) => (
              <div key={edu.id} className="pb-3 border-b border-slate-100 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-md text-slate-900">
                      {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                    </h4>
                    <div className="text-sm text-slate-600 mt-1">
                      <span>{edu.institution}</span>
                    </div>
                  </div>
                  <div className="text-sm text-right flex items-center text-slate-600 bg-slate-50 px-2 py-0.5 rounded mr-11">
                    <span>
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                </div>
                {edu.description && <p className="mt-2 text-sm leading-relaxed text-slate-700">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h3 className="text-lg font-bold border-b border-slate-300 pb-1.5 mb-3 text-slate-800 flex items-center">
            <span className="bg-slate-100 px-2 py-0.5 rounded mr-2 text-slate-600 text-sm">PROJECTS</span>
          </h3>
          <div className="space-y-5">
            {projects.map((project) => (
              <div key={project.id} className="pb-3 border-b border-slate-100 last:border-0">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-md text-slate-900">{project.title}</h4>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      View Project
                    </a>
                  )}
                </div>
                {project.description && <p className="mt-2 text-sm leading-relaxed text-slate-700">{project.description}</p>}
                
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">
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
  );
};