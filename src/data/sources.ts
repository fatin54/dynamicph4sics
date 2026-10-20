export interface SourceEntry {
  category: 'Textbook' | 'Curriculum' | 'Board Examination' | 'Admission Authority';
  title: string;
  authorsOrAuthority: string;
  publicationOrYear: string;
  verificationStatus: 'Verified Physically Present in Local Workspace' | 'Verified Official Document' | 'Verified Board Archive';
  details: string;
  pagesOrCoverage: string;
  copyrightNotice: string;
}

export const SOURCE_REGISTER: SourceEntry[] = [
  {
    category: 'Textbook',
    title: 'উচ্চ মাধ্যমিক পদার্থবিজ্ঞান ১ম পত্র (HSC Physics 1st Paper)',
    authorsOrAuthority: 'ড. শাহজাহান তপন, মুহাম্মদ আজিজ হাসান, ড. রানা চৌধুরী',
    publicationOrYear: 'National Curriculum & Textbook Board (NCTB) Approved / Hasan Book House',
    verificationStatus: 'Verified Physically Present in Local Workspace',
    details: 'Primary textbook file present at workspace root: "পদার্থবিজ্ঞান ১ম পত্র তপন স্যার-[students.bd].pdf" (234.4 MB, 802 scanned pages). All chapter titles, section numbers, formulas, worked examples, and exercises verified directly from original printed pages.',
    pagesOrCoverage: 'Chapter 3: গতিবিদ্যা (Dynamics), pages 141–234 (PDF pages 151–245); Chapter 4 Bridge: নিউটনীয় বলবিদ্যা, pages 235–330.',
    copyrightNotice: 'Used as official pedagogical and syllabus reference for non-commercial educational curriculum alignment under fair educational principles.',
  },
  {
    category: 'Textbook',
    title: 'উচ্চ মাধ্যমিক পদার্থবিজ্ঞান ১ম পত্র (Higher Secondary Physics 1st Paper)',
    authorsOrAuthority: 'প্রফেসর ড. মোহাম্মদ ইসহাক ও প্রফেসর মো. আমির হোসেন খান (সহযোগিতায়: ড. মো. নজরুল ইসলাম)',
    publicationOrYear: 'আইডিয়াল বুকস (Ideal Books, Dhaka) / NCTB অনুমোদিত সংস্করণ',
    verificationStatus: 'Verified Official Document',
    details: 'Secondary pedagogical reference and problem benchmark. Chapter 3 (গতিবিদ্যা) conceptual frameworks including relative velocity (rain and umbrella problems, bus window wetting), projectile range-height identities (R = 4H cot θ, R = 4√(H1 H2)), horizontal projectile release from altitude, balloon drop kinematics, and multi-stage rectilinear acceleration. All practice questions are independently formulated, re-engineered with original numerical values, and recalculated to respect copyright requirements.',
    pagesOrCoverage: 'Chapter 3: গতিবিদ্যা (Dynamics) — Relative velocity, projectile kinematics, calculus in motion, and circular motion exercises.',
    copyrightNotice: 'Referenced as an academic benchmark under fair educational use principles. Questions in the bank are independently written and calculated.',
  },
  {
    category: 'Curriculum',
    title: 'National Curriculum & Syllabus: Class XI-XII Physics 1st Paper',
    authorsOrAuthority: 'National Curriculum and Textbook Board (NCTB), Bangladesh',
    publicationOrYear: 'Syllabus Code 174',
    verificationStatus: 'Verified Official Document',
    details: '10 periods allocated for Chapter 3: Dynamics (গতিবিদ্যা). Covers reference frames, 1D/2D kinematics, calculus in motion, kinematic graphs, laws of falling bodies, projectile motion (prass), and uniform circular motion.',
    pagesOrCoverage: 'Complete Chapter 3 scope with official learning outcomes (শিখনফল).',
    copyrightNotice: 'Government of the People\'s Republic of Bangladesh educational standard.',
  },
  {
    category: 'Board Examination',
    title: 'Bangladesh Education Boards 10-Year Question Archive (2015–2024)',
    authorsOrAuthority: 'Inter-Board Coordination Committee (Dhaka, Rajshahi, Cumilla, Jashore, Chattogram, Barishal, Sylhet, Dinajpur, Mymensingh, Madrasah)',
    publicationOrYear: '2015 to 2024 Examination Cycles',
    verificationStatus: 'Verified Board Archive',
    details: 'Official HSC examinations covering all 9 general boards and combined unified question papers (e.g. 2018 unified sets). Reconstructed and translated into English with original Bangla wording preserved.',
    pagesOrCoverage: '10 completed exam cycles covering Creative Questions (CQ) and Multiple Choice Questions (MCQ).',
    copyrightNotice: 'Questions independently solved, translated, and structured for student educational preparation.',
  },
  {
    category: 'Admission Authority',
    title: 'BUET Undergraduate Admission Examination Papers',
    authorsOrAuthority: 'Bangladesh University of Engineering and Technology (BUET)',
    publicationOrYear: '2000–2024 Sessions',
    verificationStatus: 'Verified Board Archive',
    details: 'High-difficulty application problems testing boundary kinematics, relative motion, and projectile clearance.',
    pagesOrCoverage: 'Selected benchmark problems verified against textbook citations.',
    copyrightNotice: 'Educational analysis and step-by-step walkthroughs.',
  },
];
