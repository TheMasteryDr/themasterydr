import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Users, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  PlayCircle, 
  FileText, 
  Award,
  Sparkles,
  Lock
} from 'lucide-react';
import { getCourseBySlug } from '@/lib/db';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) {
    return { title: 'Course Not Found — Gain Mastery Institute' };
  }
  return {
    title: `${course.title} — Gain Mastery Institute`,
    description: course.tagline,
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const priceDisplay = course.is_free 
    ? 'Free Enrollment' 
    : `₦${(course.price_kobo / 100).toLocaleString('en-NG')}`;

  const totalLessons = course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;
  const totalMinutes = course.modules?.reduce(
    (acc, m) => acc + (m.lessons?.reduce((lAcc, l) => lAcc + (l.duration_minutes || 0), 0) || 0), 
    0
  ) || 0;
  const totalHours = Math.round((totalMinutes / 60) * 10) / 10;

  return (
    <div className="course-detail-root">
      {/* Header Banner */}
      <section className="course-detail-hero">
        <div className="wrap">
          <div className="cd-breadcrumb">
            <Link href="/courses">Courses</Link>
            <span className="cd-sep">/</span>
            <span className="cd-current">{course.title}</span>
          </div>

          <div className="cd-hero-grid">
            <div className="cd-hero-main">
              <div className="cd-badges-row">
                <span className="pill-badge indigo">
                  <Sparkles size={12} /> {course.category_name || 'Gain Mastery Track'}
                </span>
                <span className="pill-badge amber">{course.level || 'All Levels'}</span>
              </div>

              <h1 className="cd-title">{course.title}</h1>
              <p className="cd-tagline">{course.tagline}</p>

              <div className="cd-meta-strip">
                <div className="cd-instructor-pill">
                  <img 
                    src={course.instructor_avatar || '/images/founder/founder_photo_1.jpg'} 
                    alt={course.instructor_name} 
                    className="cd-inst-avatar"
                  />
                  <div>
                    <span className="cd-inst-name">{course.instructor_name}</span>
                    <span className="cd-inst-title">{course.instructor_title}</span>
                  </div>
                </div>

                <div className="cd-stats-group">
                  <div className="cd-stat">
                    <Star size={15} fill="#F59E0B" color="#F59E0B" />
                    <span className="cd-stat-val">{course.rating_avg?.toFixed(1) || '4.9'}</span>
                    <span className="cd-stat-sub">({course.review_count || 120} reviews)</span>
                  </div>
                  <div className="cd-stat">
                    <Users size={15} color="#94A3B8" />
                    <span className="cd-stat-val">{course.student_count || 600}+</span>
                    <span className="cd-stat-sub">students</span>
                  </div>
                  <div className="cd-stat">
                    <Clock size={15} color="#94A3B8" />
                    <span className="cd-stat-val">{totalHours > 0 ? `${totalHours} hrs` : 'Self-paced'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Pricing / Enrollment Card */}
            <aside className="cd-sidebar">
              <div className="bento-card cd-enroll-card">
                <div className="cd-card-thumb-wrap">
                  <img 
                    src={course.thumbnail_url || '/images/founder/founder_photo_2.jpg'} 
                    alt={course.title} 
                    className="cd-card-thumb"
                  />
                  <div className="cd-card-price-overlay">
                    <span className="cd-price-big">{priceDisplay}</span>
                  </div>
                </div>

                <div className="cd-enroll-actions">
                  <Link 
                    href={course.is_free ? '/login?flow=enroll' : '/login?flow=checkout'} 
                    className="btn btn-primary btn-pill cd-cta-btn"
                  >
                    <span>{course.is_free ? 'Start Learning Immediately' : 'Enroll in Cohort'}</span>
                    <ArrowRight size={15} />
                  </Link>

                  <p className="cd-guarantee-note">
                    <ShieldCheck size={14} color="#10B981" />
                    <span>Instant access upon enrollment &bull; Lifetime updates</span>
                  </p>
                </div>

                <div className="cd-includes-list">
                  <h4>This Program Includes:</h4>
                  <ul>
                    <li>
                      <BookOpen size={14} color="#6366F1" />
                      <span>{course.modules?.length || 0} Comprehensive Modules</span>
                    </li>
                    <li>
                      <PlayCircle size={14} color="#6366F1" />
                      <span>{totalLessons} Practical Video &amp; Text Lessons</span>
                    </li>
                    <li>
                      <FileText size={14} color="#6366F1" />
                      <span>Downloadable Framework Sheets &amp; Guides</span>
                    </li>
                    <li>
                      <Award size={14} color="#F59E0B" />
                      <span>Verified Digital Certificate of Completion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Course Content Details */}
      <section className="site-section cd-content-section">
        <div className="wrap">
          <div className="cd-body-layout">
            <div className="cd-main-details">
              {/* Learning Outcomes */}
              {course.learning_outcomes && course.learning_outcomes.length > 0 && (
                <div className="bento-card cd-box">
                  <h3 className="cd-box-title">What You Will Master</h3>
                  <div className="cd-outcomes-grid">
                    {course.learning_outcomes.map((outcome, idx) => (
                      <div key={idx} className="cd-outcome-item">
                        <CheckCircle2 size={18} color="#10B981" className="cd-chk-icon" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Course Philosophy & Description */}
              <div className="bento-card cd-box">
                <h3 className="cd-box-title">Curriculum Architecture</h3>
                <div className="cd-description-text">
                  {course.description.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Modules & Syllabus */}
              <div className="bento-card cd-box">
                <div className="cd-syllabus-head">
                  <h3 className="cd-box-title">Detailed Syllabus</h3>
                  <span className="cd-syllabus-stats">
                    {course.modules?.length || 0} Modules &bull; {totalLessons} Lessons
                  </span>
                </div>

                <div className="cd-modules-list">
                  {course.modules?.map((mod, mIdx) => (
                    <div key={mod.id} className="cd-module-block">
                      <div className="cd-mod-header">
                        <span className="cd-mod-num">Module {mIdx + 1}</span>
                        <h4 className="cd-mod-title">{mod.title}</h4>
                      </div>

                      <div className="cd-lessons-list">
                        {mod.lessons?.map((lsn) => (
                          <div key={lsn.id} className="cd-lesson-row">
                            <div className="cd-lr-left">
                              {lsn.is_preview ? (
                                <PlayCircle size={15} color="#10B981" />
                              ) : (
                                <Lock size={14} color="#64748B" />
                              )}
                              <span className="cd-lr-title">{lsn.title}</span>
                            </div>
                            <div className="cd-lr-right">
                              {lsn.is_preview && (
                                <span className="cd-preview-tag">Preview</span>
                              )}
                              <span className="cd-lr-duration">{lsn.duration_minutes} min</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructor Bio Box */}
              <div className="bento-card cd-box cd-instructor-box">
                <h3 className="cd-box-title">Your Instructor</h3>
                <div className="cd-inst-full-row">
                  <img 
                    src={course.instructor_avatar || '/images/founder/founder_photo_1.jpg'} 
                    alt={course.instructor_name} 
                    className="cd-inst-large-avatar"
                  />
                  <div className="cd-inst-large-copy">
                    <h4>{course.instructor_name}</h4>
                    <p className="cd-inst-sub">{course.instructor_title}</p>
                    <p className="cd-inst-bio">
                      Growth strategist, purpose coach, and financial analyst. Moses helps professionals, emerging leaders, and spiritual builders replace passive drifting with directional momentum and kingdom excellence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
