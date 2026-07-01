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
import { mahmudulCvData, type MahmudulCvData } from './mahmudul-cv-data';

const HEADER = '#1e3a5f';
const BODY = '#333333';
const BORDER = '#cccccc';
const BG = '#ffffff';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/font/Roboto/roboto.ttf', fontWeight: 400 },
    { src: '/font/Roboto/static/Roboto-Bold.ttf', fontWeight: 700 },
    { src: '/font/Roboto/static/Roboto-Italic.ttf', fontStyle: 'italic' },
  ],
});

const ICON_SIZE = 11;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 32,
    paddingVertical: 24,
    fontFamily: 'Roboto',
    fontSize: 9.5,
    backgroundColor: BG,
  },
  cvTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: HEADER,
    marginBottom: 6,
  },
  titleRule: {
    borderBottom: `1px solid ${BORDER}`,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  profileImage: {
    width: 76,
    height: 88,
    borderRadius: 2,
    objectFit: 'cover',
    marginRight: 14,
    flexShrink: 0,
  },
  headerInfo: {
    flex: 1,
    paddingTop: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: 700,
    color: HEADER,
    marginBottom: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconBox: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginRight: 5,
    flexShrink: 0,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    objectFit: 'contain',
  },
  contactText: {
    fontSize: 9.5,
    color: BODY,
  },
  contactLink: {
    fontSize: 9.5,
    color: BODY,
    textDecoration: 'none',
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontWeight: 700,
    color: HEADER,
    marginBottom: 5,
  },
  bodyText: {
    fontSize: 9.5,
    lineHeight: 1.4,
    color: BODY,
    textAlign: 'justify',
  },
  eduBlock: {
    marginBottom: 6,
  },
  eduDegree: {
    fontSize: 9.5,
    fontWeight: 700,
    color: '#222222',
    marginBottom: 2,
  },
  eduDetail: {
    fontSize: 9,
    lineHeight: 1.35,
    color: BODY,
    marginLeft: 8,
    marginBottom: 1,
  },
  jobCompany: {
    fontSize: 10,
    fontWeight: 700,
    color: HEADER,
    marginBottom: 3,
  },
  jobRole: {
    fontSize: 9.5,
    fontWeight: 700,
    color: '#222222',
    marginBottom: 1,
  },
  jobMeta: {
    fontSize: 9,
    color: BODY,
    marginBottom: 2,
  },
  subTitle: {
    fontSize: 9.5,
    fontWeight: 700,
    color: HEADER,
    marginTop: 4,
    marginBottom: 3,
  },
  numberedRow: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingLeft: 2,
  },
  number: {
    fontSize: 9,
    color: HEADER,
    width: 14,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingLeft: 2,
  },
  bullet: {
    fontSize: 9,
    color: HEADER,
    marginRight: 5,
    width: 8,
  },
  rowText: {
    fontSize: 9,
    lineHeight: 1.35,
    color: BODY,
    flex: 1,
  },
  bioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bioField: {
    width: '50%',
    flexDirection: 'row',
    marginBottom: 3,
    paddingRight: 6,
  },
  bioFieldFull: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 3,
  },
  bioLabel: {
    fontSize: 9,
    fontWeight: 700,
    color: HEADER,
    marginRight: 4,
  },
  bioValue: {
    fontSize: 9,
    color: BODY,
    flex: 1,
  },
  refBlock: {
    marginBottom: 6,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 700,
    color: '#222222',
    marginBottom: 1,
  },
  refDetail: {
    fontSize: 9,
    lineHeight: 1.35,
    color: BODY,
  },
  declaration: {
    fontSize: 9,
    lineHeight: 1.4,
    color: BODY,
    fontStyle: 'italic',
    marginTop: 8,
  },
  signature: {
    fontSize: 10,
    fontWeight: 700,
    color: HEADER,
    marginTop: 12,
  },
  hobbiesText: {
    fontSize: 9.5,
    color: BODY,
  },
});

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

const Bullet = ({ text }: { text: string }) => (
  <View style={styles.bulletRow}>
    <Text style={styles.bullet}>•</Text>
    <Text style={styles.rowText}>{text}</Text>
  </View>
);

const Numbered = ({ index, text }: { index: number; text: string }) => (
  <View style={styles.numberedRow}>
    <Text style={styles.number}>{index}.</Text>
    <Text style={styles.rowText}>{text}</Text>
  </View>
);

export function MahmudulCvDocument({ data }: { data: MahmudulCvData }) {
  const d = data;

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <Text style={styles.cvTitle}>Curriculum Vitae</Text>
        <View style={styles.titleRule} />

        <View style={styles.headerRow}>
          <Image src={d.profileImage} style={styles.profileImage} />
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{d.personal.name}</Text>
            <View style={styles.contactItem}>
              <View style={styles.iconBox}>
                <Image src="/images/resume/phone.png" style={styles.icon} />
              </View>
              <Text style={styles.contactText}>Mobile: {d.contact.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <View style={styles.iconBox}>
                <Image src="/images/resume/gmail.png" style={styles.icon} />
              </View>
              <Link
                src={`mailto:${d.contact.email}`}
                style={styles.contactLink}
              >
                Email: {d.contact.email}
              </Link>
            </View>
          </View>
        </View>

        <Section title="Career Objective">
          <Text style={styles.bodyText}>{d.careerObjective}</Text>
        </Section>

        <Section title="Academic Qualifications">
          {d.academicQualifications.map((edu) => (
            <View key={edu.id} style={styles.eduBlock}>
              <Text style={styles.eduDegree}>{edu.degree}</Text>
              {edu.details.map((line) => (
                <Text key={line} style={styles.eduDetail}>
                  • {line}
                </Text>
              ))}
            </View>
          ))}
        </Section>

        <Section title="Work Experience">
          <Text style={styles.jobCompany}>{d.experience.company}</Text>
          {d.experience.roles.map((role) => (
            <View key={role.id}>
              <Text style={styles.jobRole}>
                {role.position} ({role.duration})
              </Text>
            </View>
          ))}
          <Text style={styles.jobMeta}>Address: {d.experience.address}</Text>
          <Text style={styles.subTitle}>Key Responsibilities:</Text>
          {d.experience.responsibilities.map((item, index) => (
            <Numbered key={item} index={index + 1} text={item} />
          ))}
        </Section>

        <Section title="Self Analysis">
          {d.selfAnalysis.map((item) => (
            <Bullet key={item} text={item} />
          ))}
        </Section>

        <Section title="English Proficiency Test">
          {d.englishProficiency.map((test) => (
            <Bullet key={test.id} text={`${test.name} ${test.score}`} />
          ))}
        </Section>

        <Section title="Hobbies">
          <Text style={styles.hobbiesText}>{d.hobbies.join(', ')}</Text>
        </Section>

        <Section title="References">
          {d.references.map((ref) => (
            <View key={ref.id} style={styles.refBlock}>
              <Text style={styles.refName}>{ref.name}</Text>
              <Text style={styles.refDetail}>{ref.designation}</Text>
              <Text style={styles.refDetail}>{ref.organization}</Text>
              {'mobile' in ref && ref.mobile ? (
                <Text style={styles.refDetail}>Mobile: {ref.mobile}</Text>
              ) : null}
              {ref.email ? (
                <Text style={styles.refDetail}>Email: {ref.email}</Text>
              ) : null}
              {ref.contact ? (
                <Text style={styles.refDetail}>Contact: {ref.contact}</Text>
              ) : null}
            </View>
          ))}
        </Section>

        <Text style={styles.declaration}>{d.declaration}</Text>
        <Text style={styles.signature}>Sincerely,</Text>
        <Text style={styles.signature}>{d.signature}</Text>
      </Page>
    </Document>
  );
}

const TemplateMahmudulCv = ({
  data = mahmudulCvData,
}: {
  data?: MahmudulCvData;
}) => (
  <div className="w-full min-h-[600px]">
    <PDFViewer width="100%" height="1000px">
      <MahmudulCvDocument data={data} />
    </PDFViewer>
  </div>
);

export default TemplateMahmudulCv;
