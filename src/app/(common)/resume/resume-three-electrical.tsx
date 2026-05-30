/* eslint-disable jsx-a11y/alt-text */
'use client';

import {
  Document,
  Font,
  Image,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { electricalResumeData } from './electrical-resume-data';

const data = electricalResumeData;
const { personalInfo: pi } = data;

Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/font/Roboto/roboto.ttf', fontWeight: 400 },
    { src: '/font/Roboto/static/Roboto-Bold.ttf', fontWeight: 700 },
    { src: '/font/Roboto/static/Roboto-Italic.ttf', fontStyle: 'italic' },
  ],
});

const ICON_SIZE = 12;
const LIST_ICON_SIZE = 8;
const LIST_ICON = '/icons/darkArrow.png';
const UNIQUE_SKILLS = [...new Set(data.skills)];

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontFamily: 'Roboto',
    fontSize: 12,
    color: '#3e3e3e',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#2d2d2d',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: 500,
    color: '#555',
    marginBottom: 6,
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Roboto',
    fontWeight: 700,
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: 2,
    marginBottom: 4,
    color: '#2d2d2d',
  },
  text: {
    fontSize: 12,
    lineHeight: 1.25,
    fontFamily: 'Roboto',
  },
  muted: {
    fontSize: 12,
    lineHeight: 1.25,
    fontFamily: 'Roboto',
    color: '#555',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    objectFit: 'contain',
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: 4,
    objectFit: 'cover',
  },
  table: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableRowLast: {
    borderBottomWidth: 0,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableCell: {
    fontSize: 12,
    paddingVertical: 3,
    paddingHorizontal: 4,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: 700,
    paddingVertical: 3,
    paddingHorizontal: 4,
  },
  educationTableCell: {
    fontSize: 11,
    paddingVertical: 3,
    paddingHorizontal: 4,
  },
  educationTableCellHeader: {
    fontSize: 11,
    fontWeight: 700,
    paddingVertical: 3,
    paddingHorizontal: 4,
  },
  colDegree: { width: '22%' },
  colInstitution: { width: '24%' },
  colYear: { width: '8%' },
  colResult: { width: '10%' },
  colAchievement: { width: '36%' },
  colLanguage: { width: '28%' },
  colLangSkill: { width: '24%' },
  listItem: {
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 1,
  },
  itemDetail: {
    fontSize: 12,
    lineHeight: 1.25,
    color: '#444',
  },
  bulletList: {
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
    marginLeft:12
  },
  bulletIconBox: {
    width: LIST_ICON_SIZE,
    height: LIST_ICON_SIZE,
    marginRight: 4,
    marginTop: 2,
    flexShrink: 0,
  },
  bulletIcon: {
    width: LIST_ICON_SIZE,
    height: LIST_ICON_SIZE,
    objectFit: 'contain',
  },
  bulletText: {
    fontSize: 12,
    lineHeight: 1.25,
    color: '#444',
    flex: 1,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 7,
    marginRight: 5,
    marginBottom: 5,
  },
  skillBadgeText: {
    fontSize: 11,
    color: '#374151',
  },
  personalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  personalField: {
    width: '50%',
    flexDirection: 'row',
    marginBottom: 4,
    paddingRight: 6,
  },
  personalFieldFull: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 4,
  },
  personalLabel: {
    fontSize: 12,
    fontWeight: 700,
    width: '40%',
  },
  personalValue: {
    fontSize: 12,
    flex: 1,
  },
});

type EducationEntry = (typeof data.education)[number];
type TrainingEntry = (typeof data.training)[number];
type JobEntry = (typeof data.experience.jobs)[number];
type CertificationEntry = (typeof data.certifications)[number];

const formatDegree = (edu: EducationEntry) =>
  edu.major ? `${edu.degree} (${edu.major})` : edu.degree;

const formatResult = (edu: EducationEntry) => edu.cgpa ?? edu.gpa ?? '—';

const formatTrainingDetails = (training: TrainingEntry) => {
  const parts = [
    training.institute,
    training.topic,
    training.duration,
    training.location,
    training.year ? String(training.year) : null,
  ].filter(Boolean);
  return parts.join(' · ');
};

const formatJobMeta = (job: JobEntry) => {
  const location =
    job.location && !job.location.startsWith('http') ? job.location : null;
  return [job.duration, job.experience, location].filter(Boolean).join(' · ');
};

const formatCertification = (cert: CertificationEntry) =>
  [cert.institute, cert.year].filter(Boolean).join(' · ');

const formatDateOfBirth = (date: string) => {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const contactItems = [
  { icon: '/icons/location.png', value: pi.location },
  { icon: '/icons/phone.png', value: pi.phone },
  { icon: '/icons/message.png', value: pi.email },
];

const personalInfoFields = [
  { label: "Father's Name", value: data.personalDetails.fatherName },
  { label: "Mother's Name", value: data.personalDetails.motherName },
  {
    label: 'Date of Birth',
    value: formatDateOfBirth(data.personalDetails.dateOfBirth),
  },
  { label: 'Gender', value: data.personalDetails.gender },
  { label: 'Marital Status', value: data.personalDetails.maritalStatus },
  { label: 'Nationality', value: data.personalDetails.nationality },
  { label: 'Religion', value: data.personalDetails.religion },
  { label: 'Blood Group', value: data.personalDetails.bloodGroup },
  { label: 'Height', value: data.personalDetails.height },
  { label: 'Weight', value: data.personalDetails.weight },
  {
    label: 'Permanent Address',
    value: data.personalDetails.permanentAddress,
    fullWidth: true,
  },
  {
    label: 'Current Location',
    value: data.personalDetails.currentLocation,
    fullWidth: true,
  },
];

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

const TableRow = ({
  isLast,
  children,
}: {
  isLast: boolean;
  children: React.ReactNode;
}) => (
  <View style={[styles.tableRow, ...(isLast ? [styles.tableRowLast] : [])]}>
    {children}
  </View>
);

const ResumeThreeElectricalDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.headerRow}>
        <View style={{ flex: 1, paddingRight: 10 }}>
          <Text style={styles.title}>{pi.fullName}</Text>
          <Text style={styles.subtitle}>{pi.title}</Text>
          {contactItems.map((item) => (
            <View key={item.value} style={styles.contactItem}>
              <View style={styles.iconBox}>
                <Image src={item.icon} style={styles.icon} />
              </View>
              <Text style={styles.text}>{item.value}</Text>
            </View>
          ))}
        </View>
        <Image src={pi.profileImage} style={styles.profileImage} />
      </View>

      <Section title="Career Objective">
        <Text style={styles.text}>{pi.careerObjective}</Text>
      </Section>

      <Section title="Career Summary">
        <Text style={styles.text}>{pi.careerSummary}</Text>
        <Text style={[styles.muted, { marginTop: 3 }]}>
          {pi.specialQualification}
        </Text>
      </Section>

      <Section title="Education">
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.educationTableCellHeader, styles.colDegree]}>
              Degree
            </Text>
            <Text style={[styles.educationTableCellHeader, styles.colInstitution]}>
              Institution
            </Text>
            <Text style={[styles.educationTableCellHeader, styles.colYear]}>
              Year
            </Text>
            <Text style={[styles.educationTableCellHeader, styles.colResult]}>
              CGPA / GPA
            </Text>
            <Text style={[styles.educationTableCellHeader, styles.colAchievement]}>
              Achievement / Project
            </Text>
          </View>
          {data.education.map((edu, index) => (
            <TableRow
              key={`${edu.degree}-${edu.year}`}
              isLast={index === data.education.length - 1}
            >
              <Text style={[styles.educationTableCell, styles.colDegree]}>
                {formatDegree(edu)}
              </Text>
              <Text style={[styles.educationTableCell, styles.colInstitution]}>
                {edu.institution}
              </Text>
              <Text style={[styles.educationTableCell, styles.colYear]}>
                {String(edu.year)}
              </Text>
              <Text style={[styles.educationTableCell, styles.colResult]}>
                {formatResult(edu)}
              </Text>
              <Text style={[styles.educationTableCell, styles.colAchievement]}>
                {edu.achievement ?? '—'}
              </Text>
            </TableRow>
          ))}
        </View>
      </Section>

      <Section title="Work Experience">
        <Text style={styles.muted}>
          Total experience: {data.experience.totalExperience}
        </Text>
        {data.experience.jobs.map((job) => (
          <View
            key={`${job.position}-${job.company}-${job.duration}`}
            style={styles.listItem}
          >
            <Text style={styles.itemTitle}>
              {job.position} — {job.company}
            </Text>
            <Text style={styles.itemDetail}>{formatJobMeta(job)}</Text>
            {job.responsibilities?.length ? (
              <View style={styles.bulletList}>
                {job.responsibilities.map((item) => (
                  <View key={item} style={styles.bulletRow}>
                    <View style={styles.bulletIconBox}>
                      <Image src={LIST_ICON} style={styles.bulletIcon} />
                    </View>
                    <Text style={styles.bulletText}>{item}</Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        ))}
      </Section>
      <Section title="Training">
        {data.training.map((training) => (
          <View
            key={`${training.title}-${training.year}`}
            style={styles.listItem}
          >
            <Text style={styles.itemTitle}>{training.title}</Text>
            <Text style={styles.itemDetail}>
              {formatTrainingDetails(training)}
            </Text>
          </View>
        ))}
      </Section>

      <Section title="Certifications">
        {data.certifications.map((cert) => (
          <View key={cert.name} style={styles.listItem}>
            <Text style={styles.itemTitle}>{cert.name}</Text>
            <Text style={styles.itemDetail}>{formatCertification(cert)}</Text>
          </View>
        ))}
      </Section>

      <Section title="Skills">
        <View style={styles.skillsWrap}>
          {UNIQUE_SKILLS.map((skill) => (
            <View key={skill} style={styles.skillBadge}>
              <Text style={styles.skillBadgeText}>{skill}</Text>
            </View>
          ))}
        </View>
      </Section>
      <Section title="Languages">
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCellHeader, styles.colLanguage]}>
              Language
            </Text>
            <Text style={[styles.tableCellHeader, styles.colLangSkill]}>
              Reading
            </Text>
            <Text style={[styles.tableCellHeader, styles.colLangSkill]}>
              Writing
            </Text>
            <Text style={[styles.tableCellHeader, styles.colLangSkill]}>
              Speaking
            </Text>
          </View>
          {data.languages.map((lang, index) => (
            <TableRow
              key={lang.language}
              isLast={index === data.languages.length - 1}
            >
              <Text style={[styles.tableCell, styles.colLanguage]}>
                {lang.language}
              </Text>
              <Text style={[styles.tableCell, styles.colLangSkill]}>
                {lang.reading}
              </Text>
              <Text style={[styles.tableCell, styles.colLangSkill]}>
                {lang.writing}
              </Text>
              <Text style={[styles.tableCell, styles.colLangSkill]}>
                {lang.speaking}
              </Text>
            </TableRow>
          ))}
        </View>
      </Section>
      <Section title="Personal Information">
        <View style={styles.personalGrid}>
          {personalInfoFields.map((field) => (
            <View
              key={field.label}
              style={
                field.fullWidth ? styles.personalFieldFull : styles.personalField
              }
            >
              <Text style={styles.personalLabel}>{field.label}:</Text>
              <Text style={styles.personalValue}>{field.value}</Text>
            </View>
          ))}
        </View>
      </Section>
    </Page>

  
  </Document>
);

const ResumeThreeElectrical = () => (
  <PDFViewer width="100%" height="1000px">
    <ResumeThreeElectricalDocument />
  </PDFViewer>
);

export default ResumeThreeElectrical;
