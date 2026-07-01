export const mahmudulCvData = {
  personal: {
    name: 'Mahmudul Hasan',
  },
  profileImage: '/images/mahmudul-hasan.jpeg',
  contact: {
    phone: '+8801910695700',
    email: 'mahmudhasanrayenda@gmail.com',
  },
  careerObjective:
    'As a Merchandiser with a background in Textile Engineering and Management, I bring 3.5 years of dedicated experience in the textile and leather sector. I have successfully managed the end-to-end merchandising process. My expertise extends to effective communication with suppliers, ensuring quality standards, and meeting tight deadlines.',
  academicQualifications: [
    {
      id: 1,
      degree: 'Bachelor',
      details: [
        'Department: Textile Engineering and Management',
        'Result: 3.77',
        'Year of Passing: May, 2021',
        'Institute: BGMEA University of Fashion & Technology (BUFT)',
      ],
    },
    {
      id: 2,
      degree: 'Higher School Certificate (H.S.C)',
      details: [
        'Group: Science',
        'Grade/GPA: 4.50 (out of 5)',
        'Year: 2016',
        'Board: Jessore',
        'Institute: Sharonkhola Govt College',
      ],
    },
    {
      id: 3,
      degree: 'Secondary School Certificate (S.S.C)',
      details: [
        'Group: Science',
        'Grade/GPA: 4.69 (out of 5)',
        'Year of Passing: 2013',
        'Board: Jessore',
        'School: Rayenda Pilot High School',
      ],
    },
  ],
  experience: {
    company: 'Khantex Fashions Limited',
    address: 'Khan Tower, House 27, Road 12, Block -H, Banani, Dhaka',
    roles: [
      {
        id: 1,
        position: 'Assistant Merchandiser',
        duration: '18 Apr 2022 – 30 Sep 2024',
      },
      {
        id: 2,
        position: 'Merchandiser',
        duration: '1 Jan 2025 – 30 Jun 2025',
      },
    ],
    responsibilities: [
      'Communicate with international buyer to understand product requirements, costing and delivery expectations',
      'Prepare marketing presentation, sample to attract international clients and increase order volume',
      'Prepare cost sheets and price negotiations',
      'Coordinate the entire supply chain process from raw material sourcing to final shipment',
      'Acted as a bridge between buyer and production team',
      'Monitor inventory levels and implement material requirement planning (MRP) to prevent overstock or shortage',
    ],
  },
  selfAnalysis: [
    'Strong motivation and commitment to work',
    'Endurance to work for long hours and under pressure',
    'Ability to work independently as well as team member',
    'Commendable communication and presentation skills',
  ],
  englishProficiency: [
    { id: 1, name: 'IELTS', score: '6.5' },
    { id: 2, name: 'PTE', score: '60' },
  ],
  // biographical: {
  //   fatherName: 'Humayun Kabir',
  //   motherName: 'Rashida Akhter Laili',
  //   permanentAddress: 'Vill: Rayenda, Thana: Sharonkhola, Dist: Bagerhat',
  //   dateOfBirth: '01/01/97',
  //   nationality: 'Bangladeshi (By Birth)',
  //   religion: 'Islam',
  //   sex: 'Male',
  //   maritalStatus: 'Single',
  //   bloodGroup: 'B+',
  //   height: "5'7\"",
  // },
  hobbies: ['Sports', 'Gardening', 'Reading'],
  references: [
    {
      id: 1,
      name: 'Rashedul Islam Sumon',
      designation: 'AGM (Knit), Marketing and Merchandising',
      organization: 'Khantex Fashions Limited',
      mobile: '01730453198',
      email: '',
      contact: '',
    },
    {
      id: 2,
      name: 'Mohammad Mizanur Rahman',
      designation:
        'Assistant Professor & Head, Department Of Textile Engineering & Management',
      organization: 'BUFT',
      mobile: '',
      email: 'mizanurrahman@buft.edu.bd',
      contact: '01723449003',
    },
  ],
  declaration:
    'I do hereby declare that the information given above is true to my knowledge.',
  signature: 'Mahmudul Hasan',
};

export type MahmudulCvData = typeof mahmudulCvData;
