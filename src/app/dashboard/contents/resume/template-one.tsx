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

// Fix the font path - it should be 'font' not 'fonts'
// Use relative paths to avoid window dependency
if (typeof window !== 'undefined') {
  Font.register({
    family: 'Roboto',
    src: `${window.location.origin}/font/Roboto/roboto.ttf`,
  });

  // Let's register multiple font weights for better typography
  Font.register({
    family: 'Roboto-Bold',
    src: `${window.location.origin}/font/Roboto/static/Roboto-Bold.ttf`,
  });

  Font.register({
    family: 'Roboto-Italic',
    src: `${window.location.origin}/font/Roboto/static/Roboto-Italic.ttf`,
  });
  Font.register({
    family: 'Raleway',
    src: `${window.location.origin}/font/Raleway/Raleway-VariableFont_wght.ttf`,
  });
  Font.register({
    family: 'Open Sans',
    src: `${window.location.origin}/font/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf`,
  });
  Font.register({
    family: 'Open Sans bold',
    src: `${window.location.origin}/font/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf`,
    fontWeight: 700,
  });
}

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
  },
  subtitle: {
    fontSize: 11,
    marginBottom: 0,
    fontFamily: 'Open Sans bold',
  },
  text: {
    fontSize: 9,
    fontFamily: 'Open Sans',
  },
  contactRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    marginBottom: SPACING.afterContact,
    alignItems: 'center',
    marginTop: 6,
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
    fontFamily: 'Roboto-Bold',
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
    color: '#3e3e3e',
  },
  bodyTextBlue: {
    fontSize: 9,
    fontFamily: 'Open Sans bold',
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
    fontFamily: 'Roboto-Bold',
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
    fontFamily: 'Roboto-Bold',
    marginBottom: 4,
  },
  bottomItem: {
    fontSize: 9,
    fontFamily: 'Roboto',
    marginTop: 2,
  },
});

/** Resume data – all text and content in one place. Replace or pass as props to make the template dynamic. */
export const resumeData = {
  personal: {
    name: 'Rajiul Islam',
    title: 'Front-End Developer',
  },
  contact: {
    phone: '+880 1986570093',
    email: 'developer.rajiul@gmail.com',
    linkedInUrl: 'https://linkedin.com/in/yourprofile',
    linkedInLabel: 'LinkedIn Profile',
    portfolioUrl: 'https://yourportfolio.com',
    portfolioLabel: 'Portfolio',
    location: 'Dhaka, Bangladesh',
  },
  sectionLabels: {
    summary: 'SUMMARY',
    education: 'EDUCATION',
    experience: 'EXPERIENCE',
    additionalTraining: 'ADDITIONAL TRAINING',
    industrySkills: 'SKILLS',
    softSkills: 'SOFT SKILLS',
    personalProjects: 'PERSONAL PROJECTS',
    keyFeatures: 'Key Features:',
    liveDemo: 'Live Demo',
    frontendGit: 'Frontend GitHub',
    backendGit: 'Backend GitHub',
    project: 'Project',
    languages: 'LANGUAGES',
    certifications: 'CERTIFICATIONS',
    bullet: '•',
  },
  summary:
    'Frontend Developer with 1+ year of experience building scalable web applications using React.js and Next.js. Skilled in TypeScript, Tailwind CSS, Tanstack Query, and state management (Redux/Zustand).',
  education: [
    {
      id: 1,
      degree: 'B.S.C EEE',
      institution: 'World University of Bangladesh',
      period: '2018 - 2022',
      location: 'Dhaka, Bangladesh',
    },
    // {
    //   id: 2,
    //   degree: 'DIPLOMA IN ELECTRICAL',
    //   institution: 'Mangrove Institute of Science and Technology',
    //   period: '2013 - 2017',
    //   location: 'KHULNA, Bangladesh',
    // },
  ],
  experience: {
    jobTitle: 'Junior Front-End Developer',
    company: 'Waditaslim tech',
    period: '2025 - Present',
    location: 'KHULNA, Bangladesh (Dubai Base)',
    projects: [
      {
        id: 1,
        title: 'Travel Booking Platform [OTA]',
        description:
          'A multi-provider online travel booking platform built with React.js and Next.js, featuring role-based dashboards, multi-payment integration, and advanced admin management. ',
        responsibilities: [
          'Integrated 3 OTA systems with separate UI inside a single application',
          'Built dynamic role-based user, agency, and admin dashboards',
          'Built accounts module with expense, invoice, supplier, and financial reports',
        ],
        tech: [
          'React.js',
          'Next.js',
          'TypeScript',
          'ShadCN UI',
          'zustand',
          'Tanstack Query',
        ],
      },
      {
        id: 2,
        title: 'Multi-Tenant SaaS Platform',
        description:
          'A scalable multi-tenant SaaS platform that allows users to create and manage portfolio or eCommerce websites with dynamic templates, domain integration, and secure tenant-based architecture.',
        responsibilities: [
          'Built a central dashboard for template selection and dynamic content customization.',
          'Developed multi-language support with portfolio and eCommerce templates.',
          'Managed authentication, authorization, and tenant isolation using proper middleware',
        ],
        tech: [
          'React.js',
          'Next.js',
          'TypeScript',
          'ShadCN UI',
          'zustand',
          'Tanstack Query',
        ],
      },
    ],
  },
  additionalTraining: {
    title: 'Programming Hero – Online Web Development Course',
    description: 'Front End Web Development – Level 1 & Level 2 (Completed)',
  },
  technologies: [
    'Next.js',
    'TypeScript',
    'ShadCN UI',
    'Redux Toolkit',
    'Zustand',
    'Tanstack Query',
    'Git & GitHub',
    'figma',
    'Framer Motion',
    'dayjs',
  ],
  softSkills: [
    {
      id: 1,
      icon: '/images/resume/book.png',
      title: 'Eager to Learn New Skills',
      description:
        'Continuously learning new technologies and best practices to improve code quality.',
      iconStyle: { width: 10, marginRight: 3 },
    },
    {
      id: 2,
      icon: '/images/resume/statistics.png',
      title: 'Not Afraid of Challenges',
      description:
        'Comfortable tackling complex problems and adapting to changing requirements.',
      iconStyle: { width: 10, marginRight: 3 },
    },
    {
      id: 3,
      icon: '/images/resume/clock.png',
      title: 'Time Management',
      description:
        'Able to prioritize tasks and meet deadlines in fast-paced environments.',
      iconStyle: { width: 10, height: 10, marginRight: 3 },
    },
    {
      id: 4,
      icon: '/images/resume/group.png',
      title: 'Team Collaboration',
      description:
        'Works well in cross-functional teams and communicates clearly with stakeholders.',
      iconStyle: { width: 10, height: 10, marginRight: 3 },
    },
  ],
  personalProjects: [
    {
      id: 1,
      title: 'E-Commerce Full Stack Application',
      duration: 'Jan 2024 - Mar 2024',
      description:
        'An e-commerce platform with product management, shopping cart, and payment integration.',
      features: [
        'User authentication and authorization',
        'Product catalog with search and filters',
        'Shopping cart and checkout process',
      ],
      liveLink: 'https://ecommerce-demo.vercel.app',
      frontendGit: 'https://github.com/username/ecommerce-frontend',
      backendGit: 'https://github.com/username/ecommerce-backend',
      tech: [
        'React.js',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Redux Toolkit',
        'Stripe',
        'REST APIs',
      ],
    },
    {
      id: 2,
      title: 'Task Management System',
      duration: 'Apr 2024 - May 2024',
      description:
        'A collaborative task management app with real-time updates and team collaboration.',
      features: [
        'Real-time task updates with Socket.io',
        'Drag and drop task boards',
        'Team collaboration and assignments',
      ],
      liveLink: 'https://task-manager-demo.vercel.app',
      frontendGit: 'https://github.com/username/task-manager-frontend',
      backendGit: 'https://github.com/username/task-manager-backend',
      tech: [
        'React.js',
        'Next.js',
        'TypeScript',
        'Socket.io',
        'Zustand',
        'Tailwind CSS',
        'REST APIs',
      ],
    },
  ],
  languages: [
    { id: 1, name: 'Bengali', level: 'Native' },
    { id: 2, name: 'English', level: 'Fluent' },
  ],
  certifications: [
    {
      id: 1,
      name: 'Front End Web Development – Level 1 & 2',
      issuer: 'Programming Hero',
    },
    { id: 2, name: 'Responsive Web Design', issuer: 'freeCodeCamp' },
  ],
};

const TemplateOne = ({ data = resumeData }: { data?: typeof resumeData }) => {
  const d = data;

  return (
    <div className="">
      <PDFViewer width="100%" height="1000px">
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
                  <Text style={styles.sectionTitle}>
                    {d.sectionLabels.summary}
                  </Text>
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
                    <Text style={styles.degreeTitle}>
                      {d.experience.jobTitle}
                    </Text>
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
                      <Text style={styles.bodyText}>
                        {d.experience.location}
                      </Text>
                    </View>
                  </View>
                  {d.experience.projects.map((project, index) => (
                    <View key={project.id} style={styles.blockSpacing}>
                      <Text
                        style={[
                          styles.bodyText,
                          { fontFamily: 'Roboto-Bold', fontSize: 10 },
                        ]}
                      >
                        {d.sectionLabels.project}{' '}
                        {String(index + 1).padStart(2, '0')} - {project.title}
                      </Text>
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
                              { fontFamily: 'Roboto-Bold', fontSize: 9 },
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
                            { fontFamily: 'Roboto-Bold' },
                          ]}
                        >
                          {skill.title}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.bodyText,
                          { marginLeft: 18, marginTop: 2 },
                        ]}
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
                          { fontFamily: 'Roboto-Bold', fontSize: 10 },
                        ]}
                      >
                        {project.title}
                      </Text>
                      <Text
                        style={[
                          styles.bodyText,
                          {
                            fontSize: 8,
                            color: 'gray',
                            marginTop: 1,
                          },
                        ]}
                      >
                        {project.duration}
                      </Text>
                      <View style={styles.linkRow}>
                        <Link
                          src={project.liveLink}
                          style={{
                            fontSize: 9,
                            fontFamily: 'Roboto',
                            color: 'blue',
                            textDecoration: 'underline',
                          }}
                        >
                          {d.sectionLabels.liveDemo}
                        </Link>
                        <Link
                          src={project.frontendGit}
                          style={{
                            fontSize: 9,
                            fontFamily: 'Roboto',
                            color: 'blue',
                            textDecoration: 'underline',
                          }}
                        >
                          {d.sectionLabels.frontendGit}
                        </Link>
                        <Link
                          src={project.backendGit}
                          style={{
                            fontSize: 9,
                            fontFamily: 'Roboto',
                            color: 'blue',
                            textDecoration: 'underline',
                          }}
                        >
                          {d.sectionLabels.backendGit}
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
                              style={[
                                styles.bodyText,
                                { fontSize: 9, flex: 1 },
                              ]}
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
                              { fontFamily: 'Roboto-Bold', fontSize: 9 },
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
      </PDFViewer>
    </div>
  );
};

export default TemplateOne;
