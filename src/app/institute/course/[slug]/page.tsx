import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Clock,
  BookOpen,
  Users,
  Star,
  CheckCircle2,
  PlayCircle,
  FileText,
  HelpCircle,
  ArrowRight,
  Award,
  ShieldCheck,
  Share2
} from 'lucide-react';
import { SEED_COURSES } from '@/lib/data/seed-data';

export function generateStaticParams() {
  return SEED_COURSES.map((c) => ({ slug: c.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = SEED_COURSES.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', padding: '50px 0 100px' }}>
      <div className="wrap">
        {/* Breadcrumb Navigation */}
        <div style={{ marginBottom: '28px', fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          <Link href="/institute" style={{ color: 'var(--text-muted)' }}>Institute</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--gold-bright)' }}>{course.category}</span>
        </div>

        {/* Course Header Banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'start',
          marginBottom: '64px'
        }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <span className="badge badge-gold">{course.category}</span>
              <span className="badge badge-emerald">{course.level}</span>
            </div>

            <h1 style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', lineHeight: '1.15', marginBottom: '18px' }}>
              {course.title}
            </h1>

            <p style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '28px' }}>
              {course.subtitle}
            </p>

            {/* Stats Row */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              padding: '16px 0',
              borderTop: '1px solid var(--line-dark)',
              borderBottom: '1px solid var(--line-dark)',
              marginBottom: '28px',
              fontSize: '13px',
              color: 'var(--text-secondary)'
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={15} color="var(--gold-primary)" />
                {course.durationHours} Hours Duration
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <BookOpen size={15} color="var(--gold-primary)" />
                {course.lessonsCount} Structured Lessons
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Users size={15} color="var(--gold-primary)" />
                {course.studentsCount} Students Enrolled
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--gold-bright)' }}>
                <Star size={15} fill="var(--gold-primary)" color="var(--gold-primary)" />
                {course.rating} ({course.reviewCount} Reviews)
              </span>
            </div>

            {/* Instructor Byline */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ position: 'relative', width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--gold-border)' }}>
                <Image
                  src={course.instructorAvatar}
                  alt={course.instructorName}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '15px' }}>
                  {course.instructorName}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                  {course.instructorTitle}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout / Preview Card */}
          <div className="luxury-card" style={{ padding: '32px', position: 'sticky', top: '100px' }}>
            <div style={{ position: 'relative', width: '100%', height: '200px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', marginBottom: '24px' }}>
              <Image
                src={course.thumbnailUrl}
                alt={course.title}
                fill
                style={{ objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(7, 6, 5, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'var(--gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--bg-primary)',
                  boxShadow: '0 0 20px rgba(199, 162, 75, 0.5)'
                }}>
                  <PlayCircle size={32} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '28px',
                fontWeight: 700,
                color: course.isFree ? '#74C69D' : 'var(--gold-bright)'
              }}>
                {course.isFree ? 'FREE ENROLLMENT' : `₦${course.price.toLocaleString()}`}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {course.isFree ? 'Instant Access' : 'One-time Payment'}
              </span>
            </div>

            <Link
              href={`/institute/checkout/${course.slug}`}
              className="btn btn-gold"
              style={{ width: '100%', padding: '16px', marginBottom: '16px' }}
            >
              <span>{course.isFree ? 'Enroll For Free' : 'Enroll in Masterclass'}</span>
              <ArrowRight size={15} />
            </Link>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '10px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={14} color="var(--gold-primary)" />
                Lifetime access to all modules &amp; future updates
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Award size={14} color="var(--gold-primary)" />
                Official Gain Mastery Institute Certificate of Completion
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={14} color="var(--gold-primary)" />
                Secure instant Paystack checkout (Card, Transfer, USSD)
              </span>
            </div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div style={{ marginBottom: '60px', maxWidth: '800px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px', color: 'var(--text-primary)' }}>
            What You Will Master
          </h2>
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--line-dark)',
            padding: '30px',
            borderRadius: 'var(--radius-sm)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {course.outcomes.map((outcome, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={18} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: '1.6' }}>
                    {outcome}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Curriculum Modules & Lessons */}
        <div style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px', color: 'var(--text-primary)' }}>
            Course Curriculum ({course.modules.length} Modules · {course.lessonsCount} Lessons)
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {course.modules.map((mod, modIdx) => (
              <div
                key={mod.id}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--line-dark)',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  padding: '18px 24px',
                  background: 'var(--bg-card)',
                  borderBottom: '1px solid var(--line-dark)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h3 style={{ fontSize: '18px', color: 'var(--gold-bright)' }}>{mod.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>{mod.description}</p>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                    {mod.lessons.length} Lessons
                  </span>
                </div>

                <div style={{ padding: '12px 24px' }}>
                  {mod.lessons.map((les) => (
                    <div
                      key={les.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 0',
                        borderBottom: '1px solid var(--line-subtle)',
                        fontSize: '14px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {les.lessonType === 'video' && <PlayCircle size={16} color="var(--gold-primary)" />}
                        {les.lessonType === 'quiz' && <HelpCircle size={16} color="#74C69D" />}
                        {les.lessonType === 'assignment' && <FileText size={16} color="#E26D8C" />}
                        <span style={{ color: 'var(--text-primary)' }}>{les.title}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {les.isPreview && (
                          <span className="badge badge-gold" style={{ fontSize: '9px', padding: '2px 6px' }}>
                            Free Preview
                          </span>
                        )}
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                          {les.durationMinutes}m
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
