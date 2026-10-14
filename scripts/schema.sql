-- ========================================================
-- THE MASTERY DR & GAIN MASTERY INSTITUTE LMS
-- Neon PostgreSQL Master Relational Schema (30+ Normalized Tables)
-- ========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS & PROFILES
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_email_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    reset_password_token VARCHAR(255),
    reset_password_expires TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'active', -- active, suspended, deactivated
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50),
    avatar_url TEXT,
    bio TEXT,
    country VARCHAR(100) DEFAULT 'Nigeria',
    headline VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. ROLES & PERMISSIONS
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL, -- super_admin, instructor, content_manager, support_admin, student, berean_member
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS role_permissions (
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id)
);

-- 3. COURSE MANAGEMENT (GAIN MASTERY INSTITUTE LMS)
CREATE TABLE IF NOT EXISTS course_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(280) UNIQUE NOT NULL,
    tagline VARCHAR(500),
    description TEXT NOT NULL,
    category_id UUID REFERENCES course_categories(id) ON DELETE SET NULL,
    level VARCHAR(50) DEFAULT 'All Levels', -- Beginner, Intermediate, Advanced, Mastery
    price_kobo BIGINT DEFAULT 0, -- In Nigerian Kobo (0 = free)
    is_free BOOLEAN DEFAULT FALSE,
    access_duration_days INT DEFAULT 0, -- 0 = lifetime access
    status VARCHAR(50) DEFAULT 'published', -- draft, published, archived
    thumbnail_url TEXT,
    preview_video_url TEXT,
    learning_outcomes JSONB DEFAULT '[]'::jsonb,
    requirements JSONB DEFAULT '[]'::jsonb,
    is_featured BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS course_instructors (
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (course_id, user_id)
);

CREATE TABLE IF NOT EXISTS modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    sort_order INT DEFAULT 0,
    lesson_type VARCHAR(50) DEFAULT 'video', -- video, article, quiz, assignment
    video_provider VARCHAR(50) DEFAULT 'vimeo', -- vimeo, youtube, custom
    video_url TEXT,
    duration_minutes INT DEFAULT 0,
    content_markdown TEXT,
    is_preview BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lesson_materials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_type VARCHAR(50), -- pdf, docx, audio, etc.
    file_size_bytes BIGINT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. ENROLLMENTS & LEARNER PROGRESS
CREATE TABLE IF NOT EXISTS enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'active', -- active, completed, expired, revoked
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, course_id)
);

CREATE TABLE IF NOT EXISTS lesson_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    last_watch_position_seconds INT DEFAULT 0,
    UNIQUE(user_id, lesson_id)
);

-- 5. ASSIGNMENTS & SUBMISSIONS
CREATE TABLE IF NOT EXISTS assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    instructions TEXT NOT NULL,
    max_score INT DEFAULT 100,
    allowed_file_types JSONB DEFAULT '["pdf","docx","txt","image"]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS assignment_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    submission_text TEXT,
    attachment_url TEXT,
    status VARCHAR(50) DEFAULT 'submitted', -- submitted, graded, resubmit_requested
    grade_score INT,
    feedback TEXT,
    graded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    graded_at TIMESTAMP WITH TIME ZONE,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(assignment_id, user_id)
);

-- 6. QUIZZES, QUESTIONS & ATTEMPTS
CREATE TABLE IF NOT EXISTS quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    passing_score_percentage INT DEFAULT 70,
    time_limit_minutes INT DEFAULT 0, -- 0 = unlimited
    max_attempts INT DEFAULT 3,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) DEFAULT 'multiple_choice', -- multiple_choice, true_false, short_answer
    sort_order INT DEFAULT 0,
    explanation TEXT
);

CREATE TABLE IF NOT EXISTS quiz_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    score_percentage INT NOT NULL,
    is_passed BOOLEAN DEFAULT FALSE,
    answers_data JSONB DEFAULT '{}'::jsonb,
    attempt_number INT DEFAULT 1,
    attempted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. CERTIFICATES & VERIFICATION
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    certificate_code VARCHAR(100) UNIQUE NOT NULL, -- e.g. GMI-2026-XXXXX
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    recipient_name VARCHAR(255) NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    verification_hash VARCHAR(255),
    qr_code_url TEXT,
    UNIQUE(user_id, course_id)
);

CREATE TABLE IF NOT EXISTS certificate_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    certificate_id UUID NOT NULL REFERENCES certificates(id) ON DELETE CASCADE,
    verified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    verifier_ip VARCHAR(100),
    user_agent TEXT
);

-- 8. PAYMENTS, PAYSTACK & COUPONS
CREATE TABLE IF NOT EXISTS coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type VARCHAR(50) DEFAULT 'percentage', -- percentage, fixed
    discount_value BIGINT NOT NULL, -- e.g. 20 for 20%, or 500000 for 5000 NGN
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE, -- NULL = global coupon
    max_uses INT DEFAULT 100,
    current_uses INT DEFAULT 0,
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference VARCHAR(100) UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    amount_kobo BIGINT NOT NULL,
    currency VARCHAR(10) DEFAULT 'NGN',
    status VARCHAR(50) DEFAULT 'initialized', -- initialized, success, failed, abandoned
    paystack_channel VARCHAR(50),
    paid_at TIMESTAMP WITH TIME ZONE,
    coupon_id UUID REFERENCES coupons(id) ON DELETE SET NULL,
    metadata_json JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payment_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payment_id UUID REFERENCES payments(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    payload_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS coupon_redemptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coupon_id UUID NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    payment_id UUID REFERENCES payments(id) ON DELETE CASCADE,
    redeemed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. SPEAKING INVITATION SYSTEM
CREATE TABLE IF NOT EXISTS speaking_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_code VARCHAR(50) UNIQUE NOT NULL, -- e.g. SPK-2026-XXXX
    full_name VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    event_type VARCHAR(100) NOT NULL, -- Conference, Church, University, Corporate, Youth, Leadership, etc.
    event_date VARCHAR(100) NOT NULL,
    event_location VARCHAR(255) NOT NULL,
    is_virtual BOOLEAN DEFAULT FALSE,
    expected_audience_size VARCHAR(100),
    audience_demographic TEXT,
    proposed_topic VARCHAR(255),
    event_theme VARCHAR(255),
    speech_objective TEXT,
    expected_duration VARCHAR(100),
    budget_range VARCHAR(100),
    travel_hospitality_notes TEXT,
    organization_url TEXT,
    additional_info TEXT,
    brief_attachment_url TEXT,
    status VARCHAR(50) DEFAULT 'new', -- new, reviewing, contacted, accepted, declined, completed, archived
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS speaking_request_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID NOT NULL REFERENCES speaking_requests(id) ON DELETE CASCADE,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    note_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. THE BEREANS READING COMMUNITY
CREATE TABLE IF NOT EXISTS bereans_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50),
    reading_habits_rating INT, -- 1-5
    primary_interest_areas JSONB DEFAULT '[]'::jsonb,
    why_join TEXT NOT NULL,
    commitment_confirmed BOOLEAN DEFAULT TRUE,
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
    reviewed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bereans_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    synopsis TEXT,
    cover_image_url TEXT,
    reading_category VARCHAR(100),
    is_currently_reading BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reading_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    week_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    chapters_assigned VARCHAR(255) NOT NULL,
    start_date DATE,
    end_date DATE,
    reflection_questions JSONB DEFAULT '[]'::jsonb
);

CREATE TABLE IF NOT EXISTS meetings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    schedule_id UUID REFERENCES reading_schedules(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    meeting_date TIMESTAMP WITH TIME ZONE NOT NULL,
    meeting_link TEXT NOT NULL,
    passcode VARCHAR(100),
    agenda TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. REVIEWS & TESTIMONIALS
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_name VARCHAR(255) NOT NULL,
    author_role VARCHAR(255),
    author_avatar_url TEXT,
    reviewer_email VARCHAR(255),
    category VARCHAR(100) NOT NULL, -- The Mastery Dr, Gain Mastery Institute, The Bereans, Courses, Speaking, Personal Development
    course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected, featured
    is_featured BOOLEAN DEFAULT FALSE,
    submitted_ip VARCHAR(100),
    moderated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    moderated_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. FIELD NOTES, CONTENT & RESOURCES
CREATE TABLE IF NOT EXISTS content_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(280) UNIQUE NOT NULL,
    category_id UUID REFERENCES content_categories(id) ON DELETE SET NULL,
    content_type VARCHAR(50) DEFAULT 'article', -- article, video, podcast, downloadable, quote
    summary TEXT,
    markdown_body TEXT,
    featured_image_url TEXT,
    media_url TEXT, -- YouTube, Vimeo, Podcast link, or PDF download
    read_time_minutes INT DEFAULT 5,
    status VARCHAR(50) DEFAULT 'published', -- draft, published, archived
    is_featured BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. PRIVATE MESSAGING (STUDENT <-> INSTRUCTOR)
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    instructor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, instructor_id, course_id)
);

CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message_body TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. NEWSLETTER, NOTIFICATIONS & AUDIT LOGS
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    source VARCHAR(100) DEFAULT 'homepage',
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    notification_type VARCHAR(100) NOT NULL, -- enrollment, assignment_grade, certificate, speaking_update, message
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    action_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL, -- login, role_change, course_created, payment_verified, review_moderated, etc.
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100),
    payload_json JSONB,
    ip_address VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_course ON enrollments(user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON lesson_progress(user_id, lesson_id);
CREATE INDEX IF NOT EXISTS idx_payments_reference ON payments(reference);
CREATE INDEX IF NOT EXISTS idx_certificates_code ON certificates(certificate_code);
CREATE INDEX IF NOT EXISTS idx_speaking_code ON speaking_requests(application_code);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
CREATE INDEX IF NOT EXISTS idx_content_slug ON content(slug);
