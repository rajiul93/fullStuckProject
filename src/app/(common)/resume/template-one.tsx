/* eslint-disable jsx-a11y/alt-text */
'use client';

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Link,
  Font,
} from '@react-pdf/renderer';

// Register fonts for React PDF
// Note: React PDF doesn't need window check - it handles font URLs directly
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: '/font/Roboto/roboto.ttf',
      fontWeight: 400,
    },
    {
      src: '/font/Roboto/static/Roboto-Bold.ttf',
      fontWeight: 700,
    },
    {
      src: '/font/Roboto/static/Roboto-Italic.ttf',
      fontStyle: 'italic',
    },
  ],
});

Font.register({
  family: 'Raleway',
  src: '/font/Raleway/Raleway-VariableFont_wght.ttf',
});

Font.register({
  family: 'Open Sans',
  fonts: [
    {
      src: '/font/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf',
      fontWeight: 400,
    },
    {
      src: '/font/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf',
      fontWeight: 500,
    },
    {
      src: '/font/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf',
      fontWeight: 600,
    },
    {
      src: '/font/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf',
      fontWeight: 700,
    },
  ],
});

// Spacing constants – consistent rhythm for alignment and single-page fit
const SPACING = {
  afterContact: 12,
  sectionTitlePadding: 3,
  sectionTitleMargin: 6,
  sectionContentTop: 6,
  blockGap: 8,
  lineGap: 3,
  listItemGap: 4,
  columnGap: 12,
  bottomSectionTop: 12,
  gridGap: 8,
} as const;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontFamily: 'Roboto',
  },
  headerBlock: {
    marginBottom: 0,
  },
  title: {
    fontSize: 22,
    marginBottom: 3,
    fontFamily: 'Roboto',
    color: '#3e3e3e',
  },
  subtitle: {
    fontSize: 11,
    marginBottom: 0,
    fontFamily: 'Open Sans',
    fontWeight: 700,
  },
  text: {
    fontSize: 9,
    fontFamily: 'Open Sans',
  },
  contactRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'nowrap',
    marginBottom: SPACING.afterContact,
    alignItems: 'center',
    marginTop: 6,
    justifyContent: 'space-between',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 9,
    height: 9,
    marginRight: 4,
  },
  contentWrapper: {
    flex: 1,
  },
  twoColumn: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 4,
    alignItems: 'flex-start',
  },
  mainColumn: {
    flex: 3,
    minWidth: 0,
  },
  sideColumn: {
    borderLeft: '1px solid #ccc',
    paddingLeft: 12,
    flex: 2,
    minWidth: 0,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: 700,
    borderBottom: '0.5px solid #ccc',
    paddingBottom: SPACING.sectionTitlePadding,
    marginBottom: SPACING.sectionTitleMargin,
    color: '#3e3e3e',
  },
  sectionContent: {
    marginTop: SPACING.sectionContentTop,
  },
  blockSpacing: {
    marginTop: SPACING.blockGap,
  },
  lineSpacing: {
    marginTop: SPACING.lineGap,
  },
  bodyText: {
    fontSize: 9,
    fontFamily: 'Open Sans',
    fontWeight: 500,
    lineHeight: 1.35,
    textAlign: 'justify',
    color: '#3e3e3e',
  },
  bodyTextBlue: {
    fontSize: 9,
    fontFamily: 'Open Sans',
    fontWeight: 700,
    color: 'blue',
  },
  degreeTitle: {
    fontSize: 11,
    fontFamily: 'Roboto',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: SPACING.lineGap,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: SPACING.listItemGap,
  },
  bulletDot: {
    width: 4,
    height: 4,
    backgroundColor: 'black',
    marginLeft: 5,
    marginTop: 5,
  },
  softSkillItem: {
    marginTop: SPACING.gridGap,
    borderBottom: '1px dashed #ccc',
    paddingBottom: 6,
  },
  softSkillItemLast: {
    marginTop: SPACING.gridGap,
  },
  linkRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 3,
    marginTop: 3,
  },
  personalProjectBlock: {
    marginTop: SPACING.blockGap,
  },
  featuresLabel: {
    fontSize: 9,
    fontFamily: 'Roboto',
    fontWeight: 700,
    marginBottom: 3,
    marginTop: 3,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 5,
    marginTop: 2,
  },
  techWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: SPACING.sectionContentTop,
  },
  bottomSection: {
    marginTop: SPACING.bottomSectionTop,
    paddingTop: SPACING.blockGap,
    borderTop: '0.5px solid #ccc',
    flexDirection: 'row',
    gap: SPACING.columnGap,
  },
  bottomBlock: {
    flex: 1,
  },
  bottomTitle: {
    fontSize: 11,
    fontFamily: 'Roboto',
    fontWeight: 700,
    marginBottom: 4,
  },
  bottomItem: {
    fontSize: 9,
    fontFamily: 'Roboto',
    marginTop: 2,
  },
});

import { resumeData } from './resume-data';
export { resumeData };

type ApiResume = {
  personal: (typeof resumeData)['personal'];
  contact: (typeof resumeData)['contact'];
  sectionLabels: (typeof resumeData)['sectionLabels'];
  summary: string;
  education: Array<{
    degree: string;
    institution: string;
    period: string;
    location: string;
  }>;
  experience: Array<{
    title: string;
    liveUrl: string;
    subTitle?: string;
    details: Array<{
      title?: string;
      description: string;
    }>;
  }>;
  additionalTraining: Array<(typeof resumeData)['additionalTraining']>;
  technologies: Array<{ title: string }>;
  softSkills: Array<{
    icon?: string;
    title: string;
    description: string;
  }>;
  personalProjects: Array<{
    title: string;
    subTitle: string;
    details: Array<{ description: string }>;
    liveUrl: string;
    gitFront: string;
    gitBackend: string;
  }>;
  languages: Array<{
    name: string;
    level: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
  }>;
};

export function adaptResumeData(apiResume: ApiResume): typeof resumeData {
  return {
    personal: apiResume.personal,
    contact: apiResume.contact,
    sectionLabels: apiResume.sectionLabels,
    summary: apiResume.summary,
    education: apiResume.education.map((edu, index) => ({
      id: index + 1,
      degree: edu.degree,
      institution: edu.institution,
      period: edu.period,
      location: edu.location,
    })),
    experience: {
      jobTitle: 'Professional Experience',
      company: '',
      period: '',
      location: '',
      projects: apiResume.experience.map((project, index) => ({
        id: index + 1,
        title: project.title,
        liveUrl: project.liveUrl,
        description:
          project.subTitle ||
          project.details.map((detail) => detail.description).join(' '),
        responsibilities: project.details.map((detail) =>
          detail.title
            ? `${detail.title}: ${detail.description}`
            : detail.description,
        ),
        tech: [],
      })),
    },
    additionalTraining:
      apiResume.additionalTraining[0] ??
      ({
        title: '',
        description: '',
      } as (typeof resumeData)['additionalTraining']),
    technologies: apiResume.technologies.map((tech) => tech.title),
    softSkills: apiResume.softSkills.map((skill, index) => ({
      id: index + 1,
      icon: skill.icon || '/images/resume/book.png',
      title: skill.title,
      description: skill.description,
      iconStyle: { width: 10, height: 10, marginRight: 3 },
    })),
    personalProjects: apiResume.personalProjects.map((project, index) => ({
      id: index + 1,
      title: project.title,
      duration: project.subTitle || '3 months',
      description:
        project.details[0]?.description || project.subTitle || project.title,
      features: project.details.map((detail) => detail.description),
      liveLink: project.liveUrl,
      frontendGit: project.gitFront,
      backendGit: project.gitBackend,
      tech: [],
    })),
    languages: apiResume.languages.map((item, index) => ({
      id: index + 1,
      name: item.name,
      level: item.level,
    })),
    certifications: apiResume.certifications.map((item, index) => ({
      id: index + 1,
      name: item.name,
      issuer: item.issuer,
    })),
  };
}

export function TemplateOneDocument({ data }: { data: typeof resumeData }) {
  const d = data;
  console.log(d.technologies);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBlock}>
          <Text style={styles.title}>{d.personal.name}</Text>
          <Text style={styles.subtitle}>{d.personal.title}</Text>
        </View>
        <View style={styles.contactRow}>
          <View style={styles.contactItem}>
            <Image src="/images/resume/phone.png" style={styles.icon} />
            <Text style={styles.text}>{d.contact.phone}</Text>
          </View>
          <Link
            style={{ color: 'black', textDecoration: 'none' }}
            src={`mailto:${d.contact.email}`}
          >
            <View style={styles.contactItem}>
              <Image src="/images/resume/gmail.png" style={styles.icon} />
              <Text style={styles.text}>{d.contact.email}</Text>
            </View>
          </Link>
          <Link
            style={{ color: 'black', textDecoration: 'none' }}
            src="https://github.com/rajiul-islam-rayhan"
          >
            <View style={styles.contactItem}>
              <Image
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                style={styles.icon}
              />
              <Text style={styles.text}>GitHub Profile</Text>
            </View>
          </Link>
          <Link
            style={{ color: 'black', textDecoration: 'none' }}
            src={d.contact.linkedInUrl}
          >
            <View style={styles.contactItem}>
              <Image src="/images/resume/in.png" style={styles.icon} />
              <Text style={styles.text}>{d.contact.linkedInLabel}</Text>
            </View>
          </Link>
          <Link
            style={{ color: 'black', textDecoration: 'none' }}
            src={d.contact.portfolioUrl}
          >
            <View style={styles.contactItem}>
              <Image src="/images/resume/world.png" style={styles.icon} />
              <Text style={styles.text}>{d.contact.portfolioLabel}</Text>
            </View>
          </Link>
          <View style={styles.contactItem}>
            <Image
              src="/images/resume/location.png"
              style={[styles.icon, { width: 8 }]}
            />
            <Text style={styles.text}>{d.contact.location}</Text>
          </View>
        </View>

        <View style={styles.twoColumn}>
          <View style={styles.mainColumn}>
            <View>
              <Text style={styles.sectionTitle}>{d.sectionLabels.summary}</Text>
              <Text style={[styles.bodyText, styles.sectionContent]}>
                {d.summary}
              </Text>
            </View>

            <View style={styles.blockSpacing}>
              <Text style={styles.sectionTitle}>
                {d.sectionLabels.education}
              </Text>
              {d.education.map((edu, idx) => (
                <View
                  key={edu.id}
                  style={[
                    styles.sectionContent,
                    ...(idx > 0 ? [styles.blockSpacing] : []),
                  ]}
                >
                  <Text style={styles.degreeTitle}>{edu.degree}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Image
                      src="/images/resume/education.png"
                      style={[styles.icon, { width: 14, marginBottom: -2 }]}
                    />
                    <Text style={[styles.lineSpacing, styles.bodyText]}>
                      {edu.institution}
                    </Text>
                  </View>
                  <View style={styles.metaRow}>
                    <Image
                      src="/images/resume/calender.jpg"
                      style={[styles.icon, { width: 12, marginRight: 3 }]}
                    />
                    <Text style={styles.bodyText}>{edu.period}</Text>
                    <Image
                      src="/images/resume/location-black.jpg"
                      style={[styles.icon, { width: 8, marginRight: 3 }]}
                    />
                    <Text style={styles.bodyText}>{edu.location}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.blockSpacing}>
              <Text style={styles.sectionTitle}>
                {d.sectionLabels.experience}
              </Text>
              <View style={styles.sectionContent}>
                <Text style={styles.degreeTitle}>{d.experience.jobTitle}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Image
                    src="/images/resume/briefcase.jpg"
                    style={{ width: 14, marginBottom: -2 }}
                  />
                  <Text style={[styles.lineSpacing, styles.bodyText]}>
                    {d.experience.company}
                  </Text>
                </View>
                <View style={styles.metaRow}>
                  <Image
                    src="/images/resume/calender.jpg"
                    style={[styles.icon, { width: 12, marginRight: 3 }]}
                  />
                  <Text style={styles.bodyText}>{d.experience.period}</Text>
                  <Image
                    src="/images/resume/location-black.jpg"
                    style={[styles.icon, { width: 8, marginRight: 3 }]}
                  />
                  <Text style={styles.bodyText}>{d.experience.location}</Text>
                </View>
              </View>
              {d.experience.projects.map((project, index) => (
                <View key={project.id} style={styles.blockSpacing}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <Text
                      style={[
                        styles.bodyText,
                        {
                          fontFamily: 'Roboto',
                          fontWeight: 700,
                          fontSize: 10,
                          flex: 1,
                        },
                      ]}
                    >
                      {d.sectionLabels.project}{' '}
                      {String(index + 1).padStart(2, '0')} - {project.title}
                    </Text>
                    <Link
                      src={project.liveUrl}
                      style={{
                        fontSize: 8,
                        fontFamily: 'Roboto',
                        fontWeight: 700,
                        color: '#1d4ed8',
                        textDecoration: 'none',
                        border: '1px solid #93c5fd',
                        backgroundColor: '#eff6ff',
                        borderRadius: 10,
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                      }}
                    >
                      Live
                    </Link>
                  </View>
                  <Text style={[styles.bodyText, { marginTop: 4 }]}>
                    {project.description}
                  </Text>
                  <View>
                    {project.responsibilities.map((resp, respIndex) => (
                      <View key={respIndex} style={styles.bulletItem}>
                        <View style={styles.bulletDot} />
                        <Text style={styles.bodyText}>{resp}</Text>
                      </View>
                    ))}
                  </View>
                  {project.tech && (
                    <View style={{ marginTop: 6 }}>
                      <Text
                        style={[
                          styles.bodyText,
                          {
                            fontFamily: 'Roboto',
                            fontWeight: 700,
                            fontSize: 9,
                          },
                        ]}
                      >
                        Tech Stack:
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: 4,
                          marginTop: 3,
                        }}
                      >
                        {project.tech.map((tech, techIndex) => (
                          <Text
                            key={techIndex}
                            style={[
                              styles.bodyText,
                              {
                                fontSize: 8,
                                paddingHorizontal: 6,
                                paddingVertical: 2,
                                backgroundColor: '#f0f0f0',
                                borderRadius: 3,
                              },
                            ]}
                          >
                            {tech}
                          </Text>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </View>

            <View style={styles.blockSpacing}>
              <Text style={styles.sectionTitle}>
                {d.sectionLabels.additionalTraining}
              </Text>
              <View style={styles.sectionContent}>
                <Text style={[styles.bodyTextBlue, styles.lineSpacing]}>
                  {d.additionalTraining.title}
                </Text>
                <Text style={[styles.bodyText, { marginTop: 4 }]}>
                  {d.additionalTraining.description}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.sideColumn}>
            <View>
              <Text style={styles.sectionTitle}>
                {d.sectionLabels.industrySkills}
              </Text>
              <View style={styles.techWrap}>
                {d.technologies.map((tech, index) => (
                  <Text
                    key={index}
                    style={[
                      styles.bodyText,
                      { borderBottom: '0.5px dashed #ccc' },
                    ]}
                  >
                    {tech}
                    {index < d.technologies.length - 1 ? ', ' : ''}
                  </Text>
                ))}
              </View>
            </View>

            <View>
              <Text
                style={{
                  ...styles.sectionTitle,
                  marginTop: SPACING.blockGap,
                }}
              >
                {d.sectionLabels.softSkills}
              </Text>
              {d.softSkills.map((skill, index) => (
                <View
                  key={skill.id}
                  style={
                    index < d.softSkills.length - 1
                      ? styles.softSkillItem
                      : styles.softSkillItemLast
                  }
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <Image
                      src={skill.icon}
                      style={[styles.icon, skill.iconStyle]}
                    />
                    <Text
                      style={[
                        styles.bodyText,
                        { fontFamily: 'Roboto', fontWeight: 700 },
                      ]}
                    >
                      {skill.title}
                    </Text>
                  </View>
                  <Text
                    style={[styles.bodyText, { marginLeft: 18, marginTop: 2 }]}
                  >
                    {skill.description}
                  </Text>
                </View>
              ))}
            </View>

            <View>
              <Text
                style={{
                  ...styles.sectionTitle,
                  marginTop: SPACING.blockGap,
                }}
              >
                {d.sectionLabels.personalProjects}
              </Text>
              {d.personalProjects.map((project) => (
                <View key={project.id} style={styles.personalProjectBlock}>
                  <Text
                    style={[
                      styles.bodyText,
                      {
                        fontFamily: 'Roboto',
                        fontWeight: 700,
                        fontSize: 10,
                      },
                    ]}
                  >
                    {project.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 1,
                    }}
                  >
                    <Text
                      style={[
                        styles.bodyText,
                        {
                          fontSize: 8,
                          color: 'gray',
                        },
                      ]}
                    >
                      {project.duration}
                    </Text>
                    <Link
                      src={project.liveLink}
                      style={{
                        fontSize: 8,
                        fontFamily: 'Roboto',
                        fontWeight: 700,
                        color: '#1d4ed8',
                        textDecoration: 'none',
                        border: '1px solid #93c5fd',
                        backgroundColor: '#eff6ff',
                        borderRadius: 10,
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                      }}
                    >
                      {d.sectionLabels.liveDemo}
                    </Link>
                  </View>
                  <Text style={[styles.bodyText, { marginTop: 2 }]}>
                    {project.description}
                  </Text>
                  <View>
                    <Text style={styles.featuresLabel}>
                      {d.sectionLabels.keyFeatures}
                    </Text>
                    {project.features.map((feature, index) => (
                      <View key={index} style={styles.featureItem}>
                        <Text style={[styles.bodyText, { marginRight: 4 }]}>
                          {d.sectionLabels.bullet}
                        </Text>
                        <Text
                          style={[styles.bodyText, { fontSize: 9, flex: 1 }]}
                        >
                          {feature}
                        </Text>
                      </View>
                    ))}
                  </View>
                  {project.tech && (
                    <View style={{ marginTop: 6 }}>
                      <Text
                        style={[
                          styles.bodyText,
                          {
                            fontFamily: 'Roboto',
                            fontWeight: 700,
                            fontSize: 9,
                          },
                        ]}
                      >
                        Tech Stack:
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: 4,
                          marginTop: 3,
                        }}
                      >
                        {project.tech.map((tech, techIndex) => (
                          <Text
                            key={techIndex}
                            style={[
                              styles.bodyText,
                              {
                                fontSize: 8,
                                paddingHorizontal: 6,
                                paddingVertical: 2,
                                backgroundColor: '#f0f0f0',
                                borderRadius: 3,
                              },
                            ]}
                          >
                            {tech}
                          </Text>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

const TemplateOne = ({ data = resumeData }: { data?: typeof resumeData }) => {
  const d = data;
  return (
    <div className="">
      <PDFViewer width="100%" height="1000px">
        <TemplateOneDocument data={d} />
      </PDFViewer>
    </div>
  );
};

export default TemplateOne;
