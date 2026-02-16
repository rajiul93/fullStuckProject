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
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    fontFamily: 'Roboto', // Enable the font family
  },
  title: {
    fontSize: 24,
    marginBottom: 2,
    fontFamily: 'Roboto', // Use bold for titles
  },
  subtitle: {
    fontSize: 12,
    color: 'blue',
    marginBottom: 4,
    fontFamily: 'Roboto',
  },
  text: {
    fontSize: 10,
    fontFamily: 'Roboto',
  },
  contactRow: {
    flexDirection: 'row',
    gap: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
});

const TemplateOne = () => {
  // Projects array with two projects
  const projects = [
    {
      id: 1,
      title: 'Travel Booking Platform [OTA]',
      description:
        'A comprehensive online travel agency platform for booking flights, hotels, and vacation packages with real-time availability and payment integration.',
      responsibilities: [
        'Developed responsive user interface using React.js and Next.js',
        'Integrated REST APIs for real-time flight and hotel data',
        'Implemented secure payment gateway with Stripe integration',
        'Built reusable components for booking workflows',
      ],
    },
    {
      id: 2,
      title: 'E-commerce Dashboard [SaaS]',
      description:
        'A modern SaaS dashboard for e-commerce store management with analytics, inventory tracking, and customer management features.',
      responsibilities: [
        'Built dynamic admin dashboard with TypeScript and Tailwind CSS',
        'Implemented state management using Redux Toolkit',
        'Created interactive data visualizations with Chart.js',
        'Optimized application performance with code splitting and lazy loading',
      ],
    },
  ];

  // Technologies and skills array
  const technologies = [
    'React.js',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Redux Toolkit',
    'Zustand',
    'REST APIs',
  ];

  // Soft skills array
  const softSkills = [
    {
      id: 1,
      icon: '/images/resume/book.png',
      title: 'Enger to Learn new Skills',
      description:
        'A comprehensive online travel agency platform for booking flights, hotels,',
      iconStyle: { width: 16, marginRight: 3 },
    },
    {
      id: 2,
      icon: '/images/resume/statistics.png',
      title: 'Not Afraid of Challenges',
      description:
        'A comprehensive online travel agency platform for booking flights, hotels,',
      iconStyle: { width: 16, marginRight: 3 },
    },
    {
      id: 3,
      icon: '/images/resume/clock.png',
      title: 'Time Management',
      description:
        'A comprehensive online travel agency platform for booking flights, hotels,',
      iconStyle: { width: 16, height: 16, marginRight: 3 },
    },
    {
      id: 4,
      icon: '/images/resume/group.png',
      title: 'Team Collaborate',
      description:
        'A comprehensive online travel agency platform for booking flights, hotels,',
      iconStyle: { width: 16, height: 16, marginRight: 3 },
    },
  ];

  // Personal projects array
  const personalProjects = [
    {
      id: 1,
      title: 'E-Commerce Full Stack Application',
      duration: 'Jan 2024 - Mar 2024',
      description:
        'A full-featured e-commerce platform with product management, shopping cart, and payment integration.',
      features: [
        'User authentication and authorization',
        'Product catalog with search and filters',
        'Shopping cart and checkout process',
        'Payment integration with Stripe',
        'Admin dashboard for product management',
      ],
      liveLink: 'https://ecommerce-demo.vercel.app',
      frontendGit: 'https://github.com/username/ecommerce-frontend',
      backendGit: 'https://github.com/username/ecommerce-backend',
    },
    {
      id: 2,
      title: 'Task Management System',
      duration: 'Apr 2024 - May 2024',
      description:
        'A collaborative task management app with real-time updates and team collaboration features.',
      features: [
        'Real-time task updates with Socket.io',
        'Drag and drop task boards',
        'Team collaboration and assignments',
        'Progress tracking and analytics',
        'Responsive design for mobile devices',
      ],
      liveLink: 'https://task-manager-demo.vercel.app',
      frontendGit: 'https://github.com/username/task-manager-frontend',
      backendGit: 'https://github.com/username/task-manager-backend',
    },
  ];

  return (
    <div className="">
      <PDFViewer width="100%" height="1000px">
        <Document>
          <Page size="A4" style={styles.page}>
            <View>
              <Text style={styles.title}>Rajiul Islam</Text>
              <Text style={styles.subtitle}>Junior Front-End Developer</Text>
            </View>
            <View style={styles.contactRow}>
              <View style={styles.contactItem}>
                <Image src="/images/resume/phone.png" style={styles.icon} />
                <Text style={styles.text}>+880 1986570093</Text>
              </View>
              <Link
                style={{ color: 'black', textDecoration: 'none' }}
                src="mailto:rajiul@example.com"
              >
                <View style={styles.contactItem}>
                  <Image src="/images/resume/gmail.png" style={styles.icon} />
                  <Text style={styles.text}>rajiul@example.com</Text>
                </View>
              </Link>
              <View style={styles.contactItem}>
                <Image src="/images/resume/in.png" style={styles.icon} />
                <Text style={styles.text}>LinkedIn Profile</Text>
              </View>
              <Link
                style={{ color: 'black', textDecoration: 'none' }}
                src="mailto:rajiul@example.com"
              >
                <View style={styles.contactItem}>
                  <Image src="/images/resume/world.png" style={styles.icon} />
                  <Text style={styles.text}>Portfolio</Text>
                </View>
              </Link>
              <View style={styles.contactItem}>
                <Image
                  src="/images/resume/location.png"
                  style={[styles.icon, { width: 8 }]}
                />
                <Text style={styles.text}>Dhaka, Bangladesh</Text>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                marginTop: 10,
              }}
            >
              <View
                style={{
                  // backgroundColor: '#fec76f',
                  width: '100%',
                  flex: 3,
                }}
              >
                <View style={{ borderBottom: '2px solid black' }}>
                  <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold' }}>
                    SUMMARY
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 10,
                      marginTop: 6,
                      fontFamily: 'Roboto',
                    }}
                  >
                    Frontend Developer with 1 year of hands-on experience
                    building responsive and user-friendly web applications.
                    Skilled in React.js, Next.js, TypeScript, and modern CSS
                    frameworks like Tailwind CSS. Experienced in integrating
                    REST APIs, managing state (Redux/Zustand), and building
                    reusable component-based architectures. Strong understanding
                    of responsive design, performance optimization, and clean
                    code practices. Passionate about creating scalable
                    e-commerce and SaaS platforms with modern UI/UX standards.
                  </Text>
                </View>
                <View style={{ borderBottom: '2px solid black', marginTop: 6 }}>
                  <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold' }}>
                    EDUCATION
                  </Text>
                </View>
                <View>
                  <Text
                    style={{ fontSize: 12, fontFamily: 'Roboto', marginTop: 6 }}
                  >
                    B.S.C EEE
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: 'Roboto',
                      marginTop: 2,
                      color: 'blue',
                    }}
                  >
                    World University of Bangladesh
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 2,
                      gap: 6,
                    }}
                  >
                    <Image
                      src="/images/resume/calender.jpg"
                      style={[styles.icon, { width: 12, marginRight: 3 }]}
                    />
                    <Text style={{ fontSize: 10 }}>2018 - 2022</Text>
                    <Image
                      src="/images/resume/location-black.jpg"
                      style={[styles.icon, { width: 8, marginRight: 3 }]}
                    />
                    <Text style={{ fontSize: 10 }}>Dhaka, Bangladesh</Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={{ fontSize: 12, fontFamily: 'Roboto', marginTop: 6 }}
                  >
                    DIPLOMA IN ELECTRICAL
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: 'Roboto',
                      marginTop: 2,
                      color: 'blue',
                    }}
                  >
                    Mangrove Institute of Science and Technology
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 2,
                      gap: 6,
                    }}
                  >
                    <Image
                      src="/images/resume/calender.jpg"
                      style={[styles.icon, { width: 12, marginRight: 3 }]}
                    />
                    <Text style={{ fontSize: 10 }}>2013 - 2017</Text>
                    <Image
                      src="/images/resume/location-black.jpg"
                      style={[styles.icon, { width: 8, marginRight: 3 }]}
                    />
                    <Text style={{ fontSize: 10 }}>KHULNA, Bangladesh</Text>
                  </View>
                </View>
                <View style={{ borderBottom: '2px solid black', marginTop: 6 }}>
                  <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold' }}>
                    EXPERIENCE
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 12, fontFamily: 'Roboto', marginTop: 6 }}
                >
                  Junior Front-End Developer
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: 'Roboto',
                    marginTop: 2,
                    color: 'blue',
                  }}
                >
                  Waditaslim tech
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 2,
                    gap: 6,
                  }}
                >
                  <Image
                    src="/images/resume/calender.jpg"
                    style={[styles.icon, { width: 12, marginRight: 3 }]}
                  />
                  <Text style={{ fontSize: 10 }}>2025 - Present</Text>
                  <Image
                    src="/images/resume/location-black.jpg"
                    style={[styles.icon, { width: 8, marginRight: 3 }]}
                  />
                  <Text style={{ fontSize: 10 }}>
                    KHULNA, Bangladesh (Dubai Base)
                  </Text>
                </View>

                {/* Projects Section - Using map to display projects */}
                {projects.map((project, index) => (
                  <View key={project.id} style={{ marginTop: 6 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Roboto-Bold',
                        marginTop: 6,
                      }}
                    >
                      Project {String(index + 1).padStart(2, '0')} -{' '}
                      {project.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: 'Roboto',
                        marginTop: 6,
                      }}
                    >
                      {project.description}
                    </Text>
                    <View>
                      {project.responsibilities.map(
                        (responsibility, respIndex) => (
                          <View
                            key={respIndex}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 6,
                            }}
                          >
                            <View
                              style={{
                                width: 5,
                                height: 5,
                                backgroundColor: 'black',
                                marginLeft: 6,
                              }}
                            ></View>
                            <Text
                              style={{
                                fontSize: 10,
                                fontFamily: 'Roboto',
                              }}
                            >
                              {responsibility}
                            </Text>
                          </View>
                        ),
                      )}
                    </View>
                  </View>
                ))}
                <View style={{ borderBottom: '2px solid black', marginTop: 6 }}>
                  <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold' }}>
                    ADDITIONAL TRAINING
                  </Text>
                </View>
                <View style={{ marginTop: 6 }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: 'Roboto',
                      marginTop: 2,
                      color: 'blue',
                    }}
                  >
                    Programming Hero – Online Web Development Course
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: 'Roboto',
                      marginTop: 6,
                    }}
                  >
                    Front End Web Development – Level 1 & Level 2 (Completed)
                  </Text>
                </View>
              </View>
              {/* right side content */}
              <View
                style={{
                  width: '100%',
                  flex: 2,
                }}
              >
                <View style={{ borderBottom: '2px solid black' }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto-Bold',
                      textTransform: 'uppercase',
                    }}
                  >
                    Industry skills
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 6,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 4,
                  }}
                >
                  {technologies.map((tech, index) => (
                    <Text
                      key={index}
                      style={{
                        fontSize: 10,
                        fontFamily: 'Roboto',
                        borderBottom: '1px solid black',
                      }}
                    >
                      {tech}
                      {index < technologies.length - 1 ? ', ' : ''}
                    </Text>
                  ))}
                </View>
                <View style={{ borderBottom: '2px solid black' }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto-Bold',
                      textTransform: 'uppercase',
                      marginTop: 6,
                    }}
                  >
                    SOFT SKILLS
                  </Text>
                </View>
                {softSkills.map((skill, index) => (
                  <View
                    key={skill.id}
                    style={{
                      marginTop: 8,
                      borderBottom:
                        index < softSkills.length - 1
                          ? '1px dashed gray'
                          : 'none',
                      paddingBottom: index < softSkills.length - 1 ? 6 : 0,
                    }}
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
                        style={{
                          fontSize: 10,
                          fontFamily: 'Roboto-Bold',
                        }}
                      >
                        {skill.title}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: 'Roboto',
                        marginLeft: 22,
                        marginTop: 2,
                      }}
                    >
                      {skill.description}
                    </Text>
                  </View>
                ))}
                <View style={{ borderBottom: '2px solid black' }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto-Bold',
                      textTransform: 'uppercase',
                      marginTop: 6,
                    }}
                  >
                    Personal Projects
                  </Text>
                </View>
                {personalProjects.map((project) => (
                  <View key={project.id} style={{ marginTop: 8 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Roboto-Bold',
                      }}
                    >
                      {project.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 9,
                        fontFamily: 'Roboto',
                        color: 'gray',
                        marginTop: 2,
                      }}
                    >
                      {project.duration}
                    </Text>
                    <View style={{ marginTop: 4 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginBottom: 2,
                          gap: 6,
                        }}
                      >
                        <Link
                          src={project.liveLink}
                          style={{
                            fontSize: 9,
                            fontFamily: 'Roboto',
                            color: 'blue',
                            textDecoration: 'underline',
                          }}
                        >
                          Live Demo
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
                          Frontend GitHub
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
                          Backend GitHub
                        </Link>
                      </View>
                    </View>
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: 'Roboto',
                        marginTop: 4,
                      }}
                    >
                      {project.description}
                    </Text>
                    <View style={{ marginTop: 4 }}>
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: 'Roboto-Bold',
                          marginBottom: 2,
                        }}
                      >
                        Key Features:
                      </Text>
                      {project.features.map((feature, index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            marginLeft: 6,
                          }}
                        >
                          <Text style={{ fontSize: 10, marginRight: 4 }}>
                            •
                          </Text>
                          <Text style={{ fontSize: 9, flex: 1 }}>
                            {feature}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>

              <View></View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default TemplateOne;
