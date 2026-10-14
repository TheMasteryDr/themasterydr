import { 
  UserWithProfile, 
  Course, 
  Review, 
  SpeakingRequest, 
  BereansBook, 
  ContentItem, 
  Coupon 
} from './types';

export const SEED_ADMIN_USER: UserWithProfile = {
  id: 'usr-admin-001',
  email: 'moses@themasterydr.com',
  password_hash: '$2a$10$bzBMh2yzAsURKtNXEJIeeubJOGZlg0Lx6er6H1u3wRFx7NjqhL6qK', // MasteryAdmin2026!
  is_email_verified: true,
  status: 'active',
  created_at: new Date('2026-01-01').toISOString(),
  updated_at: new Date('2026-01-01').toISOString(),
  profile: {
    id: 'prf-admin-001',
    user_id: 'usr-admin-001',
    full_name: 'Moses Oladoye',
    phone_number: '+234 800 000 0000',
    avatar_url: '/images/founder/founder_photo_1.jpg',
    bio: 'Founder of The Mastery Dr and Head Growth Coach at Gain Mastery Institute. Growth strategist, purpose coach, and financial analyst helping individuals build intentional, disciplined lives.',
    country: 'Nigeria',
    headline: 'The Mastery Dr | Head Growth Coach, Gain Mastery Institute',
    created_at: new Date('2026-01-01').toISOString(),
    updated_at: new Date('2026-01-01').toISOString(),
  },
  roles: ['super_admin', 'instructor'],
};

export const SEED_STUDENT_USER: UserWithProfile = {
  id: 'usr-student-001',
  email: 'student@example.com',
  password_hash: '$2a$10$bzBMh2yzAsURKtNXEJIeeubJOGZlg0Lx6er6H1u3wRFx7NjqhL6qK', // MasteryAdmin2026!
  is_email_verified: true,
  status: 'active',
  created_at: new Date('2026-02-01').toISOString(),
  updated_at: new Date('2026-02-01').toISOString(),
  profile: {
    id: 'prf-student-001',
    user_id: 'usr-student-001',
    full_name: 'David Adeyemi',
    phone_number: '+234 812 345 6789',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    bio: 'Young professional and builder seeking purpose, financial intelligence, and mental discipline.',
    country: 'Nigeria',
    headline: 'Emerging Tech Lead & Lifelong Student',
    created_at: new Date('2026-02-01').toISOString(),
    updated_at: new Date('2026-02-01').toISOString(),
  },
  roles: ['student', 'berean_member'],
};

export const SEED_COURSES: Course[] = [
  {
    id: 'crs-001',
    title: 'Foundations of Personal Mastery: Purpose, Habits & Disciplined Living',
    slug: 'foundations-of-personal-mastery',
    tagline: 'Moving from drifting motion to focused, purposeful impact through rigorous daily disciplines.',
    description: `Growth without direction is just motion. Most people do not fail because they lack ambition; they fail because their ambition has no system.

In this foundational flagship course, The Mastery Dr (Moses Oladoye) breaks down the essential internal architecture required to break stagnation, clarify divine purpose, and engineer personal consistency.

Covering the core principles of personal development, mental clarity, and spiritual alignment, this course provides a transformative blueprint for anyone ready to live intentionally.`,
    category_name: 'Personal Growth',
    level: 'All Levels',
    price_kobo: 0,
    is_free: true,
    access_duration_days: 0,
    status: 'published',
    thumbnail_url: '/images/founder/founder_photo_2.jpg',
    preview_video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    learning_outcomes: [
      'Deconstruct the difference between mere motion and directional growth.',
      'Identify and articulate your unique personal purpose and core assignments.',
      'Build unshakeable daily habits that outlast fleeting motivation.',
      'Align personal ambition with spiritual conviction and practical discipline.',
    ],
    requirements: [
      'An earnest commitment to self-honesty and continuous improvement.',
      'A journal or notebook for daily reflection assignments.',
    ],
    is_featured: true,
    instructor_name: 'Moses Oladoye',
    instructor_title: 'Head Growth Coach, Gain Mastery Institute',
    instructor_avatar: '/images/founder/founder_photo_1.jpg',
    student_count: 642,
    rating_avg: 4.9,
    review_count: 128,
    created_at: new Date('2026-01-15').toISOString(),
    updated_at: new Date('2026-01-15').toISOString(),
    modules: [
      {
        id: 'mod-101',
        course_id: 'crs-001',
        title: 'Module 1: The Anatomy of Stagnation & The Awakening',
        sort_order: 1,
        lessons: [
          {
            id: 'lsn-101',
            module_id: 'mod-101',
            title: '1.1 Why Ambition Without Direction Collapses',
            description: 'Analyzing the root causes of drifting and the illusion of busywork.',
            sort_order: 1,
            lesson_type: 'video',
            video_provider: 'vimeo',
            video_url: 'https://vimeo.com/76979871',
            duration_minutes: 18,
            content_markdown: `### Welcome to the Awakening
In this lesson, Moses Oladoye unpacks the fundamental truth that **no one is empty**. Every person is designed for something meaningful, but potential remains dormant without deliberate structure.

#### Key Takeaways:
- **Motion vs. Progress:** Activity is not accomplishment.
- **The Stagnation Trap:** How comfort and unexamined routines breed quiet regret.
- **The Call to Mastery:** Shifting from consumer mindset to intentional producer.`,
            is_preview: true,
            materials: [
              {
                id: 'mat-101',
                lesson_id: 'lsn-101',
                title: 'Foundations of Mastery — Reflection Guidebook (PDF)',
                file_url: '/documents/foundations_guide.pdf',
                file_type: 'pdf',
                file_size_bytes: 1450000,
              },
            ],
          },
          {
            id: 'lsn-102',
            module_id: 'mod-101',
            title: '1.2 The Principle of Gain Mastery: Consistent Growth',
            description: 'Understanding the mathematical compounding of daily 1% discipline.',
            sort_order: 2,
            lesson_type: 'video',
            video_provider: 'youtube',
            video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration_minutes: 24,
            is_preview: false,
          },
        ],
      },
      {
        id: 'mod-102',
        course_id: 'crs-001',
        title: 'Module 2: The Six Dimensions in Action',
        sort_order: 2,
        lessons: [
          {
            id: 'lsn-103',
            module_id: 'mod-102',
            title: '2.1 Purpose & Spiritual Growth: The Foundation Pillars',
            description: 'How a disciplined relationship with God clarifies earthly stewardship.',
            sort_order: 1,
            lesson_type: 'video',
            video_provider: 'vimeo',
            video_url: 'https://vimeo.com/76979871',
            duration_minutes: 32,
            is_preview: false,
            assignment: {
              id: 'asg-101',
              lesson_id: 'lsn-103',
              title: 'Assignment 1: Personal Purpose Audit & Core Mission Statement',
              instructions: `Write a 500-800 word reflection answering:
1. What are the 3 recurring areas of stagnation in your past year?
2. Draft your current personal philosophy statement based on the formula: What am I designed to build, and who am I built to serve?
Submit your text or upload a PDF document.`,
              max_score: 100,
              allowed_file_types: ['pdf', 'docx', 'txt'],
            },
          },
          {
            id: 'lsn-104',
            module_id: 'mod-102',
            title: '2.2 Final Assessment: Personal Mastery Comprehensive Exam',
            description: 'Validate your understanding of the foundational framework.',
            sort_order: 2,
            lesson_type: 'quiz',
            video_provider: 'custom',
            duration_minutes: 15,
            is_preview: false,
            quiz: {
              id: 'qiz-101',
              lesson_id: 'lsn-104',
              title: 'Foundations of Mastery Knowledge Check',
              passing_score_percentage: 80,
              time_limit_minutes: 20,
              max_attempts: 3,
              questions: [
                {
                  id: 'q-1',
                  quiz_id: 'qiz-101',
                  question_text: 'According to The Mastery Dr, what is the core definition of "Gain Mastery"?',
                  question_type: 'multiple_choice',
                  sort_order: 1,
                  explanation: 'Gain Mastery signifies "Growth. Consistent Growth."',
                  options: [
                    { id: 'opt-1', question_id: 'q-1', option_text: 'Flawless perfection at all costs', is_correct: false },
                    { id: 'opt-2', question_id: 'q-1', option_text: 'Growth. Consistent Growth.', is_correct: true },
                    { id: 'opt-3', question_id: 'q-1', option_text: 'Financial independence in 6 months', is_correct: false },
                    { id: 'opt-4', question_id: 'q-1', option_text: 'Passive accumulation of knowledge', is_correct: false },
                  ],
                },
                {
                  id: 'q-2',
                  quiz_id: 'qiz-101',
                  question_text: 'Which of the following is NOT one of the Six Dimensions of Mastery?',
                  question_type: 'multiple_choice',
                  sort_order: 2,
                  explanation: 'The six dimensions are Purpose, Personal Growth, Financial Growth, Leadership, Spiritual Growth, and Strategy.',
                  options: [
                    { id: 'opt-5', question_id: 'q-2', option_text: 'Financial Growth', is_correct: false },
                    { id: 'opt-6', question_id: 'q-2', option_text: 'Spiritual Growth', is_correct: false },
                    { id: 'opt-7', question_id: 'q-2', option_text: 'Instant Fame', is_correct: true },
                    { id: 'opt-8', question_id: 'q-2', option_text: 'Strategy', is_correct: false },
                  ],
                },
                {
                  id: 'q-3',
                  quiz_id: 'qiz-101',
                  question_text: 'True or False: "No one is empty, everyman is designed for something great, that greatness just needs to find expression."',
                  question_type: 'true_false',
                  sort_order: 3,
                  explanation: 'This is the foundational personal philosophy of Moses Oladoye.',
                  options: [
                    { id: 'opt-9', question_id: 'q-3', option_text: 'True', is_correct: true },
                    { id: 'opt-10', question_id: 'q-3', option_text: 'False', is_correct: false },
                  ],
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'crs-002',
    title: 'The Six Dimensions of Strategic Growth: Life, Leadership & High Performance',
    slug: 'six-dimensions-strategic-growth',
    tagline: 'An executive intellectual framework for leaders, founders, and professionals balancing vision with tactical execution.',
    description: `Growth in one dimension without the others inevitably collapses. You cannot build sustainable wealth without personal discipline, and you cannot lead others effectively if you have no spiritual grounding and clarity of purpose.

This intensive curriculum is engineered for professionals, entrepreneurs, and emerging leaders ready to systemize every sphere of life. 

Taught systematically across Purpose, Personal Growth, Financial Growth, Leadership, Spiritual Growth, and Strategy.`,
    category_name: 'Leadership & Strategy',
    level: 'Mastery',
    price_kobo: 4500000, // ₦45,000 NGN
    is_free: false,
    access_duration_days: 365,
    status: 'published',
    thumbnail_url: '/images/founder/founder_photo_3.jpg',
    preview_video_url: 'https://vimeo.com/76979871',
    learning_outcomes: [
      'Master the interdependent system of all Six Dimensions of Mastery.',
      'Implement high-leverage strategic decision models for career and enterprise.',
      'Develop genuine leadership authority that outlasts formal titles.',
      'Construct a 5-year personal growth operating system.',
    ],
    requirements: [
      'Completion of Foundations of Personal Mastery or equivalent professional experience.',
      'Active leadership or organizational responsibility.',
    ],
    is_featured: true,
    instructor_name: 'Moses Oladoye',
    instructor_title: 'Head Growth Coach, Gain Mastery Institute',
    instructor_avatar: '/images/founder/founder_photo_1.jpg',
    student_count: 312,
    rating_avg: 5.0,
    review_count: 89,
    created_at: new Date('2026-01-20').toISOString(),
    updated_at: new Date('2026-01-20').toISOString(),
    modules: [
      {
        id: 'mod-201',
        course_id: 'crs-002',
        title: 'Module 1: Strategy as an Operating System',
        sort_order: 1,
        lessons: [
          {
            id: 'lsn-201',
            module_id: 'mod-201',
            title: '1.1 Clear Thinking in Noisy Environments',
            description: 'Sharper decisions when under pressure and resource constraints.',
            sort_order: 1,
            lesson_type: 'video',
            video_provider: 'vimeo',
            video_url: 'https://vimeo.com/76979871',
            duration_minutes: 42,
            is_preview: true,
          },
        ],
      },
    ],
  },
  {
    id: 'crs-003',
    title: 'Financial Intelligence & Market Mastery for Emerging Builders',
    slug: 'financial-intelligence-market-mastery',
    tagline: 'Real intelligence about capital, investments, asset allocation, and wealth preservation.',
    description: `A profound detest for ignorance must extend into the financial sphere. Hard work without financial intelligence leads to exhaustion, not freedom.

In this rigorous masterclass, Moses Oladoye integrates his background as a financial analyst to demystify money, cash-flow architecture, capital allocation, and long-term economic resilience for African and global builders.`,
    category_name: 'Financial Growth',
    level: 'Advanced',
    price_kobo: 7500000, // ₦75,000 NGN
    is_free: false,
    access_duration_days: 0,
    status: 'published',
    thumbnail_url: '/images/founder/founder_photo_4.jpg',
    preview_video_url: 'https://vimeo.com/76979871',
    learning_outcomes: [
      'Deconstruct the financial mechanisms governing wealth generation and preservation.',
      'Build a robust personal and business cash flow allocation engine.',
      'Analyze market cycles and mitigate high-risk speculative traps.',
      'Align financial abundance with Kingdom stewardship and community impact.',
    ],
    requirements: [
      'Basic familiarity with personal budgeting.',
      'Readiness for rigorous financial discipline.',
    ],
    is_featured: true,
    instructor_name: 'Moses Oladoye',
    instructor_title: 'Head Growth Coach, Gain Mastery Institute',
    instructor_avatar: '/images/founder/founder_photo_1.jpg',
    student_count: 184,
    rating_avg: 4.9,
    review_count: 54,
    created_at: new Date('2026-02-01').toISOString(),
    updated_at: new Date('2026-02-01').toISOString(),
    modules: [],
  },
];

export const SEED_REVIEWS: Review[] = [
  {
    id: 'rev-001',
    author_name: 'Emmanuel Ojo',
    author_role: 'Founder, Vektor Capital & Strategy Lead',
    author_avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    category: 'The Mastery Dr',
    rating: 5,
    review_text: 'Moses does not offer shallow motivation. He brings an intellectual weight and spiritual clarity that cuts through confusion. Working under his framework transformed our executive team’s operating rhythm within 60 days.',
    status: 'approved',
    is_featured: true,
    created_at: new Date('2026-01-10').toISOString(),
  },
  {
    id: 'rev-002',
    author_name: 'Grace Chioma Nwachukwu',
    author_role: 'Lead Architect & Community Organizer',
    author_avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    category: 'Gain Mastery Institute',
    rating: 5,
    review_text: 'The Foundations of Personal Mastery course solved years of chronic procrastination for me. The concept that "no one is empty" unlocked a deep responsibility to steward my design with excellence.',
    status: 'approved',
    is_featured: true,
    created_at: new Date('2026-01-28').toISOString(),
  },
  {
    id: 'rev-003',
    author_name: 'Dr. Timothy Adebayo',
    author_role: 'Convener, African Leadership Symposium',
    author_avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    category: 'Speaking',
    rating: 5,
    review_text: 'When Moses spoke at our annual youth and leadership convention, the entire auditorium was captivated. His poise, mastery of the subject, and practical delivery left our students hungry for disciplined growth.',
    status: 'approved',
    is_featured: true,
    created_at: new Date('2026-02-05').toISOString(),
  },
  {
    id: 'rev-004',
    author_name: 'Olumide Bakare',
    author_role: 'Product Designer & Member, The Bereans',
    author_avatar_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    category: 'The Bereans',
    rating: 5,
    review_text: 'The Bereans reading community is unlike any casual book club. The screening process ensures serious minds, and the weekly reflection prompts force you to extract real life application from every chapter.',
    status: 'approved',
    is_featured: true,
    created_at: new Date('2026-02-14').toISOString(),
  },
];

export const SEED_SPEAKING_REQUESTS: SpeakingRequest[] = [
  {
    id: 'spk-001',
    application_code: 'SPK-2026-4891',
    full_name: 'Pastor Samuel Briggs',
    organization: 'Dominion Global Church',
    email: 'samuel.briggs@dominionglobal.org',
    phone_number: '+234 803 111 2233',
    event_name: 'Ignite 2026: Youth & Professionals Summit',
    event_type: 'Church / Youth Conference',
    event_date: '2026-11-20',
    event_location: 'Eko Hotel & Suites, Victoria Island, Lagos',
    is_virtual: false,
    expected_audience_size: '1,500+',
    audience_demographic: 'Young adults, entrepreneurs, creative leaders aged 20-38',
    proposed_topic: 'Moving from Motion to Purposeful Mastery',
    budget_range: '₦1,000,000 - ₦2,500,000',
    expected_duration: '60 minutes keynote + 20 min Q&A',
    status: 'new',
    created_at: new Date('2026-02-15').toISOString(),
    updated_at: new Date('2026-02-15').toISOString(),
  },
  {
    id: 'spk-002',
    application_code: 'SPK-2026-3104',
    full_name: 'Victoria Mensah',
    organization: 'African Tech Leaders Network',
    email: 'events@atln.africa',
    phone_number: '+233 24 555 7890',
    event_name: 'The Strategy Room: Annual Leadership Retreat',
    event_type: 'Corporate / Leadership Retreat',
    event_date: '2026-12-05',
    event_location: 'Labadi Beach Hotel, Accra, Ghana',
    is_virtual: false,
    expected_audience_size: '150 C-Suite & Tech Executives',
    audience_demographic: 'Founders, CTOs, and Regional Directors',
    proposed_topic: 'The Six Dimensions: Leading Organizations that Outlast You',
    budget_range: '₦2,500,000 - ₦5,000,000',
    expected_duration: '90 minutes Workshop',
    status: 'contacted',
    created_at: new Date('2026-02-10').toISOString(),
    updated_at: new Date('2026-02-12').toISOString(),
  },
];

export const SEED_BEREANS_BOOKS: BereansBook[] = [
  {
    id: 'bk-001',
    title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    author: 'James Clear',
    synopsis: 'A transformative manual on how minute changes in systems, identity, and daily architecture lead to remarkable compounding results over time.',
    cover_image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
    reading_category: 'Personal Development',
    is_currently_reading: true,
    schedules: [
      {
        id: 'sch-001',
        book_id: 'bk-001',
        week_number: 1,
        title: 'The Fundamentals: Why Tiny Changes Make a Big Difference',
        chapters_assigned: 'Chapters 1 - 3 (Identity-Based Habits)',
        start_date: '2026-03-01',
        end_date: '2026-03-07',
        reflection_questions: [
          'What is one identity you currently profess that conflicts with your daily habits?',
          'How can you shift your focus from outcome goals to identity affirmations this week?',
        ],
        meeting: {
          id: 'mtg-001',
          schedule_id: 'sch-001',
          title: 'The Bereans Week 1 Live Deliberation',
          meeting_date: '2026-03-07T19:00:00.000Z',
          meeting_link: 'https://meet.google.com/xyz-bereans-week1',
          passcode: 'MASTERY2026',
          agenda: '19:00 Opening & Welcome | 19:10 Chapter Insights | 19:40 Group Deliberation & Action Steps',
        },
      },
    ],
  },
  {
    id: 'bk-002',
    title: 'The Purpose Driven Life: What on Earth Am I Here For?',
    author: 'Rick Warren',
    synopsis: 'A foundational spiritual guide examining the divine calling and non-accidental blueprint encoded within every human design.',
    cover_image_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&auto=format&fit=crop&q=80',
    reading_category: 'Faith & Purpose',
    is_currently_reading: false,
    schedules: [],
  },
];

export const SEED_CONTENT_ITEMS: ContentItem[] = [
  {
    id: 'cnt-001',
    title: 'Growth Without Direction is Just Motion: The Trap of Unexamined Ambition',
    slug: 'growth-without-direction-is-just-motion',
    category: 'Strategy & Purpose',
    content_type: 'article',
    summary: 'Why busyness is the counterfeit of fruitful progress, and how high-performing individuals audit their daily trajectory.',
    markdown_body: `## The Modern Illusion of Progress

We live in an era that celebrates kinetic energy over directional accuracy. People boast of eighty-hour workweeks, packed calendar grids, and endless digital notifications. 

Yet when you pull back the curtain and ask the fundamental question: *“Where exactly is this leading?”*, a deafening silence ensues.

> **Growth without direction is just motion.** A rocking horse moves constantly, but it never arrives anywhere.

### The Detest for Ignorance

The Mastery Dr was birthed from a deep personal detest for ignorance, stagnation, and a life lived without clear coordinates. God has not placed any human being on this earth to merely subsist, pay bills, and quietly exit the stage.

Within every person lies a specific mandate that demands discovery, discipline, and uncompromising execution.

### Three Steps to Audit Your Direction:
1. **The Trajectory Check:** If you continue at your exact current daily routine for the next five years, where do you realistically arrive?
2. **The Capacity Audit:** Are you developing genuine depth or simply recycling shallow competence?
3. **The Spiritual Alignment:** Does your daily labor honor the one who gave you breath?`,
    featured_image_url: '/images/founder/founder_photo_5.jpg',
    read_time_minutes: 6,
    status: 'published',
    is_featured: true,
    published_at: new Date('2026-02-01').toISOString(),
    author_name: 'Moses Oladoye',
  },
  {
    id: 'cnt-002',
    title: 'Why Most People Improve by Accident: Building a Deliberate Growth Engine',
    slug: 'why-most-people-improve-by-accident',
    category: 'Personal Growth',
    content_type: 'article',
    summary: 'A deep examination of how deliberate practice, reflection feedback loops, and daily accountability replace accidental luck.',
    markdown_body: `Mastery is not accidental. The person who reaches extraordinary heights of clarity, character, and competence did not stumble there while casually browsing through life.

In this field note, we break down why relying on organic growth is dangerous, and how to construct a deliberate personal syllabus for every quarter of the year.`,
    featured_image_url: '/images/founder/founder_photo_6.jpg',
    read_time_minutes: 8,
    status: 'published',
    is_featured: true,
    published_at: new Date('2026-02-12').toISOString(),
    author_name: 'Moses Oladoye',
  },
];

export const SEED_COUPONS: Coupon[] = [
  {
    id: 'cpn-001',
    code: 'MASTERY20',
    discount_type: 'percentage',
    discount_value: 20, // 20% off
    max_uses: 200,
    current_uses: 14,
    valid_from: new Date('2026-01-01').toISOString(),
    is_active: true,
  },
  {
    id: 'cpn-002',
    code: 'LAUNCH50',
    discount_type: 'percentage',
    discount_value: 50, // 50% off
    max_uses: 50,
    current_uses: 8,
    valid_from: new Date('2026-01-01').toISOString(),
    is_active: true,
  },
];
