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

// Optionally register a custom font

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 40,
    fontFamily: "Helvetica", // ← use this
    fontSize: 11,
    color: "#1F2937", // slate-800
  },
  header: {
    textAlign: "center",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0", // slate-200
    paddingBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827", // slate-900
  },
  title: {
    fontSize: 14,
    color: "#4B5563", // slate-600
    marginTop: 4,
  },
  contactContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 6,
  },
  contactText: {
    fontSize: 10,
    color: "#4B5563",
    marginHorizontal: 6,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  sectionLabel: {
    backgroundColor: "#F1F5F9", // slate-100
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
    fontSize: 9,
    color: "#4B5563",
    marginRight: 6,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1F2937",
  },
  text: {
    fontSize: 11,
    lineHeight: 1.4,
    color: "#4B5563",
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  badge: {
    borderWidth: 1,
    borderColor: "#CBD5E1", // slate-300
    backgroundColor: "#F8FAFC", // slate-50
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginRight: 4,
    marginBottom: 4,
    borderRadius: 3,
    fontSize: 10,
    color: "#374151", // slate-700
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  itemLeft: {},
  itemRight: {
    fontSize: 9,
    backgroundColor: "#F8FAFC",
    paddingVertical: 1,
    paddingHorizontal: 4,
    borderRadius: 3,
    color: "#4B5563",
  },
  subsectionText: {
    marginTop: 2,
    fontSize: 10,
    color: "#4B5563",
  },
  underline: {
    height: 1,
    backgroundColor: "#E5E7EB", // slate-200
    marginTop: 12,
    marginBottom: 16,
  },
});

export const PDFClassicTemplate = ({ data }: { data: ResumeData }) => {
    const { personalInfo, skills, education, experience, projects } = data;
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>{personalInfo.fullName || "Your Name"}</Text>
            {personalInfo.title && <Text style={styles.title}>{personalInfo.title}</Text>}
            <View style={styles.contactContainer}>
              {personalInfo.email && <Text style={styles.contactText}>{personalInfo.email}</Text>}
              {personalInfo.phone && <Text style={styles.contactText}>{personalInfo.phone}</Text>}
              {personalInfo.location && <Text style={styles.contactText}>{personalInfo.location}</Text>}
              {personalInfo.linkedin && <Text style={styles.contactText}>{personalInfo.linkedin}</Text>}
              {personalInfo.github && <Text style={styles.contactText}>{personalInfo.github}</Text>}
              {personalInfo.website && <Text style={styles.contactText}>{personalInfo.website}</Text>}
            </View>
          </View>
  
          {/* Summary */}
          {personalInfo.summary && (
            <>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionLabel}>Summary</Text>
                </View>
                <Text style={styles.text}>{personalInfo.summary}</Text>
              </View>
              <View style={styles.underline} />
            </>
          )}
  
          {/* Skills */}
          {skills.length > 0 && (
            <>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionLabel}>Skills</Text>
                </View>
                <View style={styles.badgeContainer}>
                  {skills.map((skill) => (
                    <Text style={styles.badge} key={skill}>
                      {skill}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={styles.underline} />
            </>
          )}
  
          {/* Experience */}
          {experience.length > 0 && (
            <>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionLabel}>Professional Experience</Text>
                </View>
                {experience.map((exp) => (
                  <View key={exp.id} style={{ marginBottom: 8 }}>
                    <View style={styles.itemRow}>
                      <View style={styles.itemLeft}>
                        <Text style={styles.sectionTitle}>{exp.position}</Text>
                        <Text style={styles.text}>{exp.company}</Text>
                      </View>
                      <Text style={styles.itemRight}>
                        {exp.startDate} - {exp.isCurrentJob ? "Present" : exp.endDate}
                      </Text>
                    </View>
                    {exp.description && (
                      <Text style={styles.subsectionText}>{exp.description}</Text>
                    )}
                  </View>
                ))}
              </View>
              <View style={styles.underline} />
            </>
          )}
  
          {/* Education */}
          {education.length > 0 && (
            <>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionLabel}>Education</Text>
                </View>
                {education.map((edu) => (
                  <View key={edu.id} style={{ marginBottom: 8 }}>
                    <View style={styles.itemRow}>
                      <View style={styles.itemLeft}>
                        <Text style={styles.sectionTitle}>
                          {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                        </Text>
                        <Text style={styles.text}>{edu.institution}</Text>
                      </View>
                      <Text style={styles.itemRight}>
                        {edu.startDate} - {edu.endDate}
                      </Text>
                    </View>
                    {edu.description && (
                      <Text style={styles.subsectionText}>{edu.description}</Text>
                    )}
                  </View>
                ))}
              </View>
              <View style={styles.underline} />
            </>
          )}
  
          {/* Projects */}
          {projects.length > 0 && (
            <>
              <View>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionLabel}>Projects</Text>
                </View>
                {projects.map((project) => (
                  <View key={project.id} style={{ marginBottom: 8 }}>
                    <View style={styles.itemRow}>
                      <Text style={styles.sectionTitle}>{project.title}</Text>
                      {project.link && (
                        <Text style={[styles.text, { color: '#2563EB', textDecoration: 'underline' }]}>View</Text>
                      )}
                    </View>
                    {project.description && (
                      <Text style={styles.subsectionText}>{project.description}</Text>
                    )}
                    {project.technologies.length > 0 && (
                      <View style={styles.badgeContainer}>
                        {project.technologies.map((tech) => (
                          <Text style={styles.badge} key={tech}>
                            {tech}
                          </Text>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
              <View style={styles.underline} />
            </>
          )}
        </Page>
      </Document>
    );
  };