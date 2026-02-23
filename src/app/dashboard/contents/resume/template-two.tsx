/* eslint-disable jsx-a11y/alt-text */
'use client';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Link,
  Font,
} from '@react-pdf/renderer';

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

const ACCENT = '#1e3a5f';
const BODY = '#2c2c2c';

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 32,
    paddingVertical: 22,
    fontFamily: 'Open Sans',
    backgroundColor: '#ffffff',
  },

  // ── HEADER
  name: {
    fontSize: 22,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#0d0d0d',
    letterSpacing: 0.3,
  },
  jobTitle: {
    fontSize: 10,
    fontFamily: 'Open Sans',
    fontWeight: 600,
    color: ACCENT,
    marginTop: 2,
  },
  locationText: {
    fontSize: 8,
    fontFamily: 'Open Sans',
    fontWeight: 400,
    color: '#555555',
    marginTop: 2,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
    marginBottom: 7,
    gap: 5,
    alignItems: 'center',
  },
  contactLink: {
    fontSize: 8,
    fontFamily: 'Open Sans',
    fontWeight: 400,
    color: ACCENT,
    textDecoration: 'none',
  },
  contactSep: {
    fontSize: 8,
    fontFamily: 'Open Sans',
    color: '#aaaaaa',
  },
  headerDivider: {
    borderBottom: `1.5px solid ${ACCENT}`,
    marginBottom: 8,
  },

  // ── SECTION
  sectionBlock: {
    marginBottom: 7,
  },
  sectionTitle: {
    fontSize: 9,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: ACCENT,
    borderBottom: '0.75px solid #b0b8c5',
    paddingBottom: 2,
    marginBottom: 5,
    letterSpacing: 0.7,
  },

  // ── BODY
  bodyText: {
    fontSize: 8.5,
    fontFamily: 'Open Sans',
    fontWeight: 400,
    color: BODY,
    lineHeight: 1.45,
    textAlign: 'justify',
  },

  // ── SKILLS
  skillRow: {
    flexDirection: 'row',
    marginBottom: 2.5,
    alignItems: 'flex-start',
  },
  skillLabel: {
    fontSize: 8.5,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#0d0d0d',
    width: 145,
    flexShrink: 0,
  },
  skillValue: {
    fontSize: 8.5,
    fontFamily: 'Open Sans',
    fontWeight: 400,
    color: BODY,
    flex: 1,
    lineHeight: 1.35,
  },

  // ── EXPERIENCE
  expBlock: {
    marginBottom: 5,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  companyName: {
    fontSize: 9.5,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#0d0d0d',
  },
  companyMeta: {
    fontSize: 8,
    fontFamily: 'Open Sans',
    fontWeight: 400,
    color: '#555555',
  },
  roleTitle: {
    fontSize: 8.5,
    fontFamily: 'Open Sans',
    fontWeight: 600,
    color: ACCENT,
    marginTop: 1,
    marginBottom: 3,
  },
  projectName: {
    fontSize: 8.5,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#0d0d0d',
    marginTop: 4,
    marginBottom: 1,
  },
  projectContext: {
    fontSize: 8,
    fontFamily: 'Open Sans',
    fontWeight: 400,
    color: '#666666',
    marginBottom: 1,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 1.5,
    paddingLeft: 4,
  },
  bulletDot: {
    fontSize: 9,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: ACCENT,
    marginRight: 5,
    marginTop: -0.5,
  },
  bulletText: {
    fontSize: 8.5,
    fontFamily: 'Open Sans',
    fontWeight: 400,
    color: BODY,
    flex: 1,
    lineHeight: 1.35,
  },

  // ── PROJECTS
  projectBlock: {
    marginBottom: 5,
  },
  projectTitleLink: {
    fontSize: 9,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: ACCENT,
    textDecoration: 'underline',
  },
  techText: {
    fontSize: 8,
    fontFamily: 'Open Sans',
    fontWeight: 400,
    color: '#666666',
    marginTop: 1,
    marginBottom: 2,
  },

  // ── EDUCATION
  degreeText: {
    fontSize: 9.5,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#0d0d0d',
  },
  instituteText: {
    fontSize: 8.5,
    fontFamily: 'Open Sans',
    fontWeight: 400,
    color: BODY,
    marginTop: 1,
  },
  metaText: {
    fontSize: 8,
    fontFamily: 'Open Sans',
    fontWeight: 400,
    color: '#555555',
    marginTop: 1,
  },

  // ── LANGUAGES
  langRow: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 2,
  },
  langItem: {
    fontSize: 8.5,
    fontFamily: 'Open Sans',
    fontWeight: 400,
    color: BODY,
  },
});

export const resumeDataTwo = {
  personalInfo: {
    fullName: 'Muhammad Shafayet Ullah',
    title: 'Mid-Level Backend Node.js Developer',
    location: 'Dhaka, Bangladesh',
    email: 'shafayetullah410@gmail.com',
    phone: '+8801620828305',
    linkedin: 'https://www.linkedin.com/in/shafayet-ullah-b5a484278',
    github: 'https://github.com/shafayetullah7',
  },
  professionalSummary:
    'Mid-Level Backend Developer with 3+ years of experience designing and delivering scalable B2B, ERP, and HRM systems using Node.js and Express.js. Proficient in RBAC, token-based and session-based authentication, and multi-payment gateway integration (bKash, Brac Bank, UCB). Hands-on expertise with PostgreSQL, MySQL, MongoDB, and Prisma ORM for production-grade data modeling and query optimization. Proven track record of architecting modular, maintainable backend systems suited for international remote engineering teams.',
  skills: {
    backend:
      'Node.js, Express.js, NestJS, TypeScript, REST API Design, RBAC Authorization, Authentication & Session Management, Payment Gateway Integration',
    database:
      'PostgreSQL, MySQL, MongoDB, Prisma ORM, Drizzle ORM, Query Optimization, Indexing',
    architectureConcepts:
      'Modular Architecture, Multi-Tenant Design, RBAC, API Performance Optimization, Scalable System Design',
    toolsDevOps: 'Git, GitHub, Docker, VPS Deployment, CI/CD',
  },
  workExperience: [
    {
      company: 'Fly Far International',
      location: 'Dhaka, Bangladesh',
      position: 'Back-end Developer (Express.js)',
      duration: 'Jun 2024 – Jul 2025',
      projects: [
        {
          name: 'B2B Travel Portal',
          context:
            'Multi-agency B2B platform for flight, hotel, and visa bookings.',
          highlights: [
            'Architected a hierarchical RBAC system with granular permission controls for agents, sub-agents, and administrators.',
            'Integrated bKash, Brac Bank, and UCB payment gateways, enabling secure multi-channel transaction processing.',
            'Engineered database-driven accounting and reporting modules, reducing manual financial reconciliation overhead.',
            'Optimized critical API endpoints through query indexing and logic refactoring, improving throughput under concurrent load.',
          ],
        },
        {
          name: 'Enterprise ERP System',
          context:
            'Internal ERP platform integrating with the B2B portal for unified operations.',
          highlights: [
            'Implemented multi-level permission and feature-flag modules scoping access for 10+ internal departments.',
            'Architected B2B portal–ERP integration layer, consolidating booking data into centralized financial and HR workflows.',
            'Designed a modular backend structure enabling independent deployment of ERP sub-systems without service disruption.',
          ],
        },
      ],
    },
    {
      company: 'Fly Far International',
      location: 'Dhaka, Bangladesh',
      position: 'Back-end Developer Trainee (Express.js & Node.js)',
      duration: 'Feb 2024 – Jun 2024',
      projects: [
        {
          name: 'HRM System',
          context:
            'Full-featured Human Resource Management system for enterprise workforce operations.',
          highlights: [
            'Built employee and admin management modules with profile lifecycle, document storage, and role assignment workflows.',
            'Implemented GPS-based location tracking for real-time attendance verification across remote and on-site staff.',
            'Developed leave, holiday, and multi-shift attendance modules supporting configurable organizational work schedules.',
            'Engineered a payroll engine calculating salary components, deductions, and overtime from attendance and policy rules.',
          ],
        },
      ],
    },
  ],
  selectedProjects: [
    {
      name: 'InternBD',
      duration: 'Nov 2023 – Dec 2023',
      description:
        'Internship management platform connecting students with industry opportunities.',
      tech: 'Node.js, Express.js, MySQL, Prisma ORM',
      link: 'https://internbd.com',
      highlights: [
        'Designed and implemented RESTful API architecture for internship listing, application, and student profile management.',
        'Built secure data operations with Prisma ORM, enforcing relational integrity across user–company–internship entities.',
        'Implemented role-based access control for students and companies, protecting scoped endpoints and data boundaries.',
      ],
    },
  ],
  education: {
    degree: 'B.Sc in Software Engineering',
    institution: 'Daffodil International University',
    duration: '2020 – 2024',
    location: 'Dhaka, Bangladesh',
  },
  languages: ['Bengali (Native)', 'English (Professional)'],
};

const Bullet = ({ text }: { text: string }) => (
  <View style={styles.bulletItem}>
    <Text style={styles.bulletDot}>•</Text>
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

const TemplateTwo = ({
  data = resumeDataTwo,
}: {
  data?: typeof resumeDataTwo;
}) => {
  const d = data;

  return (
    <div>
      <PDFViewer width="100%" height="1000px">
        <Document>
          <Page size="A4" style={styles.page}>
            {/* ── HEADER ── */}
            <View>
              <Text style={styles.name}>{d.personalInfo.fullName}</Text>
              <Text style={styles.jobTitle}>{d.personalInfo.title}</Text>
              <Text style={styles.locationText}>{d.personalInfo.location}</Text>
              <View style={styles.contactRow}>
                <Text style={styles.contactLink}>{d.personalInfo.phone}</Text>
                <Text style={styles.contactSep}>|</Text>
                <Link
                  src={`mailto:${d.personalInfo.email}`}
                  style={styles.contactLink}
                >
                  {d.personalInfo.email}
                </Link>
                <Text style={styles.contactSep}>|</Text>
                <Link src={d.personalInfo.github} style={styles.contactLink}>
                  GitHub
                </Link>
                <Text style={styles.contactSep}>|</Text>
                <Link src={d.personalInfo.linkedin} style={styles.contactLink}>
                  LinkedIn
                </Link>
              </View>
              <View style={styles.headerDivider} />
            </View>

            {/* ── PROFESSIONAL SUMMARY ── */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
              <Text style={styles.bodyText}>{d.professionalSummary}</Text>
            </View>

            {/* ── CORE TECHNICAL SKILLS ── */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>CORE TECHNICAL SKILLS</Text>
              <View style={styles.skillRow}>
                <Text style={styles.skillLabel}>Backend:</Text>
                <Text style={styles.skillValue}>{d.skills.backend}</Text>
              </View>
              <View style={styles.skillRow}>
                <Text style={styles.skillLabel}>Database:</Text>
                <Text style={styles.skillValue}>{d.skills.database}</Text>
              </View>
              <View style={styles.skillRow}>
                <Text style={styles.skillLabel}>Architecture & Concepts:</Text>
                <Text style={styles.skillValue}>
                  {d.skills.architectureConcepts}
                </Text>
              </View>
              <View style={styles.skillRow}>
                <Text style={styles.skillLabel}>Tools & DevOps:</Text>
                <Text style={styles.skillValue}>{d.skills.toolsDevOps}</Text>
              </View>
            </View>

            {/* ── PROFESSIONAL EXPERIENCE ── */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
              {d.workExperience.map((job, jobIdx) => (
                <View
                  key={jobIdx}
                  style={[styles.expBlock, jobIdx > 0 ? { marginTop: 6 } : {}]}
                >
                  <View style={styles.expHeaderRow}>
                    <View>
                      <Text style={styles.companyName}>
                        {job.company} — {job.location}
                      </Text>
                      <Text style={styles.roleTitle}>{job.position}</Text>
                    </View>
                    <Text style={styles.companyMeta}>{job.duration}</Text>
                  </View>
                  {job.projects.map((project, projIdx) => (
                    <View key={projIdx}>
                      <Text style={styles.projectName}>{project.name}</Text>
                      <Text style={styles.projectContext}>
                        {project.context}
                      </Text>
                      {project.highlights.map((h, hIdx) => (
                        <Bullet key={hIdx} text={h} />
                      ))}
                    </View>
                  ))}
                </View>
              ))}
            </View>

            {/* ── SELECTED PROJECTS ── */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>SELECTED PROJECTS</Text>
              {d.selectedProjects.map((project, idx) => (
                <View key={idx} style={styles.projectBlock}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Link src={project.link} style={styles.projectTitleLink}>
                      {project.name}
                    </Link>
                    <Text style={styles.companyMeta}>{project.duration}</Text>
                  </View>
                  <Text style={styles.techText}>
                    Tech Stack: {project.tech}
                  </Text>
                  <Text style={[styles.bodyText, { marginBottom: 2 }]}>
                    {project.description}
                  </Text>
                  {project.highlights.map((h, hIdx) => (
                    <Bullet key={hIdx} text={h} />
                  ))}
                </View>
              ))}
            </View>

            {/* ── EDUCATION ── */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>EDUCATION</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <View>
                  <Text style={styles.degreeText}>{d.education.degree}</Text>
                  <Text style={styles.instituteText}>
                    {d.education.institution}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.metaText}>{d.education.duration}</Text>
                  <Text style={styles.metaText}>{d.education.location}</Text>
                </View>
              </View>
            </View>

            {/* ── LANGUAGES ── */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>LANGUAGES</Text>
              <View style={styles.langRow}>
                {d.languages.map((lang, idx) => (
                  <Text key={idx} style={styles.langItem}>
                    {lang}
                  </Text>
                ))}
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default TemplateTwo;
