import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#1F2937",
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingBottom: 10,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#111827",
  },
  title: {
    fontSize: 14,
    color: "#4B5563",
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    fontSize: 10,
    color: "#4B5563",
  },
  contactItem: {
    marginRight: 12,
    marginBottom: 4,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
  },
  text: {
    fontSize: 10,
    color: "#4B5563",
  },
  badge: {
    fontSize: 9,
    backgroundColor: "#F1F5F9",
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  position: {
    fontWeight: "bold",
    fontSize: 11,
  },
  dateRange: {
    fontSize: 9,
    color: "#6B7280",
  },
  subText: {
    fontSize: 10,
    color: "#4B5563",
    marginBottom: 2,
  },
});

export const PDFMinimalTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, skills, education, experience, projects } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName || "Your Name"}</Text>
          {personalInfo.title && <Text style={styles.title}>{personalInfo.title}</Text>}
          <View style={styles.contactInfo}>
            {personalInfo.email && <Text style={styles.contactItem}>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text style={styles.contactItem}>{personalInfo.phone}</Text>}
            {personalInfo.location && <Text style={styles.contactItem}>{personalInfo.location}</Text>}
            {personalInfo.linkedin && <Text style={styles.contactItem}>{personalInfo.linkedin}</Text>}
            {personalInfo.github && <Text style={styles.contactItem}>{personalInfo.github}</Text>}
            {personalInfo.website && <Text style={styles.contactItem}>{personalInfo.website}</Text>}
          </View>
        </View>

        {/* Summary */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.text}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.badgeContainer}>
              {skills.map((skill) => (
                <Text key={skill} style={styles.badge}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.position}>{exp.position}</Text>
                  <Text style={styles.dateRange}>
                    {exp.startDate} - {exp.isCurrentJob ? "Present" : exp.endDate}
                  </Text>
                </View>
                <Text style={styles.subText}>{exp.company}</Text>
                {exp.description && <Text style={styles.text}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.position}>
                    {edu.degree}
                    {edu.field ? ` in ${edu.field}` : ""}
                  </Text>
                  <Text style={styles.dateRange}>{edu.startDate} - {edu.endDate}</Text>
                </View>
                <Text style={styles.subText}>{edu.institution}</Text>
                {edu.description && <Text style={styles.text}>{edu.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((project) => (
              <View key={project.id} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.position}>{project.title}</Text>
                  {project.link && (
                    <Text style={[styles.dateRange, { color: '#2563EB', textDecoration: 'underline' }]}>
                      View
                    </Text>
                  )}
                </View>
                {project.description && <Text style={styles.text}>{project.description}</Text>}
                {project.technologies.length > 0 && (
                  <View style={styles.badgeContainer}>
                    {project.technologies.map((tech) => (
                      <Text key={tech} style={styles.badge}>
                        {tech}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};
