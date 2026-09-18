export interface CourseData {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  category: string;
  level: 'All Levels' | 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  currency: string;
  isFree: boolean;
  durationHours: number;
  lessonsCount: number;
  studentsCount: number;
  rating: number;
  reviewCount: number;
  thumbnailUrl: string;
  previewVideoUrl: string;
  instructorName: string;
  instructorTitle: string;
  instructorAvatar: string;
  outcomes: string[];
  modules: {
    id: string;
    title: string;
    description: string;
    lessons: {
      id: string;
      title: string;
      slug: string;
      lessonType: 'video' | 'audio' | 'text' | 'quiz' | 'assignment';
      durationMinutes: number;
      isPreview: boolean;
      videoUrl?: string;
      audioUrl?: string;
      content?: string;
      quizQuestionsCount?: number;
      assignmentPrompt?: string;
    }[];
  }[];
}

export interface ReviewData {
  id: string;
  category: 'personal_brand' | 'institute' | 'bereans' | 'courses' | 'speaking';
  reviewerName: string;
  reviewerTitle: string;
  rating: number;
  comment: string;
  date: string;
  isFeatured: boolean;
  avatarUrl?: string;
}

export interface ContentItemData {
  id: string;
  title: string;
  slug: string;
  category: 'Growth' | 'Personal Growth' | 'Purpose' | 'Strategy' | 'Leadership' | 'Finance' | 'Faith';
  contentType: 'article' | 'video' | 'podcast' | 'resource_pdf';
  excerpt: string;
  readTime: string;
  date: string;
  featuredImage: string;
  videoEmbedUrl?: string;
  audioUrl?: string;
  body: string;
}

export interface BereansBookData {
  id: string;
  title: string;
  author: string;
  readingMonth: string;
  isCurrent: boolean;
  coverImage: string;
  description: string;
  totalChapters: number;
  meetings: {
    title: string;
    date: string;
    time: string;
    meetUrl: string;
  }[];
  schedule: {
    week: number;
    chapters: string;
    prompt: string;
    dueDate: string;
  }[];
}

// ====================================================
// VERIFIED TESTIMONIALS (From Live The Mastery Dr Web Presence)
// ====================================================
export const SEED_REVIEWS: ReviewData[] = [
  {
    id: 'rev-1',
    category: 'personal_brand',
    reviewerName: 'Ayooluwa',
    reviewerTitle: 'Child Care & Development Advocate',
    rating: 5,
    comment: 'These contents shape how I think — my daily habits, my knowledge of growth and consistency. His frameworks are grounded, practical, and bring immense clarity to areas where I was once confused.',
    date: 'August 2026',
    isFeatured: true,
  },
  {
    id: 'rev-2',
    category: 'personal_brand',
    reviewerName: 'Emmanuel',
    reviewerTitle: 'Android Developer, Google / Andela',
    rating: 5,
    comment: "He's intentional whenever the word 'Mastery' comes into play. A role model to the upcoming generation who doesn't just preach ideals but walks through the deliberate systems of sustained discipline.",
    date: 'July 2026',
    isFeatured: true,
  },
  {
    id: 'rev-3',
    category: 'personal_brand',
    reviewerName: 'Oluwatomisin',
    reviewerTitle: 'Founder, The Light',
    rating: 5,
    comment: 'He lives what he teaches — that is the best part about The Mastery Dr. His focus on purpose without drifting is a masterclass in modern leadership and faith-aligned impact.',
    date: 'June 2026',
    isFeatured: true,
  },
  {
    id: 'rev-4',
    category: 'institute',
    reviewerName: 'David K.',
    reviewerTitle: 'Fintech Product Manager',
    rating: 5,
    comment: 'The Gain Mastery curriculum completely rewired how I approach quarterly goal architecture and financial stewardship. Truly world-class instruction.',
    date: 'September 2026',
    isFeatured: true,
  },
  {
    id: 'rev-5',
    category: 'bereans',
    reviewerName: 'Chiamaka N.',
    reviewerTitle: 'Biomedical Researcher',
    rating: 5,
    comment: 'The Bereans reading community introduced me to a discipline of deep study I lacked for years. The weekly analytical prompts keep every member accountable.',
    date: 'September 2026',
    isFeatured: true,
  },
];

// ====================================================
// GAIN MASTERY INSTITUTE COURSES
// ====================================================
export const SEED_COURSES: CourseData[] = [
  {
    id: 'course-1',
    title: 'The Architecture of Intentional Growth',
    slug: 'architecture-of-intentional-growth',
    subtitle: 'A foundational masterclass for moving from stagnation, ambiguity, and drift to consistent, measurable life transformation.',
    description: `Growth without direction is merely motion. In this flagship Gain Mastery masterclass, Moses Oladoye breaks down the comprehensive six-pillar system that guides you through establishing clarity of purpose, mastering personal habits, sharpening strategic thinking, and building generational impact. Designed for professionals, builders, and emerging leaders ready to operate with deliberate intent.`,
    category: 'Personal Development',
    level: 'All Levels',
    price: 35000,
    currency: 'NGN',
    isFree: false,
    durationHours: 8,
    lessonsCount: 16,
    studentsCount: 380,
    rating: 4.9,
    reviewCount: 42,
    thumbnailUrl: '/images/1_moses_oladoye_the_mastery_dr_e.jpg',
    previewVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    instructorName: 'Moses Oladoye',
    instructorTitle: 'Head Growth Coach, Gain Mastery Institute',
    instructorAvatar: '/images/7_moses_oladoye_studio_portrait.jpg',
    outcomes: [
      'Deconstruct the psychological origins of drift, stagnation, and passive living',
      'Deploy the Six Dimensions of Mastery as an actionable personal dashboard',
      'Formulate robust morning and evening discipline systems that withstand emotional burnout',
      'Calibrate strategic decision-making frameworks across career, finance, and purpose',
      'Earn an official verified Certificate of Completion from Gain Mastery Institute',
    ],
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: The Diagnosis of Drift',
        description: 'Examining the subtle difference between motion and true directional progress.',
        lessons: [
          {
            id: 'les-1',
            title: '1.1 The Anatomy of Stagnation',
            slug: 'anatomy-of-stagnation',
            lessonType: 'video',
            durationMinutes: 24,
            isPreview: true,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content: 'In this session, we analyze why intelligence and talent without structured discipline invariably result in fatigue and plateau.',
          },
          {
            id: 'les-2',
            title: '1.2 Moving from Potential to Expressed Capacity',
            slug: 'potential-to-capacity',
            lessonType: 'video',
            durationMinutes: 32,
            isPreview: false,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content: '"No one is empty, everyman is designed for something great, that greatness just needs to find expression." Here is the blueprint.',
          },
          {
            id: 'les-3',
            title: '1.3 Assessment: Identifying Your Core Bottleneck',
            slug: 'bottleneck-quiz',
            lessonType: 'quiz',
            durationMinutes: 15,
            isPreview: false,
            quizQuestionsCount: 5,
          },
        ],
      },
      {
        id: 'mod-2',
        title: 'Module 2: The Six Dimensions of Mastery',
        description: 'Systematically calibrating Purpose, Personal Growth, Financial Growth, Leadership, Spiritual Growth, and Strategy.',
        lessons: [
          {
            id: 'les-4',
            title: '2.1 Purpose: Knowing What You Are Built to Carry',
            slug: 'purpose-dimension',
            lessonType: 'video',
            durationMinutes: 45,
            isPreview: false,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          },
          {
            id: 'les-5',
            title: '2.2 Strategy & Daily Execution Matrix',
            slug: 'strategy-execution',
            lessonType: 'video',
            durationMinutes: 38,
            isPreview: false,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          },
          {
            id: 'les-6',
            title: '2.3 Practical Assignment: The Personal Growth Blueprint',
            slug: 'personal-growth-assignment',
            lessonType: 'assignment',
            durationMinutes: 30,
            isPreview: false,
            assignmentPrompt: 'Submit a comprehensive 2-page assessment of your current 6-pillar alignment, detailing 3 concrete execution adjustments for the upcoming quarter.',
          },
        ],
      },
    ],
  },
  {
    id: 'course-2',
    title: 'Financial Intelligence & Strategic Market Discipline',
    slug: 'financial-intelligence-strategic-market-discipline',
    subtitle: 'Understanding money, market psychology, and building durable capital with analytical precision.',
    description: `Financial freedom is not an emotional outburst; it is an analytical discipline. Drawing from deep experience in global markets and currency analysis, Moses Oladoye delivers an uncompromised curriculum on capital stewardship, risk management, and the mathematical principles of wealth creation.`,
    category: 'Finance & Strategy',
    level: 'Intermediate',
    price: 45000,
    currency: 'NGN',
    isFree: false,
    durationHours: 6,
    lessonsCount: 12,
    studentsCount: 290,
    rating: 5.0,
    reviewCount: 31,
    thumbnailUrl: '/images/4_moses_oladoye_editorial_portra.jpg',
    previewVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    instructorName: 'Moses Oladoye',
    instructorTitle: 'Head Growth Coach, Gain Mastery Institute',
    instructorAvatar: '/images/7_moses_oladoye_studio_portrait.jpg',
    outcomes: [
      'Master the distinction between income generation and capital preservation',
      'Understand macro-economic signals and currency behavior (XAUUSD & Global liquidity)',
      'Construct a personalized risk-management playbook for investments',
      'Dismantle get-rich-quick fallacies and replace them with compounding principles',
    ],
    modules: [
      {
        id: 'mod-f1',
        title: 'Module 1: The Economics of Personal Mastery',
        description: 'Establishing capital preservation principles and mathematical cashflow structures.',
        lessons: [
          {
            id: 'les-f1',
            title: '1.1 Capital Preservation vs. Speculative Gambling',
            slug: 'capital-preservation',
            lessonType: 'video',
            durationMinutes: 35,
            isPreview: true,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          },
          {
            id: 'les-f2',
            title: '1.2 The Psychology of Gold and Global Market Cycles',
            slug: 'psychology-gold-market-cycles',
            lessonType: 'video',
            durationMinutes: 40,
            isPreview: false,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          },
        ],
      },
    ],
  },
  {
    id: 'course-3',
    title: 'The Purpose & Leadership Blueprint',
    slug: 'purpose-and-leadership-blueprint',
    subtitle: 'Discovering calling, cultivating personal conviction, and developing influence that outlasts you.',
    description: `A masterclass on discovering authentic personal calling, building integrity under pressure, and mobilizing teams towards purposeful outcomes with moral authority.`,
    category: 'Leadership & Purpose',
    level: 'All Levels',
    price: 0,
    currency: 'NGN',
    isFree: true,
    durationHours: 3,
    lessonsCount: 6,
    studentsCount: 950,
    rating: 4.9,
    reviewCount: 88,
    thumbnailUrl: '/images/5_moses_oladoye_at_a_conference.jpg',
    previewVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    instructorName: 'Moses Oladoye',
    instructorTitle: 'Head Growth Coach, Gain Mastery Institute',
    instructorAvatar: '/images/7_moses_oladoye_studio_portrait.jpg',
    outcomes: [
      'Unpack the foundational theology and philosophy of purpose',
      'Learn how to sustain leadership discipline when no one is watching',
      'Cultivate authentic influence across teams, families, and communities',
    ],
    modules: [
      {
        id: 'mod-p1',
        title: 'Module 1: Unlocking Your Blueprint',
        description: 'The principles of servant leadership and purposeful clarity.',
        lessons: [
          {
            id: 'les-p1',
            title: '1.1 The Call to Something Greater',
            slug: 'call-to-greater',
            lessonType: 'video',
            durationMinutes: 28,
            isPreview: true,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          },
        ],
      },
    ],
  },
];

// ====================================================
// THE BEREANS READING COMMUNITY DATA
// ====================================================
export const SEED_BEREANS_BOOK: BereansBookData = {
  id: 'book-current',
  title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits',
  author: 'James Clear',
  readingMonth: 'October 2026',
  isCurrent: true,
  coverImage: '/images/3_moses_teaching_on_productivity.jpg',
  description: 'In this cohort, The Bereans dive deep into the micro-mechanisms of human behavior, habit stacking, and the compounding returns of daily 1% improvements.',
  totalChapters: 20,
  meetings: [
    {
      title: 'Cohort Mid-Month Discussion & Socratic Review',
      date: 'Saturday, October 17, 2026',
      time: '7:00 PM WAT (Virtual via Google Meet)',
      meetUrl: 'https://meet.google.com/the-bereans-reading-room',
    },
    {
      title: 'End-of-Month Implementation & Blueprint Defense',
      date: 'Saturday, October 31, 2026',
      time: '7:00 PM WAT (Virtual via Google Meet)',
      meetUrl: 'https://meet.google.com/the-bereans-reading-room',
    },
  ],
  schedule: [
    {
      week: 1,
      chapters: 'Chapters 1 to 5: The Fundamentals',
      prompt: 'Reflect on Clear’s thesis that "You do not rise to the level of your goals. You fall to the level of your systems." Where in your life are you currently substituting ambitious goals for broken daily systems?',
      dueDate: 'October 8, 2026',
    },
    {
      week: 2,
      chapters: 'Chapters 6 to 10: The 1st & 2nd Laws (Make it Obvious & Attractive)',
      prompt: 'Identify the primary environmental cue in your workspace that triggers passive distraction. What friction can you introduce today to eliminate it?',
      dueDate: 'October 15, 2026',
    },
    {
      week: 3,
      chapters: 'Chapters 11 to 15: The 3rd Law (Make it Easy)',
      prompt: 'How can you apply the Two-Minute Rule to your hardest daily priority this week?',
      dueDate: 'October 22, 2026',
    },
    {
      week: 4,
      chapters: 'Chapters 16 to 20: Advanced Tactics & The Goldilocks Rule',
      prompt: 'Write your 1-page Personal Habit Contract and designate your Bereans cohort partner as your accountability partner.',
      dueDate: 'October 29, 2026',
    },
  ],
};

// ====================================================
// EDITORIAL CONTENT / FIELD NOTES
// ====================================================
export const SEED_CONTENT_ITEMS: ContentItemData[] = [
  {
    id: 'cnt-1',
    title: 'The Power of Diligence: Why Most People Improve by Accident',
    slug: 'power-of-diligence-accidental-improvement',
    category: 'Personal Growth',
    contentType: 'article',
    excerpt: 'True mastery is not a bolt of lightning. It is the unglamorous, deliberate architecture of repeating high-value actions until excellence becomes an instinct.',
    readTime: '6 min read',
    date: 'September 12, 2026',
    featuredImage: '/images/3_moses_teaching_on_productivity.jpg',
    body: `Many people believe growth is automatic with age. It is not. Getting older is biological; gaining mastery is intentional. Without a clear framework, we mistake motion for progress and activity for impact.
    
When we examine the lives of men and women who left indelible marks upon their generations, we do not find people who relied on mood or inspiration. We find people who built systems. Diligence is the bridge between human potential and tangible capacity. God has placed something extraordinary within you, but that potential must find structured expression.`,
  },
  {
    id: 'cnt-2',
    title: 'What the Room Does Not See: Integrity in the Dark',
    slug: 'what-the-room-does-not-see',
    category: 'Leadership',
    contentType: 'article',
    excerpt: 'Public authority is never generated on the stage. It is bought and paid for in the private hours of prayer, research, discipline, and unbroken promises to oneself.',
    readTime: '8 min read',
    date: 'August 29, 2026',
    featuredImage: '/images/5_moses_oladoye_at_a_conference.jpg',
    body: `Whenever you see a leader speak with profound authority and moral weight, you are witnessing the tip of an iceberg. What the room does not see is the decades of internal wrestling, the quiet choices to refuse compromise, and the relentless pursuit of spiritual depth.
    
Leadership is not a title; it is moral gravity. If your private discipline does not match your public persona, collapse is merely a matter of time.`,
  },
  {
    id: 'cnt-3',
    title: 'Financial Intelligence as a Spiritual Responsibility',
    slug: 'financial-intelligence-spiritual-responsibility',
    category: 'Finance',
    contentType: 'article',
    excerpt: 'Ignorance about money does not make one pious; it creates vulnerability and compromises generational purpose.',
    readTime: '7 min read',
    date: 'August 15, 2026',
    featuredImage: '/images/4_moses_oladoye_editorial_portra.jpg',
    body: `Money is an amplifier of character and a tool of purpose. When disciplined people lack financial intelligence, resources flow into hands that build destructive agendas. 
    
Understanding markets, respecting compounding, and stewarding capital are not secular distractions—they are essential competencies for anyone committed to solving real-world problems.`,
  },
];
