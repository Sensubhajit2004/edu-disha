// js/data.js

// --- APTITUDE TEST DATA (RIASEC MODEL) ---
export const quizQuestions = [
    {
        question: "1. Which activity sounds most enjoyable to you?",
        options: [
            { text: "Building or repairing things", trait: 'R' },
            { text: "Solving complex math or science problems", trait: 'I' },
            { text: "Creating art, music, or writing stories", trait: 'A' },
            { text: "Helping or teaching others", trait: 'S' }
        ]
    },
    {
        question: "2. In a team project, you prefer to...",
        options: [
            { text: "Lead the team and persuade others", trait: 'E' },
            { text: "Organize the files, data, and schedule", trait: 'C' },
            { text: "Come up with creative, original ideas", trait: 'A' },
            { text: "Understand the theory behind the project", trait: 'I' }
        ]
    },
    {
        question: "3. You are most comfortable working with...",
        options: [
            { text: "People and helping them with their problems", trait: 'S' },
            { text: "Data, numbers, and clear instructions", trait: 'C' },
            { text: "Tools, machines, and physical objects", trait: 'R' },
            { text: "Ideas, theories, and abstract concepts", trait: 'I' }
        ]
    },
    {
        question: "4. Which of these describes you best?",
        options: [
            { text: "Ambitious and influential", trait: 'E' },
            { text: "Practical and down-to-earth", trait: 'R' },
            { text: "Curious and analytical", trait: 'I' },
            { text: "Expressive and imaginative", trait: 'A' }
        ]
    },
    {
        question: "5. Your ideal work environment would be...",
        options: [
            { text: "A structured office with clear tasks", trait: 'C' },
            { text: "A dynamic place where you can influence decisions", trait: 'E' },
            { text: "A school, hospital, or counseling center", trait: 'S' },
            { text: "A design studio, theater, or concert hall", trait: 'A' }
        ]
    },
    {
        question: "6. What kind of TV show or movie do you prefer?",
        options: [
            { text: "A documentary about social issues", trait: 'S' },
            { text: "A science fiction movie with complex theories", trait: 'I' },
            { text: "A show about entrepreneurs building a business", trait: 'E' },
            { text: "A home improvement or car restoration show", trait: 'R' }
        ]
    },
    {
        question: "7. When learning something new, you prefer to...",
        options: [
            { text: "Read books and research the topic thoroughly", trait: 'I' },
            { text: "Take it apart and see how it works", trait: 'R' },
            { text: "Imagine new ways to use the information", trait: 'A' },
            { text: "Follow a step-by-step instruction manual", trait: 'C' }
        ]
    },
    {
        question: "8. Which of these sounds like a fun weekend activity?",
        options: [
            { text: "Visiting an art museum or attending a concert", trait: 'A' },
            { text: "Volunteering for a local charity", trait: 'S' },
            { text: "Organizing a group event or a small get-together", trait: 'E' },
            { text: "Tidying up your room and organizing your files", trait: 'C' }
        ]
    },
    {
        question: "9. A friend needs help with a project. What role do you take?",
        options: [
            { text: "I listen to their problems and offer emotional support", trait: 'S' },
            { text: "I analyze the problem and suggest logical solutions", trait: 'I' },
            { text: "I help with the physical tasks and building", trait: 'R' },
            { text: "I take charge and delegate tasks to get it done", trait: 'E' }
        ]
    },
    {
        question: "10. What kind of work task would you find most satisfying?",
        options: [
            { text: "Creating a perfectly organized spreadsheet", trait: 'C' },
            { text: "Designing a visually appealing presentation", trait: 'A' },
            { text: "Negotiating a deal or making a sale", trait: 'E' },
            { text: "Discovering a new pattern in a set of data", trait: 'I' }
        ]
    },
    {
        question: "11. You are given a new gadget. Your first instinct is to...",
        options: [
            { text: "Start using it right away, figuring it out as you go", trait: 'R' },
            { text: "Read the entire manual to understand all its features", trait: 'I' },
            { text: "Think about how you could customize or change it", trait: 'A' },
            { text: "Show it to your friends and see what they think", trait: 'S' }
        ]
    },
    {
        question: "12. Which job sounds most appealing?",
        options: [
            { text: "Carpenter or Electrician", trait: 'R' },
            { text: "Scientist or Researcher", trait: 'I' },
            { text: "Musician or Graphic Designer", trait: 'A' },
            { text: "Teacher or Counselor", trait: 'S' }
        ]
    },
    {
        question: "13. In a group discussion, you are most likely to...",
        options: [
            { text: "Persuade others to see your point of view", trait: 'E' },
            { text: "Take detailed notes and keep track of decisions", trait: 'C' },
            { text: "Make sure everyone feels included and heard", trait: 'S' },
            { text: "Ask probing questions to understand the topic better", trait: 'I' }
        ]
    },
    {
        question: "14. What type of video game do you prefer?",
        options: [
            { text: "A complex strategy or puzzle game", trait: 'I' },
            { text: "A building and survival game like Minecraft", trait: 'R' },
            { text: "A game with a rich story and character customization", trait: 'A' },
            { text: "A competitive multiplayer or business simulation game", trait: 'E' }
        ]
    },
    {
        question: "15. You are planning a holiday. What is your priority?",
        options: [
            { text: "Going somewhere with unique culture and art", trait: 'A' },
            { text: "Having a detailed itinerary and everything planned out", trait: 'C' },
            { text: "Doing an activity like hiking or camping", trait: 'R' },
            { text: "Traveling with a group of friends or family", trait: 'S' }
        ]
    }
];

export const traitDescriptions = {
    R: { name: 'Realistic (The Doer)', stream: 'Vocational', description: 'You are practical, hands-on, and like working with tools, machines, or animals. You enjoy physical tasks and tangible results.', color: 'bg-teal-100', textColor: 'text-teal-800' },
    I: { name: 'Investigative (The Thinker)', stream: 'Science', description: 'You are analytical, curious, and enjoy solving complex problems. You are drawn to ideas, research, and scientific discovery.', color: 'bg-blue-100', textColor: 'text-blue-800' },
    A: { name: 'Artistic (The Creator)', stream: 'Arts', description: 'You are creative, imaginative, and expressive. You enjoy working in unstructured environments and using your creativity to produce art, music, or writing.', color: 'bg-purple-100', textColor: 'text-purple-800' },
    S: { name: 'Social (The Helper)', stream: 'Humanities', description: 'You are empathetic, cooperative, and enjoy helping, teaching, and caring for others. You thrive in collaborative social or educational environments.', color: 'bg-pink-100', textColor: 'text-pink-800' },
    E: { name: 'Enterprising (The Persuader)', stream: 'Commerce', description: 'You are ambitious, outgoing, and enjoy leading and influencing people. You are drawn to business, sales, and management roles.', color: 'bg-orange-100', textColor: 'text-orange-800' },
    C: { name: 'Conventional (The Organizer)', stream: 'Technology', description: 'You are organized, detail-oriented, and enjoy working with data, systems, and following set procedures. A career in IT or data management would suit you.', color: 'bg-gray-100', textColor: 'text-gray-800' }
};


// --- CAREER PATHS DATA ---
export const careerPaths = {
    "B.Sc. Physics": { description: "Focuses on the fundamental principles of the universe...", govJobs: ["Scientific Officer (BARC, ISRO)", "DRDO Scientist"], privateJobs: ["Data Analyst", "R&D Scientist"], higherStudies: ["M.Sc. in Physics", "M.Tech"] },
    "B.A. History": { description: "Involves the study of past events to understand the present...", govJobs: ["Archaeological Survey of India (ASI)", "Civil Services (IAS, IPS)"], privateJobs: ["Journalist", "Content Writer"], higherStudies: ["M.A. in History/Archaeology", "B.Ed."] },
    "B.Com (Hons)": { description: "Provides in-depth knowledge of accounting, finance, and business...", govJobs: ["Bank PO", "SSC CGL (Auditor)"], privateJobs: ["Chartered Accountant (CA)", "Financial Analyst"], higherStudies: ["M.Com", "MBA (Finance)"] },
    "BBA": { description: "A comprehensive management course...", govJobs: ["Bank Managerial Roles", "PSU Management Trainee"], privateJobs: ["Marketing Manager", "HR Manager"], higherStudies: ["MBA", "PGDM"] },
    "B.Tech Computer Science": {
        description: "A comprehensive engineering degree focusing on the design, development, and testing of software and hardware. It covers programming, algorithms, data structures, and computer networks.",
        govJobs: ["DRDO Scientist", "ISRO Scientist", "NIC Scientist", "IT Officer (Banks & PSUs)"],
        privateJobs: ["Software Development Engineer (SDE)", "Data Scientist", "Cybersecurity Analyst", "Cloud Engineer", "Machine Learning Engineer"],
        higherStudies: ["M.Tech in Computer Science", "MS from abroad", "MBA (Master of Business Administration)"]
    },
    "B.A. Economics (Hons)": {
        description: "Focuses on the principles of economics and their application in the real world, including microeconomics, macroeconomics, and econometrics.",
        govJobs: ["Indian Economic Service (IES)", "RBI Grade B Officer", "NITI Aayog"],
        privateJobs: ["Financial Analyst", "Market Research Analyst", "Management Consultant"],
        higherStudies: ["M.A. in Economics", "MBA", "Ph.D. in Economics"]
    },
    "B.Sc. in IT": {
        description: "Deals with the software, databases, and networking aspects of computing and information technology.",
        govJobs: ["IT Officer in Banks/PSUs", "NIC Scientist", "Systems Analyst"],
        privateJobs: ["IT Consultant", "Cloud Administrator", "Network Engineer", "Database Administrator"],
        higherStudies: ["M.Sc. in IT", "MCA", "M.Tech"]
    },
    "Journalism & Mass Comm.": {
        description: "Covers various aspects of media, including print, broadcast, and digital journalism, advertising, and public relations.",
        govJobs: ["Press Information Bureau (PIB)", "Doordarshan / All India Radio", "Public Relations Officer"],
        privateJobs: ["Reporter", "Content Strategist", "Copywriter", "Public Relations Specialist"],
        higherStudies: ["M.A. in Journalism & Mass Communication", "PG Diploma in Advertising"]
    }
};


// --- FIND COLLEGES DATA ---
// This will be populated from Firestore by colleges.js
export let colleges = [];