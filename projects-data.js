// projects-data.js
// Data ya projects zote - ongeza project mpya hapa tu
// Router inasoma data hii kupitia variable PROJECTS

const PROJECTS = {

  // ============================================
  // PROJECT 1: CV SCREENING SYSTEM
  // ============================================
  'cv-screening': {
    id: 'cv-screening',
    title: 'CV Screening System',
    category: 'software',
    shortDesc: 'Automated system that screens resumes, extracts key candidate information, and generates shortlist reports for HR teams.',
    longDesc: `CV Screening System ni mfumo kamili wa kusaidia HR teams kuchuja maombi ya kazi kwa haraka na kwa usahihi. Mfumo unachambua CVs za waombaji, unatoa taarifa muhimu kama jina, elimu, uzoefu wa kazi, skills, na kisha unazipanga kwa mujibu wa vigezo vilivyowekwa na kampuni.

Mfumo huu unaweza kuchakata CV za aina mbalimbali (PDF, DOCX) na kutoa ripoti ya Excel au PDF kwa shortlisted candidates. Pia unaweza kuunganishwa na email system kutuma majibu kwa waombaji moja kwa moja.

Mfumo umetengenezwa kwa Python (Django) kwa backend, na HTML/CSS/JavaScript kwa frontend. Unatumia NLP (spaCy) kuchambua CV na scikit-learn kwa ranking algorithm.`,
    image: 'images/cv-screening.png',
    tech: ['Python', 'Django', 'NLP', 'Pandas', 'scikit-learn', 'Mysql'],
    pages: 7,
    modules: [
      { name: 'Dashboard', desc: 'Ona muhtasari wa applications zote, statistics, na charts' },
      { name: 'Upload CVs', desc: 'Upload CV nyingi kwa wakati mmoja (bulk upload) - PDF na DOCX' },
      { name: 'Parsing Engine', desc: 'Inachambua CV na kutoa data muhimu kama jina, email, phone, elimu, uzoefu' },
      { name: 'Screening Criteria', desc: 'Weka vigezo vya kuchuja (skills, experience, education level)' },
      { name: 'Shortlist', desc: 'Ona shortlisted candidates na ranking zao kulingana na score' },
      { name: 'Reports', desc: 'Download ripoti za Excel/PDF kwa shortlisted candidates' },
      { name: 'Settings', desc: 'Mipangilio ya mfumo, email templates, na user management' }
    ],
    features: [
      'Bulk CV upload (PDF, DOCX)',
      'Automatic data extraction (name, email, phone, education, experience)',
      'Skill matching algorithm using NLP',
      'Candidate ranking based on criteria',
      'Email integration for automated responses',
      'Export to Excel/PDF',
      'Dashboard with statistics and charts',
      'Search and filter candidates',
      'Manual review option for ambiguous CVs'
    ],
    challenges: 'Tatizo kubwa lilikuwa ni CV za aina mbalimbali zenye format tofauti. Kila mwombaji ana format yake — wengine wanatumia table, wengine columns, wengine plain text. Nilitumia NLP techniques na regex patterns mbalimbali kuhakikisha data inatolewa kwa usahihi.',
    solution: 'Nilitengeneza hybrid approach inayotumia NLP (spaCy) pamoja na rule-based parsing. Nilianza na regex kwa fields rahisi (email, phone), kisha NLP kwa fields ngumu (education, experience). Pia niliongeza manual review option kwa CVs ambazo system haiwezi kuzichambua kwa uhakika.',
    role: 'Full Stack Developer (Solo Project)',
    duration: '3 Weeks',
    status: 'Completed',
    github: 'https://github.com/ambokileB/AI-CV-svreening/tree/main',
    demo: null,
    screenshots: [
                { title: 'Dashboard', img: 'images/cv-screening/dashboard.png' },
                { title: 'Upload CVs', img: 'images/cv-screening/upload.png' },
                { title: 'Job List', img: 'images/cv-screening/jobs.png' },
                { title: 'Shortlist', img: 'images/cv-screening/shortlist.png' },
                { title: 'Missing Criteria', img: 'images/cv-screening/criteria-missing.png' },
                { title: 'Screening Criteria', img: 'images/cv-screening/criteria.png' },
                { title: 'apiDocs', img: 'images/cv-screening/apiDocs.png' }
                ],
  },

  // ============================================
  // PROJECT 2: HSSEQ MANAGEMENT SYSTEM
  // ============================================
  'hsseq': {
    id: 'hsseq',
    title: 'HSSEQ Management System',
    category: 'software',
    shortDesc: 'Health, Safety, Security, Environment & Quality management system for tracking incidents and compliance reporting.',
    longDesc: `HSSEQ Management System ni mfumo kamili wa kusimamia Health, Safety, Security, Environment na Quality (HSSEQ) kwenye kampuni. Mfumo huu unasaidia kampuni kufuatilia matukio (incidents), kufanya audits, kusimamia compliance, na kutoa ripoti mbalimbali kwa mamlaka husika.

Mfumo unaruhusu wafanyakazi kuripoti matukio ya usalama moja kwa moja, na managers kuona muhtasari wa matukio yote kwa wakati mmoja. Pia unatoa tahadhari (alerts) kwa matukio muhimu na unafuatilia hatua zilizochukuliwa.

Mfumo unafuata viwango vya kimataifa vya ISO 45001 (Occupational Health & Safety) na ISO 14001 (Environmental Management). Umetengenezwa kwa DjangoRestAPI(Python), Spring Boot(Java) kwa backend,  + React + MUI kwa frontend, na MySQL kwa database.`,
    image: 'images/hsseq/dashboard.png',
    tech: ['Spring Boot(Java)', 'Django RestAPI(Python)', 'React','MUI'],
    pages: 12,
    modules: [
      { name: 'Dashboard', desc: 'Muhtasari wa HSSEQ metrics, charts, na alerts za matukio muhimu' },
      { name: 'Incident Reporting', desc: 'Kuripoti matukio mapya ya usalama kwa hatua kwa hatua (wizard)' },
      { name: 'Incident Tracking', desc: 'Kufuatilia matukio yaliyoripotiwa hadi yanapofungwa' },
      { name: 'Risk Assessment', desc: 'Kutathmini hatari na kuweka control measures' },
      { name: 'Audits', desc: 'Kufanya audits na kurekodi findings' },
      { name: 'Inspections', desc: 'Kukagua vifaa na maeneo ya kazi' },
      { name: 'Training Records', desc: 'Kufuatilia mafunzo ya wafanyakazi' },
      { name: 'Compliance', desc: 'Kufuatilia compliance na regulations mbalimbali' },
      { name: 'Documents', desc: 'Kuhifadhi na kusimamia documents za HSSEQ' },
      { name: 'Reports', desc: 'Kutoa ripoti mbalimbali (monthly, yearly, custom)' },
      { name: 'Users & Roles', desc: 'Kusimamia watumiaji na ruhusa zao (Admin, Manager, Employee)' },
      { name: 'Settings', desc: 'Mipangilio ya mfumo, email templates, na system config' }
    ],
    features: [
      'Real-time incident reporting',
      'Automated alerts for critical incidents',
      'Risk assessment matrix',
      'Audit and inspection management',
      'Training record tracking',
      'Compliance monitoring',
      'Document management',
      'Role-based access control (Admin, Manager, Employee)',
      'Comprehensive reporting (PDF, Excel)',
      'Dashboard with KPIs and charts',
      'Email notifications',
      'Activity logs for audit trail'
    ],
    challenges: 'Tatizo kubwa lilikuwa ni kuunda mfumo ambao unafuata viwango vya kimataifa vya HSSEQ (ISO 45001, ISO 14001) huku ukiwa rahisi kutumia kwa watu wa kawaida. Pia, ilikuwa vigumu ku-design database schema inayoshughulikia mahitaji yote ya HSSEQ (incidents, audits, inspections, training, compliance) bila kuwa ngumu sana.',
    solution: 'Nilisoma viwango vya ISO na kushirikiana na HSSEQ officers kuelewa mahitaji halisi. Nilitengeneza UI rahisi yenye mwongozo wa hatua kwa hatua (wizard) kwa kila process. Kwa database, nilitumia modular design — kila module ina tables zake, na zinaunganishwa kwa foreign keys.',
    role: 'Full Stack Developer (Solo Project)',
    duration: '4 months',
    status: '60%',
    github: 'https://github.com/ambokileB',
    demo: null,
        screenshots: [
                { title: 'Dashboard', img: 'images/hsseq/dashboard.png' },
                { title: 'Auth Page Login', img: 'images/hsseq/authPage.png' },
                { title: 'Sidebar Collapsed Dashboard', img: 'images/hsseq/collapsedDashboard.png' },
                { title: 'Report Incidents Page ', img: 'images/hsseq/reportIncidence.png' },
                { title: 'Incidents Analysis ', img: 'images/hsseq/incidentsAnalysis.png' },
                { title: 'Training Portal', img: 'images/hsseq/Training.png' },
                { title: 'Compliance Module', img: 'images/hsseq/compliance.png' }
                ],
  },

  // ============================================
  // PROJECT 3: RESTFUL APIS
  // ============================================
  'restful-apis': {
    id: 'restful-apis',
    title: 'RESTful APIs',
    category: 'software',
    shortDesc: 'Scalable and secure RESTful APIs with Spring Boot and DjangoRestAPI. JWT authentication and authorization.',
    longDesc: `Collection ya RESTful APIs zilizotengenezwa kwa Spring Boot na DjangoRestAPI. APIs hizi zinatumika kwenye projects mbalimbali na zinatoa huduma kama user authentication, data management, file uploads, na notifications.

Zote zinafuata best practices za REST, zina documentation kamili (Swagger/OpenAPI), na zina tests za kutosha. Zina security features kama JWT authentication, role-based access control, rate limiting, na input validation.

APIs hizi zimekuwa msingi wa projects zangu zingine kama CV Screening System na HSSEQ Management System.`,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    tech: ['Spring Boot', 'Node.js', 'Express', 'JWT', 'MongoDB', 'PostgreSQL', 'Swagger', 'Docker'],
    pages: 5,
    modules: [
      { name: 'Auth API', desc: 'Register, login, JWT refresh, password reset, email verification' },
      { name: 'User API', desc: 'CRUD operations for users, profile management, roles' },
      { name: 'File Upload API', desc: 'Upload, download, na kusimamia files (images, documents)' },
      { name: 'Notification API', desc: 'Tuma email na SMS notifications kwa users' },
      { name: 'Analytics API', desc: 'Toa data kwa ajili ya dashboards na reports' }
    ],
    features: [
      'JWT authentication & authorization',
      'Role-based access control',
      'Input validation & sanitization',
      'Rate limiting',
      'API documentation (Swagger/OpenAPI)',
      'Unit & integration tests',
      'Error handling middleware',
      'Logging',
      'CORS configuration',
      'Environment-based config',
      'Docker containerization',
      'CI/CD pipeline ready'
    ],
    challenges: 'Kuhakikisha usalama wa APIs na kuzuia attacks mbalimbali kama SQL injection, XSS, na brute force. Pia, ilikuwa vigumu ku-design API endpoints zenye consistency kwenye projects zote.',
    solution: 'Nilitumia validation libraries, prepared statements, rate limiting, na security headers. Pia nilifanya security audit na penetration testing. Kwa consistency, nilitengeneza API design guidelines zinazofuata REST best practices.',
    role: 'Backend Developer',
    duration: 'Ongoing',
    status: 'Active',
    github: 'https://github.com/ambokileB',
    demo: null,
    screenshots: []
  }

};

