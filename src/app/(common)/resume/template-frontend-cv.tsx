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
const LINK = '#1d4ed8';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/font/Roboto/roboto.ttf', fontWeight: 400 },
    { src: '/font/Roboto/static/Roboto-Bold.ttf', fontWeight: 700 },
    { src: '/font/Roboto/static/Roboto-Italic.ttf', fontStyle: 'italic' },
  ],
});

// Keep words whole instead of hyphenating them at line breaks.
Font.registerHyphenationCallback((word) => [word]);

const ICON_SIZE = 11;
const LIST_ICON = '/icons/darkArrow.png';

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 36,
    paddingVertical: 30,
    fontFamily: 'Roboto',
    fontSize: 11,
    color: '#2d2d2d',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    borderBottom: `1.5px solid ${ACCENT}`,
    paddingBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 700,
    color: ACCENT,
  },
  subtitle: {
    fontSize: 13,
    color: '#555',
    marginBottom: 7,
  },
  profileImage: {
    width: 70,
    height: 80,
    borderRadius: 4,
    objectFit: 'cover',
    border: '1px solid #d1d5db',
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
    marginBottom: 4,
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
    fontSize: 10.5,
    color: '#444',
  },
  contactLink: {
    fontSize: 10.5,
    color: LINK,
    textDecoration: 'underline',
  },
  section: {
    marginTop: 14,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: ACCENT,
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: 3,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bodyText: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#333',
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: ACCENT,
  },
  companyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 1,
  },
  companyName: {
    fontSize: 11,
    fontWeight: 400,
    color: '#444',
  },
  periodText: {
    fontSize: 10.5,
    color: '#666',
    fontWeight: 700,
  },
  muted: {
    fontSize: 10.5,
    color: '#666',
    marginBottom: 2,
  },
  projectBlock: {
    marginTop: 8,
  },
  projectTitle: {
    fontSize: 11.5,
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: 1,
  },
  projectDesc: {
    fontSize: 10.5,
    lineHeight: 1.45,
    color: '#444',
    marginBottom: 1,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 2.5,
    marginLeft: 6,
  },
  bulletIconBox: {
    width: 7,
    height: 7,
    marginRight: 6,
    marginTop: 3.5,
    flexShrink: 0,
  },
  bulletIcon: {
    width: 7,
    height: 7,
    objectFit: 'contain',
  },
  bulletText: {
    fontSize: 10.5,
    lineHeight: 1.45,
    color: '#333',
    flex: 1,
  },
  liveLink: {
    fontSize: 10,
    color: LINK,
    textDecoration: 'underline',
  },
  linkIcon: {
    width: 9,
    height: 9,
    marginRight: 4,
    marginTop: 1.5,
  },
  liveLinkItem: {
    flexDirection: 'row',
  },
  linkSeparator: {
    fontSize: 10,
    color: '#999',
    marginHorizontal: 5,
  },
  liveLinkRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 3,
  },
  techLine: {
    fontSize: 10,
    color: '#555',
    marginLeft: 6,
    marginTop: 1,
  },
  techLabel: {
    fontWeight: 700,
    color: ACCENT,
  },
  skillLine: {
    fontSize: 10.5,
    lineHeight: 1.6,
    color: '#333',
  },
  skillLabel: {
    fontWeight: 700,
    color: ACCENT,
  },
  eduLine: {
    fontSize: 10.5,
    color: '#444',
    marginBottom: 3,
    lineHeight: 1.4,
  },
  eduDegree: {
    fontWeight: 700,
    color: '#1a1a1a',
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

const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

const ProjectBlock = ({ project }: { project: FrontendCvData['projects'][number] }) => (
  <View style={styles.projectBlock} wrap={false}>
    <Text style={styles.projectTitle}>{project.title}</Text>
    <Text style={styles.projectDesc}>{project.description}</Text>
    <View style={styles.liveLinkRow}>
      <Image src="/images/resume/world.png" style={styles.linkIcon} />
      {[project.liveUrl].flat().map((url, j) => (
        <View key={url} style={styles.liveLinkItem}>
          {j > 0 && <Text style={styles.linkSeparator}>|</Text>}
          <Link src={url} style={styles.liveLink}>
            {displayUrl(url)}
          </Link>
        </View>
      ))}
    </View>
    {project.responsibilities.map((item) => (
      <Bullet key={item} text={item} />
    ))}
    <Text style={styles.techLine}>
      <Text style={styles.techLabel}>Tech: </Text>
      {project.tech.join(' · ')}
    </Text>
  </View>
);

export function FrontendCvDocument({ data }: { data: FrontendCvData }) {
  const d = data;

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.headerRow}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={styles.title}>{d.personal.name}</Text>
            <Text style={styles.subtitle}>{d.personal.title}</Text>

            <View style={styles.contactGrid}>
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
                  LinkedIn
                </Link>
              </ContactRow>
              <ContactRow icon="/images/resume/world.png">
                <Link src={d.contact.portfolioUrl} style={styles.contactLink}>
                  {displayUrl(d.contact.portfolioUrl)}
                </Link>
              </ContactRow>
            </View>
          </View>
          <Image src={d.profileImage} style={styles.profileImage} />
        </View>

        <Section title="Summary">
          <Text style={styles.bodyText}>{d.summary}</Text>
        </Section>

        <Section title="Skills">
          {d.skillGroups.map((group) => (
            <Text key={group.label} style={styles.skillLine}>
              <Text style={styles.skillLabel}>{group.label}: </Text>
              {group.items.join(', ')}
            </Text>
          ))}
        </Section>

        <Section title="Experience">
          {d.experiences.map((exp, i) => (
            <View key={exp.company} style={i > 0 ? { marginTop: 12 } : undefined}>
              <View style={styles.companyRow}>
                <Text style={styles.jobTitle}>
                  {exp.jobTitle} <Text style={styles.companyName}>— {exp.company}</Text>
                </Text>
                <Text style={styles.periodText}>{exp.period}</Text>
              </View>
              <Text style={styles.muted}>{exp.location}</Text>
              {exp.projects.map((project) => (
                <ProjectBlock key={project.id} project={project} />
              ))}
            </View>
          ))}
        </Section>

        <View wrap={false}>
          <Section title="Projects">
            {d.projects.map((project) => (
              <ProjectBlock key={project.id} project={project} />
            ))}
          </Section>
        </View>

        <Section title="Education">
          {d.education.map((edu) => (
            <View key={edu.id} style={[styles.companyRow, { alignItems: 'flex-start' }]}>
              <Text style={styles.eduLine}>
                <Text style={styles.eduDegree}>{edu.degree}</Text> — {edu.institution}
              </Text>
              <Text style={styles.periodText}>{edu.period}</Text>
            </View>
          ))}
        </Section>

        <Section title="Certifications">
          {d.certifications.map((cert) => (
            <Text key={cert.id} style={styles.eduLine}>
              <Text style={styles.eduDegree}>{cert.name}</Text> — {cert.issuer}
            </Text>
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
