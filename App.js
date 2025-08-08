import "./styles.css";
import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import Chart from "chart.js/auto";

// --- SVG Icons (No changes, keeping them as they are) ---
const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);
const JobsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="16" height="20" x="4" y="2" rx="2" />
    <line x1="12" x2="12" y1="18" y2="12" />
    <line x1="8" x2="16" y1="6" y2="6" />
  </svg>
);
const ApplicantsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const ClientsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="m21.7 16.4-.9-.3" />
    <path d="m15.2 13.9-.9-.3" />
    <path d="m16.6 18.7.3-.9" />
    <path d="m19.1 12.2.3-.9" />
    <path d="m19.6 18.7-.4-1" />
    <path d="m17.1 12.2-.4-1" />
    <path d="m14.3 16.6 1-.4" />
    <path d="m20.7 13.8 1-.4" />
  </svg>
);
const PostJobIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);
const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const AuditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4" />
    <path d="M9 12h6" />
    <path d="M9 16h6" />
    <path d="M9 8h6" />
  </svg>
);
const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const NotificationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);
const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);
const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);
const SparklesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.94 14.34 8.5 13l-1.44 1.34L4 17l2.66 1.44L8 21l1.34-2.56L12 17l-2.06-2.66Z" />
    <path d="M18 4h.01" />
    <path d="M21.5 10.5h.01" />
    <path d="M16 16h.01" />
    <path d="M18.5 15.5h.01" />
    <path d="M12.5 2.5h.01" />
    <path d="m21 6-2.5 1.5L17 5l-1.5 2.5L13 6l1.5 2.5L13 11l2.5-1.5L17 12l1.5-2.5L21 11l-1.5-2.5Z" />
  </svg>
);
const ExternalLinkIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
const PerformanceIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const HistoryIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v5h5" />
        <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" />
    </svg>
);


// --- Chart Component ---
const ChartComponent = ({ type, data, options }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    if (!chartRef.current) return;
    const chart = new Chart(chartRef.current, {
      type,
      data,
      options: { responsive: true, maintainAspectRatio: false, ...options },
    });
    return () => chart.destroy();
  }, [type, data, options]);
  return <canvas ref={chartRef}></canvas>;
};

// --- Application Context for State Management ---
const AppContext = createContext(null);

// --- MOCK DATABASES ---
const MOCK_USERS_DB = [
  { id: 1, name: "Recruiter", email: "recruiter@buxton.com", role: "recruiter", managerId: 5, status: 'Active' },
  { id: 2, name: "Account Manager", email: "manager@buxton.com", role: "account_manager", managerId: 5, status: 'Active' },
  { id: 3, name: "Admin", email: "admin@buxton.com", role: "admin", managerId: null, status: 'Active' },
  { id: 4, name: "Technical Reviewer", email: "tech@buxton.com", role: "technical_manager", managerId: 5, status: 'Active' },
  { id: 5, name: "Executive", email: "executive@buxton.com", role: "executive", managerId: null, status: 'Active' },
];

const MOCK_PEOPLE_DB = [
    { personId: 501, name: "Betsy Crabtree", linkedIn: 'linkedin.com/in/betsy' },
    { personId: 502, name: "John Carmack", linkedIn: 'linkedin.com/in/johnc' },
    { personId: 503, name: "Peter Jones", linkedIn: 'linkedin.com/in/peterj' },
    { personId: 504, name: "Rob Pike", linkedIn: 'linkedin.com/in/robpike' },
];

const MOCK_CLIENTS = [
  {
    id: 1,
    name: "InnovateAI",
    address: "123 Tech Way, San Francisco, CA",
    notes: "High priority client, focus on AI/ML roles. Fast-paced environment.",
    satisfaction: 95,
    avgTimeToFill: 28,
    contacts: [
      { contactId: 10, personId: 501, position: "Director of Engineering", email: "betsy.c@innovate.ai" },
      { contactId: 11, personId: 502, position: "Lead SRE", email: "jc@innovate.ai" },
    ],
  },
  {
    id: 2,
    name: "DesignHub",
    address: "456 Creative Ave, Boston, MA",
    notes: "Looking for top-tier design talent. Portfolio is key.",
    satisfaction: 92,
    avgTimeToFill: 45,
    contacts: [
        { contactId: 20, personId: 503, position: "Creative Director", email: "peter.jones@designhub.com"},
    ]
  },
  {
    id: 3,
    name: "GoSystems",
    address: "789 Server St, Austin, TX",
    notes: "New client, focus on backend Go developers.",
    satisfaction: 90,
    avgTimeToFill: 32,
    contacts: [
        { contactId: 30, personId: 504, position: "Distinguished Engineer", email: "rob.pike@gosystems.com"},
        // Example of the same person at another company
        { contactId: 31, personId: 501, position: "VP of Technology", email: "b.crabtree@gosystems.com"},
    ]
  },
];

const MOCK_CANDIDATES = [
  {
    id: 101,
    name: "John Smith",
    role: "Senior AI Engineer",
    experience: "8 years",
    education: "MS CS, Stanford",
    location: "San Francisco, CA",
    phone: "415-555-1234",
    skills: ["Python", "PyTorch", "TensorFlow", "GCP", "Kubernetes", "FastAPI"],
    availabilityStatus: "Available",
    pipelineStatus: "Pending Technical Review",
    statusHistory: [
      { status: "Applied", date: "2025-07-25", actor: "System" },
      {
        status: "Pending Technical Review",
        date: "2025-07-28",
        actor: "Recruiter",
      },
    ],
    notes: "Strong technical background, good communication skills.",
    feedback: {
      recruiter: "Excellent fit, let's get a technical screen.",
      technical: "",
      manager: "",
    },
    resumes: [{ name: "JohnSmith_Resume_AI.pdf", date: "2025-07-28" }],
    associatedJobId: 1,
    aiMatch: 95,
  },
  {
    id: 102,
    name: "Alex Johnson",
    role: "Frontend Developer",
    experience: "5 years",
    education: "BS IS, NYU",
    location: "New York, NY",
    phone: "212-555-5678",
    skills: ["React", "TypeScript", "Next.js", "GraphQL", "TailwindCSS"],
    availabilityStatus: "Available",
    pipelineStatus: "Applied",
    statusHistory: [{ status: "Applied", date: "2025-07-30", actor: "System" }],
    notes: "Great portfolio, but communication skills need to be assessed.",
    feedback: {
      recruiter: "Potential fit, needs screening call.",
      technical: "",
      manager: "",
    },
    resumes: [],
    associatedJobId: 1,
    aiMatch: 88,
  },
  {
    id: 103,
    name: "Sarah Johnson",
    role: "UX/UI Designer",
    experience: "5 years",
    education: "MFA Design, RISD",
    location: "Boston, MA",
    phone: "617-555-8765",
    skills: ["Figma", "Sketch", "Adobe XD", "User Research", "Prototyping"],
    availabilityStatus: "Available",
    pipelineStatus: "Pending ACM Review",
    statusHistory: [
      { status: "Applied", date: "2025-07-26", actor: "System" },
      {
        status: "Technical Review Passed",
        date: "2025-07-29",
        actor: "Technical Reviewer",
      },
      {
        status: "Pending ACM Review",
        date: "2025-07-29",
        actor: "Recruiter",
      },
    ],
    notes: "Top candidate, great portfolio.",
    feedback: {
      recruiter: "Exceptional design sense.",
      technical: "Portfolio is strong, understands user-centric principles.",
      manager: "",
    },
    resumes: [],
    associatedJobId: 2,
    aiMatch: 92,
  },
  {
    id: 104,
    name: "Maria Garcia",
    role: "Data Scientist",
    experience: "6 years",
    education: "PhD Physics, MIT",
    location: "Remote",
    phone: "857-555-1122",
    skills: ["Python", "R", "SQL", "Scikit-learn", "Tableau"],
    availabilityStatus: "Available",
    pipelineStatus: "Interview Scheduled",
    statusHistory: [
      { status: "Applied", date: "2025-07-20", actor: "System" },
      { status: "Pending ACM Review", date: "2025-07-22", actor: "Recruiter" },
      { status: "Ready for Interview", date: "2025-07-25", actor: "Account Manager" },
      { status: "Interview Scheduled", date: "2025-07-28", actor: "Recruiter" },
    ],
    notes: "Excellent research background.",
    feedback: {
      recruiter: "Very promising, scheduled interview.",
      technical: "",
      manager: "Looks great, let's talk to her.",
    },
    resumes: [],
    associatedJobId: 3,
    aiMatch: 98,
  },
  {
    id: 105,
    name: "Chen Wei",
    role: "Backend Engineer",
    experience: "4 years",
    education: "BS CS, Waterloo",
    location: "Toronto, ON",
    phone: "416-555-9988",
    skills: ["Go", "gRPC", "PostgreSQL", "Docker", "AWS"],
    availabilityStatus: "Available",
    pipelineStatus: "Pending Technical Review",
    statusHistory: [
      { status: "Applied", date: "2025-07-29", actor: "System" },
      { status: "Pending Technical Review", date: "2025-07-30", actor: "Recruiter" },
    ],
    notes: "Solid Go experience for a mid-level role.",
    feedback: {
      recruiter: "Good fit for the new backend role.",
      technical: "",
      manager: "",
    },
    resumes: [],
    associatedJobId: 4,
    aiMatch: 91,
  },
];

const MOCK_JOBS = [
  {
    id: 1,
    clientId: 1,
    title: "Senior AI Engineer",
    location: "San Francisco, CA (Remote)",
    type: "Contract-to-Hire",
    duration: "6 months",
    employmentType: "W2",
    startDate: "2025-09-01",
    salary: "$180k - $220k",
    posted: "2d ago",
    status: "Open",
    recruiterId: 1,
    hiredCandidateId: null,
    description:
      "Seeking a Senior AI Engineer with expertise in building and deploying large-scale machine learning models. You will be working with Python, PyTorch, and modern MLOps tools on a cloud-native stack. Experience with NLP and computer vision is a huge plus.",
    internalNotes: "Hiring manager is very particular about production deployment experience. Avoid candidates who are purely research-focused.",
    responsibilities: [
      "Design and implement ML models for production.",
      "Collaborate with MLOps to streamline model deployment.",
      "Mentor junior engineers.",
    ],
    keySkills: ["Python", "PyTorch", "TensorFlow", "GCP", "Kubernetes"],
  },
  {
    id: 2,
    clientId: 2,
    title: "UX/UI Designer",
    location: "Boston, MA (Hybrid)",
    type: "Full-time",
    duration: "N/A",
    employmentType: "W2",
    startDate: "2025-08-20",
    salary: "$110k - $140k",
    posted: "1w ago",
    status: "Open",
    recruiterId: 1,
    hiredCandidateId: null,
    description:
      "We are looking for a creative UX/UI Designer to create amazing user experiences. The ideal candidate should have a strong portfolio of design projects and proficiency in Figma, Sketch, and Adobe Creative Suite. Experience with user research and usability testing is a must.",
    internalNotes: "",
    responsibilities: [],
    keySkills: ["Figma", "Sketch", "User Research"],
  },
  {
    id: 3,
    clientId: 1,
    title: "Data Scientist",
    location: "Remote",
    type: "Full-time",
    duration: "N/A",
    employmentType: "Corp-to-Corp",
    startDate: "2025-09-15",
    salary: "$150k - $190k",
    posted: "5d ago",
    status: "Open",
    recruiterId: 1,
    hiredCandidateId: null,
    description: "Data Scientist with a knack for statistical modeling and data visualization.",
    internalNotes: "Client is open to Corp-to-Corp for this role.",
    responsibilities: [],
    keySkills: ["Python", "R", "SQL", "Tableau"],
  },
  {
    id: 4,
    clientId: 3,
    title: "Backend Engineer (Go)",
    location: "Austin, TX (On-site)",
    type: "Full-time",
    duration: "N/A",
    employmentType: "W2",
    startDate: "2025-08-25",
    salary: "$130k - $160k",
    posted: "3d ago",
    status: "Open",
    recruiterId: 1,
    hiredCandidateId: null,
    description:
      "Join our backend team to build scalable microservices. You will work with Go, gRPC, Docker, and Kubernetes on an AWS cloud infrastructure. Experience with message queues like RabbitMQ or Kafka is a plus.",
    internalNotes: "This is a high-priority role for a new client project.",
    responsibilities: [],
    keySkills: ["Go", "gRPC", "AWS", "Docker"],
  },
];

// Add client name to jobs
MOCK_JOBS.forEach((job) => {
  const client = MOCK_CLIENTS.find((c) => c.id === job.clientId);
  job.client = client ? client.name : "Unknown Client";
});

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    text: "New applicant: Alex Johnson applied for Frontend Developer.",
    unread: true,
  },
  {
    id: 2,
    text: "Status for John Smith changed to Pending Technical Review.",
    unread: true,
  },
  { id: 3, text: "System maintenance scheduled for Aug 5, 10 PM UTC.", unread: true },
  { id: 4, text: "New Job: Data Scientist posted by Account Manager", unread: false }
];

const MOCK_AUDIT_LOGS = [
    { id: 1, timestamp: "2025-08-04 18:30:15", user: "Admin", action: "USER_ROLE_UPDATED", details: "Changed role for recruiter@buxton.com to 'recruiter' (manager)" },
    { id: 2, timestamp: "2025-08-04 17:05:00", user: "Recruiter", action: "CANDIDATE_STATUS_CHANGED", details: "John Smith -> Pending Technical Review for job 'Senior AI Engineer'" },
    { id: 3, timestamp: "2025-08-03 11:20:45", user: "Account Manager", action: "JOB_UPDATED", details: "Updated salary for 'UX/UI Designer' to $115k - $145k" },
    { id: 4, timestamp: "2025-08-02 09:00:00", user: "System", action: "SCORE_RECALCULATED", details: "Score for John Smith changed 92% -> 95% due to updated skills on 'Senior AI Engineer' job." },
];

const AppProvider = ({ children }) => {
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [candidates, setCandidates] = useState(MOCK_CANDIDATES);
  const [clients, setClients] = useState(MOCK_CLIENTS);
  const [users, setUsers] = useState(MOCK_USERS_DB);
  const [people, setPeople] = useState(MOCK_PEOPLE_DB);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 750); // Simulate initial data fetch
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const updateCandidateStatus = (candidateId, status, actor) => {
    setCandidates(
      candidates.map((c) =>
        c.id === candidateId
          ? {
              ...c,
              pipelineStatus: status,
              statusHistory: [
                ...c.statusHistory,
                { status, date: new Date().toISOString().slice(0, 10), actor },
              ],
            }
          : c
      )
    );
    showToast(`Status updated to "${status}"`);
  };

  const updateCandidateFeedback = (candidateId, feedback, actor) => {
    setCandidates(
      candidates.map((c) => {
        if (c.id === candidateId) {
          const newFeedback = { ...c.feedback, ...feedback };
          let newStatus = c.pipelineStatus;

          if (feedback.technical && c.pipelineStatus === "Pending Technical Review") {
            newStatus = "Technical Review Passed";
          } else if (feedback.manager && c.pipelineStatus === "Pending ACM Review") {
            // This is handled by the submit buttons now, but leaving as a fallback
            newStatus = "Pending Client Review"; 
          }

          if (newStatus !== c.pipelineStatus) {
            updateCandidateStatus(candidateId, newStatus, actor);
            return {
              ...c,
              feedback: newFeedback,
              pipelineStatus: newStatus,
              statusHistory: [
                ...c.statusHistory,
                {
                  status: newStatus,
                  date: new Date().toISOString().slice(0, 10),
                  actor,
                },
              ],
            };
          }
          return { ...c, feedback: newFeedback };
        }
        return c;
      })
    );
    showToast("Feedback submitted successfully!");
  };

  const addJob = (jobData) => {
    const newJob = {
      id: Date.now(),
      clientId: parseInt(jobData.client),
      ...jobData,
      posted: "Just now",
      status: "Open",
      candidates: [],
      responsibilities: [],
    };
    const client = clients.find((c) => c.id === newJob.clientId);
    newJob.client = client ? client.name : "Unknown Client";
    setJobs((prevJobs) => [newJob, ...prevJobs]);
    showToast("New job posted successfully!");
  };

  const addClient = (clientData) => {
    const newPersonId = Date.now();
    const newPerson = { personId: newPersonId, name: clientData.contactName };
    setPeople(prev => [...prev, newPerson]);

    const newClient = {
      id: Date.now() + 1,
      name: clientData.name,
      notes: clientData.notes,
      contacts: [
        {
          contactId: Date.now() + 2,
          personId: newPersonId,
          email: clientData.contactEmail,
          position: clientData.contactPosition,
        },
      ],
    };
    setClients((prev) => [newClient, ...prev]);
    showToast("New client added successfully!");
  };
  
  const addContact = (clientId, contactData) => {
    let person = people.find(p => p.name.toLowerCase() === contactData.name.toLowerCase());
    let personId;

    if (!person) {
        personId = Date.now();
        setPeople(prev => [...prev, { personId, name: contactData.name }]);
    } else {
        personId = person.personId;
    }

    setClients(clients.map(client => {
        if(client.id === clientId) {
            return {
                ...client,
                contacts: [...client.contacts, { contactId: Date.now() + 1, personId, ...contactData }]
            }
        }
        return client;
    }));
    showToast("Contact added successfully!");
  }

  const updateUser = (userId, newRole) => {
    setUsers(users.map(u => u.id === userId ? {...u, role: newRole} : u));
    showToast("User role updated!");
  }

  const value = {
    jobs,
    candidates,
    clients,
    users,
    people,
    loading,
    updateCandidateStatus,
    updateCandidateFeedback,
    addJob,
    addClient,
    addContact,
    updateUser,
    showToast,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {toast.show && <Toast message={toast.message} />}
    </AppContext.Provider>
  );
};

const useAppData = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useAppData must be used within an AppProvider");
  }
  return context;
};

// --- Helper & Utility Components ---
const Toast = ({ message }) => (
  <div className="fixed bottom-5 right-5 bg-slate-900 text-white py-2 px-4 rounded-lg shadow-lg animate-fade-in-out z-50">
    {message}
  </div>
);

const Spinner = () => (
    <div className="flex justify-center items-center h-full">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

const EmptyState = ({ message, onAction, actionText }) => (
    <div className="text-center py-10 px-4 bg-white rounded-lg border">
        <p className="text-slate-500">{message}</p>
        {onAction && actionText && (
            <button
              onClick={onAction}
              className="mt-4 flex items-center mx-auto gap-2 bg-teal-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-teal-700"
            >
              <PlusIcon /> {actionText}
            </button>
        )}
    </div>
);

// --- Main App Components ---
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const user = MOCK_USERS_DB.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (user && password === "password") {
      onLogin(user);
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 h-full bg-slate-900 flex flex-col justify-between p-12 text-white relative overflow-hidden">
        <div>
          <h1 className="text-3xl font-bold">Gray Matter</h1>
          <p className="text-slate-400">by Buxton Consulting</p>
        </div>
        <div className="z-10">
          <p className="text-4xl font-bold leading-tight">
            Transform Recruitment into a Strategic Advantage.
          </p>
          <p className="text-slate-300 mt-4">
            Our Talent Intelligence Platform uses advanced AI to find, evaluate,
            and secure the best talent, faster and with less bias.
          </p>
        </div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-teal-500 rounded-full opacity-20"></div>
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-teal-500 rounded-full opacity-20"></div>
      </div>
      <div className="w-1/2 h-full bg-slate-50 flex items-center justify-center">
        <div className="w-full max-w-sm p-8">
          <div className="text-left mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
            <p className="text-sm text-slate-500">
              Sign in to continue to Gray Matter
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                />
              </div>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="mt-6 p-4 bg-slate-100 rounded-lg text-xs text-slate-600">
            <h4 className="font-semibold mb-2">Demo Credentials:</h4>
            {MOCK_USERS_DB.map((user) => (
              <p key={user.id}>
                <strong>Email:</strong> {user.email} ({user.name})
              </p>
            ))}
            <p className="mt-1">
              <strong>Password (for all):</strong> password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppLayout = ({ user, onLogout }) => {
  const [activePage, setActivePage] = useState("dashboard");
  const [pageContext, setPageContext] = useState(null);
  const [candidateForEvaluation, setCandidateForEvaluation] = useState(null);
  const [candidateForDetailView, setCandidateForDetailView] = useState(null);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCommandBar, setShowCommandBar] = useState(false);
  const { candidates, jobs, loading, users } = useAppData();
  
  const isManager = users.some(u => u.managerId === user.id);

  useEffect(() => {
    const handleKeyDown = (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            setShowCommandBar(prev => !prev);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const pagePermissions = {
    dashboard: ["admin", "account_manager", "recruiter", "executive", "technical_manager"],
    jobs: ["account_manager", "recruiter", "executive"],
    applicants: ["recruiter"],
    clients: ["account_manager"],
    clientDetail: ["account_manager"],
    users: ["admin"],
    audit: ["admin"],
    "technical-review": ["technical_manager"],
    "review-history": ["technical_manager"],
    performance: ["executive", "recruiter", "account_manager"],
  };

  const navConfig = {
    admin: [
      { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
      { id: "users", label: "User Management", icon: <UsersIcon /> },
      { id: "audit", label: "Audit Trail", icon: <AuditIcon /> },
    ],
    executive: [
      { id: "dashboard", label: "Executive Summary", icon: <DashboardIcon /> },
      { id: "jobs", label: "Job Overview", icon: <JobsIcon /> },
      { id: "performance", label: "Performance", icon: <PerformanceIcon />, },
    ],
    account_manager: [
        { id: "dashboard", label: isManager ? "Sales Dashboard" : "Dashboard", icon: <DashboardIcon /> },
        { id: "clients", label: "Clients", icon: <ClientsIcon /> },
        { id: "jobs", label: isManager ? "All Jobs" : "My Jobs", icon: <JobsIcon /> },
        isManager && { id: "performance", label: "Team Performance", icon: <PerformanceIcon /> },
    ].filter(Boolean),
    recruiter: [
        { id: "dashboard", label: isManager ? "Recruiting Dashboard" : "Dashboard", icon: <DashboardIcon /> },
        { id: "jobs", label: isManager ? "All Jobs" : "My Jobs", icon: <JobsIcon /> },
        { id: "applicants", label: isManager ? "All Applicants" : "My Applicants", icon: <ApplicantsIcon /> },
        isManager && { id: "performance", label: "Team Performance", icon: <PerformanceIcon /> },
    ].filter(Boolean),
    technical_manager: [
      { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
      {
        id: "technical-review",
        label: "Profiles to Review",
        icon: <ApplicantsIcon />,
      },
      { id: "review-history", label: "Review History", icon: <HistoryIcon /> },
    ],
  };

  const handleNavigate = (page, context = null) => {
    setActivePage(page);
    setPageContext(context);
    setShowCommandBar(false);
  };

  const handleOpenCandidate = (candidateId, contextType = 'detail') => {
      const candidate = candidates.find((c) => c.id === candidateId);
      if (!candidate) {
          setActivePage('not-found');
          return;
      }
      const job = jobs.find(j => j.id === candidate.associatedJobId);
      const fullCandidateProfile = { ...candidate, job };

      if (contextType === 'evaluation') {
          setCandidateForEvaluation(fullCandidateProfile);
      } else {
          setCandidateForDetailView(fullCandidateProfile);
      }
      setShowCommandBar(false);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };
  
  const getInitials = (name) => {
      if (!name) return "";
      const parts = name.split(' ');
      if (parts.length > 1) {
          return parts[0][0] + parts[parts.length - 1][0];
      }
      return name.substring(0, 2);
  }

  const renderPage = () => {
    if (loading) return <Spinner />;

    const pageProps = {
      user,
      onNavigate: handleNavigate,
      onOpenCandidate: handleOpenCandidate,
      context: pageContext,
      isManager,
    };

    const allowedRoles = pagePermissions[activePage];
    if (!allowedRoles || !allowedRoles.includes(user.role)) {
      return <AccessDeniedPage />;
    }

    switch (activePage) {
      case "dashboard":
        if (user.role === "admin") return <AdminDashboard {...pageProps} />;
        if (user.role === "executive") return <ExecutiveDashboard {...pageProps} />;
        if (user.role === "account_manager")
          return <AccountManagerDashboard {...pageProps} />;
        if (user.role === "recruiter") return <RecruiterDashboard {...pageProps} />;
        if (user.role === "technical_manager")
          return <TechnicalManagerDashboard {...pageProps} />;
        return null;
      case "jobs":
        return <JobsPage {...pageProps} />;
      case "applicants":
        return <ApplicantsPage {...pageProps} />;
      case "clients":
        return <ClientsPage {...pageProps} />;
      case "clientDetail":
        return <ClientDetailPage {...pageProps} />;
      case "post-job":
        return <PostJobPage onJobPosted={() => handleNavigate("jobs")} context={pageContext} />;
      case "users":
        return <UserManagementPage {...pageProps} />;
      case "audit":
        return <AuditTrail {...pageProps} />;
      case "technical-review":
        return <TechnicalReviewPage {...pageProps} />;
      case "review-history":
        return <ReviewHistoryPage {...pageProps} />;
      case "performance":
        return <TeamPerformancePage {...pageProps} />;
      case "not-found":
        return <NotFoundPage onNavigate={handleNavigate} />;
      default:
        return <NotFoundPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-50 font-sans">
      {candidateForEvaluation && (
        <CandidateProfileModal
          candidate={candidateForEvaluation}
          onClose={() => setCandidateForEvaluation(null)}
          user={user}
        />
      )}
      {candidateForDetailView && (
        <CandidateDetailModal
          candidate={candidateForDetailView}
          onClose={() => setCandidateForDetailView(null)}
        />
      )}
      {showCommandBar && (
        <CommandBar 
            onNavigate={handleNavigate} 
            onOpenCandidate={handleOpenCandidate} 
            onClose={() => setShowCommandBar(false)}
        />
      )}

      <aside className="w-64 bg-white border-r border-slate-200 p-4 flex-shrink-0 flex flex-col">
        <div>
          <h1 className="text-xl font-bold text-slate-800 px-2">Gray Matter</h1>
          <p className="text-xs text-slate-400 px-2 -mt-1">
            by Buxton Consulting
          </p>
        </div>
        <nav className="mt-8 space-y-1 flex-grow">
          {navConfig[user.role].map((item) => (
            <a
              key={item.id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate(item.id);
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activePage === item.id || (activePage === 'clientDetail' && item.id === 'clients')
                  ? "bg-teal-50 text-teal-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.icon} {item.label}
            </a>
          ))}
        </nav>
        <div className="border-t border-slate-200 pt-4 mt-4">
          <button
            onClick={onLogout}
            className="w-full p-2 text-sm text-slate-500 hover:bg-slate-100 rounded-md text-left flex items-center gap-2"
          >
            <LogoutIcon /> Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b bg-white">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 capitalize">
              {activePage.replace(/([A-Z])/g, ' $1').trim()}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowCommandBar(true)} className="text-sm text-slate-500 flex items-center gap-2 p-2 rounded-md border hover:bg-slate-50">
                <SearchIcon width={16} height={16} />
                <span className="hidden md:inline">Search...</span>
                <kbd className="hidden md:inline-block ml-4 px-2 py-1 text-xs font-sans font-semibold text-slate-500 bg-slate-100 rounded-md border">⌘K</kbd>
            </button>
            <div className="relative">
              <button
                onClick={handleNotificationClick}
                className="text-slate-500 hover:text-slate-800 relative"
              >
                <NotificationIcon />
                {notifications.some((n) => n.unread) && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-20">
                  <div className="p-3 font-semibold text-sm border-b">
                    Notifications
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3 text-sm border-b hover:bg-slate-50 ${
                          n.unread ? "bg-teal-50" : ""
                        }`}
                      >
                        {n.text}
                      </div>
                    )) : (
                        <p className="p-3 text-sm text-slate-500">No new notifications.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                {getInitials(user.name)}
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-800">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 capitalize">
                  {user.role.replace(/_/g, " ")}
                </p>
              </div>
            </div>
          </div>
        </header>
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">{renderPage()}</div>
      </main>
    </div>
  );
};

// --- Page Components ---

const AccessDeniedPage = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <div className="text-red-500 mb-4">
      <LockIcon />
    </div>
    <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h2>
    <p className="text-slate-600">
      You do not have permission to view this page.
    </p>
    <p className="text-sm text-slate-500 mt-1">
      Please contact your administrator if you believe this is an error.
    </p>
  </div>
);

const NotFoundPage = ({ onNavigate }) => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <h2 className="text-6xl font-bold text-slate-300 mb-2">404</h2>
    <h3 className="text-2xl font-bold text-slate-900 mb-2">Page Not Found</h3>
    <p className="text-slate-600">
      The resource you are looking for does not exist or has been moved.
    </p>
    <button onClick={() => onNavigate('dashboard')} className="mt-6 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
        Go to Dashboard
    </button>
  </div>
);

const RecruiterDashboard = ({ onNavigate, onOpenCandidate, isManager }) => {
  const { candidates } = useAppData();
  const interviews = candidates
    .filter((c) => c.pipelineStatus.includes("Interview"))
    .slice(0, 3);
  const newApplicants = candidates.filter(c => c.pipelineStatus === 'Applied').length;
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">{isManager ? "Recruiting Manager Dashboard" : "Recruiter Dashboard"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div
          onClick={() => onNavigate("jobs")}
          className="bg-white p-4 rounded-lg border hover:shadow-md hover:border-teal-500 cursor-pointer transition"
        >
          <p className="text-sm text-slate-600">{isManager ? "Active Team Jobs" : "My Active Jobs"}</p>
          <p className="text-3xl font-bold text-slate-800">18</p>
        </div>
        <div
          onClick={() => onNavigate("applicants")}
          className="bg-white p-4 rounded-lg border hover:shadow-md hover:border-teal-500 cursor-pointer transition"
        >
          <p className="text-sm text-slate-600">New Applicants</p>
          <p className="text-3xl font-bold text-slate-800">{newApplicants}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-slate-600">Upcoming Interviews</p>
          <p className="text-3xl font-bold text-slate-800">
            {interviews.length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-slate-600">Roll-off Alerts (30d)</p>
          <p className="text-3xl font-bold text-slate-800">2</p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-semibold mb-4">Upcoming Interviews</h3>
          {interviews.length > 0 ? (
            <div className="space-y-3">
              {interviews.map((candidate) => (
                <div
                  key={candidate.id}
                  onClick={() => onOpenCandidate(candidate.id, 'evaluation')}
                  className="p-3 bg-slate-50 rounded-md flex justify-between items-center cursor-pointer hover:bg-slate-100"
                >
                  <div>
                    <p className="font-bold text-slate-700">{candidate.name}</p>
                    <p className="text-sm text-slate-500">{candidate.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-800">
                      Client Interview
                    </p>
                    <p className="text-xs text-slate-400 mt-1">Aug 5, 2:00 PM</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No interviews are scheduled." />
          )}
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-semibold mb-4">My Placed Candidates</h3>
          <EmptyState message="No candidates placed yet." />
        </div>
      </div>
    </div>
  );
};

const AccountManagerDashboard = ({ onNavigate, onOpenCandidate, isManager }) => {
    const { candidates, clients, jobs } = useAppData();
    const [isExpanded, setIsExpanded] = useState(false);

    const profilesForReview = candidates.filter(c => c.pipelineStatus === "Pending ACM Review").map(c => {
        const job = jobs.find(j => j.id === c.associatedJobId);
        return { ...c, clientName: job?.client || 'N/A' };
    });
    
    const profilesToShow = isExpanded ? profilesForReview : profilesForReview.slice(0, 3);
    
    const openJobs = jobs.filter(j => j.status === 'Open').length;
    const avgSatisfaction = clients.length > 0 ? clients.reduce((acc, c) => acc + c.satisfaction, 0) / clients.length : 0;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">{isManager ? "Sales Manager Dashboard" : "Account Manager Dashboard"}</h2>
                <button onClick={() => onNavigate("clients")} className="flex items-center gap-2 bg-teal-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-teal-700">
                    <PlusIcon /> Post New Job
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div onClick={() => onNavigate('clients')} className="bg-white p-4 rounded-lg border hover:shadow-md hover:border-teal-500 cursor-pointer transition">
                    <p className="text-sm text-slate-600">Active Clients</p><p className="text-3xl font-bold">{clients.length}</p>
                </div>
                <div onClick={() => onNavigate('jobs')} className="bg-white p-4 rounded-lg border hover:shadow-md hover:border-teal-500 cursor-pointer transition">
                    <p className="text-sm text-slate-600">{isManager ? "Total Open Jobs" : "My Open Jobs"}</p><p className="text-3xl font-bold">{openJobs}</p>
                </div>
                <div onClick={() => onNavigate('clients')} className="bg-white p-4 rounded-lg border hover:shadow-md hover:border-teal-500 cursor-pointer transition">
                    <p className="text-sm text-slate-600">Avg. Client Satisfaction</p><p className="text-3xl font-bold">{avgSatisfaction.toFixed(0)}%</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-slate-800">Profiles Awaiting Your Review ({profilesForReview.length})</h3>
                    {profilesForReview.length > 3 && (
                        <button onClick={() => setIsExpanded(!isExpanded)} className="text-sm font-semibold text-teal-600 hover:underline">
                            {isExpanded ? 'Show Less' : 'Show All'}
                        </button>
                    )}
                </div>
                {profilesToShow.length > 0 ? (
                    profilesToShow.map(c => (
                        <div key={c.id} className="p-3 bg-slate-50 rounded-md flex justify-between items-center cursor-pointer hover:bg-slate-100 mb-2">
                            <div onClick={() => onOpenCandidate(c.id, 'evaluation')} className="flex-grow">
                                <p className="font-bold text-slate-700">{c.name}</p>
                                <p className="text-sm text-slate-500">For: {c.role} at <span className="font-medium">{c.clientName}</span></p>
                            </div>
                            <div className="text-right">
                                <button onClick={() => onOpenCandidate(c.id, 'evaluation')} className="px-3 py-1 bg-teal-500 text-white text-sm rounded-md hover:bg-teal-600">Review</button>
                                <p className="text-xs text-slate-400 mt-1">Submitted by: {c.statusHistory.slice(-1)[0].actor}</p>
                            </div>
                        </div>
                    ))
                ) : <EmptyState message="No profiles are awaiting your review." />}
            </div>
        </div>
    );
};

const AdminDashboard = ({ onNavigate }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Admin Dashboard
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-semibold mb-4">System Status</h3>
          <p className="text-green-600 font-bold">All Systems Operational</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4 text-sm">
            <p>
              <span className="font-semibold text-slate-700">Account Manager</span>{" "}
              posted a new job:{" "}
              <span className="font-semibold text-teal-600 hover:underline cursor-pointer" onClick={() => onNavigate('jobs')}>
                Data Scientist
              </span>
              . <span className="text-slate-400 text-xs block">2h ago</span>
            </p>
            <p>
              User{" "}
              <span className="font-semibold text-slate-700 hover:underline cursor-pointer" onClick={() => onNavigate('users')}>
                Technical Reviewer
              </span>{" "}
              logged in.{" "}
              <span className="text-slate-400 text-xs block">1d ago</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExecutiveDashboard = ({ onNavigate }) => {
  const { jobs, users } = useAppData();
  const [dateRange, setDateRange] = useState('all');
  const openJobs = jobs.filter((j) => j.status === "Open").length;
  const closedJobs = jobs.filter((j) => j.status === "Completed").length;

  const jobStatusData = {
    labels: ["Open", "Closed"],
    datasets: [ { label: "Job Status", data: [openJobs, closedJobs], backgroundColor: ["#34d399", "#94a3b8"] } ],
  };

  const performanceData = {
    labels: users.filter(u => u.role === 'recruiter' || u.role === 'account_manager').map(u => u.name),
    datasets: [
      { label: "Avg. Time to Fill (days)", data: [28, 35, 31], backgroundColor: "#0d9488", },
      { label: "Hires (YTD)", data: [12, 8, 0], backgroundColor: "#0f766e", }
    ],
  };

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Executive Summary</h2>
            <div className="flex items-center gap-2">
                <label htmlFor="date-range" className="text-sm font-medium">Date Range:</label>
                <select id="date-range" value={dateRange} onChange={e => setDateRange(e.target.value)} className="p-1.5 border rounded-md bg-white text-sm">
                    <option value="all">All Time</option>
                    <option value="90d">Last 90 Days</option>
                    <option value="30d">Last 30 Days</option>
                </select>
            </div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg border hover:shadow-md cursor-pointer" onClick={() => onNavigate('jobs')}>
          <p className="text-sm text-slate-600">Open Jobs</p>
          <p className="text-3xl font-bold text-slate-800">{openJobs}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border hover:shadow-md cursor-pointer" onClick={() => onNavigate('jobs')}>
          <p className="text-sm text-slate-600">Jobs Closed (YTD)</p>
          <p className="text-3xl font-bold text-slate-800">{closedJobs}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border hover:shadow-md cursor-pointer" onClick={() => onNavigate('performance')}>
          <p className="text-sm text-slate-600">Avg. Time to Fill</p>
          <p className="text-3xl font-bold text-slate-800">31 days</p>
        </div>
        <div className="bg-white p-4 rounded-lg border hover:shadow-md cursor-pointer" onClick={() => onNavigate('users')}>
          <p className="text-sm text-slate-600">Active Team Members</p>
          <p className="text-3xl font-bold text-slate-800">{users.filter(u => u.status === 'Active').length}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white p-6 rounded-lg border">
          <h3 onClick={() => onNavigate("performance")} className="font-semibold mb-4 cursor-pointer hover:text-teal-600">
            Team Performance Overview
          </h3>
          <div style={{ height: "300px" }}>
            <ChartComponent type="bar" data={performanceData} options={{ scales: { y: { beginAtZero: true } } }} />
          </div>
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border">
          <h3 onClick={() => onNavigate("jobs")} className="font-semibold mb-4 cursor-pointer hover:text-teal-600">
            Job Status Overview
          </h3>
          <div style={{ height: "300px" }}>
            <ChartComponent type="doughnut" data={jobStatusData} options={{ plugins: { legend: { position: "bottom" } } }}/>
          </div>
        </div>
      </div>
    </div>
  );
};

const TechnicalManagerDashboard = ({ onNavigate, onOpenCandidate }) => {
  const { candidates } = useAppData();
  const profilesToReview = candidates.filter(
    (c) => c.pipelineStatus === "Pending Technical Review"
  );
  const profilesReviewed = candidates.filter(
    (c) => c.pipelineStatus !== "Pending Technical Review" && c.feedback.technical
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Technical Review Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div onClick={() => onNavigate('technical-review')} className="bg-white p-4 rounded-lg border hover:shadow-md hover:border-teal-500 cursor-pointer transition">
              <p className="text-sm text-slate-600">Profiles to Review</p>
              <p className="text-3xl font-bold text-slate-800">{profilesToReview.length}</p>
          </div>
          <div onClick={() => onNavigate('review-history')} className="bg-white p-4 rounded-lg border hover:shadow-md hover:border-teal-500 cursor-pointer transition">
              <p className="text-sm text-slate-600">Profiles Reviewed (YTD)</p>
              <p className="text-3xl font-bold text-slate-800">{profilesReviewed.length}</p>
          </div>
      </div>
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="font-semibold mb-4 text-slate-800">
          Awaiting Your Review
        </h3>
        {profilesToReview.length > 0 ? (
            <div className="space-y-3">
              {profilesToReview.map((c) => (
                <div
                  key={c.id}
                  className="p-3 bg-slate-50 rounded-md flex justify-between items-center cursor-pointer hover:bg-slate-100"
                >
                  <div onClick={() => onOpenCandidate(c.id, 'evaluation')} className="flex-grow">
                    <p className="font-bold text-slate-700">{c.name}</p>
                    <p className="text-sm text-slate-500">For: {c.role}</p>
                  </div>
                  <button onClick={() => onOpenCandidate(c.id, 'evaluation')} className="px-3 py-1 bg-teal-500 text-white text-sm rounded-md hover:bg-teal-600">
                    Start Review
                  </button>
                </div>
              ))}
            </div>
        ) : <EmptyState message="No profiles are currently awaiting your review." />}
      </div>
    </div>
  );
};

const JobsPage = ({ onOpenCandidate, onNavigate, user }) => {
  const { jobs, candidates, users } = useAppData();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  const [selectedJob, setSelectedJob] = useState(
    jobs.find((j) => j.status === "Open") || jobs[0]
  );

  const filteredJobs = jobs.filter(
    (job) =>
      (activeTab === "active"
        ? job.status === "Open"
        : job.status === "Completed") &&
      (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.client.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex h-full gap-6">
      <div className="w-2/5 flex flex-col bg-white rounded-lg border">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">
              {user.role === "recruiter" ? "Active Jobs" : "Job Listings"}
            </h2>
            {user.role === "account_manager" && (
              <button
                onClick={() => onNavigate("clients")}
                className="flex items-center gap-1 bg-teal-600 text-white text-xs font-semibold px-2 py-1 rounded-md hover:bg-teal-700"
              >
                <PlusIcon /> Post Job
              </button>
            )}
          </div>
          <div className="mt-2 border-b border-slate-200">
            <nav className="-mb-px flex space-x-4">
              <button
                onClick={() => setActiveTab("active")}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "active"
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "completed"
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                Completed
              </button>
            </nav>
          </div>
          <div className="relative mt-2">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border rounded-md bg-slate-50"
            />
          </div>
        </div>
        <div className="overflow-y-auto">
          {filteredJobs.length > 0 ? filteredJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className={`p-4 border-b cursor-pointer ${
                selectedJob?.id === job.id
                  ? "bg-teal-50 border-l-4 border-teal-500"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="flex justify-between">
                <h3 className="font-bold text-slate-800">{job.title}</h3>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    job.status === "Open"
                      ? "bg-green-100 text-green-800"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {job.status}
                </span>
              </div>
              <p className="text-sm text-slate-500">
                {job.client} - {job.location}
              </p>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
                <span>{job.type}</span>
                <span className="font-medium">
                  {
                    candidates.filter((c) => c.associatedJobId === job.id)
                      .length
                  }{" "}
                  Candidates
                </span>
              </div>
            </div>
          )) : <EmptyState message={`No ${activeTab} jobs found.`} />}
        </div>
      </div>

      <div className="w-3/5 flex flex-col overflow-y-auto">
        {selectedJob ? (
          <div className="bg-white rounded-lg border p-6">
            <div className="pb-4 border-b">
              <h3 className="text-xl font-bold text-slate-800">
                {selectedJob.title}
              </h3>
              <p className="text-sm text-slate-500">
                {selectedJob.client} | {selectedJob.location}
                {user.role !== "technical_manager" && ` | ${selectedJob.salary}`}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Assigned to:{" "}
                {users.find((u) => u.id === selectedJob.recruiterId)?.name ||
                  "Unassigned"}
              </p>
            </div>
            <div className="py-4 border-b">
              <h4 className="font-semibold text-slate-800 mb-2">
                Job Description
              </h4>
              <p className="text-sm text-slate-600">
                {selectedJob.description}
              </p>
              {selectedJob.responsibilities.length > 0 && (
                <>
                  <h5 className="font-semibold text-sm mt-3 mb-1">
                    Responsibilities
                  </h5>
                  <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                    {selectedJob.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className="pt-4">
              <h4 className="font-semibold text-slate-800 mb-4">
                Applicants (
                {
                  candidates.filter((c) => c.associatedJobId === selectedJob.id)
                    .length
                }
                )
              </h4>
              <div className="space-y-2">
                {candidates
                  .filter((c) => c.associatedJobId === selectedJob.id)
                  .map((details) => (
                    <div
                      key={details.id}
                      onClick={() => onOpenCandidate(details.id, 'evaluation')}
                      className="p-3 grid grid-cols-4 gap-4 items-center rounded-md border hover:bg-slate-50 cursor-pointer"
                    >
                      <div className="col-span-2">
                        <p className="font-bold text-slate-800">{details.name}</p>
                        <p className="text-xs text-slate-500">{details.role}</p>
                      </div>
                      <div className="text-sm text-center">
                        <span className="font-bold text-teal-600">{details.aiMatch}%</span>
                        <p className="text-xs text-slate-500">AI Match</p>
                      </div>
                      <div className="text-sm text-right">
                        <p className="font-medium">{details.pipelineStatus}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : <EmptyState message="Select a job to see details." />}
      </div>
    </div>
  );
};

const ApplicantsPage = ({ onOpenCandidate }) => {
  const { candidates, updateCandidateStatus } = useAppData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState([]);
  const [bulkAction, setBulkAction] = useState("");

  const handleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  
  const handleBulkAction = () => {
    if(!bulkAction || selected.length === 0) return;
    selected.forEach(id => updateCandidateStatus(id, bulkAction, "Bulk Action"));
    setSelected([]);
  };

  const filteredCandidates = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Applicant Database</h2>
        <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-md hover:bg-slate-200">
                Scan Outlook
            </button>
            <button className="flex items-center gap-1.5 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-md hover:bg-slate-200">
                Manually Upload Candidate
            </button>
        </div>
      </div>
      <div className="mb-4 flex items-center gap-4">
        <div className="relative flex-grow">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search by name, role, skill..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-3 pl-10 border rounded-md bg-white"/>
        </div>
        {selected.length > 0 && (
            <div className="flex items-center gap-2">
                <select onChange={e => setBulkAction(e.target.value)} className="p-2 border rounded-md bg-white text-sm">
                    <option value="">Bulk Action...</option>
                    <option value="Rejected">Reject</option>
                    <option value="On Hold">On Hold</option>
                </select>
                <button onClick={handleBulkAction} className="bg-teal-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-teal-700 text-sm">Apply</button>
            </div>
        )}
      </div>
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="grid grid-cols-6 gap-4 p-4 bg-slate-50 font-semibold text-sm text-slate-600">
          <input type="checkbox" onChange={e => setSelected(e.target.checked ? filteredCandidates.map(c => c.id) : [])} />
          <span>Name</span>
          <span>Details</span>
          <span>Top Skills</span>
          <span>Status</span>
          <span>Last Updated</span>
        </div>
        <div className="divide-y">
          {filteredCandidates.length > 0 ? filteredCandidates.map((c) => (
            <div key={c.id} className="p-4 grid grid-cols-6 gap-4 items-center hover:bg-slate-50">
              <input type="checkbox" checked={selected.includes(c.id)} onChange={() => handleSelect(c.id)} />
              <div onClick={() => onOpenCandidate(c.id, 'detail')} className="cursor-pointer">
                <p className="font-bold">{c.name}</p>
                <p className="text-sm text-slate-500">{c.role}</p>
              </div>
              <div>
                <p className="text-sm">{c.experience} of experience</p>
                <p className="text-sm text-slate-500">{c.education}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {c.skills.slice(0, 3).map((s) => (
                  <span key={s} className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
              <div className="font-medium text-sm">{c.pipelineStatus}</div>
              <div className="text-sm text-slate-500">{c.statusHistory.slice(-1)[0].date}</div>
            </div>
          )) : (
            <div className="p-4 text-center text-slate-500">No candidates found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

const CandidateProfileModal = ({ candidate, onClose, user }) => {
  const { updateCandidateStatus, updateCandidateFeedback } = useAppData();
  const [acmNotes, setAcmNotes] = useState("");

  if (!candidate) return null;

  const handleManagerSubmit = (newStatus) => {
    updateCandidateFeedback(candidate.id, { manager: acmNotes }, user.name);
    updateCandidateStatus(candidate.id, newStatus, user.name);
    onClose();
  };
  
  const handleFeedbackSubmit = () => {
    // Placeholder for other roles
  };

  const FeedbackSection = ({ title, notes }) => (
    <div>
        <p className="font-semibold">{title}:</p>
        <p className="text-sm text-slate-600 p-2 bg-slate-50 rounded mt-1">{notes || "No feedback submitted."}</p>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity" onClick={onClose}>
      <div className="bg-slate-50 rounded-lg shadow-xl w-full max-w-6xl m-4 transform transition-all flex flex-col h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b flex justify-between items-center bg-white rounded-t-lg flex-shrink-0">
          <div>
            <h3 className="text-xl font-bold text-slate-800">{candidate.name}</h3>
            <p className="text-slate-500">{candidate.role} for <span className="font-semibold text-slate-600">{candidate.job.client}</span></p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><CloseIcon /></button>
        </div>
        
        <div className="flex-grow p-4 grid grid-cols-3 gap-4 overflow-hidden">
            <div className="col-span-1 bg-white p-4 rounded-lg border flex flex-col overflow-y-auto">
                <h4 className="font-semibold text-slate-800 mb-2 flex-shrink-0">Job Description: {candidate.job.title}</h4>
                <div className="text-sm text-slate-600 space-y-3 overflow-y-auto">
                    <p>{candidate.job.description}</p>
                </div>
            </div>

            <div className="col-span-1 bg-white p-4 rounded-lg border flex flex-col overflow-y-auto">
                <h4 className="font-semibold text-slate-800 mb-2 flex-shrink-0">Candidate Resume</h4>
                <div className="text-sm text-slate-700 overflow-y-auto">
                    <p>Mock resume viewer for {candidate.name}.pdf</p>
                    <h5 className="font-semibold text-sm mt-4 mb-1">General Notes</h5>
                    <p className="text-sm text-slate-600 p-2 bg-slate-50 rounded mt-1">{candidate.notes || "No general notes provided."}</p>
                </div>
            </div>

            <div className="col-span-1 bg-white p-4 rounded-lg border flex flex-col overflow-y-auto">
                <h4 className="font-semibold text-slate-800 mb-2 flex-shrink-0">Review & Feedback</h4>
                <div className="space-y-4 overflow-y-auto">
                    <div className="p-3 bg-teal-50 border-l-4 border-teal-500 rounded-r-md">
                        <p className="font-bold text-teal-800">AI Match Score: {candidate.aiMatch}%</p>
                    </div>
                    <FeedbackSection title="Recruiter Notes" notes={candidate.feedback.recruiter} />
                    <FeedbackSection title="Technical Reviewer Notes" notes={candidate.feedback.technical} />
                    
                    {user.role === 'account_manager' ? (
                         <div className="space-y-3">
                             <div>
                                 <h5 className="font-semibold mb-2">Account Manager Notes</h5>
                                 <textarea value={acmNotes} onChange={e => setAcmNotes(e.target.value)} className="w-full h-24 p-2 border rounded-md" placeholder="Add your feedback for the client and internal team..."></textarea>
                             </div>
                             <div className="border-t pt-3 flex gap-2">
                                 <button onClick={() => handleManagerSubmit("Pending Client Review")} className="w-full text-sm p-2 rounded-md bg-green-100 hover:bg-green-200 text-green-800 font-semibold">Send to Client (with Notes)</button>
                                 <button onClick={() => handleManagerSubmit("Rejected by Account Manager")} className="w-full text-sm p-2 rounded-md bg-red-100 hover:bg-red-200 text-red-800 font-semibold">Not Selected (with Notes)</button>
                             </div>
                         </div>
                    ) : (
                        <FeedbackSection title="Account Manager Notes" notes={candidate.feedback.manager} />
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const CandidateDetailModal = ({ candidate, onClose }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-lg shadow-xl w-full max-w-2xl m-4 flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-800">
          Candidate Details
        </h3>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600"
        >
          <CloseIcon />
        </button>
      </div>
      <div className="p-8 overflow-y-auto">
        <div className="text-center border-b pb-4">
          <h1 className="text-3xl font-bold text-slate-900">
            {candidate.name}
          </h1>
          <p className="text-slate-600">{candidate.role}</p>
          <p className="text-sm text-slate-500 mt-1">
            {candidate.location} | {candidate.phone}
          </p>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-bold text-teal-700 border-b-2 border-teal-700 pb-1 mb-2">
            Summary
          </h2>
          <p className="text-sm text-slate-700">
            A highly skilled and motivated professional with{" "}
            {candidate.experience} of experience in software development and
            machine learning. Proven ability to design, develop, and deploy
            complex AI solutions.
          </p>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-bold text-teal-700 border-b-2 border-teal-700 pb-1 mb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill) => (
              <span
                key={skill}
                className="bg-slate-200 text-slate-700 text-sm font-medium px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-bold text-teal-700 border-b-2 border-teal-700 pb-1 mb-2">
            Experience
          </h2>
          <p className="text-sm text-slate-700 font-bold">
            Senior AI Engineer, TechCorp Inc.
          </p>
          <p className="text-sm text-slate-500">2020 - Present</p>
          <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
            <li>
              Led development of a new recommendation engine, improving user
              engagement by 25%.
            </li>
            <li>
              Deployed machine learning models to production using Kubernetes
              and GCP.
            </li>
          </ul>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-bold text-teal-700 border-b-2 border-teal-700 pb-1 mb-2">
            Education
          </h2>
          <p className="text-sm text-slate-700 font-bold">
            {candidate.education}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const PostJobPage = ({ onJobPosted, context }) => {
  const { clients, users, addJob, people } = useAppData();
  const recruiters = users.filter((u) => u.role === "recruiter");
  
  const client = context?.client || clients[0];
  const contact = context?.contact || client?.contacts[0];
  const person = people.find(p => p.personId === contact?.personId);

  const initialFormData = {
    client: client?.id || "",
    contactId: contact?.contactId || "",
    contactName: person?.name || "",
    title: "",
    location: client?.address || "",
    type: "Contract",
    duration: "",
    employmentType: "W2",
    startDate: new Date().toISOString().slice(0, 10),
    closeDate: "",
    salary: "",
    description: "",
    internalNotes: "",
    recruiterId: recruiters[0]?.id || "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const { showToast } = useAppData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addJob(formData);
    onJobPosted();
  };
  
  const handleAutoBuild = () => {
    // In a real app, this would use an API call to an LLM
    const skills = formData.description.match(/python|react|gcp|figma|typescript/gi) || [];
    setFormData(prev => ({...prev, keySkills: [...new Set(skills)]}));
    showToast("Skills extracted from description!");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Post New Job Requisition
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg border max-w-4xl space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 grid grid-cols-3 gap-6 p-4 border rounded-lg bg-slate-50">
                 <div>
                    <label className="font-medium text-sm text-slate-500">Client</label>
                    <p className="font-bold text-lg text-slate-800">{clients.find(c => c.id == formData.client)?.name}</p>
                 </div>
                 <div>
                    <label className="font-medium text-sm text-slate-500">Hiring Manager</label>
                    <p className="font-bold text-lg text-slate-800">{formData.contactName}</p>
                 </div>
                 <div>
                    <label className="font-medium text-sm text-slate-500">Location</label>
                    <p className="font-bold text-lg text-slate-800">{formData.location}</p>
                 </div>
            </div>
            <div>
                <label className="font-medium text-sm">Job Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" required />
            </div>
            <div>
                <label className="font-medium text-sm">Job Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md bg-white"><option>Contract</option><option>Full-time</option><option>Contract-to-Hire</option></select>
            </div>
            <div>
                <label className="font-medium text-sm">Start Date</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
            </div>
            <div>
                <label className="font-medium text-sm">Employment Type</label>
                <select name="employmentType" value={formData.employmentType} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md bg-white"><option>W2</option><option>Corp-to-Corp</option><option>Open</option></select>
            </div>
            <div className="md:col-span-2">
                <label className="font-medium text-sm">Job Description (Public)</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md h-24" required></textarea>
                <button type="button" onClick={handleAutoBuild} className="mt-1 text-xs font-semibold text-teal-600 flex items-center gap-1 hover:underline"><SparklesIcon width={12} height={12} /> Auto-Build Skills from Description</button>
            </div>
            <div className="md:col-span-2">
                <label className="font-medium text-sm">Internal Notes</label>
                <textarea name="internalNotes" value={formData.internalNotes} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md h-20"></textarea>
            </div>
        </div>
        <button
          type="submit"
          className="bg-teal-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-teal-700"
        >
          Submit & Post Job
        </button>
      </form>
    </div>
  );
};

const ClientsPage = ({ onNavigate }) => {
    const { clients } = useAppData();

    return (
        <div className="bg-white rounded-lg border">
            <div className="p-4 border-b">
                <h2 className="text-lg font-bold text-slate-900">Clients</h2>
            </div>
            <div className="divide-y">
                {clients.map(client => (
                    <div key={client.id} onClick={() => onNavigate('clientDetail', { clientId: client.id })} className="p-4 grid grid-cols-2 gap-4 items-center hover:bg-teal-50 cursor-pointer">
                        <div className="font-bold text-teal-700">{client.name}</div>
                        <div className="text-sm text-slate-600">{client.contacts.length} Contacts</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ClientDetailPage = ({ onNavigate, context }) => {
  const { clients, people, jobs } = useAppData();
  const [showAddContact, setShowAddContact] = useState(false);

  const client = clients.find((c) => c.id === context.clientId);
  
  if (!client) return <NotFoundPage onNavigate={onNavigate} />;
  
  const clientJobs = jobs.filter((j) => j.clientId === context.clientId);
  
  const handleAddJobFromContact = (contact) => {
    onNavigate('post-job', { client, contact });
  };

  return (
    <div>
      {showAddContact && (
        <AddContactModal 
            onClose={() => setShowAddContact(false)}
            onSave={(contactData) => {
                // In a real app, this would call the context function
                setShowAddContact(false);
            }}
        />
      )}
      <button
        onClick={() => onNavigate("clients")}
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-4"
      >
        <ArrowLeftIcon /> Back to All Clients
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-slate-900">{client.name}</h2>
              <button
                onClick={() => setShowAddContact(true)}
                className="flex items-center gap-2 text-sm p-2 rounded-md bg-teal-600 text-white hover:bg-teal-700"
              >
                <PlusIcon /> Add Contact
              </button>
            </div>
            <div className="mt-4 space-y-4">
                {client.contacts.map(contact => {
                    const person = people.find(p => p.personId === contact.personId);
                    return (
                        <div key={contact.contactId} className="p-3 border rounded-md flex justify-between items-center group">
                            <div>
                                <p className="font-semibold">{person?.name}</p>
                                <p className="text-sm text-slate-500">{contact.position}</p>
                                <p className="text-xs">{contact.email}</p>
                            </div>
                             <div className="flex items-center gap-2">
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity"><EditIcon width={14} height={14}/></button>
                                <button onClick={() => handleAddJobFromContact(contact)} className="opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded font-semibold hover:bg-teal-200">
                                    Add Job
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-semibold mb-4">Jobs ({clientJobs.length})</h3>
            <div className="space-y-3">
              {clientJobs.length > 0 ? clientJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => onNavigate("jobs", { jobId: job.id })}
                  className="p-3 border rounded-md flex justify-between items-center cursor-pointer hover:bg-teal-50"
                >
                  <div>
                    <p className="font-bold text-slate-700">{job.title}</p>
                    <p className="text-sm text-slate-500">{job.location}</p>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      job.status === "Open"
                        ? "bg-green-100 text-green-800"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
              )) : (
                <EmptyState message="No jobs have been posted for this client yet." />
              )}
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-semibold mb-4">Client Notes</h3>
          <textarea
            defaultValue={client.notes}
            className="w-full h-48 p-2 border rounded-md text-sm bg-slate-50"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

const AddContactModal = ({ onClose, onSave }) => {
    const [contact, setContact] = useState({ name: "", position: "", email: "" });
    const handleChange = (e) => setContact({...contact, [e.target.name]: e.target.value});
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(contact);
    };
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center" onClick={onClose}>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md space-y-4" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold">Add New Contact</h3>
                <input type="text" name="name" value={contact.name} onChange={handleChange} placeholder="Full Name" className="w-full p-2 border rounded" required />
                <input type="text" name="position" value={contact.position} onChange={handleChange} placeholder="Position / Title" className="w-full p-2 border rounded" required />
                <input type="email" name="email" value={contact.email} onChange={handleChange} placeholder="Email Address" className="w-full p-2 border rounded" required />
                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 rounded-md">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-md">Save Contact</button>
                </div>
            </form>
        </div>
    );
};

const UserManagementPage = () => {
  const { users, updateUser } = useAppData();
  const roles = ["admin", "executive", "account_manager", "recruiter", "technical_manager"];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
        <button className="flex items-center gap-2 bg-teal-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-teal-700">
            <PlusIcon /> Create New User
        </button>
      </div>
      <div className="bg-white rounded-lg border">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-3 font-semibold">Name</th>
              <th className="p-3 font-semibold">Email</th>
              <th className="p-3 font-semibold">Role</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr className="border-t" key={user.id}>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <select
                    value={user.role}
                    onChange={(e) => updateUser(user.id, e.target.value)}
                    className="p-1 border rounded-md bg-white"
                  >
                    {roles.map(r => <option key={r} value={r}>{r.replace(/_/g, " ")}</option>)}
                  </select>
                </td>
                <td className="p-3">
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-200 text-slate-700'}`}>{user.status}</span>
                </td>
                <td className="p-3">
                    <button className="text-red-600 font-semibold text-xs hover:underline">Disable</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AuditTrail = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredLogs = MOCK_AUDIT_LOGS.filter(log => 
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Audit Trail</h2>
            <div className="mb-4 relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pl-10 border rounded-md bg-white"
                />
            </div>
            <div className="bg-white rounded-lg border overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50">
                    <tr>
                        <th className="p-3 font-semibold">Timestamp</th>
                        <th className="p-3 font-semibold">User</th>
                        <th className="p-3 font-semibold">Action</th>
                        <th className="p-3 font-semibold">Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredLogs.map(log => (
                        <tr className="border-t" key={log.id}>
                            <td className="p-3 whitespace-nowrap">{log.timestamp}</td>
                            <td className="p-3">{log.user}</td>
                            <td className="p-3"><span className="font-mono text-xs bg-slate-200 p-1 rounded">{log.action}</span></td>
                            <td className="p-3">{log.details}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const TechnicalReviewPage = ({ onOpenCandidate }) => {
  const { candidates } = useAppData();
  const profilesToReview = candidates.filter(
    (c) => c.pipelineStatus === "Pending Technical Review"
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Profiles for Technical Review
      </h2>
      <div className="bg-white rounded-lg border p-6 space-y-4">
        {profilesToReview.length > 0 ? (
          profilesToReview.map((c) => (
            <div
              key={c.id}
              onClick={() => onOpenCandidate(c.id, 'evaluation')}
              className="p-4 border rounded-md flex justify-between items-center cursor-pointer hover:bg-slate-50"
            >
              <div>
                <p className="font-bold text-slate-800">{c.name}</p>
                <p className="text-sm text-slate-500">{c.role}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCandidate(c.id, 'evaluation');
                }}
                className="px-4 py-1.5 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700"
              >
                View & Review
              </button>
            </div>
          ))
        ) : (
          <EmptyState message="No profiles are currently awaiting your review." />
        )}
      </div>
    </div>
  );
};

const ReviewHistoryPage = ({ onOpenCandidate }) => {
    const { candidates } = useAppData();
    const reviewedProfiles = candidates.filter(c => c.feedback.technical);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProfiles = reviewedProfiles.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Review History</h2>
            <div className="mb-4 relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pl-10 border rounded-md bg-white"
                />
            </div>
            <div className="bg-white rounded-lg border p-6 space-y-4">
                {filteredProfiles.length > 0 ? filteredProfiles.map(c => (
                    <div key={c.id} onClick={() => onOpenCandidate(c.id, 'evaluation')} className="p-4 border rounded-md cursor-pointer hover:bg-slate-50">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold text-slate-800">{c.name}</p>
                                <p className="text-sm text-slate-500">{c.role}</p>
                            </div>
                            <div className={`text-sm font-bold ${c.pipelineStatus === 'Technical Review Passed' ? 'text-green-600' : 'text-red-600'}`}>
                                {c.pipelineStatus}
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">Feedback: {c.feedback.technical}</p>
                    </div>
                )) : <EmptyState message="No review history found." />}
            </div>
        </div>
    );
};

const TeamPerformancePage = () => {
    const recruiterData = [
        { name: "Recruiter", timeToFill: 28, subToInterview: "35.7%", hires: 12 },
    ];
    const acmData = [
        { name: "Account Manager", newJobs: 12, satisfaction: "95%", fillRate: "83%" },
    ];
    const tmData = [
        { name: "Technical Reviewer", reviewTime: "1.2 days", approvalRate: "78%", hireSuccess: "65%" },
    ];

    const renderTable = (title, headers, data) => (
        <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-semibold mb-4 text-slate-800">{title}</h3>
            <table className="w-full text-sm text-left">
                <thead className="bg-slate-50">
                    <tr>
                        {headers.map(h => <th key={h} className="p-2 font-semibold">{h}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => (
                        <tr key={row.name} className="border-b">
                            {Object.entries(row).map(([key, value], i) => (
                                <td key={key} className={`p-2 ${i === 0 ? 'font-bold text-teal-600 cursor-pointer hover:underline' : ''}`}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-900">Team Performance KPIs</h2>
            {renderTable("Recruiter KPIs", ["Name", "Avg. Time to Fill", "Submission-to-Interview Ratio", "Total Hires"], recruiterData)}
            {renderTable("Account Manager KPIs", ["Name", "New Jobs Generated", "Client Satisfaction", "Job Fill Rate"], acmData)}
            {renderTable("Technical Manager KPIs", ["Name", "Avg. Profile Review Time", "Candidate Approval Rate", "Hire Success Rate"], tmData)}
        </div>
    );
};

const CommandBar = ({ onClose, onNavigate, onOpenCandidate }) => {
    const { candidates, jobs, clients } = useAppData();
    const [query, setQuery] = useState("");

    const filteredCandidates = candidates.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
    const filteredJobs = jobs.filter(j => j.title.toLowerCase().includes(query.toLowerCase()));
    const filteredClients = clients.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

    const handleSelect = (type, id) => {
        if(type === 'candidate') onOpenCandidate(id, 'detail');
        if(type === 'job') onNavigate('jobs', { jobId: id });
        if(type === 'client') onNavigate('clientDetail', { clientId: id });
    }

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start pt-20" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <input 
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search for candidates, jobs, clients..."
                    className="w-full p-4 text-lg border-b"
                    autoFocus
                />
                <div className="max-h-96 overflow-y-auto">
                    {query && (
                        <>
                            {filteredCandidates.length > 0 && <div className="p-2 font-semibold bg-slate-50 text-sm">Candidates</div>}
                            {filteredCandidates.map(c => <div key={c.id} onClick={() => handleSelect('candidate', c.id)} className="p-3 hover:bg-teal-50 cursor-pointer">{c.name}</div>)}
                            
                            {filteredJobs.length > 0 && <div className="p-2 font-semibold bg-slate-50 text-sm">Jobs</div>}
                            {filteredJobs.map(j => <div key={j.id} onClick={() => handleSelect('job', j.id)} className="p-3 hover:bg-teal-50 cursor-pointer">{j.title}</div>)}

                            {filteredClients.length > 0 && <div className="p-2 font-semibold bg-slate-50 text-sm">Clients</div>}
                            {filteredClients.map(c => <div key={c.id} onClick={() => handleSelect('client', c.id)} className="p-3 hover:bg-teal-50 cursor-pointer">{c.name}</div>)}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
};


// --- Main App Component ---
export default function App() {
  const [activeUser, setActiveUser] = useState(null);

  if (!activeUser) {
    return <LoginPage onLogin={setActiveUser} />;
  }

  return (
    <AppProvider>
      <AppLayout user={activeUser} onLogout={() => setActiveUser(null)} />
    </AppProvider>
  );
}