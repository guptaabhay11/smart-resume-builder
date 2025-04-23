import { ResumeData } from "@/types/resume";

interface MinimalTemplateProps {
  data: ResumeData;
}

export const MinimalTemplate = ({ data }: MinimalTemplateProps) => {
  const { personalInfo, skills, education, experience, projects } = data;

  return (
    <div className="flex flex-col w-full h-full bg-white text-slate-800 p-10 font-sans max-w-3xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 mb-6">
        <h1 className="text-2xl font-bold mb-1">{personalInfo.fullName || "Your Name"}</h1>
        {personalInfo.title && <h2 className="text-md text-slate-600">{personalInfo.title}</h2>}
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-slate-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <p className="text-sm">{personalInfo.summary}</p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="text-xs bg-slate-100 px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Experience</h3>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="pb-2">
                <div className="flex justify-between">
                  <h4 className="font-medium">{exp.position}</h4>
                  <span className="text-xs text-slate-500">
                    {exp.startDate} - {exp.isCurrentJob ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="text-sm text-slate-600 mb-1">{exp.company}</div>
                {exp.description && <p className="text-xs">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Education</h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="pb-2">
                <div className="flex justify-between">
                  <h4 className="font-medium">
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                  </h4>
                  <span className="text-xs text-slate-500">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div className="text-sm text-slate-600 mb-1">{edu.institution}</div>
                {edu.description && <p className="text-xs">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h3 className="text-md font-semibold mb-2">Projects</h3>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="pb-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{project.title}</h4>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600">
                      View Project
                    </a>
                  )}
                </div>
                {project.description && <p className="text-xs mt-1">{project.description}</p>}
                
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
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
