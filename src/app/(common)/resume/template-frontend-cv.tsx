/* eslint-disable jsx-a11y/alt-text */
'use client';

import {
  Document,
  Font,
  Image,
  Link,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { frontendCvData, type FrontendCvData } from './frontend-cv-data';

const ACCENT = '#0f2744';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/font/Roboto/roboto.ttf', fontWeight: 400 },
    { src: '/font/Roboto/static/Roboto-Bold.ttf', fontWeight: 700 },
    { src: '/font/Roboto/static/Roboto-Italic.ttf', fontStyle: 'italic' },
  ],
});

const ICON_SIZE = 10;
const LIST_ICON = '/icons/darkArrow.png';

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontFamily: 'Roboto',
    fontSize: 10,
    color: '#2d2d2d',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    borderBottom: '2px solid #c9a227',
    paddingBottom: 8,
  },
  cvLabel: {
    fontSize: 8,
    color: '#888',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: ACCENT,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: 500,
    color: '#555',
    marginBottom: 6,
  },
  profileImage: {
    width: 76,
    height: 88,
    borderRadius: 4,
    objectFit: 'cover',
    border: '2px solid #c9a227',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  iconBox: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginRight: 4,
    flexShrink: 0,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    objectFit: 'contain',
  },
  contactText: {
    fontSize: 9,
    color: '#444',
  },
  contactLink: {
    fontSize: 9,
    color: ACCENT,
    textDecoration: 'none',
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: ACCENT,
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: 2,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bodyText: {
    fontSize: 9.5,
    lineHeight: 1.35,
    color: '#333',
    textAlign: 'justify',
  },
  objectiveText: {
    fontSize: 9.5,
    lineHeight: 1.35,
    color: '#444',
    fontStyle: 'italic',
  },
  jobTitle: {
    fontSize: 10.5,
    fontWeight: 700,
    color: ACCENT,
    marginBottom: 2,
  },
  companyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  companyName: {
    fontSize: 9.5,
    fontWeight: 600,
    color: '#444',
  },
  periodText: {
    fontSize: 9,
    color: '#666',
    fontWeight: 600,
  },
  muted: {
    fontSize: 9,
    color: '#666',
    marginBottom: 4,
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#1a1a1a',
    marginTop: 4,
    marginBottom: 2,
  },
  projectDesc: {
    fontSize: 9,
    lineHeight: 1.3,
    color: '#444',
    marginBottom: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 2,
    marginLeft: 4,
  },
  bulletIconBox: {
    width: 7,
    height: 7,
    marginRight: 4,
    marginTop: 2,
    flexShrink: 0,
  },
  bulletIcon: {
    width: 7,
    height: 7,
    objectFit: 'contain',
  },
  bulletText: {
    fontSize: 9,
    lineHeight: 1.3,
    color: '#333',
    flex: 1,
  },
  liveLink: {
    fontSize: 8.5,
    color: ACCENT,
    textDecoration: 'none',
    marginBottom: 2,
  },
  techWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 2,
    marginBottom: 4,
  },
  techChip: {
    backgroundColor: '#eef2f7',
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginRight: 4,
    marginBottom: 3,
  },
  techChipText: {
    fontSize: 7.5,
    color: ACCENT,
    fontWeight: 600,
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 700,
    color: ACCENT,
  },
  eduMeta: {
    fontSize: 9,
    color: '#555',
    marginTop: 1,
  },
  eduBlock: {
    marginBottom: 5,
  },
  strengthRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  strengthDot: {
    fontSize: 8,
    color: '#c9a227',
    marginRight: 4,
    width: 8,
  },
  strengthText: {
    fontSize: 9,
    color: '#333',
    flex: 1,
    lineHeight: 1.25,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginRight: 4,
    marginBottom: 4,
  },
  skillBadgeText: {
    fontSize: 8,
    color: '#374151',
  },
  softSkillTitle: {
    fontSize: 9.5,
    fontWeight: 700,
    color: ACCENT,
    marginBottom: 1,
  },
  softSkillDesc: {
    fontSize: 9,
    color: '#555',
    lineHeight: 1.3,
    marginBottom: 4,
  },
  langItem: {
    fontSize: 9,
    marginBottom: 2,
  },
  certName: {
    fontSize: 9.5,
    fontWeight: 600,
    color: '#222',
  },
  certIssuer: {
    fontSize: 8.5,
    color: '#666',
    marginTop: 1,
    marginBottom: 4,
  },
});

const Bullet = ({ text }: { text: string }) => (
  <View style={styles.bulletRow}>
    <View style={styles.bulletIconBox}>
      <Image src={LIST_ICON} style={styles.bulletIcon} />
    </View>
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const ContactRow = ({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) => (
  <View style={styles.contactItem}>
    <View style={styles.iconBox}>
      <Image src={icon} style={styles.icon} />
    </View>
    {children}
  </View>
);

export function FrontendCvDocument({ data }: { data: FrontendCvData }) {
  const d = data;

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.headerRow}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={styles.cvLabel}>Curriculum Vitae</Text>
            <Text style={styles.title}>{d.personal.name}</Text>
            <Text style={styles.subtitle}>{d.personal.title}</Text>

            <ContactRow icon="/images/resume/phone.png">
              <Text style={styles.contactText}>{d.contact.phone}</Text>
            </ContactRow>
            <ContactRow icon="/images/resume/gmail.png">
              <Link src={`mailto:${d.contact.email}`} style={styles.contactLink}>
                {d.contact.email}
              </Link>
            </ContactRow>
            <ContactRow icon="/images/resume/location.png">
              <Text style={styles.contactText}>{d.contact.location}</Text>
            </ContactRow>
            <ContactRow icon="/images/resume/in.png">
              <Link src={d.contact.linkedInUrl} style={styles.contactLink}>
                LinkedIn Profile
              </Link>
            </ContactRow>
            <ContactRow icon="/images/resume/world.png">
              <Link src={d.contact.portfolioUrl} style={styles.contactLink}>
                Portfolio
              </Link>
            </ContactRow>
          </View>
          <Image src={d.profileImage} style={styles.profileImage} />
        </View>

        <Section title="Career Objective">
          <Text style={styles.objectiveText}>{d.careerObjective}</Text>
        </Section>

        <Section title="Professional Summary">
          <Text style={styles.bodyText}>{d.careerSummary}</Text>
        </Section>

        <Section title="Core Strengths">
          {d.coreStrengths.map((item) => (
            <View key={item} style={styles.strengthRow}>
              <Text style={styles.strengthDot}>◆</Text>
              <Text style={styles.strengthText}>{item}</Text>
            </View>
          ))}
        </Section>

        <Section title={d.sectionLabels.experience}>
          <Text style={styles.jobTitle}>{d.experience.jobTitle}</Text>
          <View style={styles.companyRow}>
            <Text style={styles.companyName}>{d.experience.company}</Text>
            <Text style={styles.periodText}>{d.experience.period}</Text>
          </View>
          <Text style={styles.muted}>{d.experience.location}</Text>

          {d.experience.projects.map((project) => (
            <View key={project.id}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text style={styles.projectDesc}>{project.description}</Text>
              <Link src={project.liveUrl} style={styles.liveLink}>
                {project.liveUrl}
              </Link>
              {project.responsibilities.map((item) => (
                <Bullet key={item} text={item} />
              ))}
              <View style={styles.techWrap}>
                {project.tech.map((t) => (
                  <View key={t} style={styles.techChip}>
                    <Text style={styles.techChipText}>{t}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </Section>

        <Section title={d.sectionLabels.education}>
          {d.education.map((edu) => (
            <View key={edu.id} style={styles.eduBlock}>
              <Text style={styles.eduDegree}>{edu.degree}</Text>
              <Text style={styles.eduMeta}>{edu.institution}</Text>
              <Text style={styles.eduMeta}>
                {edu.period} · {edu.location}
              </Text>
            </View>
          ))}
        </Section>

        <Section title={d.sectionLabels.additionalTraining}>
          <Text style={styles.jobTitle}>{d.additionalTraining.title}</Text>
          <Text style={styles.eduMeta}>{d.additionalTraining.description}</Text>
        </Section>

        {d.personalProjects.length > 0 && (
          <Section title={d.sectionLabels.personalProjects}>
            {d.personalProjects.map((project) => (
              <View key={project.id}>
                <Text style={styles.projectTitle}>
                  {project.title} — {project.duration}
                </Text>
                <Text style={styles.projectDesc}>{project.description}</Text>
                <Link src={project.liveLink} style={styles.liveLink}>
                  {project.liveLink}
                </Link>
                {project.features.map((feature) => (
                  <Bullet key={feature} text={feature} />
                ))}
                <View style={styles.techWrap}>
                  {project.tech.map((t) => (
                    <View key={t} style={styles.techChip}>
                      <Text style={styles.techChipText}>{t}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </Section>
        )}

        <Section title={d.sectionLabels.industrySkills}>
          <View style={styles.skillsWrap}>
            {d.technologies.map((tech) => (
              <View key={tech} style={styles.skillBadge}>
                <Text style={styles.skillBadgeText}>{tech}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title={d.sectionLabels.softSkills}>
          {d.softSkills.map((skill) => (
            <View key={skill.id}>
              <Text style={styles.softSkillTitle}>{skill.title}</Text>
              <Text style={styles.softSkillDesc}>{skill.description}</Text>
            </View>
          ))}
        </Section>

        <Section title={d.sectionLabels.languages}>
          {d.languages.map((lang) => (
            <Text key={lang.id} style={styles.langItem}>
              {lang.name} — {lang.level}
            </Text>
          ))}
        </Section>

        <Section title={d.sectionLabels.certifications}>
          {d.certifications.map((cert) => (
            <View key={cert.id}>
              <Text style={styles.certName}>{cert.name}</Text>
              <Text style={styles.certIssuer}>{cert.issuer}</Text>
            </View>
          ))}
        </Section>
      </Page>
    </Document>
  );
}

const TemplateFrontendCv = ({ data = frontendCvData }: { data?: FrontendCvData }) => (
  <div className="w-full min-h-[600px]">
    <PDFViewer width="100%" height="1000px">
      <FrontendCvDocument data={data} />
    </PDFViewer>
  </div>
);

export default TemplateFrontendCv;
