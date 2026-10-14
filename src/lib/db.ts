import { 
  UserWithProfile, 
  Course, 
  Enrollment, 
  Review, 
  SpeakingRequest, 
  BereansBook, 
  ContentItem, 
  PaymentTransaction, 
  Coupon,
  Certificate,
  AssignmentSubmission,
  QuizAttempt,
  DirectMessage
} from './types';
import { 
  SEED_ADMIN_USER, 
  SEED_STUDENT_USER, 
  SEED_COURSES, 
  SEED_REVIEWS, 
  SEED_SPEAKING_REQUESTS, 
  SEED_BEREANS_BOOKS, 
  SEED_CONTENT_ITEMS, 
  SEED_COUPONS 
} from './seedData';

// Global in-memory storage fallback for resilient local development & seamless zero-config execution
interface StorageSchema {
  users: UserWithProfile[];
  courses: Course[];
  enrollments: Enrollment[];
  lesson_progress: Record<string, boolean>; // key: `${userId}_${lessonId}`
  submissions: AssignmentSubmission[];
  quiz_attempts: QuizAttempt[];
  certificates: Certificate[];
  speaking_requests: SpeakingRequest[];
  bereans_books: BereansBook[];
  reviews: Review[];
  content_items: ContentItem[];
  payments: PaymentTransaction[];
  coupons: Coupon[];
  messages: DirectMessage[];
  newsletter_subscribers: string[];
}

// Attach to global to survive Next.js hot module reloads in development
const globalForStorage = global as unknown as { appStorage?: StorageSchema };

function getInitialStorage(): StorageSchema {
  return {
    users: [SEED_ADMIN_USER, SEED_STUDENT_USER],
    courses: JSON.parse(JSON.stringify(SEED_COURSES)),
    enrollments: [
      {
        id: 'enr-001',
        user_id: SEED_STUDENT_USER.id,
        course_id: SEED_COURSES[0].id,
        status: 'active',
        enrolled_at: new Date('2026-02-05').toISOString(),
        progress_percentage: 50,
        course: SEED_COURSES[0],
      }
    ],
    lesson_progress: {
      [`${SEED_STUDENT_USER.id}_lsn-101`]: true,
    },
    submissions: [
      {
        id: 'sub-001',
        assignment_id: 'asg-101',
        user_id: SEED_STUDENT_USER.id,
        student_name: 'David Adeyemi',
        submission_text: 'My core purpose is engineering reliable software systems that empower African entrepreneurs, rooted in godly character and continuous learning.',
        status: 'graded',
        grade_score: 95,
        feedback: 'Excellently articulated, David. Keep this standard of rigor in every sphere.',
        graded_by: SEED_ADMIN_USER.id,
        graded_at: new Date('2026-02-10').toISOString(),
        submitted_at: new Date('2026-02-08').toISOString(),
      }
    ],
    quiz_attempts: [
      {
        id: 'atm-001',
        quiz_id: 'qiz-101',
        user_id: SEED_STUDENT_USER.id,
        score_percentage: 100,
        is_passed: true,
        answers_data: { 'q-1': 'opt-2', 'q-2': 'opt-7', 'q-3': 'opt-9' },
        attempt_number: 1,
        attempted_at: new Date('2026-02-09').toISOString(),
      }
    ],
    certificates: [
      {
        id: 'cert-001',
        certificate_code: 'GMI-CERT-2026-8941',
        user_id: SEED_STUDENT_USER.id,
        course_id: SEED_COURSES[0].id,
        recipient_name: 'David Adeyemi',
        course_name: 'Foundations of Personal Mastery: Purpose, Habits & Disciplined Living',
        issued_at: new Date('2026-02-10').toISOString(),
        verification_hash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b',
        qr_code_url: '/verify/certificate/GMI-CERT-2026-8941',
      }
    ],
    speaking_requests: JSON.parse(JSON.stringify(SEED_SPEAKING_REQUESTS)),
    bereans_books: JSON.parse(JSON.stringify(SEED_BEREANS_BOOKS)),
    reviews: JSON.parse(JSON.stringify(SEED_REVIEWS)),
    content_items: JSON.parse(JSON.stringify(SEED_CONTENT_ITEMS)),
    payments: [
      {
        id: 'pay-001',
        reference: 'TMD_PAY_2026_001',
        user_id: SEED_STUDENT_USER.id,
        user_email: SEED_STUDENT_USER.email,
        course_id: SEED_COURSES[1].id,
        course_title: SEED_COURSES[1].title,
        amount_kobo: 4500000,
        currency: 'NGN',
        status: 'success',
        paystack_channel: 'card',
        paid_at: new Date('2026-02-05').toISOString(),
        created_at: new Date('2026-02-05').toISOString(),
      }
    ],
    coupons: JSON.parse(JSON.stringify(SEED_COUPONS)),
    messages: [
      {
        id: 'msg-001',
        conversation_id: 'conv-001',
        sender_id: SEED_STUDENT_USER.id,
        sender_name: 'David Adeyemi',
        is_instructor: false,
        message_body: 'Good evening Coach Moses. I completed assignment 1 and would love your guidance on prioritizing my spiritual disciplines during high-demand work sprints.',
        is_read: true,
        created_at: new Date('2026-02-11T14:30:00Z').toISOString(),
      },
      {
        id: 'msg-002',
        conversation_id: 'conv-001',
        sender_id: SEED_ADMIN_USER.id,
        sender_name: 'Moses Oladoye',
        is_instructor: true,
        message_body: 'Hello David. Well done on the assignment. The secret is non-negotiable morning coordinates before the world bids for your attention. Even 20 quiet minutes of prayer and scripture anchors the entire day.',
        is_read: true,
        created_at: new Date('2026-02-11T16:15:00Z').toISOString(),
      },
    ],
    newsletter_subscribers: ['david@example.com', 'builder@mastery.ng'],
  };
}

export const dbStore: StorageSchema = globalForStorage.appStorage || getInitialStorage();
// Ensure seed users in active dev storage always receive latest verified password hashes
const adminIdx = dbStore.users.findIndex(u => u.id === SEED_ADMIN_USER.id);
if (adminIdx !== -1) {
  dbStore.users[adminIdx].password_hash = SEED_ADMIN_USER.password_hash;
}
const studentIdx = dbStore.users.findIndex(u => u.id === SEED_STUDENT_USER.id);
if (studentIdx !== -1) {
  dbStore.users[studentIdx].password_hash = SEED_STUDENT_USER.password_hash;
}
if (process.env.NODE_ENV !== 'production') {
  globalForStorage.appStorage = dbStore;
}

// ==========================================
// Database Repository Functions
// ==========================================

// USERS & PROFILES
export async function findUserByEmail(email: string): Promise<UserWithProfile | null> {
  const normalized = email.toLowerCase().trim();
  const user = dbStore.users.find(u => u.email.toLowerCase() === normalized);
  return user || null;
}

export async function findUserById(id: string): Promise<UserWithProfile | null> {
  const user = dbStore.users.find(u => u.id === id);
  return user || null;
}

export async function createUser(data: {
  email: string;
  password_hash: string;
  full_name: string;
  phone_number?: string;
  country?: string;
  roles?: ('student' | 'berean_member')[];
}): Promise<UserWithProfile> {
  const newUser: UserWithProfile = {
    id: `usr-${Date.now()}`,
    email: data.email.toLowerCase().trim(),
    password_hash: data.password_hash,
    is_email_verified: true, // Auto-verify in development
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profile: {
      id: `prf-${Date.now()}`,
      user_id: `usr-${Date.now()}`,
      full_name: data.full_name,
      phone_number: data.phone_number,
      country: data.country || 'Nigeria',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    roles: data.roles || ['student'],
  };
  dbStore.users.push(newUser);
  return newUser;
}

// COURSES & MODULES
export async function getAllCourses(): Promise<Course[]> {
  return dbStore.courses.filter(c => c.status === 'published');
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const course = dbStore.courses.find(c => c.slug === slug);
  return course || null;
}

export async function getCourseById(id: string): Promise<Course | null> {
  const course = dbStore.courses.find(c => c.id === id);
  return course || null;
}

// ENROLLMENTS & PROGRESS
export async function getUserEnrollments(userId: string): Promise<Enrollment[]> {
  const enrollments = dbStore.enrollments.filter(e => e.user_id === userId);
  return enrollments.map(enr => {
    const course = dbStore.courses.find(c => c.id === enr.course_id);
    return { ...enr, course };
  });
}

export async function checkUserEnrolled(userId: string, courseId: string): Promise<boolean> {
  return dbStore.enrollments.some(e => e.user_id === userId && e.course_id === courseId && e.status === 'active');
}

export async function createEnrollment(userId: string, courseId: string): Promise<Enrollment> {
  const existing = dbStore.enrollments.find(e => e.user_id === userId && e.course_id === courseId);
  if (existing) {
    existing.status = 'active';
    return existing;
  }
  const newEnrollment: Enrollment = {
    id: `enr-${Date.now()}`,
    user_id: userId,
    course_id: courseId,
    status: 'active',
    enrolled_at: new Date().toISOString(),
    progress_percentage: 0,
    course: dbStore.courses.find(c => c.id === courseId),
  };
  dbStore.enrollments.push(newEnrollment);

  // Increment student count
  const course = dbStore.courses.find(c => c.id === courseId);
  if (course) {
    course.student_count = (course.student_count || 0) + 1;
  }
  return newEnrollment;
}

export async function getLessonProgress(userId: string, lessonId: string): Promise<boolean> {
  return !!dbStore.lesson_progress[`${userId}_${lessonId}`];
}

export async function setLessonProgress(userId: string, lessonId: string, courseId: string, isCompleted: boolean): Promise<number> {
  dbStore.lesson_progress[`${userId}_${lessonId}`] = isCompleted;

  // Calculate new progress percentage
  const course = dbStore.courses.find(c => c.id === courseId);
  if (!course || !course.modules) return 0;

  let totalLessons = 0;
  let completedCount = 0;
  for (const mod of course.modules) {
    for (const lsn of mod.lessons) {
      totalLessons++;
      if (dbStore.lesson_progress[`${userId}_${lsn.id}`]) {
        completedCount++;
      }
    }
  }

  const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const enrollment = dbStore.enrollments.find(e => e.user_id === userId && e.course_id === courseId);
  if (enrollment) {
    enrollment.progress_percentage = percentage;
    if (percentage === 100 && !enrollment.completed_at) {
      enrollment.completed_at = new Date().toISOString();
      enrollment.status = 'completed';
    }
  }
  return percentage;
}

// CERTIFICATES
export async function getCertificateByCode(code: string): Promise<Certificate | null> {
  const cert = dbStore.certificates.find(c => c.certificate_code === code);
  return cert || null;
}

export async function getUserCertificate(userId: string, courseId: string): Promise<Certificate | null> {
  const cert = dbStore.certificates.find(c => c.user_id === userId && c.course_id === courseId);
  return cert || null;
}

export async function issueCertificate(userId: string, courseId: string, studentName: string): Promise<Certificate> {
  const existing = await getUserCertificate(userId, courseId);
  if (existing) return existing;

  const course = await getCourseById(courseId);
  const code = `GMI-CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const cert: Certificate = {
    id: `cert-${Date.now()}`,
    certificate_code: code,
    user_id: userId,
    course_id: courseId,
    recipient_name: studentName,
    course_name: course?.title || 'Mastery Program',
    issued_at: new Date().toISOString(),
    verification_hash: Buffer.from(`${code}-${userId}-${courseId}`).toString('hex'),
    qr_code_url: `/verify/certificate/${code}`,
  };
  dbStore.certificates.push(cert);
  return cert;
}

// SPEAKING REQUESTS
export async function getAllSpeakingRequests(): Promise<SpeakingRequest[]> {
  return [...dbStore.speaking_requests].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function createSpeakingRequest(data: Omit<SpeakingRequest, 'id' | 'application_code' | 'status' | 'created_at' | 'updated_at'>): Promise<SpeakingRequest> {
  const code = `SPK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const newReq: SpeakingRequest = {
    id: `spk-${Date.now()}`,
    application_code: code,
    status: 'new',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...data,
  };
  dbStore.speaking_requests.push(newReq);
  return newReq;
}

export async function updateSpeakingRequestStatus(id: string, status: SpeakingRequest['status'], note?: string): Promise<SpeakingRequest | null> {
  const req = dbStore.speaking_requests.find(r => r.id === id);
  if (!req) return null;
  req.status = status;
  req.updated_at = new Date().toISOString();
  if (note) {
    req.internal_notes = req.internal_notes || [];
    req.internal_notes.push(`[${new Date().toLocaleDateString()}] ${note}`);
  }
  return req;
}

// THE BEREANS COMMUNITY
export async function getBereansBooks(): Promise<BereansBook[]> {
  return dbStore.bereans_books;
}

export async function getActiveBereansBook(): Promise<BereansBook | null> {
  return dbStore.bereans_books.find(b => b.is_currently_reading) || dbStore.bereans_books[0] || null;
}

// REVIEWS & TESTIMONIALS
export async function getApprovedReviews(category?: string): Promise<Review[]> {
  return dbStore.reviews.filter(r => {
    const isApproved = r.status === 'approved';
    if (!isApproved) return false;
    if (category && category !== 'All') return r.category === category;
    return true;
  });
}

export async function getFeaturedReviews(): Promise<Review[]> {
  return dbStore.reviews.filter(r => r.status === 'approved' && r.is_featured);
}

export async function getAllReviewsAdmin(): Promise<Review[]> {
  return [...dbStore.reviews].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function createReview(data: Omit<Review, 'id' | 'status' | 'is_featured' | 'created_at'>): Promise<Review> {
  const newReview: Review = {
    id: `rev-${Date.now()}`,
    status: 'pending', // Requires admin moderation
    is_featured: false,
    created_at: new Date().toISOString(),
    ...data,
  };
  dbStore.reviews.push(newReview);
  return newReview;
}

export async function updateReviewStatus(id: string, status: Review['status'], is_featured?: boolean): Promise<Review | null> {
  const rev = dbStore.reviews.find(r => r.id === id);
  if (!rev) return null;
  rev.status = status;
  if (typeof is_featured === 'boolean') {
    rev.is_featured = is_featured;
  }
  return rev;
}

// FIELD NOTES & CONTENT
export async function getAllContent(): Promise<ContentItem[]> {
  return dbStore.content_items.filter(c => c.status === 'published');
}

export async function getContentBySlug(slug: string): Promise<ContentItem | null> {
  const item = dbStore.content_items.find(c => c.slug === slug);
  return item || null;
}

// PAYMENTS & PAYSTACK TRANSACTIONS
export async function createPaymentTransaction(data: {
  reference: string;
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  amount_kobo: number;
}): Promise<PaymentTransaction> {
  const newPayment: PaymentTransaction = {
    id: `pay-${Date.now()}`,
    reference: data.reference,
    user_id: data.user_id,
    user_email: data.user_email,
    course_id: data.course_id,
    course_title: data.course_title,
    amount_kobo: data.amount_kobo,
    currency: 'NGN',
    status: 'initialized',
    created_at: new Date().toISOString(),
  };
  dbStore.payments.push(newPayment);
  return newPayment;
}

export async function getPaymentByReference(reference: string): Promise<PaymentTransaction | null> {
  const p = dbStore.payments.find(item => item.reference === reference);
  return p || null;
}

export async function markPaymentSuccess(reference: string, channel: string = 'paystack'): Promise<PaymentTransaction | null> {
  const payment = dbStore.payments.find(p => p.reference === reference);
  if (!payment) return null;

  payment.status = 'success';
  payment.paystack_channel = channel;
  payment.paid_at = new Date().toISOString();

  // Create enrollment automatically upon confirmed server-side payment
  await createEnrollment(payment.user_id, payment.course_id);
  return payment;
}

// COUPONS
export async function getCouponByCode(code: string): Promise<Coupon | null> {
  const coupon = dbStore.coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.is_active);
  return coupon || null;
}

// NEWSLETTER
export async function subscribeNewsletter(email: string): Promise<boolean> {
  const normalized = email.toLowerCase().trim();
  if (!dbStore.newsletter_subscribers.includes(normalized)) {
    dbStore.newsletter_subscribers.push(normalized);
  }
  return true;
}

// EXECUTIVE ADMIN KPIS
export async function getAdminKPIs() {
  const totalRevenueKobo = dbStore.payments
    .filter(p => p.status === 'success')
    .reduce((sum, p) => sum + p.amount_kobo, 0);

  return {
    totalRevenueNaira: totalRevenueKobo / 100,
    totalStudents: dbStore.users.filter(u => u.roles.includes('student')).length,
    activeEnrollments: dbStore.enrollments.filter(e => e.status === 'active').length,
    completedCourses: dbStore.enrollments.filter(e => e.status === 'completed').length,
    pendingSpeakingRequests: dbStore.speaking_requests.filter(r => r.status === 'new' || r.status === 'reviewing').length,
    pendingReviews: dbStore.reviews.filter(r => r.status === 'pending').length,
    bereansMembers: dbStore.users.filter(u => u.roles.includes('berean_member')).length,
    newsletterSubscribers: dbStore.newsletter_subscribers.length,
    totalCourses: dbStore.courses.length,
  };
}
