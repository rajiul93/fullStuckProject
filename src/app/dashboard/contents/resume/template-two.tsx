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
      fontWeight: 600,
    },
    {
      src: '/font/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf',
      fontWeight: 700,
    },
  ],
});

const ACCENT = '#1a56db';

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    fontFamily: 'Roboto',
  },
  header: {
    backgroundColor: ACCENT,
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 14,
  },
  headerName: {
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 11,
    fontFamily: 'Open Sans',
    fontWeight: 600,
    color: '#d1e3ff',
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  contactIcon: {
    width: 9,
    height: 9,
  },
  contactText: {
    fontSize: 8,
    fontFamily: 'Open Sans',
    fontWeight: 400,
    color: '#e8f0fe',
  },
  body: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 0,
  },
  mainColumn: {
    flex: 3,
    paddingLeft: 22,
    paddingRight: 14,
    paddingTop: 14,
    paddingBottom: 14,
  },
  sideColumn: {
    flex: 2,
    backgroundColor: '#f4f7ff',
    paddingLeft: 14,
    paddingRight: 16,
    paddingTop: 14,
    paddingBottom: 14,
    borderLeft: '1px solid #d1dce8',
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: ACCENT,
    textTransform: 'uppercase',
    borderBottom: `1px solid ${ACCENT}`,
    paddingBottom: 2,
    marginBottom: 6,
  },
  bodyText: {
    fontSize: 9,
    fontFamily: 'Open Sans',
    fontWeight: 400,
    lineHeight: 1.4,
    color: '#2d2d2d',
  },
  boldText: {
    fontSize: 9,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#2d2d2d',
  },
  block: {
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
    marginBottom: 2,
  },
  smallIcon: {
    width: 9,
    height: 9,
  },
  metaText: {
    fontSize: 8,
    fontFamily: 'Open Sans',
    color: '#555',
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
    marginTop: 3,
  },
  bulletDot: {
    width: 4,
    height: 4,
    backgroundColor: ACCENT,
    marginTop: 4,
    marginLeft: 3,
    borderRadius: 2,
  },
  techWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 4,
  },
  techTag: {
    fontSize: 8,
    fontFamily: 'Open Sans',
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: '#e4ecff',
    color: ACCENT,
    borderRadius: 3,
  },
  linkText: {
    fontSize: 8,
    fontFamily: 'Open Sans',
    color: ACCENT,
    textDecoration: 'underline',
  },
  sideSectionTitle: {
    fontSize: 10,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: ACCENT,
    textTransform: 'uppercase',
    borderBottom: `1px solid ${ACCENT}`,
    paddingBottom: 2,
    marginBottom: 6,
  },
  skillTag: {
    fontSize: 8,
    fontFamily: 'Open Sans',
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: '#dce8ff',
    color: '#1a3a6e',
    borderRadius: 3,
    marginTop: 3,
  },
  sideBlock: {
    marginBottom: 10,
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 3,
  },
});

export const resumeDataTwo = {
  personal: {
    name: 'Rajiul Islam',
    title: 'Mid-Level Backend Node.js Developer',
  },
  contact: {
    phone: '+880 1986570093',
    email: 'developer.rajiul@gmail.com',
    linkedInUrl: 'https://linkedin.com/in/yourprofile',
    linkedInLabel: 'LinkedIn Profile',
    portfolioUrl: 'https://yourportfolio.com',
    portfolioLabel: 'Portfolio',
    location: 'Dhaka, Bangladesh',
    githubUrl: 'https://github.com/rajiul93',
    githubLabel: 'github.com/rajiul93',
  },
  summary:
    'Mid-Level Backend Developer with 2+ years of experience building scalable RESTful APIs and microservices using Node.js, Express.js, and TypeScript. Proficient in relational and non-relational databases (PostgreSQL, MySQL, MongoDB) and ORM tools (Prisma). Experienced with Docker-based deployments and CI/CD workflows. Passionate about clean architecture, performance optimization, and delivering robust server-side solutions.',
  experience: [
    {
      id: 1,
      jobTitle: 'Backend Node.js Developer',
      company: 'Waditaslim Tech',
      period: '2024 – Present',
      location: 'Dhaka, Bangladesh (Remote)',
      projects: [
        {
          id: 1,
          title: 'Travel Booking Platform [OTA] – Backend',
          description:
            'Designed and built RESTful APIs for a multi-provider OTA platform handling bookings, payments, and reporting.',
          responsibilities: [
            'Developed REST APIs for flight, hotel, and package booking flows',
            'Integrated multiple OTA provider APIs with unified data normalization',
            'Implemented role-based access control (RBAC) for admin, agency, and user roles',
            'Built financial reporting endpoints with pagination and filtering',
          ],
          tech: [
            'Node.js',
            'Express.js',
            'TypeScript',
            'PostgreSQL',
            'Prisma ORM',
            'JWT',
            'Docker',
          ],
        },
        {
          id: 2,
          title: 'Multi-Tenant SaaS Platform – Backend',
          description:
            'Built the server-side architecture for a scalable multi-tenant SaaS enabling portfolio and eCommerce site generation.',
          responsibilities: [
            'Designed multi-tenant database schema with tenant isolation via Prisma',
            'Built authentication & authorization middleware with JWT and refresh tokens',
            'Created dynamic template and domain management APIs',
          ],
          tech: [
            'Node.js',
            'Express.js',
            'TypeScript',
            'MongoDB',
            'Mongoose',
            'Docker',
            'GitHub Actions',
          ],
        },
      ],
    },
  ],
  education: [
    {
      id: 1,
      degree: 'B.Sc. in Electrical & Electronic Engineering',
      institution: 'World University of Bangladesh',
      period: '2018 – 2022',
      location: 'Dhaka, Bangladesh',
    },
  ],
  additionalTraining: [
    {
      title: 'Programming Hero – Complete Web Development Course',
      description: 'Backend specialization including Node.js, Express, MongoDB, and PostgreSQL (Completed)',
    },
  ],
  skills: {
    backend: [
      'Node.js',
      'Express.js',
      'TypeScript',
      'REST API',
      'GraphQL',
      'WebSocket',
    ],
    databases: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
    orm: ['Prisma ORM', 'Mongoose', 'TypeORM'],
    devOps: ['Docker', 'GitHub Actions', 'CI/CD', 'Linux'],
    tools: ['Git', 'GitHub', 'Postman', 'VS Code'],
  },
  personalProjects: [
    {
      id: 1,
      title: 'E-Commerce REST API',
      duration: 'Jan 2024 – Mar 2024',
      description:
        'Fully featured e-commerce backend with product management, cart, orders, and Stripe payment integration.',
      features: [
        'JWT authentication with refresh token rotation',
        'Product catalog with search, filter, and pagination',
        'Stripe webhook-based order fulfillment',
      ],
      liveLink: 'https://api.ecommerce-demo.com',
      githubLink: 'https://github.com/rajiul93/ecommerce-api',
      tech: ['Node.js', 'Express.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe'],
    },
    {
      id: 2,
      title: 'Real-Time Chat Service',
      duration: 'Apr 2024 – May 2024',
      description:
        'Scalable real-time chat backend using Socket.io with room management and message persistence.',
      features: [
        'WebSocket rooms with Socket.io',
        'Message history stored in MongoDB',
        'Online presence and typing indicators',
      ],
      liveLink: 'https://chat-demo.vercel.app',
      githubLink: 'https://github.com/rajiul93/chat-service',
      tech: ['Node.js', 'Socket.io', 'MongoDB', 'Mongoose', 'TypeScript', 'Redis'],
    },
  ],
  languages: [
    { id: 1, name: 'Bengali', level: 'Native' },
    { id: 2, name: 'English', level: 'Professional' },
  ],
  certifications: [
    { id: 1, name: 'Complete Web Dev – Backend Track', issuer: 'Programming Hero' },
    { id: 2, name: 'Node.js API Development', issuer: 'Udemy' },
  ],
};

const TemplateTwo = ({ data = resumeDataTwo }: { data?: typeof resumeDataTwo }) => {
  const d = data;

  return (
    <div className="">
      <PDFViewer width="100%" height="1000px">
        <Document>
          <Page size="A4" style={styles.page}>
            {/* ── HEADER ── */}
            <View style={styles.header}>
              <Text style={styles.headerName}>{d.personal.name}</Text>
              <Text style={styles.headerTitle}>{d.personal.title}</Text>
              <View style={styles.contactRow}>
                <View style={styles.contactItem}>
                  <Image src="/images/resume/phone.png" style={styles.contactIcon} />
                  <Text style={styles.contactText}>{d.contact.phone}</Text>
                </View>
                <Link src={`mailto:${d.contact.email}`} style={{ textDecoration: 'none' }}>
                  <View style={styles.contactItem}>
                    <Image src="/images/resume/gmail.png" style={styles.contactIcon} />
                    <Text style={styles.contactText}>{d.contact.email}</Text>
                  </View>
                </Link>
                <Link src={d.contact.linkedInUrl} style={{ textDecoration: 'none' }}>
                  <View style={styles.contactItem}>
                    <Image src="/images/resume/in.png" style={styles.contactIcon} />
                    <Text style={styles.contactText}>{d.contact.linkedInLabel}</Text>
                  </View>
                </Link>
                <Link src={d.contact.githubUrl} style={{ textDecoration: 'none' }}>
                  <View style={styles.contactItem}>
                    <Image src="/images/resume/world.png" style={styles.contactIcon} />
                    <Text style={styles.contactText}>{d.contact.githubLabel}</Text>
                  </View>
                </Link>
                <View style={styles.contactItem}>
                  <Image
                    src="/images/resume/location.png"
                    style={[styles.contactIcon, { width: 8 }]}
                  />
                  <Text style={styles.contactText}>{d.contact.location}</Text>
                </View>
              </View>
            </View>

            {/* ── BODY ── */}
            <View style={styles.body}>
              {/* MAIN COLUMN */}
              <View style={styles.mainColumn}>
                {/* Summary */}
                <View style={styles.block}>
                  <Text style={styles.sectionTitle}>Professional Summary</Text>
                  <Text style={styles.bodyText}>{d.summary}</Text>
                </View>

                {/* Experience */}
                <View style={styles.block}>
                  <Text style={styles.sectionTitle}>Work Experience</Text>
                  {d.experience.map((exp) => (
                    <View key={exp.id} style={{ marginBottom: 6 }}>
                      <Text style={[styles.boldText, { fontSize: 10 }]}>{exp.jobTitle}</Text>
                      <View style={styles.metaRow}>
                        <Image src="/images/resume/briefcase.jpg" style={[styles.smallIcon, { width: 11 }]} />
                        <Text style={styles.metaText}>{exp.company}</Text>
                        <Image src="/images/resume/calender.jpg" style={styles.smallIcon} />
                        <Text style={styles.metaText}>{exp.period}</Text>
                        <Image src="/images/resume/location-black.jpg" style={[styles.smallIcon, { width: 7 }]} />
                        <Text style={styles.metaText}>{exp.location}</Text>
                      </View>
                      {exp.projects.map((project, pIdx) => (
                        <View key={project.id} style={{ marginTop: 6 }}>
                          <Text style={[styles.boldText, { fontSize: 9 }]}>
                            Project {String(pIdx + 1).padStart(2, '0')} – {project.title}
                          </Text>
                          <Text style={[styles.bodyText, { marginTop: 2 }]}>{project.description}</Text>
                          {project.responsibilities.map((resp, rIdx) => (
                            <View key={rIdx} style={styles.bulletItem}>
                              <View style={styles.bulletDot} />
                              <Text style={styles.bodyText}>{resp}</Text>
                            </View>
                          ))}
                          <View style={styles.techWrap}>
                            {project.tech.map((t, tIdx) => (
                              <Text key={tIdx} style={styles.techTag}>{t}</Text>
                            ))}
                          </View>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>

                {/* Personal Projects */}
                <View style={styles.block}>
                  <Text style={styles.sectionTitle}>Personal Projects</Text>
                  {d.personalProjects.map((project) => (
                    <View key={project.id} style={{ marginBottom: 7 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={[styles.boldText, { fontSize: 10 }]}>{project.title}</Text>
                        <Text style={[styles.bodyText, { fontSize: 8, color: '#666' }]}>{project.duration}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', gap: 8, marginTop: 1 }}>
                        <Link src={project.liveLink} style={styles.linkText}>Live Demo</Link>
                        <Link src={project.githubLink} style={styles.linkText}>GitHub</Link>
                      </View>
                      <Text style={[styles.bodyText, { marginTop: 2 }]}>{project.description}</Text>
                      {project.features.map((f, fIdx) => (
                        <View key={fIdx} style={styles.bulletItem}>
                          <View style={styles.bulletDot} />
                          <Text style={styles.bodyText}>{f}</Text>
                        </View>
                      ))}
                      <View style={styles.techWrap}>
                        {project.tech.map((t, tIdx) => (
                          <Text key={tIdx} style={styles.techTag}>{t}</Text>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>

                {/* Additional Training */}
                <View style={styles.block}>
                  <Text style={styles.sectionTitle}>Additional Training</Text>
                  {d.additionalTraining.map((training, idx) => (
                    <View key={idx}>
                      <Text style={[styles.boldText, { color: ACCENT }]}>{training.title}</Text>
                      <Text style={[styles.bodyText, { marginTop: 2 }]}>{training.description}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* SIDE COLUMN */}
              <View style={styles.sideColumn}>
                {/* Backend Skills */}
                <View style={styles.sideBlock}>
                  <Text style={styles.sideSectionTitle}>Backend</Text>
                  <View style={styles.techWrap}>
                    {d.skills.backend.map((s, idx) => (
                      <Text key={idx} style={styles.skillTag}>{s}</Text>
                    ))}
                  </View>
                </View>

                {/* Databases */}
                <View style={styles.sideBlock}>
                  <Text style={styles.sideSectionTitle}>Databases</Text>
                  <View style={styles.techWrap}>
                    {d.skills.databases.map((s, idx) => (
                      <Text key={idx} style={styles.skillTag}>{s}</Text>
                    ))}
                  </View>
                </View>

                {/* ORM */}
                <View style={styles.sideBlock}>
                  <Text style={styles.sideSectionTitle}>ORM / ODM</Text>
                  <View style={styles.techWrap}>
                    {d.skills.orm.map((s, idx) => (
                      <Text key={idx} style={styles.skillTag}>{s}</Text>
                    ))}
                  </View>
                </View>

                {/* DevOps */}
                <View style={styles.sideBlock}>
                  <Text style={styles.sideSectionTitle}>DevOps &amp; Tools</Text>
                  <View style={styles.techWrap}>
                    {d.skills.devOps.map((s, idx) => (
                      <Text key={idx} style={styles.skillTag}>{s}</Text>
                    ))}
                  </View>
                  <View style={[styles.techWrap, { marginTop: 2 }]}>
                    {d.skills.tools.map((s, idx) => (
                      <Text key={idx} style={styles.skillTag}>{s}</Text>
                    ))}
                  </View>
                </View>

                {/* Education */}
                <View style={styles.sideBlock}>
                  <Text style={styles.sideSectionTitle}>Education</Text>
                  {d.education.map((edu) => (
                    <View key={edu.id} style={{ marginBottom: 4 }}>
                      <Text style={[styles.boldText, { fontSize: 9 }]}>{edu.degree}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 }}>
                        <Image src="/images/resume/education.png" style={[styles.smallIcon, { width: 11 }]} />
                        <Text style={styles.metaText}>{edu.institution}</Text>
                      </View>
                      <View style={styles.metaRow}>
                        <Image src="/images/resume/calender.jpg" style={styles.smallIcon} />
                        <Text style={styles.metaText}>{edu.period}</Text>
                        <Image src="/images/resume/location-black.jpg" style={[styles.smallIcon, { width: 7 }]} />
                        <Text style={styles.metaText}>{edu.location}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Certifications */}
                <View style={styles.sideBlock}>
                  <Text style={styles.sideSectionTitle}>Certifications</Text>
                  {d.certifications.map((cert) => (
                    <View key={cert.id} style={{ marginTop: 3 }}>
                      <Text style={[styles.boldText, { fontSize: 8 }]}>{cert.name}</Text>
                      <Text style={[styles.bodyText, { fontSize: 8, color: '#555' }]}>{cert.issuer}</Text>
                    </View>
                  ))}
                </View>

                {/* Languages */}
                <View style={styles.sideBlock}>
                  <Text style={styles.sideSectionTitle}>Languages</Text>
                  {d.languages.map((lang) => (
                    <View key={lang.id} style={styles.langRow}>
                      <Text style={[styles.bodyText, { fontSize: 9 }]}>{lang.name}</Text>
                      <Text style={[styles.bodyText, { fontSize: 9, color: ACCENT }]}>{lang.level}</Text>
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

export default TemplateTwo;
