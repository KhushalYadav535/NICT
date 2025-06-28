import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CourseHeader from './components/CourseHeader';
import CourseOverview from './components/CourseOverview';
import CourseSyllabus from './components/CourseSyllabus';
import CoursePrerequisites from './components/CoursePrerequisites';
import CourseFees from './components/CourseFees';
import CourseInstructor from './components/CourseInstructor';
import CourseActions from './components/CourseActions';

const CourseDetailsModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Mock course data
  const coursesData = {
    dca: {
      id: 'dca',
      title: 'Diploma in Computer Applications (DCA)',
      thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg',
      duration: '6 Months',
      enrolledStudents: '2,500',
      rating: 4.8,
      completionRate: '95%',
      description: `Master essential computer skills with our comprehensive DCA program. This course covers fundamental computing concepts, office applications, internet usage, and basic programming. Perfect for beginners looking to build a strong foundation in computer applications and digital literacy.`,
      objectives: [
        'Master Microsoft Office Suite (Word, Excel, PowerPoint)',
        'Understand computer fundamentals and operating systems',
        'Learn internet browsing and email management',
        'Develop basic programming skills',
        'Create professional documents and presentations',
        'Understand database management basics'
      ],
      careerOpportunities: [
        'Computer Operator',
        'Data Entry Specialist',
        'Office Assistant',
        'Administrative Executive',
        'Customer Service Representative',
        'Junior Accountant'
      ],
      modules: [
        {
          title: 'Computer Fundamentals',
          duration: '2 Weeks',
          description: 'Introduction to computers, hardware, software, and operating systems.',
          topics: [
            'Introduction to Computers',
            'Computer Hardware Components',
            'Operating System Basics',
            'File Management',
            'System Security',
            'Troubleshooting Basics'
          ],
          practicalHours: '20 Hours'
        },
        {
          title: 'Microsoft Word',
          duration: '3 Weeks',
          description: 'Complete word processing skills from basic to advanced features.',
          topics: [
            'Document Creation and Formatting',
            'Tables and Graphics',
            'Mail Merge',
            'Templates and Styles',
            'Collaboration Features',
            'Advanced Formatting'
          ],
          practicalHours: '30 Hours'
        },
        {
          title: 'Microsoft Excel',
          duration: '4 Weeks',
          description: 'Spreadsheet management, formulas, and data analysis.',
          topics: [
            'Spreadsheet Basics',
            'Formulas and Functions',
            'Charts and Graphs',
            'Data Analysis',
            'Pivot Tables',
            'Macros Introduction'
          ],
          practicalHours: '40 Hours'
        },
        {
          title: 'Microsoft PowerPoint',
          duration: '2 Weeks',
          description: 'Creating professional presentations with multimedia elements.',
          topics: [
            'Slide Design and Layout',
            'Animations and Transitions',
            'Multimedia Integration',
            'Presentation Delivery',
            'Templates and Themes',
            'Collaboration Features'
          ],
          practicalHours: '25 Hours'
        },
        {
          title: 'Internet & Email',
          duration: '2 Weeks',
          description: 'Internet navigation, email management, and online safety.',
          topics: [
            'Web Browsing Techniques',
            'Search Engine Optimization',
            'Email Setup and Management',
            'Online Safety and Security',
            'Cloud Storage Services',
            'Social Media Basics'
          ],
          practicalHours: '20 Hours'
        },
        {
          title: 'Programming Basics',
          duration: '3 Weeks',
          description: 'Introduction to programming concepts and basic coding.',
          topics: [
            'Programming Fundamentals',
            'HTML Basics',
            'CSS Introduction',
            'JavaScript Basics',
            'Database Concepts',
            'Project Development'
          ],
          practicalHours: '35 Hours'
        }
      ],
      prerequisites: {
        required: [
          'Basic literacy in English or Hindi',
          'Familiarity with smartphone usage',
          'Willingness to learn new technologies'
        ],
        recommended: [
          'Basic mathematics knowledge',
          'Previous exposure to computers (helpful but not required)',
          'Interest in technology and digital tools'
        ]
      },
      difficulty: 'beginner',
      feeStructure: {
        originalPrice: 15000,
        currentPrice: 12000,
        paymentOptions: [
          {
            type: 'Full Payment',
            amount: 12000,
            description: 'Pay complete fee upfront',
            discount: '20% discount applied'
          },
          {
            type: 'Installments (3 months)',
            amount: 4200,
            description: '₹4,200 per month for 3 months',
            discount: '10% discount applied'
          },
          {
            type: 'Installments (6 months)',
            amount: 2200,
            description: '₹2,200 per month for 6 months',
            discount: 'No additional charges'
          }
        ],
        includes: [
          'Course materials and study guides',
          'Practical lab sessions',
          'Government recognized certificate',
          'Placement assistance',
          'Lifetime access to course updates',
          'Free retake if needed'
        ]
      },
      instructor: {
        name: 'Rajesh Kumar Sharma',
        designation: 'Senior Computer Instructor',
        experience: 12,
        photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
        bio: `Rajesh Kumar Sharma is a seasoned computer educator with over 12 years of experience in teaching computer applications. He holds a Master's degree in Computer Applications and has trained over 5,000 students in various computer courses. His teaching methodology focuses on practical learning and real-world applications.`,
        specializations: [
          'Microsoft Office Suite','Computer Fundamentals','Database Management','Web Development Basics'
        ],
        achievements: [
          'Best Instructor Award 2022','Microsoft Certified Trainer','98% student satisfaction rate','Published author on computer education'
        ],
        studentsCount: '5,000+',rating: '4.9',quote: 'Learning computers is not just about technology, it\'s about empowering yourself for the digital future.'
      },
      demoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    tally: {
      id: 'tally',
      title: 'Tally ERP 9 with GST',
      thumbnail: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg',
      duration: '3 Months',
      enrolledStudents: '1,800',
      rating: 4.7,
      completionRate: '92%',
      description: `Master Tally ERP 9 with comprehensive GST knowledge. This course covers complete accounting, inventory management, taxation, and business reporting. Ideal for aspiring accountants, business owners, and finance professionals looking to enhance their skills in computerized accounting.`,
      objectives: [
        'Master Tally ERP 9 software completely',
        'Understand GST implementation and filing',
        'Learn complete accounting and bookkeeping',
        'Manage inventory and stock control',
        'Generate financial reports and statements',
        'Handle payroll and statutory compliance'
      ],
      careerOpportunities: [
        'Tally Operator',
        'Accounts Executive',
        'GST Consultant',
        'Bookkeeper',
        'Finance Assistant',
        'Tax Consultant'
      ],
      modules: [
        {
          title: 'Tally Fundamentals',
          duration: '2 Weeks',
          description: 'Introduction to Tally software and basic accounting concepts.',
          topics: [
            'Tally Installation and Setup',
            'Company Creation',
            'Chart of Accounts',
            'Basic Accounting Principles',
            'Voucher Entry',
            'Data Backup and Restore'
          ],
          practicalHours: '25 Hours'
        },
        {
          title: 'Advanced Accounting',
          duration: '3 Weeks',
          description: 'Advanced accounting features and financial management.',
          topics: [
            'Advanced Voucher Types',
            'Bank Reconciliation',
            'Interest Calculation',
            'Cost Centers and Categories',
            'Budgets and Controls',
            'Multi-Currency Handling'
          ],
          practicalHours: '35 Hours'
        },
        {
          title: 'Inventory Management',
          duration: '2 Weeks',
          description: 'Complete inventory and stock management system.',
          topics: [
            'Stock Items and Groups',
            'Units of Measure',
            'Price Lists and Discounts',
            'Stock Transfers',
            'Reorder Levels',
            'Inventory Reports'
          ],
          practicalHours: '30 Hours'
        },
        {
          title: 'GST Implementation',
          duration: '3 Weeks',
          description: 'Comprehensive GST setup and compliance in Tally.',
          topics: [
            'GST Setup in Tally',
            'GST Registration Details',
            'Tax Invoice Generation',
            'GSTR-1, GSTR-2, GSTR-3B',
            'Input Tax Credit',
            'GST Returns Filing'
          ],
          practicalHours: '40 Hours'
        },
        {
          title: 'Payroll Management',
          duration: '2 Weeks',
          description: 'Employee payroll and statutory compliance.',
          topics: [
            'Employee Master Creation',
            'Salary Structure Setup',
            'Attendance Management',
            'PF and ESI Compliance',
            'TDS Calculation',
            'Payroll Reports'
          ],
          practicalHours: '25 Hours'
        }
      ],
      prerequisites: {
        required: [
          'Basic accounting knowledge',
          'Understanding of business transactions',
          'Computer operation skills'
        ],
        recommended: [
          'Commerce background (helpful)',
          'Previous experience with accounting software',
          'Knowledge of taxation basics'
        ]
      },
      difficulty: 'intermediate',
      feeStructure: {
        originalPrice: 18000,
        currentPrice: 15000,
        paymentOptions: [
          {
            type: 'Full Payment',
            amount: 15000,
            description: 'Pay complete fee upfront',
            discount: '17% discount applied'
          },
          {
            type: 'Installments (3 months)',
            amount: 5200,
            description: '₹5,200 per month for 3 months',
            discount: '10% discount applied'
          }
        ],
        includes: [
          'Tally ERP 9 software license',
          'GST practical training',
          'Real business case studies',
          'Industry recognized certificate',
          'Job placement assistance',
          'Free software updates'
        ]
      },
      instructor: {
        name: 'Priya Agarwal',
        designation: 'Certified Tally Professional',
        experience: 8,
        photo: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
        bio: `Priya Agarwal is a certified Tally professional with 8 years of experience in accounting and taxation. She has worked with various businesses for GST implementation and has trained over 2,000 students in Tally ERP 9. Her expertise lies in practical accounting solutions and GST compliance.`,
        specializations: [
          'Tally ERP 9',
          'GST Implementation',
          'Financial Accounting',
          'Inventory Management'
        ],
        achievements: [
          'Tally Certified Professional',
          'GST Expert Certification',
          '95% placement rate for students',
          'Industry recognition for training excellence'
        ],
        studentsCount: '2,000+',
        rating: '4.8',
        quote: 'Tally is not just software, it\'s a complete business solution that transforms how you manage finances.'
      },
      demoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    ccc: {
      id: 'ccc',
      title: 'Course on Computer Concepts (CCC)',
      thumbnail: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
      duration: '2 Months',
      enrolledStudents: '3,200',
      rating: 4.6,
      completionRate: '97%',
      description: `Government certified Course on Computer Concepts (CCC) designed to provide basic computer literacy. This course covers essential digital skills required for government jobs and everyday computer usage. Recognized by NIELIT and accepted across all government departments.`,
      objectives: [
        'Understand basic computer concepts and terminology',
        'Learn operating system navigation and file management',
        'Master internet browsing and email communication',
        'Create documents using word processing software',
        'Understand digital payment systems and e-governance',
        'Develop basic cybersecurity awareness'
      ],
      careerOpportunities: [
        'Government Job Eligibility',
        'Bank Clerk Positions',
        'Railway Jobs',
        'SSC Positions',
        'State Government Jobs',
        'Digital Literacy Instructor'
      ],
      modules: [
        {
          title: 'Introduction to Computer',
          duration: '1 Week',
          description: 'Basic computer concepts, hardware, and software introduction.',
          topics: [
            'What is Computer',
            'Types of Computers',
            'Computer Hardware',
            'Computer Software',
            'Input and Output Devices',
            'Memory and Storage'
          ],
          practicalHours: '15 Hours'
        },
        {
          title: 'Operating System',
          duration: '2 Weeks',
          description: 'Windows operating system and file management.',
          topics: [
            'Introduction to Windows',
            'Desktop and Taskbar',
            'File and Folder Management',
            'Control Panel Settings',
            'System Maintenance',
            'Accessibility Features'
          ],
          practicalHours: '25 Hours'
        },
        {
          title: 'Word Processing',
          duration: '2 Weeks',
          description: 'Document creation and formatting using word processor.',
          topics: [
            'Creating and Saving Documents',
            'Text Formatting',
            'Tables and Lists',
            'Headers and Footers',
            'Print Settings',
            'Document Templates'
          ],
          practicalHours: '25 Hours'
        },
        {
          title: 'Spreadsheets',
          duration: '1 Week',
          description: 'Basic spreadsheet operations and calculations.',
          topics: [
            'Spreadsheet Basics',
            'Data Entry and Editing',
            'Basic Formulas',
            'Charts Creation',
            'Print Options',
            'Data Sorting'
          ],
          practicalHours: '15 Hours'
        },
        {
          title: 'Internet and Email',
          duration: '1 Week',
          description: 'Internet browsing, email, and online services.',
          topics: [
            'Internet Basics',
            'Web Browsing',
            'Search Engines',
            'Email Setup and Usage',
            'Online Safety',
            'Digital Services'
          ],
          practicalHours: '15 Hours'
        },
        {
          title: 'Digital Financial Services',
          duration: '1 Week',
          description: 'Digital payments and e-governance services.',
          topics: [
            'Digital Payment Methods',
            'UPI and Mobile Banking',
            'E-governance Services',
            'Aadhaar Services',
            'Online Forms',
            'Digital Certificates'
          ],
          practicalHours: '10 Hours'
        }
      ],
      prerequisites: {
        required: [
          'Basic literacy in any language',
          'Age 14 years or above',
          'Interest in learning computers'
        ],
        recommended: [
          'Basic mathematics knowledge',
          'Smartphone usage experience',
          'Government job aspirations'
        ]
      },
      difficulty: 'beginner',
      feeStructure: {
        originalPrice: 8000,
        currentPrice: 6500,
        paymentOptions: [
          {
            type: 'Full Payment',
            amount: 6500,
            description: 'Pay complete fee upfront',
            discount: '19% discount applied'
          },
          {
            type: 'Installments (2 months)',
            amount: 3400,
            description: '₹3,400 per month for 2 months',
            discount: '15% discount applied'
          }
        ],
        includes: [
          'NIELIT certified curriculum',
          'Government recognized certificate',
          'Online exam preparation',
          'Study materials included',
          'Practice test access',
          'Certificate processing assistance'
        ]
      },
      instructor: {
        name: 'Amit Singh',
        designation: 'NIELIT Certified Instructor',
        experience: 10,
        photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
        bio: `Amit Singh is a NIELIT certified instructor with 10 years of experience in computer education. He has successfully trained over 4,000 students for CCC certification with a 99% pass rate. His teaching approach focuses on practical learning and exam preparation.`,
        specializations: [
          'CCC Curriculum',
          'NIELIT Certification',
          'Digital Literacy',
          'E-governance Services'
        ],
        achievements: [
          'NIELIT Master Trainer',
          '99% student pass rate',
          'Government training program coordinator',
          'Digital India initiative contributor'
        ],
        studentsCount: '4,000+',
        rating: '4.9',
        quote: 'CCC is your gateway to digital empowerment and government job opportunities.'
      },
      demoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    python: {
      id: 'python',
      title: 'Python Programming for Beginners',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
      duration: '4 Months',
      enrolledStudents: '1,200',
      rating: 4.9,
      completionRate: '88%',
      description: `Learn Python programming from scratch with hands-on projects and real-world applications. This comprehensive course covers Python fundamentals, data structures, web development basics, and automation. Perfect for beginners who want to start their programming journey or professionals looking to add Python skills.`,
      objectives: [
        'Master Python programming fundamentals',
        'Understand data structures and algorithms',
        'Build web applications using Python frameworks',
        'Learn automation and scripting techniques',
        'Work with databases and APIs',
        'Develop problem-solving skills through coding'
      ],
      careerOpportunities: [
        'Python Developer',
        'Data Analyst',
        'Web Developer',
        'Automation Engineer',
        'Software Developer',
        'Machine Learning Engineer'
      ],
      modules: [
        {
          title: 'Python Basics',
          duration: '3 Weeks',
          description: 'Introduction to Python programming and basic concepts.',
          topics: [
            'Python Installation and Setup',
            'Variables and Data Types',
            'Operators and Expressions',
            'Input and Output',
            'Comments and Documentation',
            'Python IDE Usage'
          ],
          practicalHours: '30 Hours'
        },
        {
          title: 'Control Structures',
          duration: '2 Weeks',
          description: 'Decision making and looping in Python.',
          topics: [
            'Conditional Statements',
            'If-Else Constructs',
            'For Loops',
            'While Loops',
            'Break and Continue',
            'Nested Loops'
          ],
          practicalHours: '25 Hours'
        },
        {
          title: 'Data Structures',
          duration: '3 Weeks',
          description: 'Python built-in data structures and their usage.',
          topics: [
            'Lists and List Methods',
            'Tuples and Sets',
            'Dictionaries',
            'String Manipulation',
            'List Comprehensions',
            'Data Structure Selection'
          ],
          practicalHours: '35 Hours'
        },
        {
          title: 'Functions and Modules',
          duration: '2 Weeks',
          description: 'Creating reusable code with functions and modules.',
          topics: [
            'Function Definition and Calling',
            'Parameters and Arguments',
            'Return Statements',
            'Scope and Lifetime',
            'Modules and Packages',
            'Standard Library'
          ],
          practicalHours: '25 Hours'
        },
        {
          title: 'File Handling and Exception Handling',
          duration: '2 Weeks',
          description: 'Working with files and handling errors gracefully.',
          topics: [
            'File Operations',
            'Reading and Writing Files',
            'CSV and JSON Handling',
            'Exception Handling',
            'Try-Except Blocks',
            'Custom Exceptions'
          ],
          practicalHours: '25 Hours'
        },
        {
          title: 'Object-Oriented Programming',
          duration: '3 Weeks',
          description: 'OOP concepts and implementation in Python.',
          topics: [
            'Classes and Objects',
            'Attributes and Methods',
            'Inheritance',
            'Polymorphism',
            'Encapsulation',
            'Special Methods'
          ],
          practicalHours: '35 Hours'
        },
        {
          title: 'Web Development with Flask',
          duration: '2 Weeks',
          description: 'Building web applications using Flask framework.',
          topics: [
            'Flask Installation and Setup',
            'Routes and Views',
            'Templates and Forms',
            'Database Integration',
            'User Authentication',
            'Deployment Basics'
          ],
          practicalHours: '30 Hours'
        },
        {
          title: 'Projects and Automation',
          duration: '3 Weeks',
          description: 'Real-world projects and automation scripts.',
          topics: [
            'Web Scraping',
            'API Integration',
            'Automation Scripts',
            'Data Analysis Basics',
            'Final Project Development',
            'Code Optimization'
          ],
          practicalHours: '40 Hours'
        }
      ],
      prerequisites: {
        required: [
          'Basic computer operation skills',
          'Logical thinking ability',
          'High school mathematics knowledge'
        ],
        recommended: [
          'Previous programming experience (any language)',
          'Understanding of basic algorithms',
          'Interest in software development'
        ]
      },
      difficulty: 'intermediate',
      feeStructure: {
        originalPrice: 25000,
        currentPrice: 20000,
        paymentOptions: [
          {
            type: 'Full Payment',
            amount: 20000,
            description: 'Pay complete fee upfront',
            discount: '20% discount applied'
          },
          {
            type: 'Installments (4 months)',
            amount: 5500,
            description: '₹5,500 per month for 4 months',
            discount: '12% discount applied'
          }
        ],
        includes: [
          'Complete Python curriculum',
          'Hands-on project development',
          'Industry-relevant assignments',
          'Code review sessions',
          'Career guidance and placement support',
          'Lifetime access to course materials'
        ]
      },
      instructor: {
        name: 'Dr. Neha Gupta',
        designation: 'Senior Python Developer & Trainer',
        experience: 15,
        photo: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
        bio: `Dr. Neha Gupta is a senior Python developer and trainer with 15 years of experience in software development and education. She holds a PhD in Computer Science and has worked with leading tech companies. Her expertise includes Python development, data science, and web technologies.`,
        specializations: [
          'Python Programming',
          'Web Development',
          'Data Science',
          'Machine Learning'
        ],
        achievements: [
          'PhD in Computer Science',
          'Published researcher in Python applications',
          'Google Developer Expert',
          'Mentor for 1000+ developers'
        ],
        studentsCount: '1,500+',
        rating: '4.9',
        quote: 'Python is not just a programming language, it\'s a tool that can transform your ideas into reality.'
      },
      demoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
  };

  const discountsData = [
    {
      title: 'Early Bird Discount',
      description: 'Enroll within 7 days and save extra',
      amount: '₹2,000'
    },
    {
      title: 'Student Discount',
      description: 'Valid student ID required',
      amount: '₹1,500'
    },
    {
      title: 'Group Enrollment',
      description: 'Bring 3+ friends and save',
      amount: '₹3,000'
    }
  ];

  useEffect(() => {
    // Get course ID from URL params or location state
    const urlParams = new URLSearchParams(location.search);
    const courseId = urlParams.get('course') || location.state?.courseId || 'dca';
    
    if (coursesData[courseId]) {
      setSelectedCourse(coursesData[courseId]);
    } else {
      setSelectedCourse(coursesData.dca); // Default to DCA
    }

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [location]);

  const handleClose = () => {
    navigate('/homepage');
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!selectedCourse) {
    return (
      <div className="fixed inset-0 z-200 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-surface rounded-lg p-8">
          <p className="text-text-primary">Loading course details...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-200 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-start justify-center p-0 lg:p-4 lg:items-center">
          <div 
            className="relative w-full lg:max-w-5xl bg-surface lg:rounded-xl shadow-modal animate-slide-up lg:max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Course Header */}
            <CourseHeader course={selectedCourse} onClose={handleClose} />

            {/* Course Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 lg:p-6 space-y-6">
                {/* Course Overview */}
                <CourseOverview course={selectedCourse} />

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Course Syllabus */}
                  <div className="lg:col-span-2">
                    <CourseSyllabus modules={selectedCourse.modules} />
                  </div>

                  {/* Prerequisites */}
                  <CoursePrerequisites 
                    prerequisites={selectedCourse.prerequisites}
                    difficulty={selectedCourse.difficulty}
                  />

                  {/* Fee Structure */}
                  <CourseFees 
                    feeStructure={selectedCourse.feeStructure}
                    discounts={discountsData}
                  />
                </div>

                {/* Instructor Information */}
                <CourseInstructor instructor={selectedCourse.instructor} />
              </div>
            </div>

            {/* Course Actions */}
            <CourseActions course={selectedCourse} onClose={handleClose} />
          </div>
        </div>
      </div>

      {/* Custom styles for mobile optimization */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .fixed.inset-0 .flex.min-h-full {
            align-items: flex-start;
          }
          
          .relative.w-full.lg\\:max-w-5xl {
            max-width: 100vw;
            height: 100vh;
            border-radius: 0;
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CourseDetailsModal;