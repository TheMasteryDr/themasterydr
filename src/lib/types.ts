export type UserRole = 'super_admin' | 'instructor' | 'content_manager' | 'support_admin' | 'student' | 'berean_member';

export interface User {
  id: string;
  email: string;
  password_hash?: string;
  is_email_verified: boolean;
  status: 'active' | 'suspended' | 'deactivated';
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  phone_number?: string;
  avatar_url?: string;
  bio?: string;
  country: string;
  headline?: string;
  created_at: string;
  updated_at: string;
}

export interface UserWithProfile extends User {
  profile: Profile;
  roles: UserRole[];
}

export interface CourseCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category_id?: string;
  category_name?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Mastery' | 'All Levels';
  price_kobo: number; // 100 kobo = 1 NGN
  is_free: boolean;
  access_duration_days: number; // 0 = lifetime
  status: 'draft' | 'published' | 'archived';
  thumbnail_url: string;
  preview_video_url?: string;
  learning_outcomes: string[];
  requirements: string[];
  is_featured: boolean;
  created_by?: string;
  instructor_name?: string;
  instructor_title?: string;
  instructor_avatar?: string;
  student_count?: number;
  rating_avg?: number;
  review_count?: number;
  modules?: CourseModule[];
  created_at: string;
  updated_at: string;
}

export interface CourseModule {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  sort_order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  description?: string;
  sort_order: number;
  lesson_type: 'video' | 'article' | 'quiz' | 'assignment';
  video_provider: 'vimeo' | 'youtube' | 'custom';
  video_url?: string;
  duration_minutes: number;
  content_markdown?: string;
  is_preview: boolean;
  materials?: LessonMaterial[];
  assignment?: Assignment;
  quiz?: Quiz;
  is_completed?: boolean;
}

export interface LessonMaterial {
  id: string;
  lesson_id: string;
  title: string;
  file_url: string;
  file_type: string;
  file_size_bytes: number;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: 'active' | 'completed' | 'expired' | 'revoked';
  enrolled_at: string;
  expires_at?: string;
  completed_at?: string;
  course?: Course;
  progress_percentage?: number;
}

export interface Assignment {
  id: string;
  lesson_id: string;
  title: string;
  instructions: string;
  max_score: number;
  allowed_file_types: string[];
  submission?: AssignmentSubmission;
}

export interface AssignmentSubmission {
  id: string;
  assignment_id: string;
  user_id: string;
  student_name?: string;
  submission_text?: string;
  attachment_url?: string;
  status: 'submitted' | 'graded' | 'resubmit_requested';
  grade_score?: number;
  feedback?: string;
  graded_by?: string;
  graded_at?: string;
  submitted_at: string;
}

export interface QuizOption {
  id: string;
  question_id: string;
  option_text: string;
  is_correct?: boolean;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'short_answer';
  sort_order: number;
  explanation?: string;
  options: QuizOption[];
}

export interface Quiz {
  id: string;
  lesson_id: string;
  title: string;
  passing_score_percentage: number;
  time_limit_minutes: number;
  max_attempts: number;
  questions: QuizQuestion[];
  latest_attempt?: QuizAttempt;
}

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  user_id: string;
  score_percentage: number;
  is_passed: boolean;
  answers_data: Record<string, string>;
  attempt_number: number;
  attempted_at: string;
}

export interface Certificate {
  id: string;
  certificate_code: string;
  user_id: string;
  course_id: string;
  recipient_name: string;
  course_name: string;
  issued_at: string;
  verification_hash: string;
  qr_code_url?: string;
}

export interface SpeakingRequest {
  id: string;
  application_code: string;
  full_name: string;
  organization: string;
  email: string;
  phone_number: string;
  event_name: string;
  event_type: string;
  event_date: string;
  event_location: string;
  is_virtual: boolean;
  expected_audience_size: string;
  audience_demographic: string;
  proposed_topic: string;
  event_theme?: string;
  speech_objective?: string;
  expected_duration: string;
  budget_range: string;
  travel_hospitality_notes?: string;
  organization_url?: string;
  additional_info?: string;
  brief_attachment_url?: string;
  status: 'new' | 'reviewing' | 'contacted' | 'accepted' | 'declined' | 'completed' | 'archived';
  internal_notes?: string[];
  created_at: string;
  updated_at: string;
}

export interface BereansApplication {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone_number: string;
  reading_habits_rating: number;
  primary_interest_areas: string[];
  why_join: string;
  commitment_confirmed: boolean;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface BereansBook {
  id: string;
  title: string;
  author: string;
  synopsis: string;
  cover_image_url: string;
  reading_category: string;
  is_currently_reading: boolean;
  schedules?: BereansSchedule[];
}

export interface BereansSchedule {
  id: string;
  book_id: string;
  week_number: number;
  title: string;
  chapters_assigned: string;
  start_date: string;
  end_date: string;
  reflection_questions: string[];
  meeting?: BereansMeeting;
}

export interface BereansMeeting {
  id: string;
  schedule_id?: string;
  title: string;
  meeting_date: string;
  meeting_link: string;
  passcode?: string;
  agenda?: string;
}

export interface Review {
  id: string;
  author_name: string;
  author_role?: string;
  author_avatar_url?: string;
  reviewer_email?: string;
  category: 'The Mastery Dr' | 'Gain Mastery Institute' | 'The Bereans' | 'Courses' | 'Speaking' | 'Personal Development';
  course_id?: string;
  course_title?: string;
  rating: number;
  review_text: string;
  status: 'pending' | 'approved' | 'rejected' | 'featured';
  is_featured: boolean;
  created_at: string;
}

export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  content_type: 'article' | 'video' | 'podcast' | 'downloadable' | 'quote';
  summary: string;
  markdown_body: string;
  featured_image_url?: string;
  media_url?: string;
  read_time_minutes: number;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  published_at: string;
  author_name: string;
}

export interface PaymentTransaction {
  id: string;
  reference: string;
  user_id: string;
  user_email?: string;
  course_id: string;
  course_title?: string;
  amount_kobo: number;
  currency: string;
  status: 'initialized' | 'success' | 'failed' | 'abandoned';
  paystack_channel?: string;
  paid_at?: string;
  created_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number; // e.g. 20 for 20% or 500000 kobo (5000 NGN)
  course_id?: string;
  max_uses: number;
  current_uses: number;
  valid_from: string;
  valid_until?: string;
  is_active: boolean;
}

export interface DirectMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string;
  sender_avatar?: string;
  is_instructor: boolean;
  message_body: string;
  is_read: boolean;
  created_at: string;
}
