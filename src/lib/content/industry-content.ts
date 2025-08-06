import { ProjectRequirements } from '@/types'

export interface IndustryContent {
  hero: {
    title: string
    subtitle: string
    primaryCTA: string
    secondaryCTA: string
    visualPlaceholder: string
  }
  about: {
    title: string
    description: string
    feature1Title: string
    feature1Description: string
    feature2Title: string
    feature2Description: string
    feature3Title?: string
    feature3Description?: string
  }
  services: {
    title: string
    subtitle: string
    services: Array<{
      title: string
      description: string
      features: string[]
      icon: string
    }>
  }
  testimonials: {
    title: string
    subtitle: string
    testimonials: Array<{
      name: string
      role: string
      company: string
      content: string
      rating: number
    }>
  }
  team: {
    title: string
    subtitle: string
    members: Array<{
      name: string
      role: string
      description: string
      expertise: string[]
    }>
  }
  pricing: {
    title: string
    subtitle: string
    plans: Array<{
      name: string
      price: string
      period: string
      description: string
      features: string[]
      highlighted?: boolean
    }>
  }
  portfolio: {
    title: string
    subtitle: string
    projects: Array<{
      title: string
      description: string
      category: string
      tags: string[]
      metrics?: string
    }>
  }
  contact: {
    title: string
    description: string
    phone?: string
    email?: string
    address?: string
  }
}

export const INDUSTRY_CONTENT: Record<string, IndustryContent> = {
  tech: {
    hero: {
      title: "Innovative Technology Solutions",
      subtitle: "Transform your business with cutting-edge technology and seamless digital experiences that drive growth and efficiency.",
      primaryCTA: "Start Building",
      secondaryCTA: "View Demo",
      visualPlaceholder: "Tech Platform Interface"
    },
    about: {
      title: "About Our Technology",
      description: "We're passionate about creating innovative solutions that solve real-world problems and drive digital transformation for businesses of all sizes.",
      feature1Title: "Cutting-Edge Tech",
      feature1Description: "Using the latest technologies including AI, cloud computing, and modern frameworks to build scalable solutions.",
      feature2Title: "Expert Team",
      feature2Description: "Experienced developers and architects committed to delivering excellence in every project.",
      feature3Title: "Agile Development",
      feature3Description: "Fast, iterative development process that adapts to your changing business needs."
    },
    services: {
      title: "Our Technology Services",
      subtitle: "Comprehensive solutions for your digital transformation journey",
      services: [
        {
          title: "Custom Software Development",
          description: "Tailored applications built to solve your specific business challenges with scalable architecture.",
          features: ["Full-stack development", "API integration", "Cloud deployment", "Mobile-responsive design"],
          icon: "Code"
        },
        {
          title: "Cloud Solutions & DevOps",
          description: "Migrate to the cloud and streamline your operations with automated deployment and monitoring.",
          features: ["AWS/Azure migration", "CI/CD pipelines", "Infrastructure automation", "24/7 monitoring"],
          icon: "Cloud"
        },
        {
          title: "AI & Machine Learning",
          description: "Harness the power of artificial intelligence to automate processes and gain insights.",
          features: ["Predictive analytics", "Natural language processing", "Computer vision", "Chatbots & automation"],
          icon: "Brain"
        },
        {
          title: "Digital Consulting",
          description: "Strategic guidance for your technology roadmap and digital transformation initiatives.",
          features: ["Technology assessment", "Architecture planning", "Team training", "Best practices guidance"],
          icon: "Lightbulb"
        }
      ]
    },
    testimonials: {
      title: "What Our Clients Say",
      subtitle: "Trusted by innovative companies worldwide",
      testimonials: [
        {
          name: "Sarah Chen",
          role: "CTO",
          company: "DataFlow Inc",
          content: "Their team delivered our AI-powered analytics platform ahead of schedule. The solution has increased our operational efficiency by 40%.",
          rating: 5
        },
        {
          name: "Michael Rodriguez",
          role: "Founder",
          company: "TechStart Solutions",
          content: "Outstanding development team that really understands modern technology. They built our entire SaaS platform from scratch.",
          rating: 5
        },
        {
          name: "Emily Watson",
          role: "VP of Engineering",
          company: "CloudTech Corp",
          content: "Professional, reliable, and innovative. They modernized our legacy systems without any downtime.",
          rating: 5
        }
      ]
    },
    team: {
      title: "Meet Our Technology Team",
      subtitle: "Expert technologists driving innovation",
      members: [
        {
          name: "Alex Thompson",
          role: "Lead Software Architect",
          description: "15+ years designing scalable systems for Fortune 500 companies. Specializes in microservices and cloud architecture.",
          expertise: ["System Design", "Cloud Architecture", "Microservices", "Performance Optimization"]
        },
        {
          name: "Maria Garcia",
          role: "AI/ML Engineer",
          description: "PhD in Machine Learning with expertise in deep learning and natural language processing applications.",
          expertise: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision"]
        },
        {
          name: "David Park",
          role: "DevOps Lead",
          description: "Infrastructure automation expert with extensive experience in AWS, Docker, and Kubernetes deployments.",
          expertise: ["DevOps", "AWS/Azure", "Docker", "Kubernetes"]
        }
      ]
    },
    pricing: {
      title: "Development Packages",
      subtitle: "Flexible solutions to fit your project needs",
      plans: [
        {
          name: "Starter Project",
          price: "$15,000",
          period: "project",
          description: "Perfect for MVPs and small applications",
          features: [
            "Up to 5 core features",
            "Responsive web application",
            "Basic API integration",
            "3 months support",
            "Source code delivery"
          ]
        },
        {
          name: "Growth Solution",
          price: "$45,000",
          period: "project",
          description: "Comprehensive platform for growing businesses",
          features: [
            "Full-featured application",
            "Advanced integrations",
            "Cloud deployment",
            "6 months support",
            "Performance optimization",
            "Security audit"
          ],
          highlighted: true
        },
        {
          name: "Enterprise Platform",
          price: "Custom",
          period: "quote",
          description: "Scalable solutions for large organizations",
          features: [
            "Custom architecture design",
            "Multi-platform deployment",
            "Advanced security",
            "12 months support",
            "Staff augmentation",
            "24/7 monitoring"
          ]
        }
      ]
    },
    portfolio: {
      title: "Our Technology Projects",
      subtitle: "Innovative solutions we've built for forward-thinking companies",
      projects: [
        {
          title: "AI-Powered Analytics Platform",
          description: "Real-time data processing platform serving 1M+ users with machine learning insights and predictive analytics.",
          category: "SaaS Platform",
          tags: ["React", "Python", "AWS", "Machine Learning"],
          metrics: "40% efficiency increase"
        },
        {
          title: "E-commerce Mobile App",
          description: "Cross-platform mobile application with AR try-on features and seamless checkout experience.",
          category: "Mobile Development",
          tags: ["React Native", "AR Kit", "Stripe", "Firebase"],
          metrics: "2M+ downloads"
        },
        {
          title: "IoT Fleet Management System",
          description: "Real-time tracking and management system for logistics companies with predictive maintenance.",
          category: "IoT Solution",
          tags: ["Node.js", "IoT", "Docker", "PostgreSQL"],
          metrics: "30% cost reduction"
        }
      ]
    },
    contact: {
      title: "Let's Build Something Amazing",
      description: "Ready to transform your ideas into reality? Contact our team to discuss your technology project.",
      phone: "+1 (555) 123-TECH",
      email: "hello@techsolutions.com",
      address: "123 Innovation Drive, Tech Valley, CA 94000"
    }
  },

  finance: {
    hero: {
      title: "Smart Financial Solutions for Your Future",
      subtitle: "Take control of your finances with our comprehensive suite of tools and expert guidance designed for your success.",
      primaryCTA: "Get Started",
      secondaryCTA: "Learn More",
      visualPlaceholder: "Financial Dashboard Preview"
    },
    about: {
      title: "About Our Financial Services",
      description: "With over a decade of experience, we provide trusted financial solutions that help individuals and businesses achieve their goals through strategic planning and innovative tools.",
      feature1Title: "Expert Guidance",
      feature1Description: "Certified financial advisors with decades of experience ready to help you make informed decisions.",
      feature2Title: "Secure Platform",
      feature2Description: "Bank-level security with 256-bit encryption to protect your sensitive financial information.",
      feature3Title: "Comprehensive Tools",
      feature3Description: "Complete suite of financial planning tools, calculators, and portfolio management features."
    },
    services: {
      title: "Financial Services",
      subtitle: "Comprehensive wealth management and financial planning solutions",
      services: [
        {
          title: "Investment Management",
          description: "Professional portfolio management with diversified strategies tailored to your risk tolerance and goals.",
          features: ["Portfolio optimization", "Risk assessment", "Performance monitoring", "Rebalancing strategies"],
          icon: "TrendingUp"
        },
        {
          title: "Retirement Planning",
          description: "Strategic retirement planning to ensure you maintain your lifestyle throughout your golden years.",
          features: ["401(k) optimization", "IRA planning", "Social Security strategy", "Income replacement planning"],
          icon: "PiggyBank"
        },
        {
          title: "Tax Optimization",
          description: "Minimize your tax burden through strategic planning and smart investment positioning.",
          features: ["Tax-loss harvesting", "Municipal bonds", "Roth conversions", "Estate tax planning"],
          icon: "Calculator"
        },
        {
          title: "Estate Planning",
          description: "Protect your legacy and ensure your assets are transferred according to your wishes.",
          features: ["Will preparation", "Trust setup", "Beneficiary planning", "Tax mitigation strategies"],
          icon: "Shield"
        }
      ]
    },
    testimonials: {
      title: "Client Success Stories",
      subtitle: "See how we've helped clients achieve their financial goals",
      testimonials: [
        {
          name: "Robert Johnson",
          role: "Business Owner",
          company: "Johnson Manufacturing",
          content: "Their investment strategy helped us grow our retirement fund by 45% over 3 years. Excellent service and clear communication.",
          rating: 5
        },
        {
          name: "Lisa Martinez",
          role: "Doctor",
          company: "Private Practice",
          content: "Professional financial planning that actually made sense. They simplified complex concepts and delivered real results.",
          rating: 5
        },
        {
          name: "James Wilson",
          role: "Retired Teacher",
          company: "Public Schools",
          content: "Thanks to their retirement planning, I'm enjoying a comfortable retirement without financial stress.",
          rating: 5
        }
      ]
    },
    team: {
      title: "Our Financial Advisory Team",
      subtitle: "Certified professionals dedicated to your financial success",
      members: [
        {
          name: "Jennifer Adams",
          role: "Senior Financial Advisor",
          description: "CFP with 20+ years experience in wealth management and retirement planning for high-net-worth individuals.",
          expertise: ["Wealth Management", "Retirement Planning", "Tax Strategy", "Estate Planning"]
        },
        {
          name: "Thomas Chen",
          role: "Investment Strategist",
          description: "CFA charterholder specializing in portfolio management and alternative investment strategies.",
          expertise: ["Portfolio Management", "Risk Analysis", "Alternative Investments", "Market Research"]
        },
        {
          name: "Sarah Williams",
          role: "Tax Planning Specialist",
          description: "CPA and tax attorney focusing on complex tax optimization strategies for individuals and businesses.",
          expertise: ["Tax Optimization", "Estate Tax", "Business Tax", "Tax Law"]
        }
      ]
    },
    pricing: {
      title: "Investment Management Fees",
      subtitle: "Transparent pricing based on assets under management",
      plans: [
        {
          name: "Essential Portfolio",
          price: "0.75%",
          period: "annually",
          description: "For investors getting started with professional management",
          features: [
            "Portfolio management",
            "Quarterly reviews",
            "Online account access",
            "Basic financial planning",
            "$250,000 minimum"
          ]
        },
        {
          name: "Comprehensive Wealth",
          price: "0.50%",
          period: "annually",
          description: "Full-service wealth management for serious investors",
          features: [
            "Dedicated advisor",
            "Tax optimization",
            "Estate planning",
            "Monthly reviews",
            "Priority support",
            "$1,000,000 minimum"
          ],
          highlighted: true
        },
        {
          name: "Family Office",
          price: "Custom",
          period: "quote",
          description: "Concierge-level service for ultra-high-net-worth families",
          features: [
            "Family office services",
            "Custom investment strategies",
            "Tax and legal coordination",
            "Generational planning",
            "24/7 advisor access",
            "$5,000,000 minimum"
          ]
        }
      ]
    },
    portfolio: {
      title: "Investment Success Stories",
      subtitle: "Real results for our clients' portfolios and financial goals",
      projects: [
        {
          title: "Technology Sector Growth Fund",
          description: "Diversified technology portfolio that delivered 28% annual returns over the last 3 years through strategic stock selection.",
          category: "Growth Investment",
          tags: ["Technology Stocks", "Growth Strategy", "Risk Management", "Diversification"],
          metrics: "28% average annual return"
        },
        {
          title: "Conservative Income Portfolio",
          description: "Balanced portfolio focused on dividend income and capital preservation for retirees seeking steady returns.",
          category: "Income Strategy",
          tags: ["Dividend Stocks", "Bonds", "REITs", "Conservative"],
          metrics: "6.2% dividend yield"
        },
        {
          title: "ESG Sustainable Fund",
          description: "Environmentally and socially responsible investment strategy without sacrificing performance.",
          category: "ESG Investing",
          tags: ["ESG", "Sustainable", "Impact Investing", "Green Energy"],
          metrics: "22% 5-year return"
        }
      ]
    },
    contact: {
      title: "Start Your Financial Journey",
      description: "Ready to take control of your financial future? Schedule a consultation with our certified financial advisors.",
      phone: "+1 (555) 123-MONEY",
      email: "advisors@financialpartners.com",
      address: "456 Wealth Avenue, Financial District, NY 10005"
    }
  },

  healthcare: {
    hero: {
      title: "Compassionate Healthcare for Life",
      subtitle: "Comprehensive healthcare services delivered with expertise, compassion, and state-of-the-art medical technology.",
      primaryCTA: "Book Appointment",
      secondaryCTA: "Our Services",
      visualPlaceholder: "Healthcare Dashboard"
    },
    about: {
      title: "About Our Healthcare Services",
      description: "Dedicated to providing exceptional healthcare services that improve lives and strengthen communities through compassionate care and medical excellence.",
      feature1Title: "Quality Care",
      feature1Description: "Board-certified physicians and healthcare professionals delivering evidence-based medical care.",
      feature2Title: "Modern Facilities",
      feature2Description: "State-of-the-art medical facilities with the latest diagnostic and treatment equipment.",
      feature3Title: "Patient-Centered",
      feature3Description: "Personalized care plans focused on your individual health needs and wellness goals."
    },
    services: {
      title: "Medical Services",
      subtitle: "Comprehensive healthcare solutions for you and your family",
      services: [
        {
          title: "Primary Care",
          description: "Complete primary healthcare services including preventive care, chronic disease management, and wellness programs.",
          features: ["Annual physicals", "Chronic care management", "Preventive screenings", "Health education"],
          icon: "Heart"
        },
        {
          title: "Specialty Care",
          description: "Expert specialists providing advanced care for complex medical conditions and specialized treatments.",
          features: ["Cardiology", "Orthopedics", "Dermatology", "Gastroenterology"],
          icon: "Stethoscope"
        },
        {
          title: "Urgent Care",
          description: "Walk-in medical care for non-emergency conditions when your primary doctor isn't available.",
          features: ["No appointment needed", "Extended hours", "Digital check-in", "Most insurance accepted"],
          icon: "Clock"
        },
        {
          title: "Telehealth",
          description: "Convenient virtual consultations for routine care, follow-ups, and non-emergency medical concerns.",
          features: ["Video consultations", "Prescription renewals", "Lab result reviews", "Health monitoring"],
          icon: "Video"
        }
      ]
    },
    testimonials: {
      title: "Patient Success Stories",
      subtitle: "Hear from patients whose lives we've helped improve",
      testimonials: [
        {
          name: "Margaret Thompson",
          role: "Patient",
          company: "Diabetes Management",
          content: "Dr. Johnson helped me manage my diabetes better than I ever thought possible. My A1C levels have improved dramatically.",
          rating: 5
        },
        {
          name: "Carlos Rivera",
          role: "Patient",
          company: "Cardiac Care",
          content: "The cardiac team saved my life. Professional, caring, and always available when I needed them most.",
          rating: 5
        },
        {
          name: "Susan Lee",
          role: "Patient",
          company: "Family Care",
          content: "Our family has been coming here for 5 years. They truly care about our health and well-being.",
          rating: 5
        }
      ]
    },
    team: {
      title: "Our Medical Team",
      subtitle: "Experienced healthcare professionals dedicated to your health",
      members: [
        {
          name: "Dr. Michael Johnson",
          role: "Chief Medical Officer",
          description: "Board-certified internist with 25+ years of experience in primary care and preventive medicine.",
          expertise: ["Internal Medicine", "Preventive Care", "Chronic Disease", "Diabetes Management"]
        },
        {
          name: "Dr. Sarah Kim",
          role: "Cardiologist",
          description: "Fellowship-trained cardiologist specializing in interventional cardiology and heart disease prevention.",
          expertise: ["Cardiology", "Interventional Procedures", "Heart Disease", "Preventive Cardiology"]
        },
        {
          name: "Dr. Robert Martinez",
          role: "Family Medicine",
          description: "Family medicine physician providing comprehensive care for patients of all ages.",
          expertise: ["Family Medicine", "Pediatrics", "Geriatrics", "Sports Medicine"]
        }
      ]
    },
    pricing: {
      title: "Healthcare Services Pricing",
      subtitle: "Transparent pricing for quality healthcare services",
      plans: [
        {
          name: "Basic Care Plan",
          price: "$150",
          period: "per visit",
          description: "Essential primary care services",
          features: [
            "Office consultations",
            "Basic diagnostics",
            "Prescription management",
            "Health screenings",
            "Care coordination"
          ]
        },
        {
          name: "Comprehensive Care",
          price: "$299",
          period: "per month",
          description: "Complete primary care membership",
          features: [
            "Unlimited office visits",
            "Annual physical exam",
            "Preventive screenings",
            "24/7 physician access",
            "Telehealth consultations",
            "Care plan management"
          ],
          highlighted: true
        },
        {
          name: "Executive Health",
          price: "$2,500",
          period: "annually",
          description: "Premium healthcare for busy professionals",
          features: [
            "Comprehensive health assessment",
            "Executive physical",
            "Advanced diagnostics",
            "Personalized health plan",
            "Concierge services",
            "Same-day appointments"
          ]
        }
      ]
    },
    portfolio: {
      title: "Patient Care Success",
      subtitle: "Measurable health outcomes and patient satisfaction results",
      projects: [
        {
          title: "Diabetes Management Program",
          description: "Comprehensive diabetes care program helping patients achieve better glucose control and lifestyle management.",
          category: "Chronic Care",
          tags: ["Diabetes", "Nutrition", "Monitoring", "Education"],
          metrics: "85% improved A1C levels"
        },
        {
          title: "Cardiac Rehabilitation Program",
          description: "Post-cardiac event rehabilitation program combining exercise therapy, education, and counseling.",
          category: "Rehabilitation",
          tags: ["Cardiology", "Exercise", "Nutrition", "Mental Health"],
          metrics: "95% completion rate"
        },
        {
          title: "Preventive Wellness Initiative",
          description: "Community health program focused on early detection and prevention of chronic diseases.",
          category: "Prevention",
          tags: ["Screening", "Prevention", "Community Health", "Education"],
          metrics: "40% increase in early detection"
        }
      ]
    },
    contact: {
      title: "Schedule Your Appointment",
      description: "Ready to take the next step in your health journey? Contact us to schedule an appointment with our medical team.",
      phone: "+1 (555) 123-HEALTH",
      email: "appointments@healthcarecenter.com",
      address: "789 Medical Plaza, Healthcare District, TX 75001"
    }
  },

  education: {
    hero: {
      title: "Empowering Minds, Shaping Futures",
      subtitle: "Unlock your potential with our comprehensive educational programs designed to inspire learning and drive success.",
      primaryCTA: "Enroll Now",
      secondaryCTA: "Browse Courses",
      visualPlaceholder: "Learning Platform"
    },
    about: {
      title: "About Our Educational Mission",
      description: "We believe in the transformative power of education to change lives, open opportunities, and create a better future for individuals and communities.",
      feature1Title: "Expert Instructors",
      feature1Description: "Learn from industry professionals and academic experts with real-world experience.",
      feature2Title: "Flexible Learning",
      feature2Description: "Study at your own pace with online, hybrid, and in-person learning options.",
      feature3Title: "Career Support",
      feature3Description: "Comprehensive career services including job placement assistance and networking opportunities."
    },
    services: {
      title: "Educational Programs",
      subtitle: "Comprehensive learning solutions for every stage of your journey",
      services: [
        {
          title: "Professional Certification",
          description: "Industry-recognized certification programs to advance your career and validate your expertise.",
          features: ["Industry certifications", "Hands-on projects", "Expert mentorship", "Career placement"],
          icon: "Award"
        },
        {
          title: "Skill Development",
          description: "Practical courses focused on in-demand skills for today's competitive job market.",
          features: ["Technical skills", "Soft skills training", "Project-based learning", "Peer collaboration"],
          icon: "BookOpen"
        },
        {
          title: "Corporate Training",
          description: "Customized training programs designed to upskill your team and improve organizational performance.",
          features: ["Custom curriculum", "On-site training", "Performance metrics", "Ongoing support"],
          icon: "Users"
        },
        {
          title: "Online Learning",
          description: "Flexible online courses with interactive content, virtual labs, and 24/7 access to materials.",
          features: ["Self-paced learning", "Interactive content", "Virtual labs", "Mobile access"],
          icon: "Monitor"
        }
      ]
    },
    testimonials: {
      title: "Student Success Stories",
      subtitle: "See how our programs have transformed careers and lives",
      testimonials: [
        {
          name: "Jessica Martinez",
          role: "Data Analyst",
          company: "Tech Solutions Inc",
          content: "The data science program completely changed my career. I went from entry-level to senior analyst in 18 months.",
          rating: 5
        },
        {
          name: "David Kim",
          role: "Project Manager",
          company: "Global Consulting",
          content: "The project management certification gave me the skills and confidence to lead complex projects successfully.",
          rating: 5
        },
        {
          name: "Amanda Rogers",
          role: "UX Designer",
          company: "Creative Agency",
          content: "Excellent instructors and practical projects. I built a portfolio that landed me my dream job in UX design.",
          rating: 5
        }
      ]
    },
    team: {
      title: "Our Educational Team",
      subtitle: "Passionate educators and industry experts",
      members: [
        {
          name: "Dr. Jennifer Walsh",
          role: "Academic Director",
          description: "PhD in Education with 20+ years of experience in curriculum development and educational technology.",
          expertise: ["Curriculum Design", "Educational Technology", "Learning Analytics", "Program Development"]
        },
        {
          name: "Mark Stevens",
          role: "Industry Liaison",
          description: "Former tech executive bridging the gap between industry needs and educational outcomes.",
          expertise: ["Industry Partnerships", "Career Development", "Technical Skills", "Mentorship"]
        },
        {
          name: "Lisa Chen",
          role: "Student Success Manager",
          description: "Dedicated to ensuring every student achieves their educational and career goals.",
          expertise: ["Student Support", "Career Counseling", "Academic Success", "Retention Strategies"]
        }
      ]
    },
    pricing: {
      title: "Course Pricing",
      subtitle: "Affordable education with flexible payment options",
      plans: [
        {
          name: "Individual Course",
          price: "$299",
          period: "per course",
          description: "Single course access with basic support",
          features: [
            "Course materials",
            "Video lectures",
            "Assignments & quizzes",
            "Certificate of completion",
            "3 months access"
          ]
        },
        {
          name: "Program Bundle",
          price: "$899",
          period: "per program",
          description: "Complete certification program",
          features: [
            "Multiple courses",
            "Hands-on projects",
            "Mentor support",
            "Industry certification",
            "Job placement assistance",
            "12 months access"
          ],
          highlighted: true
        },
        {
          name: "Enterprise Training",
          price: "Custom",
          period: "quote",
          description: "Corporate training solutions",
          features: [
            "Custom curriculum",
            "Dedicated trainers",
            "On-site delivery",
            "Performance tracking",
            "Ongoing support",
            "Volume discounts"
          ]
        }
      ]
    },
    portfolio: {
      title: "Program Outcomes",
      subtitle: "Real results from our educational programs",
      projects: [
        {
          title: "Data Science Bootcamp",
          description: "Intensive 12-week program covering Python, machine learning, and data visualization with real-world projects.",
          category: "Technical Training",
          tags: ["Python", "Machine Learning", "Data Visualization", "Statistics"],
          metrics: "92% job placement rate"
        },
        {
          title: "Digital Marketing Certificate",
          description: "Comprehensive digital marketing program covering SEO, social media, and analytics for modern marketers.",
          category: "Marketing",
          tags: ["SEO", "Social Media", "Analytics", "Content Marketing"],
          metrics: "40% salary increase average"
        },
        {
          title: "Leadership Development Program",
          description: "Executive leadership training program for emerging leaders in management positions.",
          category: "Leadership",
          tags: ["Leadership", "Management", "Communication", "Strategy"],
          metrics: "85% promotion rate"
        }
      ]
    },
    contact: {
      title: "Start Your Learning Journey",
      description: "Ready to advance your career through education? Contact our admissions team to find the right program for you.",
      phone: "+1 (555) 123-LEARN",
      email: "admissions@educationcenter.com",
      address: "321 Education Boulevard, Learning District, CA 90210"
    }
  },

  creative: {
    hero: {
      title: "Creative Solutions That Inspire",
      subtitle: "Transform your vision into stunning reality with our innovative design and creative services.",
      primaryCTA: "View Portfolio",
      secondaryCTA: "Start Project",
      visualPlaceholder: "Creative Showcase"
    },
    about: {
      title: "About Our Creative Studio",
      description: "We're passionate creators who believe in the power of design to tell stories, solve problems, and create emotional connections.",
      feature1Title: "Innovative Design",
      feature1Description: "Fresh, original concepts that stand out in a crowded marketplace.",
      feature2Title: "Collaborative Process",
      feature2Description: "We work closely with clients to bring their unique vision to life.",
      feature3Title: "Results-Driven",
      feature3Description: "Beautiful designs that also deliver measurable business results."
    },
    services: {
      title: "Creative Services",
      subtitle: "Comprehensive design solutions for every creative challenge",
      services: [
        {
          title: "Brand Identity Design",
          description: "Complete brand development including logos, color palettes, and brand guidelines.",
          features: ["Logo design", "Brand guidelines", "Color palette", "Typography selection"],
          icon: "Palette"
        },
        {
          title: "Web & Digital Design",
          description: "Modern, responsive websites and digital experiences that engage and convert.",
          features: ["Website design", "UI/UX design", "Mobile optimization", "User experience"],
          icon: "Monitor"
        },
        {
          title: "Print & Marketing",
          description: "Professional print materials and marketing collateral that make an impact.",
          features: ["Business cards", "Brochures", "Flyers", "Marketing materials"],
          icon: "FileText"
        },
        {
          title: "Creative Strategy",
          description: "Strategic creative direction to ensure your brand message resonates with your audience.",
          features: ["Brand strategy", "Creative direction", "Market research", "Concept development"],
          icon: "Lightbulb"
        }
      ]
    },
    testimonials: {
      title: "Client Love",
      subtitle: "See what our clients say about working with us",
      testimonials: [
        {
          name: "Sarah Johnson",
          role: "Marketing Director",
          company: "Urban Boutique",
          content: "They transformed our entire brand identity. Sales increased 60% after the rebrand launch.",
          rating: 5
        },
        {
          name: "Mike Chen",
          role: "Founder",
          company: "Tech Startup",
          content: "Incredible attention to detail and creative vision. Our website looks amazing and converts well.",
          rating: 5
        },
        {
          name: "Lisa Rodriguez",
          role: "Restaurant Owner",
          company: "Bella Vista",
          content: "Professional, creative, and delivered exactly what we envisioned. Highly recommended!",
          rating: 5
        }
      ]
    },
    team: {
      title: "Creative Team",
      subtitle: "Talented designers and strategists passionate about great design",
      members: [
        {
          name: "Alexandra Torres",
          role: "Creative Director",
          description: "Award-winning designer with 15+ years creating memorable brand experiences for global clients.",
          expertise: ["Brand Strategy", "Creative Direction", "Design Leadership", "Client Relations"]
        },
        {
          name: "Jordan Kim",
          role: "Senior Designer",
          description: "Digital design specialist focused on user experience and conversion optimization.",
          expertise: ["UI/UX Design", "Web Design", "User Research", "Prototyping"]
        },
        {
          name: "Carlos Martinez",
          role: "Brand Strategist",
          description: "Strategic thinker who helps brands find their unique voice and market position.",
          expertise: ["Brand Strategy", "Market Research", "Positioning", "Messaging"]
        }
      ]
    },
    pricing: {
      title: "Design Packages",
      subtitle: "Flexible pricing options to fit your creative needs",
      plans: [
        {
          name: "Brand Essentials",
          price: "$2,500",
          period: "package",
          description: "Complete brand identity for new businesses",
          features: [
            "Logo design & variations",
            "Brand color palette",
            "Typography selection",
            "Basic brand guidelines",
            "Business card design"
          ]
        },
        {
          name: "Complete Branding",
          price: "$5,000",
          period: "package",
          description: "Comprehensive brand development and website",
          features: [
            "Full brand identity",
            "Website design & development",
            "Marketing materials",
            "Social media templates",
            "Brand strategy consultation",
            "6 months support"
          ],
          highlighted: true
        },
        {
          name: "Enterprise Design",
          price: "Custom",
          period: "quote",
          description: "Large-scale design projects and ongoing support",
          features: [
            "Custom design solutions",
            "Dedicated design team",
            "Brand management",
            "Print & digital campaigns",
            "Ongoing design support",
            "Priority service"
          ]
        }
      ]
    },
    portfolio: {
      title: "Our Creative Work",
      subtitle: "A showcase of brands we've helped bring to life",
      projects: [
        {
          title: "Urban Boutique Rebrand",
          description: "Complete brand transformation for a fashion retailer, including logo, website, and marketing materials.",
          category: "Brand Identity",
          tags: ["Branding", "Web Design", "Fashion", "Retail"],
          metrics: "60% sales increase"
        },
        {
          title: "Tech Startup Website",
          description: "Modern, conversion-focused website design for a B2B SaaS platform with emphasis on user experience.",
          category: "Web Design",
          tags: ["Web Design", "UI/UX", "SaaS", "B2B"],
          metrics: "40% conversion improvement"
        },
        {
          title: "Restaurant Brand Identity",
          description: "Elegant brand identity and marketing materials for an upscale dining establishment.",
          category: "Brand & Print",
          tags: ["Branding", "Print Design", "Restaurant", "Hospitality"],
          metrics: "25% increase in reservations"
        }
      ]
    },
    contact: {
      title: "Let's Create Together",
      description: "Ready to bring your creative vision to life? Contact our design team to start your project.",
      phone: "+1 (555) 123-CREATE",
      email: "hello@creativestudio.com",
      address: "456 Design Avenue, Creative District, NY 10001"
    }
  },

  corporate: {
    hero: {
      title: "Professional Business Solutions",
      subtitle: "Comprehensive corporate services designed to drive growth, efficiency, and long-term success for your organization.",
      primaryCTA: "Schedule Consultation",
      secondaryCTA: "Our Services",
      visualPlaceholder: "Corporate Dashboard"
    },
    about: {
      title: "About Our Corporate Services",
      description: "With decades of combined experience, we provide strategic business solutions that help organizations optimize operations, manage growth, and achieve sustainable success.",
      feature1Title: "Strategic Expertise",
      feature1Description: "Proven methodologies and best practices from industry experts.",
      feature2Title: "Scalable Solutions",
      feature2Description: "Services that grow with your business and adapt to changing needs.",
      feature3Title: "Measurable Results",
      feature3Description: "Data-driven approaches that deliver quantifiable business outcomes."
    },
    services: {
      title: "Corporate Services",
      subtitle: "Comprehensive business solutions for modern organizations",
      services: [
        {
          title: "Strategic Consulting",
          description: "Expert guidance on business strategy, market positioning, and growth planning.",
          features: ["Business strategy", "Market analysis", "Competitive positioning", "Growth planning"],
          icon: "Target"
        },
        {
          title: "Operations Management",
          description: "Optimize your operations for maximum efficiency and productivity.",
          features: ["Process optimization", "Quality management", "Supply chain", "Performance metrics"],
          icon: "Settings"
        },
        {
          title: "Financial Advisory",
          description: "Corporate finance, budgeting, and investment guidance for sustainable growth.",
          features: ["Financial planning", "Budget management", "Investment strategy", "Risk assessment"],
          icon: "DollarSign"
        },
        {
          title: "Change Management",
          description: "Navigate organizational change with expert guidance and proven frameworks.",
          features: ["Change strategy", "Employee engagement", "Training programs", "Implementation support"],
          icon: "TrendingUp"
        }
      ]
    },
    testimonials: {
      title: "Corporate Success Stories",
      subtitle: "Trusted by leading organizations worldwide",
      testimonials: [
        {
          name: "Robert Williams",
          role: "CEO",
          company: "Global Manufacturing Inc",
          content: "Their strategic guidance helped us navigate a complex merger and achieve 30% cost savings.",
          rating: 5
        },
        {
          name: "Jennifer Davis",
          role: "COO",
          company: "Tech Solutions Corp",
          content: "Exceptional operational expertise that streamlined our processes and improved efficiency by 45%.",
          rating: 5
        },
        {
          name: "Michael Brown",
          role: "CFO",
          company: "Financial Services Group",
          content: "Professional, knowledgeable, and delivered results that exceeded our expectations.",
          rating: 5
        }
      ]
    },
    team: {
      title: "Executive Team",
      subtitle: "Experienced professionals dedicated to your business success",
      members: [
        {
          name: "William Anderson",
          role: "Managing Partner",
          description: "Former Fortune 500 executive with 25+ years of experience in strategic planning and organizational development.",
          expertise: ["Strategic Planning", "Executive Leadership", "M&A", "Organizational Development"]
        },
        {
          name: "Patricia Lee",
          role: "Operations Director",
          description: "Operations expert specializing in process optimization and performance improvement.",
          expertise: ["Operations Management", "Process Optimization", "Quality Systems", "Lean Six Sigma"]
        },
        {
          name: "Richard Taylor",
          role: "Financial Advisor",
          description: "CPA and financial strategist with extensive corporate finance and investment experience.",
          expertise: ["Corporate Finance", "Investment Strategy", "Risk Management", "Financial Planning"]
        }
      ]
    },
    pricing: {
      title: "Service Packages",
      subtitle: "Professional consulting services tailored to your needs",
      plans: [
        {
          name: "Strategic Advisory",
          price: "$10,000",
          period: "per month",
          description: "Ongoing strategic guidance and advisory services",
          features: [
            "Monthly strategic reviews",
            "Market analysis reports",
            "Performance dashboards",
            "Executive access",
            "Quarterly planning sessions"
          ]
        },
        {
          name: "Comprehensive Consulting",
          price: "$25,000",
          period: "per month",
          description: "Full-service consulting and implementation support",
          features: [
            "Dedicated consulting team",
            "Custom solutions development",
            "Implementation management",
            "Training and development",
            "24/7 support access",
            "Quarterly business reviews"
          ],
          highlighted: true
        },
        {
          name: "Enterprise Partnership",
          price: "Custom",
          period: "quote",
          description: "Long-term strategic partnership for large organizations",
          features: [
            "Embedded consulting team",
            "Custom solution architecture",
            "Change management",
            "Executive coaching",
            "Performance guarantees",
            "Global support"
          ]
        }
      ]
    },
    portfolio: {
      title: "Corporate Success Stories",
      subtitle: "Real results for real businesses across industries",
      projects: [
        {
          title: "Manufacturing Optimization Project",
          description: "Streamlined operations and reduced costs by 30% for a global manufacturing company through process optimization.",
          category: "Operations Consulting",
          tags: ["Operations", "Manufacturing", "Cost Reduction", "Process Optimization"],
          metrics: "30% cost reduction"
        },
        {
          title: "Digital Transformation Initiative",
          description: "Led complete digital transformation for a traditional retailer, resulting in 50% improvement in customer satisfaction.",
          category: "Strategic Consulting",
          tags: ["Digital Transformation", "Retail", "Customer Experience", "Technology"],
          metrics: "50% satisfaction improvement"
        },
        {
          title: "Merger Integration Program",
          description: "Successfully managed the integration of two financial services companies, achieving synergy targets 6 months early.",
          category: "Change Management",
          tags: ["M&A", "Integration", "Financial Services", "Change Management"],
          metrics: "6 months ahead of schedule"
        }
      ]
    },
    contact: {
      title: "Partner With Us",
      description: "Ready to take your business to the next level? Contact our team to discuss your corporate needs.",
      phone: "+1 (555) 123-CORP",
      email: "partnerships@corporatesolutions.com",
      address: "789 Business Plaza, Corporate Center, NY 10017"
    }
  }
}

export function getIndustryContent(industry: string): IndustryContent {
  return INDUSTRY_CONTENT[industry] || INDUSTRY_CONTENT.tech
}

export function getIndustryServices(industry: string, projectType?: string) {
  const content = getIndustryContent(industry)
  return content.services
}

export function getIndustryTestimonials(industry: string) {
  const content = getIndustryContent(industry)
  return content.testimonials
}

export function getIndustryTeam(industry: string) {
  const content = getIndustryContent(industry)
  return content.team
}

export function getIndustryPricing(industry: string) {
  const content = getIndustryContent(industry)
  return content.pricing
}

export function getIndustryPortfolio(industry: string) {
  const content = getIndustryContent(industry)
  return content.portfolio
}