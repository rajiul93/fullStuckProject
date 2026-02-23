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
    { src: '/font/Roboto/roboto.ttf', fontWeight: 400 },
    { src: '/font/Roboto/static/Roboto-Bold.ttf', fontWeight: 700 },
    { src: '/font/Roboto/static/Roboto-Italic.ttf', fontStyle: 'italic' },
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
      fontWeight: 700,
    },
  ],
});

const S = StyleSheet.create({
  page: {
    paddingHorizontal: 28,
    paddingVertical: 22,
    fontFamily: 'Open Sans',
    backgroundColor: '#ffffff',
  },
  /* ── HEADER ── */
  headerName: {
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 10,
    fontFamily: 'Open Sans',
    fontWeight: 700,
    color: '#444444',
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  contactText: {
    fontSize: 8,
    fontFamily: 'Open Sans',
    color: '#333333',
  },
  contactLink: {
    fontSize: 8,
    fontFamily: 'Open Sans',
    color: '#0a66c2',
    textDecoration: 'none',
  },
  divider: {
    borderBottom: '1pt solid #cccccc',
    marginBottom: 6,
  },
  /* ── SECTION ── */
  sectionTitle: {
    fontSize: 9,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#1a1a1a',
    letterSpacing: 0.8,
    borderBottom: '0.5pt solid #aaaaaa',
    paddingBottom: 2,
    marginBottom: 4,
    marginTop: 8,
  },
  /* ── BODY TEXT ── */
  body: {
    fontSize: 8.5,
    fontFamily: 'Open Sans',
    fontWeight: 400,
    color: '#2e2e2e',
    lineHeight: 1.4,
  },
  bodyBold: {
    fontSize: 8.5,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#1a1a1a',
  },
  /* ── SKILLS ── */
  skillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 3,
  },
  skillLabel: {
    fontSize: 8.5,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#1a1a1a',
    marginRight: 4,
  },
  skillValue: {
    fontSize: 8.5,
    fontFamily: 'Open Sans',
    color: '#2e2e2e',
    flex: 1,
    flexWrap: 'wrap',
  },
  /* ── EXPERIENCE ── */
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 1,
  },
  expCompany: {
    fontSize: 9.5,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#1a1a1a',
  },
  expMeta: {
    fontSize: 8,
    fontFamily: 'Open Sans',
    color: '#555555',
  },
  expRole: {
    fontSize: 8.5,
    fontFamily: 'Open Sans',
    fontWeight: 700,
    color: '#333333',
    marginBottom: 3,
  },
  projectTitle: {
    fontSize: 8.5,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#1a1a1a',
    marginTop: 4,
    marginBottom: 1,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 2,
    paddingLeft: 8,
  },
  bulletDot: {
    fontSize: 8.5,
    fontFamily: 'Open Sans',
    color: '#444444',
    marginRight: 5,
    lineHeight: 1.4,
  },
  bulletText: {
    fontSize: 8.5,
    fontFamily: 'Open Sans',
    color: '#2e2e2e',
    lineHeight: 1.4,
    flex: 1,
  },
  /* ── PROJECTS ── */
  projectBlock: {
    marginTop: 5,
  },
  techStack: {
    fontSize: 8,
    fontFamily: 'Open Sans',
    color: '#555555',
    marginTop: 1,
    marginBottom: 2,
  },
  /* ── BOTTOM ROW ── */
  bottomRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 8,
    borderTop: '0.5pt solid #cccccc',
    paddingTop: 6,
  },
  bottomBlock: { flex: 1 },
});

const Bullet = ({ text }: { text: string }) => (
  <View style={S.bulletRow}>
    <Text style={S.bulletDot}>•</Text>
    <Text style={S.bulletText}>{text}</Text>
  </View>
);

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
    'Mid-Level Backend Developer with 3+ years of experience building scalable B2B, ERP, and HRM systems using Node.js and Express.js. Experienced in RBAC, authentication systems, payment gateway integration, and multi-tenant backend architecture. Strong knowledge of SQL and NoSQL databases with production-grade API development experience.',
  skills: {
    backend: [
      'Node.js',
      'Express.js',
      'NestJS',
      'TypeScript',
      'REST API Design',
      'RBAC Authorization',
      'Authentication & Session Management',
      'Payment Gateway Integration',
    ],
    database: [
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Prisma ORM',
      'Drizzle ORM',
      'Query Optimization',
      'Indexing',
    ],
    architecture: [
      'Multi-Tenant Architecture',
      'Modular Backend Design',
      'Role-Based Access Control',
      'RESTful API Design',
      'Scalable System Design',
    ],
    tools: ['Git', 'GitHub', 'Docker', 'VPS Deployment', 'CI/CD'],
    frontend: ['HTML5', 'CSS3', 'Tailwind CSS', 'React.js', 'Next.js'],
  },
  workExperience: [
    {
      company: 'Fly Far International',
      location: 'Dhaka, Bangladesh',
      position: 'Back-end Developer (Express.js)',
      duration: 'June 2024 – July 2025',
      projects: [
        {
          name: 'B2B Travel Portal',
          highlights: [
            'Designed and implemented a secure RBAC-based authentication system controlling multi-level user access across agencies and admin panels',
            'Integrated bKash, Brac Bank, and UCB payment gateways enabling real-time transaction processing for B2B travel bookings',
            'Developed statistical dashboard and CMS modules providing data-driven operational insights',
            'Architected database-driven operational modules to support dynamic pricing, inventory, and booking workflows',
            'Optimized critical API endpoints, reducing average response time and improving throughput for concurrent users',
          ],
        },
        {
          name: 'Enterprise ERP System',
          highlights: [
            'Implemented ERP user access and feature-flag modules enabling granular control over system capabilities per user role',
            'Integrated B2B portal access with the ERP system, enabling seamless cross-platform operations',
            'Designed multi-level permission and role-based control ensuring data isolation and policy enforcement',
            'Improved backend performance and established modular architecture to support scalable feature additions',
          ],
        },
      ],
    },
    {
      company: 'Fly Far International',
      location: 'Dhaka, Bangladesh',
      position: 'Back-end Developer Trainee (Express.js & Node.js)',
      duration: 'February 2024 – June 2024',
      projects: [
        {
          name: 'HRM System',
          highlights: [
            'Developed employee and admin management modules supporting full lifecycle HR operations',
            'Implemented location-based attendance tracking with multi-shift support for distributed workforce management',
            'Built leave and holiday management system with configurable approval workflows',
            'Designed and implemented salary and payroll system with automated computation and reporting',
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
        'Internship management platform connecting students with opportunities at companies across Bangladesh.',
      technologies: ['Node.js', 'Express.js', 'MySQL', 'Prisma ORM'],
      highlights: [
        'Architected RESTful backend API from the ground up with clean modular structure',
        'Developed internship listing and user management features with role-based access',
        'Implemented secure database operations with Prisma ORM and parameterized queries',
      ],
      link: 'https://internbd.com',
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

const TemplateTwoDoc = ({
  data = resumeDataTwo,
}: {
  data?: typeof resumeDataTwo;
}) => {
  const d = data;
  const p = d.personalInfo;

  return (
    <Document>
      <Page size="A4" style={S.page}>
        {/* ── HEADER ── */}
        <Text style={S.headerName}>{p.fullName}</Text>
        <Text style={S.headerTitle}>{p.title}</Text>
        <View style={S.contactRow}>
          <Text style={S.contactText}>{p.location}</Text>
          <Text style={S.contactText}>|</Text>
          <Link src={`mailto:${p.email}`} style={S.contactLink}>
            {p.email}
          </Link>
          <Text style={S.contactText}>|</Text>
          <Text style={S.contactText}>{p.phone}</Text>
          <Text style={S.contactText}>|</Text>
          <Link src={p.github} style={S.contactLink}>
            GitHub
          </Link>
          <Text style={S.contactText}>|</Text>
          <Link src={p.linkedin} style={S.contactLink}>
            LinkedIn
          </Link>
        </View>
        <View style={S.divider} />

        {/* ── PROFESSIONAL SUMMARY ── */}
        <Text style={S.sectionTitle}>PROFESSIONAL SUMMARY</Text>
        <Text style={S.body}>{d.professionalSummary}</Text>

        {/* ── CORE TECHNICAL SKILLS ── */}
        <Text style={S.sectionTitle}>CORE TECHNICAL SKILLS</Text>
        <View style={S.skillRow}>
          <Text style={S.skillLabel}>Backend:</Text>
          <Text style={S.skillValue}>{d.skills.backend.join(' • ')}</Text>
        </View>
        <View style={S.skillRow}>
          <Text style={S.skillLabel}>Database:</Text>
          <Text style={S.skillValue}>{d.skills.database.join(' • ')}</Text>
        </View>
        <View style={S.skillRow}>
          <Text style={S.skillLabel}>Architecture & Concepts:</Text>
          <Text style={S.skillValue}>{d.skills.architecture.join(' • ')}</Text>
        </View>
        <View style={S.skillRow}>
          <Text style={S.skillLabel}>Tools & DevOps:</Text>
          <Text style={S.skillValue}>{d.skills.tools.join(' • ')}</Text>
        </View>
        <View style={S.skillRow}>
          <Text style={S.skillLabel}>Frontend Familiarity:</Text>
          <Text style={S.skillValue}>{d.skills.frontend.join(' • ')}</Text>
        </View>

        {/* ── PROFESSIONAL EXPERIENCE ── */}
        <Text style={S.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
        {d.workExperience.map((exp, ei) => (
          <View key={ei} style={{ marginBottom: 6 }}>
            <View style={S.expHeader}>
              <Text style={S.expCompany}>
                {exp.company} — {exp.location}
              </Text>
              <Text style={S.expMeta}>{exp.duration}</Text>
            </View>
            <Text style={S.expRole}>{exp.position}</Text>
            {exp.projects.map((proj, pi) => (
              <View key={pi}>
                <Text style={S.projectTitle}>{proj.name}</Text>
                {proj.highlights.map((h, hi) => (
                  <Bullet key={hi} text={h} />
                ))}
              </View>
            ))}
          </View>
        ))}

        {/* ── SELECTED PROJECTS ── */}
        <Text style={S.sectionTitle}>SELECTED PROJECTS</Text>
        {d.selectedProjects.map((proj, pi) => (
          <View key={pi} style={S.projectBlock}>
            <View style={S.expHeader}>
              <Text style={S.bodyBold}>{proj.name}</Text>
              <Link src={proj.link} style={S.contactLink}>
                {proj.link}
              </Link>
            </View>
            <Text style={S.techStack}>
              Tech Stack: {proj.technologies.join(' • ')}
            </Text>
            <Text style={[S.body, { marginBottom: 2 }]}>{proj.description}</Text>
            {proj.highlights.map((h, hi) => (
              <Bullet key={hi} text={h} />
            ))}
          </View>
        ))}

        {/* ── BOTTOM ROW: EDUCATION + LANGUAGES ── */}
        <View style={S.bottomRow}>
          <View style={S.bottomBlock}>
            <Text style={S.sectionTitle}>EDUCATION</Text>
            <Text style={S.bodyBold}>{d.education.degree}</Text>
            <Text style={S.body}>{d.education.institution}</Text>
            <Text style={S.body}>
              {d.education.duration} | {d.education.location}
            </Text>
          </View>
          <View style={S.bottomBlock}>
            <Text style={S.sectionTitle}>LANGUAGES</Text>
            {d.languages.map((lang, li) => (
              <Text key={li} style={S.body}>
                {lang}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

const TemplateTwo = ({ data = resumeDataTwo }: { data?: typeof resumeDataTwo }) => (
  <div className="">
    <PDFViewer width="100%" height="1000px">
      <TemplateTwoDoc data={data} />
    </PDFViewer>
  </div>
);

export default TemplateTwo;
