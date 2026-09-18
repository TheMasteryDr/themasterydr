import {
  pgTable,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
  numeric,
  bigint,
  jsonb,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';

// ==========================================
// 1. IDENTITY & ACCESS CONTROL
// ==========================================

export const users = pgTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash'),
  emailVerifiedAt: timestamp('email_verified_at', { withTimezone: true }),
  googleId: varchar('google_id', { length: 255 }).unique(),
  status: varchar('status', { length: 30 }).default('active').notNull(), // active, suspended, pending
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const profiles = pgTable('profiles', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  avatarUrl: text('avatar_url'),
  country: varchar('country', { length: 100 }),
  bio: text('bio'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const roles = pgTable('roles', {
  id: varchar('id', { length: 50 }).primaryKey(), // super_admin, instructor, content_manager, support, student, berean
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
});

export const userRoles = pgTable('user_roles', {
  userId: varchar('user_id', { length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  roleId: varchar('role_id', { length: 50 }).notNull().references(() => roles.id, { onDelete: 'cascade' }),
  assignedAt: timestamp('assigned_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  uniqueIndex('user_role_idx').on(table.userId, table.roleId),
]);

// ==========================================
// 2. LMS & COURSE CURRICULUM
// ==========================================

export const courseCategories = pgTable('course_categories', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),
  displayOrder: integer('display_order').default(0).notNull(),
});

export const courses = pgTable('courses', {
  id: varchar('id', { length: 36 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  subtitle: text('subtitle'),
  description: text('description'),
  categoryId: varchar('category_id', { length: 36 }).references(() => courseCategories.id),
  level: varchar('level', { length: 50 }).default('all').notNull(), // beginner, intermediate, advanced, all
  price: numeric('price', { precision: 12, scale: 2 }).default('0.00').notNull(),
  currency: varchar('currency', { length: 10 }).default('NGN').notNull(),
  isFree: boolean('is_free').default(false).notNull(),
  accessDurationDays: integer('access_duration_days'), // null = lifetime access
  thumbnailUrl: text('thumbnail_url'),
  previewVideoUrl: text('preview_video_url'),
  status: varchar('status', { length: 30 }).default('draft').notNull(), // draft, published, archived
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const courseInstructors = pgTable('course_instructors', {
  courseId: varchar('course_id', { length: 36 }).notNull().references(() => courses.id, { onDelete: 'cascade' }),
  userId: varchar('user_id', { length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  isPrimary: boolean('is_primary').default(true).notNull(),
}, (table) => [
  uniqueIndex('course_instructor_idx').on(table.courseId, table.userId),
]);

export const modules = pgTable('modules', {
  id: varchar('id', { length: 36 }).primaryKey(),
  courseId: varchar('course_id', { length: 36 }).notNull().references(() => courses.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  orderIndex: integer('order_index').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const lessons = pgTable('lessons', {
  id: varchar('id', { length: 36 }).primaryKey(),
  moduleId: varchar('module_id', { length: 36 }).notNull().references(() => modules.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  lessonType: varchar('lesson_type', { length: 30 }).default('video').notNull(), // video, audio, text, quiz, assignment
  content: text('content'),
  videoUrl: text('video_url'),
  audioUrl: text('audio_url'),
  durationMinutes: integer('duration_minutes').default(0),
  isPreview: boolean('is_preview').default(false).notNull(),
  orderIndex: integer('order_index').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const lessonMaterials = pgTable('lesson_materials', {
  id: varchar('id', { length: 36 }).primaryKey(),
  lessonId: varchar('lesson_id', { length: 36 }).notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  fileUrl: text('file_url').notNull(),
  fileSizeBytes: bigint('file_size_bytes', { mode: 'number' }),
  mimeType: varchar('mime_type', { length: 100 }),
});

export const enrollments = pgTable('enrollments', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  courseId: varchar('course_id', { length: 36 }).notNull().references(() => courses.id, { onDelete: 'cascade' }),
  paymentId: varchar('payment_id', { length: 36 }),
  status: varchar('status', { length: 30 }).default('active').notNull(), // active, expired, revoked
  enrolledAt: timestamp('enrolled_at', { withTimezone: true }).defaultNow().notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  completedAt: timestamp('completed_at', { withTimezone: true }),
}, (table) => [
  uniqueIndex('user_enrollment_idx').on(table.userId, table.courseId),
]);

export const lessonProgress = pgTable('lesson_progress', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  lessonId: varchar('lesson_id', { length: 36 }).notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  isCompleted: boolean('is_completed').default(false).notNull(),
  lastPositionSeconds: integer('last_position_seconds').default(0),
  completedAt: timestamp('completed_at', { withTimezone: true }),
}, (table) => [
  uniqueIndex('user_lesson_progress_idx').on(table.userId, table.lessonId),
]);

// ==========================================
// 3. ASSIGNMENTS, QUIZZES & CERTIFICATES
// ==========================================

export const assignments = pgTable('assignments', {
  id: varchar('id', { length: 36 }).primaryKey(),
  lessonId: varchar('lesson_id', { length: 36 }).notNull().unique().references(() => lessons.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  instructions: text('instructions').notNull(),
  maxScore: integer('max_score').default(100).notNull(),
  allowedTypes: text('allowed_types').default('text,pdf,docx'), // comma separated
});

export const assignmentSubmissions = pgTable('assignment_submissions', {
  id: varchar('id', { length: 36 }).primaryKey(),
  assignmentId: varchar('assignment_id', { length: 36 }).notNull().references(() => assignments.id, { onDelete: 'cascade' }),
  userId: varchar('user_id', { length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  submissionText: text('submission_text'),
  attachmentUrl: text('attachment_url'),
  score: integer('score'),
  instructorFeedback: text('instructor_feedback'),
  status: varchar('status', { length: 30 }).default('submitted').notNull(), // submitted, graded, resubmit_requested
  submittedAt: timestamp('submitted_at', { withTimezone: true }).defaultNow().notNull(),
  gradedAt: timestamp('graded_at', { withTimezone: true }),
  gradedBy: varchar('graded_by', { length: 36 }).references(() => users.id),
});

export const quizzes = pgTable('quizzes', {
  id: varchar('id', { length: 36 }).primaryKey(),
  lessonId: varchar('lesson_id', { length: 36 }).notNull().unique().references(() => lessons.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  passingScorePercent: integer('passing_score_percent').default(70).notNull(),
  timeLimitMinutes: integer('time_limit_minutes'),
  maxAttempts: integer('max_attempts').default(3),
});

export const quizQuestions = pgTable('quiz_questions', {
  id: varchar('id', { length: 36 }).primaryKey(),
  quizId: varchar('quiz_id', { length: 36 }).notNull().references(() => quizzes.id, { onDelete: 'cascade' }),
  questionText: text('question_text').notNull(),
  questionType: varchar('question_type', { length: 30 }).default('multiple_choice').notNull(), // multiple_choice, true_false
  orderIndex: integer('order_index').default(0).notNull(),
});

export const quizOptions = pgTable('quiz_options', {
  id: varchar('id', { length: 36 }).primaryKey(),
  questionId: varchar('question_id', { length: 36 }).notNull().references(() => quizQuestions.id, { onDelete: 'cascade' }),
  optionText: text('option_text').notNull(),
  isCorrect: boolean('is_correct').default(false).notNull(),
});

export const quizAttempts = pgTable('quiz_attempts', {
  id: varchar('id', { length: 36 }).primaryKey(),
  quizId: varchar('quiz_id', { length: 36 }).notNull().references(() => quizzes.id, { onDelete: 'cascade' }),
  userId: varchar('user_id', { length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  scorePercent: numeric('score_percent', { precision: 5, scale: 2 }).notNull(),
  passed: boolean('passed').notNull(),
  attemptNumber: integer('attempt_number').default(1).notNull(),
  startedAt: timestamp('started_at', { withTimezone: true }).defaultNow().notNull(),
  finishedAt: timestamp('finished_at', { withTimezone: true }),
});

export const certificates = pgTable('certificates', {
  id: varchar('id', { length: 36 }).primaryKey(),
  certificateCode: varchar('certificate_code', { length: 50 }).notNull().unique(),
  userId: varchar('user_id', { length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  courseId: varchar('course_id', { length: 36 }).notNull().references(() => courses.id, { onDelete: 'cascade' }),
  issuedAt: timestamp('issued_at', { withTimezone: true }).defaultNow().notNull(),
  studentFullName: varchar('student_full_name', { length: 255 }).notNull(),
  courseTitle: varchar('course_title', { length: 255 }).notNull(),
  qrCodeUrl: text('qr_code_url'),
  pdfUrl: text('pdf_url'),
}, (table) => [
  uniqueIndex('certificate_user_course_idx').on(table.userId, table.courseId),
]);

// ==========================================
// 4. PAYMENTS & COUPONS
// ==========================================

export const payments = pgTable('payments', {
  id: varchar('id', { length: 36 }).primaryKey(),
  reference: varchar('reference', { length: 100 }).notNull().unique(),
  paystackId: varchar('paystack_id', { length: 100 }),
  userId: varchar('user_id', { length: 36 }).notNull().references(() => users.id),
  courseId: varchar('course_id', { length: 36 }).notNull().references(() => courses.id),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 10 }).default('NGN').notNull(),
  status: varchar('status', { length: 30 }).default('pending').notNull(), // pending, success, failed, abandoned, refunded
  channel: varchar('channel', { length: 50 }),
  idempotencyKey: varchar('idempotency_key', { length: 255 }).unique(),
  rawResponse: jsonb('raw_response'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  verifiedAt: timestamp('verified_at', { withTimezone: true }),
});

export const coupons = pgTable('coupons', {
  id: varchar('id', { length: 36 }).primaryKey(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  discountType: varchar('discount_type', { length: 20 }).notNull(), // percentage, fixed
  discountValue: numeric('discount_value', { precision: 12, scale: 2 }).notNull(),
  courseId: varchar('course_id', { length: 36 }).references(() => courses.id), // null = global
  maxUses: integer('max_uses'),
  timesUsed: integer('times_used').default(0).notNull(),
  validFrom: timestamp('valid_from', { withTimezone: true }),
  validUntil: timestamp('valid_until', { withTimezone: true }),
  isActive: boolean('is_active').default(true).notNull(),
});

export const couponRedemptions = pgTable('coupon_redemptions', {
  id: varchar('id', { length: 36 }).primaryKey(),
  couponId: varchar('coupon_id', { length: 36 }).notNull().references(() => coupons.id),
  userId: varchar('user_id', { length: 36 }).notNull().references(() => users.id),
  paymentId: varchar('payment_id', { length: 36 }).references(() => payments.id),
  redeemedAt: timestamp('redeemed_at', { withTimezone: true }).defaultNow().notNull(),
});

// ==========================================
// 5. THE BEREANS & COMMUNITY
// ==========================================

export const bereansApplications = pgTable('bereans_applications', {
  id: varchar('id', { length: 36 }).primaryKey(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  occupation: varchar('occupation', { length: 255 }),
  whyJoin: text('why_join').notNull(),
  booksReadRecently: text('books_read_recently'),
  commitmentAgreement: boolean('commitment_agreement').default(true).notNull(),
  status: varchar('status', { length: 30 }).default('new').notNull(), // new, under_review, approved, rejected
  adminNotes: text('admin_notes'),
  reviewedBy: varchar('reviewed_by', { length: 36 }).references(() => users.id),
  submittedAt: timestamp('submitted_at', { withTimezone: true }).defaultNow().notNull(),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
});

export const bereansMembers = pgTable('bereans_members', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  membershipNumber: varchar('membership_number', { length: 50 }).notNull().unique(),
  status: varchar('status', { length: 30 }).default('active').notNull(), // active, inactive, suspended
  joinedAt: timestamp('joined_at', { withTimezone: true }).defaultNow().notNull(),
});

export const books = pgTable('books', {
  id: varchar('id', { length: 36 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  author: varchar('author', { length: 255 }).notNull(),
  coverImageUrl: text('cover_image_url'),
  description: text('description'),
  readingMonth: varchar('reading_month', { length: 50 }),
  isCurrent: boolean('is_current').default(false).notNull(),
});

export const readingSchedules = pgTable('reading_schedules', {
  id: varchar('id', { length: 36 }).primaryKey(),
  bookId: varchar('book_id', { length: 36 }).notNull().references(() => books.id, { onDelete: 'cascade' }),
  weekNumber: integer('week_number').notNull(),
  chapters: varchar('chapters', { length: 255 }).notNull(),
  discussionPrompt: text('discussion_prompt'),
  dueDate: timestamp('due_date', { withTimezone: true }),
});

export const meetings = pgTable('meetings', {
  id: varchar('id', { length: 36 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  bookId: varchar('book_id', { length: 36 }).references(() => books.id),
  meetingTime: timestamp('meeting_time', { withTimezone: true }).notNull(),
  meetingUrl: text('meeting_url').notNull(),
  agenda: text('agenda'),
});

// ==========================================
// 6. SPEAKING, REVIEWS, CONTENT, SYSTEM
// ==========================================

export const speakingRequests = pgTable('speaking_requests', {
  id: varchar('id', { length: 36 }).primaryKey(),
  applicationCode: varchar('application_code', { length: 50 }).notNull().unique(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  organization: varchar('organization', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  eventName: varchar('event_name', { length: 255 }).notNull(),
  eventType: varchar('event_type', { length: 100 }).notNull(),
  eventDate: timestamp('event_date', { withTimezone: true }).notNull(),
  eventLocation: varchar('event_location', { length: 255 }).notNull(),
  isVirtual: boolean('is_virtual').default(false).notNull(),
  audienceSize: varchar('audience_size', { length: 100 }),
  demographic: varchar('demographic', { length: 255 }),
  proposedTopic: varchar('proposed_topic', { length: 255 }).notNull(),
  eventTheme: text('event_theme'),
  keyObjectives: text('key_objectives'),
  duration: varchar('duration', { length: 100 }),
  budgetRange: varchar('budget_range', { length: 100 }),
  travelProvision: text('travel_provision'),
  websiteSocial: varchar('website_social', { length: 255 }),
  invitationLetterUrl: text('invitation_letter_url'),
  status: varchar('status', { length: 30 }).default('new').notNull(), // new, reviewing, contacted, accepted, declined, completed, archived
  adminNotes: text('admin_notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const reviews = pgTable('reviews', {
  id: varchar('id', { length: 36 }).primaryKey(),
  category: varchar('category', { length: 50 }).default('personal_brand').notNull(), // personal_brand, institute, bereans, courses, speaking, other
  courseId: varchar('course_id', { length: 36 }).references(() => courses.id),
  reviewerName: varchar('reviewer_name', { length: 255 }).notNull(),
  reviewerEmail: varchar('reviewer_email', { length: 255 }),
  reviewerTitle: varchar('reviewer_title', { length: 255 }),
  rating: integer('rating').default(5).notNull(),
  comment: text('comment').notNull(),
  status: varchar('status', { length: 30 }).default('pending').notNull(), // pending, approved, rejected, archived
  isFeatured: boolean('is_featured').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const contentItems = pgTable('content_items', {
  id: varchar('id', { length: 36 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  category: varchar('category', { length: 50 }).notNull(), // growth, purpose, faith, finance, leadership, books, relationships, strategy
  contentType: varchar('content_type', { length: 30 }).default('article').notNull(), // article, video, podcast, resource_pdf, quote
  body: text('body').notNull(),
  excerpt: text('excerpt'),
  featuredImageUrl: text('featured_image_url'),
  videoEmbedUrl: text('video_embed_url'),
  audioUrl: text('audio_url'),
  downloadFileUrl: text('download_file_url'),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  status: varchar('status', { length: 30 }).default('draft').notNull(), // draft, published, archived
  seoTitle: varchar('seo_title', { length: 255 }),
  seoDescription: text('seo_description'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: varchar('id', { length: 36 }).primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  source: varchar('source', { length: 100 }).default('homepage'),
  isActive: boolean('is_active').default(true).notNull(),
  subscribedAt: timestamp('subscribed_at', { withTimezone: true }).defaultNow().notNull(),
});

export const auditLogs = pgTable('audit_logs', {
  id: varchar('id', { length: 36 }).primaryKey(),
  actorId: varchar('actor_id', { length: 36 }).references(() => users.id),
  action: varchar('action', { length: 100 }).notNull(),
  entityType: varchar('entity_type', { length: 100 }).notNull(),
  entityId: varchar('entity_id', { length: 36 }),
  metadata: jsonb('metadata'),
  ipAddress: varchar('ip_address', { length: 50 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
