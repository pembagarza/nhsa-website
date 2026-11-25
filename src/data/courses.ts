export type CourseCategory =
  | 'Caregiving & Elderly Care'
  | 'Emergency & Clinical Safety'
  | 'Mental Health & Psychosocial';

export interface CourseModule {
  title: string;
  points: string[];
}

export interface CourseFaq {
  q: string;
  a: string;
}

export interface Course {
  slug: string;
  title: string;
  category: CourseCategory;
  duration: string;
  hours: string;
  mode: string;
  overview: string;
  tagline?: string;
  image?: string;
  tags: string[];
  /** Flat, structured learning list (used instead of modules when present) */
  learnItems?: string[];
  modules?: CourseModule[];
  /** Bullet-list audience (legacy format) */
  audience?: string[];
  /** Clean single-paragraph "Who Should Join" summary */
  whoShouldJoin?: string;
  outcomes: string[];
  faqs: CourseFaq[];
}

export const CATEGORIES: CourseCategory[] = [
  'Caregiving & Elderly Care',
  'Emergency & Clinical Safety',
  'Mental Health & Psychosocial',
];

export const COURSES: Course[] = [
  {
    slug: 'basic-caregiver-elderly-care-skills',
    title: 'Basic Caregiver & Elderly Care Skills',
    category: 'Caregiving & Elderly Care',
    duration: '5–7 Days',
    hours: '20–30 Hours',
    mode: 'Practical Skill Development',
    overview:
      'Our flagship short programme builds the essential hands-on skills every caregiver needs: safe patient handling, personal care, mobility support, nutrition, vital signs, and compassionate daily-care routines. Taught almost entirely through supervised practical labs, it prepares you for real home-care and elderly-care work from day one.',
    tagline: 'Practical, employment-focused training program',
    image: '/images/basic-caregiver-elderly-care-skills.jpg',
    tags: ['Elderly Care', 'Hands-On Labs', 'Home Care Basics'],
    learnItems: [
      'Personal Care & Hygiene',
      'Elderly Care Fundamentals',
      'Bedside Assistance & Comfort',
      'Safe Mobility & Transfer Awareness',
      'Feeding Assistance Awareness',
      'Communication with Patients & Families',
      'Caregiver Ethics, Respect & Dignity',
      'Infection Prevention Fundamentals',
    ],
    whoShouldJoin:
      'Students, homemakers, aspiring caregivers, family caregivers and individuals interested in developing basic care-support skills.',
    outcomes: [
      'Home care agencies and elderly care centers',
      'Private in-home caregiving roles',
      'Foundation for CTEVT-affiliated caregiver pathways',
      'Confident, safe daily-care practice for families',
    ],
    faqs: [
      {
        q: 'Do I need any medical background to join?',
        a: 'No. This programme starts from the basics and is designed for complete beginners as well as family caregivers.',
      },
      {
        q: 'How much of the training is practical?',
        a: 'The majority of sessions are hands-on practical labs — you practice every skill under trainer supervision before you finish the course.',
      },
      {
        q: 'Will I receive a certificate?',
        a: 'Yes, participants receive an NHCSA practical completion certificate recognized by our home-care network.',
      },
    ],
  },
  {
    slug: 'home-care-patient-support-essentials',
    title: 'Home Care & Patient Support Essentials',
    category: 'Caregiving & Elderly Care',
    duration: '3–5 Days',
    hours: '15–24 Hours',
    mode: 'Practical Skill Development',
    overview:
      'A focused programme for anyone supporting a recovering or chronically ill patient at home. You will learn safe bed-side care, medication reminders, infection-safe housekeeping, mobility help and emotional support — the complete toolkit for dependable home-based patient support.',
    tagline: 'Practical, employment-focused training program',
    image: '/images/home-care-patient-support-essentials.jpg',
    tags: ['Home Care', 'Patient Support', 'Bedside Skills'],
    learnItems: [
      'Understanding Home-Care Environments',
      'Patient Comfort & Daily Routine Support',
      'Hygiene & Safe Surroundings',
      'Basic Observation & Reporting',
      'Family Communication',
      'Home-Care Etiquette',
      'Care Documentation & Daily Reporting',
      'Professional Boundaries',
    ],
    whoShouldJoin:
      'Aspiring caregivers, family caregivers, students, home-care support workers and individuals interested in providing non-clinical support at home.',
    outcomes: [
      'Home care agencies and private households',
      'Post-surgery and chronic-illness home support',
      'Confident family caregiving',
      'Pathway to advanced caregiver training',
    ],
    faqs: [
      {
        q: 'Is this suitable for complete beginners?',
        a: 'Yes — it is designed for people with no prior healthcare training who need practical, dependable home-care skills.',
      },
      {
        q: 'Can I take this while working?',
        a: 'Yes. Short daily sessions across 3–5 days make it manageable alongside work or study. Flexible batch options are available.',
      },
      {
        q: 'Does this cover elderly care specifically?',
        a: 'The skills apply to adult patients of all ages, with dedicated sessions on supporting elderly and limited-mobility clients.',
      },
    ],
  },
  {
    slug: 'elderly-care-dementia-compassionate-communication',
    title: 'Elderly Care, Dementia Awareness & Compassionate Communication',
    category: 'Caregiving & Elderly Care',
    duration: '2–3 Days',
    hours: '10–15 Hours',
    mode: 'Awareness & Skill Development',
    overview:
      'Understand ageing, memory loss and dementia — and learn how to respond with skill and compassion. This programme combines dementia awareness with practical communication techniques for supporting elderly clients with confusion, mood changes, and changing care needs.',
    tagline: 'Understand Aging. Communicate with Compassion. Care with Respect.',
    image: '/images/elderly-care-dementia-compassionate-communication.jpg',
    tags: ['Dementia Awareness', 'Communication', 'Elderly Support'],
    learnItems: [
      'Understanding Aging',
      'Changes in Elderly Behavior',
      'Dementia Awareness',
      'Compassionate Communication',
      'Emotional Support',
      'Respecting Dignity & Independence',
      'Managing Difficult Communication Situations',
      'Family Caregiver Support',
    ],
    whoShouldJoin:
      'Caregivers, family members, students, community members and care-service workers interested in elderly support and compassionate communication.',
    outcomes: [
      'Elderly care homes and day-care centers',
      'Specialized dementia home support',
      'Improved family caregiving at home',
      'Foundation for psychosocial support roles',
    ],
    faqs: [
      {
        q: 'Is this a clinical dementia course?',
        a: 'No — it is an awareness and practical-support programme designed for caregivers and family members, not clinical diagnosis training.',
      },
      {
        q: 'I care for my parent with dementia. Will this help?',
        a: 'Absolutely. Many participants join precisely for this reason — the communication and daily-routine strategies apply directly at home.',
      },
      {
        q: 'Are there role-plays or discussions?',
        a: 'Yes, scenario-based practice and group discussion are central to how this programme is taught.',
      },
    ],
  },
  {
    slug: 'infection-prevention-hygiene-safety',
    title: 'Infection Prevention, Hygiene & Safety Awareness',
    category: 'Emergency & Clinical Safety',
    duration: '2 Days',
    hours: '8–12 Hours',
    mode: 'Practical Awareness Training',
    overview:
      'Learn how infections spread and how to stop them. This practical awareness programme covers hand hygiene, personal protective equipment, safe cleaning and waste handling, and safety practices essential for caregiving, clinical support, hospitality and institutional settings.',
    tagline: 'Protect Yourself. Protect Others. Practice Safe Habits.',
    image: '/images/infection-prevention-hygiene-safety.jpg',
    tags: ['Hygiene', 'Safety', 'Infection Control'],
    learnItems: [
      'Hand Hygiene',
      'Personal Protective Equipment (PPE) Awareness',
      'Safe Handling & Disposal Awareness',
      'Environmental Cleanliness',
      'Infection Prevention Principles',
      'Hygiene & Sanitation in Care Settings',
      'Workplace Safety',
    ],
    whoShouldJoin:
      'Caregivers, hotel employees, daycare staff, cleaners, office staff, students and community workers.',
    outcomes: [
      'Hospitals, clinics and care facilities',
      'Home-care agencies with hygiene standards',
      'Hospitality and institutional roles',
      'Safer home care for vulnerable family members',
    ],
    faqs: [
      {
        q: 'Is this only for healthcare workers?',
        a: 'No. The content is valuable for caregivers, hospitality staff, daycare workers and anyone who needs dependable hygiene practice.',
      },
      {
        q: 'Do we practice with actual PPE?',
        a: 'Yes — glove, mask and apron practice with feedback is a core part of the sessions.',
      },
      {
        q: 'Is there an assessment?',
        a: 'There is a short practical demonstration at the end; it is designed to build confidence, not to exclude anyone.',
      },
    ],
  },
  {
    slug: 'basic-life-support-bls-training',
    title: 'Basic Life Support (BLS) Training',
    category: 'Emergency & Clinical Safety',
    duration: '1–2 Days',
    hours: '8–16 Hours',
    mode: 'Hands-On Clinical Emergency',
    overview:
      'Seconds decide outcomes in cardiac and breathing emergencies. This hands-on programme teaches high-quality CPR for adults, children and infants, AED use, choking relief and team-based resuscitation — practised repeatedly on manikins until responses become automatic.',
    image: '/images/basic-life-support-bls-training.jpg',
    tags: ['CPR', 'AED', 'Emergency Response'],
    modules: [
      {
        title: 'Recognizing Cardiac & Breathing Emergencies',
        points: [
          'Scene safety and rapid victim assessment',
          'Signs of cardiac arrest, heart attack and stroke',
          'Activating emergency services effectively',
        ],
      },
      {
        title: 'High-Quality CPR Practice',
        points: [
          'Chest compressions: depth, rate and recoil',
          'Rescue breaths and barrier devices',
          'Adult, child and infant CPR sequences',
        ],
      },
      {
        title: 'AED & Choking Response',
        points: [
          'Using an automated external defibrillator confidently',
          'Choking relief for conscious and unconscious victims',
          'Recovery position and post-resuscitation care',
        ],
      },
      {
        title: 'Team Resuscitation Scenarios',
        points: [
          'Two-rescuer CPR and role rotation',
          'Simulated emergency drills with feedback',
          'Managing stress and communication in real events',
        ],
      },
    ],
    audience: [
      'Healthcare and caregiving staff',
      'Students in health science programmes',
      'Workplace safety officers and teams',
      'Any prepared member of the public',
    ],
    outcomes: [
      'Clinics, hospitals and care facilities',
      'Workplace emergency-response roles',
      'Confidence to act in community emergencies',
      'Requirement checklist for many caregiver jobs',
    ],
    faqs: [
      {
        q: 'Do I need a medical background?',
        a: 'No. The course starts from zero and builds you up through guided practice on manikins.',
      },
      {
        q: 'Will I practice on real equipment?',
        a: 'Yes — you will train on CPR manikins and AED trainers throughout the sessions.',
      },
      {
        q: 'Is BLS physically demanding?',
        a: 'Compressions require moderate physical effort, and trainers adapt technique guidance to each participant safely.',
      },
    ],
  },
  {
    slug: 'psychological-first-aid-pfa-training',
    title: 'Psychological First Aid (PFA) Training',
    category: 'Mental Health & Psychosocial',
    duration: '2 Days',
    hours: '10–12 Hours',
    mode: 'Practical Support Training',
    overview:
      'When people face crisis, loss or disaster, the first moments of support matter enormously. PFA teaches you how to offer calm, practical, non-intrusive support — listening, stabilizing, connecting people to help — without needing to be a counsellor.',
    image: '/images/psychological-first-aid-pfa-training.jpg',
    tags: ['PFA', 'Crisis Support', 'Active Listening'],
    modules: [
      {
        title: 'Understanding Crisis & Distress',
        points: [
          'Common reactions to crisis, loss and disaster',
          'Typical vs. concerning responses',
          'Look, Listen, Link — the PFA framework',
        ],
      },
      {
        title: 'Offering Calm, Practical Support',
        points: [
          'Approaching distressed people safely and respectfully',
          'Stabilizing acute distress',
          'What to say — and what never to say',
        ],
      },
      {
        title: 'Active Listening & Connecting to Help',
        points: [
          'Non-judgmental listening practice',
          'Identifying urgent needs and risks',
          'Linking people to services and supports',
        ],
      },
      {
        title: 'Self-Care for Support Providers',
        points: [
          'Managing your own stress response',
          'Boundaries for helpers and volunteers',
          'Building a personal support routine',
        ],
      },
    ],
    audience: [
      'Community and psychosocial support volunteers',
      'Caregivers and healthcare support staff',
      'Teachers, social workers and NGO staff',
      'Anyone who wants to support others in crisis',
    ],
    outcomes: [
      'Community health and relief programmes',
      'Psychosocial support teams and NGOs',
      'Workplace peer-support roles',
      'Stronger caregiving and client relationships',
    ],
    faqs: [
      {
        q: 'Does this make me a counsellor?',
        a: 'No — PFA is first-line support, not therapy. You will learn when and how to refer people to professional help.',
      },
      {
        q: 'Is this relevant outside disasters?',
        a: 'Very much so. PFA applies to accidents, sudden loss, domestic crisis and any situation of acute distress.',
      },
      {
        q: 'How is the course delivered?',
        a: 'Through short presentations, demonstrations, group practice and scenario exercises.',
      },
    ],
  },
  {
    slug: 'anxiety-depression-training',
    title: 'Anxiety & Depression Training',
    category: 'Mental Health & Psychosocial',
    duration: '2 Days',
    hours: '10–12 Hours',
    mode: 'Mental Health Awareness',
    overview:
      'Anxiety and depression touch nearly every family and workplace. This awareness programme helps you recognize signs, respond supportively, challenge stigma, and guide people toward appropriate professional care — essential knowledge for caregivers, educators and community members.',
    image: '/images/anxiety-depression-training.jpg',
    tags: ['Mental Health', 'Awareness', 'Supportive Response'],
    modules: [
      {
        title: 'Understanding Anxiety & Depression',
        points: [
          'What anxiety and depression are — and are not',
          'Signs and symptoms in adults and the elderly',
          'Myths, stigma and mental health in Nepal',
        ],
      },
      {
        title: 'Recognizing & Responding Supportively',
        points: [
          'Starting supportive conversations',
          'Responding to distress without judgment',
          'Supporting people without diagnosing them',
        ],
      },
      {
        title: 'When & How to Seek Professional Help',
        points: [
          'Warning signs that need urgent attention',
          'Responding to crisis situations',
          'Referral options and treatment pathways in Nepal',
        ],
      },
      {
        title: 'Building Mentally Healthy Environments',
        points: [
          'Daily habits that support recovery',
          'Supporting colleagues, clients and family members',
          'Care for the supporter — self-care essentials',
        ],
      },
    ],
    audience: [
      'Caregivers and community support workers',
      'Teachers, HR and team leaders',
      'Family members of people experiencing distress',
      'Students of health and social sciences',
    ],
    outcomes: [
      'Community mental health and NGO programmes',
      'Supportive caregiving and client work',
      'Mentally healthier workplaces and homes',
      'Foundation for further psychosocial training',
    ],
    faqs: [
      {
        q: 'Will I learn to treat anxiety and depression?',
        a: 'No. You will learn to recognize, respond supportively, and connect people to professional care — which is exactly what non-clinicians should do.',
      },
      {
        q: 'Is this course suitable if I have experienced mental health issues myself?',
        a: 'Yes, and many participants do. Content is delivered with care, and you can step back from any exercise at any time.',
      },
      {
        q: 'Does it cover suicide risk?',
        a: 'The course covers warning signs and safe response pathways, including when and how to involve professional help urgently.',
      },
    ],
  },
  {
    slug: 'psychosocial-training-workshops',
    title: 'Psychosocial Training Workshops',
    category: 'Mental Health & Psychosocial',
    duration: '2–3 Days',
    hours: '12–18 Hours',
    mode: 'Interactive Workshop',
    overview:
      'Interactive group workshops that build core psychosocial support skills — communication, stress management, teamwork and resilience — for people who support others through their work in caregiving, community services, education and relief programmes.',
    image: '/images/psychosocial-training-workshops.jpg',
    tags: ['Workshop', 'Psychosocial Skills', 'Resilience'],
    modules: [
      {
        title: 'Communication & Helping Skills',
        points: [
          'Empathetic listening practice',
          'Communication styles and barriers',
          'Managing difficult conversations',
        ],
      },
      {
        title: 'Stress & Emotional Wellbeing',
        points: [
          'Understanding stress, burnout and compassion fatigue',
          'Practical stress-management techniques',
          'Emotional regulation in helping roles',
        ],
      },
      {
        title: 'Working With People & Communities',
        points: [
          'Group facilitation basics',
          'Cultural sensitivity and inclusive support',
          'Teamwork in care and support settings',
        ],
      },
      {
        title: 'Resilience & Self-Care Practice',
        points: [
          'Building personal resilience routines',
          'Peer support and supervision',
          'Personal wellbeing action plan',
        ],
      },
    ],
    audience: [
      'Community and NGO support workers',
      'Caregivers and healthcare support staff',
      'Teachers and youth workers',
      'Volunteers in relief and social programmes',
    ],
    outcomes: [
      'NGO and community programme roles',
      'Improved team wellbeing and communication',
      'Stronger resilience in helping professions',
      'Practical facilitation skills for group settings',
    ],
    faqs: [
      {
        q: 'Are these workshops or lectures?',
        a: 'Workshops — expect group activities, role plays and reflection, with minimal lecture time.',
      },
      {
        q: 'Can an organization book a group cohort?',
        a: 'Yes. Group cohorts for institutions and NGOs can be arranged — contact us for scheduling.',
      },
      {
        q: 'Do participants receive a certificate?',
        a: 'Yes, an NHCSA participation and completion certificate is provided.',
      },
    ],
  },
  {
    slug: 'first-aid-training',
    title: 'First-Aid Training',
    category: 'Emergency & Clinical Safety',
    duration: '1–2 Days',
    hours: '8–16 Hours',
    mode: 'Practical Emergency Response',
    overview:
      'Be the person who knows exactly what to do. This practical first-aid programme covers bleeding control, wounds, burns, fractures, unconscious casualties and everyday emergencies — trained through scenario drills so your response becomes instinctive.',
    image: '/images/first-aid-training.jpg',
    tags: ['First Aid', 'Emergency Care', 'Scenario Drills'],
    modules: [
      {
        title: 'First-Aid Fundamentals',
        points: [
          'Scene safety and the primary survey (DRABC)',
          'Managing an unconscious casualty and recovery position',
          'Building and using a first-aid kit',
        ],
      },
      {
        title: 'Bleeding, Wounds & Burns',
        points: [
          'Controlling severe bleeding',
          'Cleaning, dressing and monitoring wounds',
          'Burn and scald first aid',
        ],
      },
      {
        title: 'Fractures, Sprains & Head Injuries',
        points: [
          'Immobilization and splinting basics',
          'Recognizing head and spinal injury warning signs',
          'Sprains, strains and RICE approach',
        ],
      },
      {
        title: 'Medical & Everyday Emergencies',
        points: [
          'Fainting, seizures and diabetic emergencies',
          'Allergic reactions and poisoning response',
          'Heat, cold and drowning scenarios',
        ],
      },
    ],
    audience: [
      'Caregivers and support workers',
      'Parents, teachers and childcare staff',
      'Workplace teams and safety officers',
      'Anyone who wants emergency preparedness',
    ],
    outcomes: [
      'Workplace and institutional first-aid roles',
      'Safer homes and care settings',
      'Complement to BLS and caregiver training',
      'Confidence in community emergencies',
    ],
    faqs: [
      {
        q: 'Is this the same as BLS?',
        a: 'No — BLS focuses on CPR, AED and resuscitation. First aid covers a broader range of injuries and medical emergencies. Many participants take both.',
      },
      {
        q: 'Will there be hands-on practice?',
        a: 'Yes — bandaging, splinting and casualty scenario practice form the core of the training.',
      },
      {
        q: 'Is there an exam?',
        a: 'A short practical assessment concludes the course; the focus is competence and confidence.',
      },
    ],
  },
  {
    slug: 'ctevt-affiliated-caregiver-training',
    title: 'CTEVT-Affiliated Caregiver Training',
    category: 'Caregiving & Elderly Care',
    duration: '3 Months / 390 Hours',
    hours: '390 Hours',
    mode: 'National Skill Standard',
    overview:
      'Our flagship CTEVT-affiliated programme follows Nepal’s national caregiver skill standard — combining theory, extensive practical labs and workplace exposure across elderly care, patient support, clinical assistance and psychosocial care. Graduates leave with a recognized national credential and genuine job-readiness.',
    image: '/images/ctevt-affiliated-caregiver-training.jpg',
    tags: ['CTEVT Affiliated', 'National Credential', '3 Months'],
    modules: [
      {
        title: 'Foundations of Caregiving & Ethics',
        points: [
          'Roles, responsibilities and professional ethics of caregivers',
          'Safety, client rights and confidentiality',
          'Communication and documentation standards',
        ],
      },
      {
        title: 'Elderly, Dementia & Home-Based Care',
        points: [
          'Personal care, mobility, nutrition and hygiene support',
          'Dementia-aware and end-of-life supportive care',
          'Home environment management and family liaison',
        ],
      },
      {
        title: 'Clinical Support & Emergency Readiness',
        points: [
          'Vital signs, medication support and observation reporting',
          'Infection prevention and safe practice',
          'BLS and first-aid emergency response',
        ],
      },
      {
        title: 'Psychosocial Care & Workplace Practice',
        points: [
          'Psychosocial support and mental health basics',
          'Supervised practical assessment and workplace exposure',
          'Career guidance and national certification preparation',
        ],
      },
    ],
    audience: [
      'Aspiring professional caregivers (local & international pathways)',
      'SEE/+2 graduates seeking a recognized healthcare skill',
      'Home-care workers formalizing their credentials',
      'Anyone seeking CTEVT national-standard caregiver certification',
    ],
    outcomes: [
      'CTEVT national certification readiness',
      'Home care agencies and elderly care centers',
      'Clinics, hospitals and care facilities',
      'International caregiving career pathways',
    ],
    faqs: [
      {
        q: 'What does CTEVT affiliation mean?',
        a: 'The programme is aligned with the Council for Technical Education and Vocational Training’s national caregiver skill standard, and graduates are prepared for national certification.',
      },
      {
        q: 'What is the time commitment?',
        a: '3 months and approximately 390 total hours combining classroom theory, practical labs and workplace exposure.',
      },
      {
        q: 'What are the entry requirements?',
        a: 'Basic education (SEE or above is typical) and a commitment to attend regularly. Book a free counselling session to confirm your eligibility.',
      },
    ],
  },
];

export function getCourseBySlug(slug: string | undefined): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}
