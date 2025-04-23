import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#1F2937",
  },
  container: {
    flexDirection: "row",
    width: "100%",
  },
  sidebar: {
    width: "33%",
    backgroundColor: "#F8FAFC",
    padding: 20,
  },
  mainContent: {
    width: "67%",
    padding: 20,
  },
  profile: {
    textAlign: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E2E8F0",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#64748B",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    color: "#64748B",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingBottom: 4,
    textTransform: "uppercase",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    fontSize: 10,
  },
  icon: {
    marginRight: 6,
  },
  skillBadge: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#F1F5F9",
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginRight: 4,
    marginBottom: 4,
    borderRadius: 3,
    fontSize: 10,
  },
  experienceItem: {
    marginBottom: 12,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: "#E2E8F0",
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
  },
  company: {
    fontSize: 10,
    color: "#64748B",
    marginBottom: 2,
  },
  date: {
    fontSize: 9,
    color: "#94A3B8",
    marginBottom: 4,
  },
  description: {
    fontSize: 10,
    lineHeight: 1.4,
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
  },
  projectLink: {
    fontSize: 10,
    color: "#2563EB",
    textDecoration: "none",
    marginBottom: 4,
  },
  techBadge: {
    fontSize: 8,
    backgroundColor: "#F1F5F9",
    paddingVertical: 1,
    paddingHorizontal: 4,
    marginRight: 4,
    marginBottom: 4,
    borderRadius: 2,
  },
});

export const PDFModernTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, skills, education, experience, projects } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Sidebar */}
          <View style={styles.sidebar}>
            {/* Profile */}
            <View style={styles.profile}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {personalInfo.fullName ? personalInfo.fullName.charAt(0) : "?"}
                </Text>
              </View>
              <Text style={styles.name}>{personalInfo.fullName || "Your Name"}</Text>
              {personalInfo.title && <Text style={styles.title}>{personalInfo.title}</Text>}
            </View>

            {/* Contact Info */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact</Text>
              {personalInfo.email && (
                <View style={styles.contactItem}>
                  <Text style={styles.icon}>✉</Text>
                  <Text>{personalInfo.email}</Text>
                </View>
              )}
              {personalInfo.phone && (
                <View style={styles.contactItem}>
                  <Text style={styles.icon}>📱</Text>
                  <Text>{personalInfo.phone}</Text>
                </View>
              )}
              {personalInfo.location && (
                <View style={styles.contactItem}>
                  <Text style={styles.icon}>📍</Text>
                  <Text>{personalInfo.location}</Text>
                </View>
              )}
              {personalInfo.linkedin && (
                <View style={styles.contactItem}>
                  <Text style={styles.icon}>🔗</Text>
                  <Text>{personalInfo.linkedin}</Text>
                </View>
              )}
              {personalInfo.github && (
                <View style={styles.contactItem}>
                  <Text style={styles.icon}>🐙</Text>
                  <Text>{personalInfo.github}</Text>
                </View>
              )}
              {personalInfo.website && (
                <View style={styles.contactItem}>
                  <Text style={styles.icon}>🌐</Text>
                  <Text>{personalInfo.website}</Text>
                </View>
              )}
            </View>

            {/* Skills */}
            {skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {skills.map((skill) => (
                    <Text key={skill} style={styles.skillBadge}>
                      {skill}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Summary */}
            {personalInfo.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>About Me</Text>
                <Text style={styles.description}>{personalInfo.summary}</Text>
              </View>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Work Experience</Text>
                {experience.map((exp) => (
                  <View key={exp.id} style={styles.experienceItem}>
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    <Text style={styles.company}>{exp.company}</Text>
                    <Text style={styles.date}>
                      {exp.startDate} - {exp.isCurrentJob ? "Present" : exp.endDate}
                    </Text>
                    {exp.description && (
                      <Text style={styles.description}>{exp.description}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {education.map((edu) => (
                  <View key={edu.id} style={styles.experienceItem}>
                    <Text style={styles.jobTitle}>
                      {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                    </Text>
                    <Text style={styles.company}>{edu.institution}</Text>
                    <Text style={styles.date}>
                      {edu.startDate} - {edu.endDate}
                    </Text>
                    {edu.description && (
                      <Text style={styles.description}>{edu.description}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projects</Text>
                {projects.map((project) => (
                  <View key={project.id} style={styles.experienceItem}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={styles.projectTitle}>{project.title}</Text>
                      {project.link && (
                        <Text style={styles.projectLink}>View</Text>
                      )}
                    </View>
                    {project.description && (
                      <Text style={styles.description}>{project.description}</Text>
                    )}
                    {project.technologies.length > 0 && (
                      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 4 }}>
                        {project.technologies.map((tech) => (
                          <Text key={tech} style={styles.techBadge}>
                            {tech}
                          </Text>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};