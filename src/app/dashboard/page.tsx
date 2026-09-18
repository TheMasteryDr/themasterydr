'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  PlayCircle,
  FileText,
  User,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { SEED_COURSES } from '@/lib/data/seed-data';

export default function StudentDashboardPage() {
  const [activeTab, setActiveTab] = useState<'courses' | 'assignments' | 'certificates' | 'profile'>('courses');

  const enrolledCourses = [
    {
      ...SEED_COURSES[0],
      progressPercent: 65,
      completedLessons: 10,
      totalLessons: 16,
      currentLessonSlug: 'purpose-dimension',
      lastAccessed: 'Yesterday, 8:45 PM',
    },
    {
      ...SEED_COURSES[1],
      progressPercent: 25,
      completedLessons: 3,
      totalLessons: 12,
      currentLessonSlug: 'capital-preservation',
      lastAccessed: '3 days ago',
    },
  ];

  const pendingAssignments = [
    {
      id: 'asg-1',
      courseTitle: 'The Architecture of Intentional Growth',
      title: 'The Personal Growth 6-Pillar Alignment Blueprint',
      status: 'Graded (95/100)',
      feedback: 'Exceptional self-diagnosis. Your strategy for morning friction reduction is clear and executable. Well done.',
      submittedDate: 'Sep 12, 2026',
    },
    {
      id: 'asg-2',
      courseTitle: 'Financial Intelligence & Strategic Market Discipline',
      title: 'Capital Preservation & Risk Allocation Case Study',
      status: 'Pending Instructor Review',
      feedback: null,
      submittedDate: 'Sep 16, 2026',
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', padding: '50px 0 100px' }}>
      <div className="wrap">
        {/* Welcome Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '40px',
          paddingBottom: '28px',
          borderBottom: '1px solid var(--line-dark)'
        }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '10px' }}>Student Portal</span>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', margin: '8px 0' }}>
              Welcome back, <em>Emmanuel</em>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
              Track your course progression, review assignment evaluations, and earn verified certificates.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/institute" className="btn btn-outline btn-sm">
              <span>Browse Marketplace</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '12px',
          borderBottom: '1px solid var(--line-dark)',
          marginBottom: '36px',
          overflowX: 'auto',
          paddingBottom: '1px'
        }}>
          {[
            { id: 'courses', label: 'My Courses', icon: BookOpen },
            { id: 'assignments', label: 'Assignments & Evaluations', icon: FileText },
            { id: 'certificates', label: 'Earned Certificates', icon: Award },
            { id: 'profile', label: 'Profile Settings', icon: User },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: isActive ? '2px solid var(--gold-primary)' : '2px solid transparent',
                  padding: '12px 18px',
                  color: isActive ? 'var(--gold-bright)' : 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Enrolled Courses */}
        {activeTab === 'courses' && (
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '24px', color: 'var(--text-primary)' }}>
              Active Learning Programs ({enrolledCourses.length})
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '30px'
            }}>
              {enrolledCourses.map(course => (
                <div key={course.id} className="luxury-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: '180px', width: '100%' }}>
                    <Image
                      src={course.thumbnailUrl}
                      alt={course.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
                      <span className="badge badge-gold">{course.category}</span>
                    </div>
                  </div>

                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontSize: '18px', lineHeight: '1.3', marginBottom: '12px' }}>
                      {course.title}
                    </h3>

                    {/* Progress Bar */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '6px' }}>
                        <span>Progress: {course.progressPercent}%</span>
                        <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${course.progressPercent}%`, height: '100%', background: 'var(--gold-primary)', transition: 'width 0.4s ease' }}></div>
                      </div>
                    </div>

                    <div style={{
                      marginTop: 'auto',
                      paddingTop: '16px',
                      borderTop: '1px solid var(--line-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                        Last: {course.lastAccessed}
                      </span>
                      <Link href={`/dashboard/course/${course.slug}`} className="btn btn-gold btn-sm">
                        <PlayCircle size={13} />
                        <span>Continue</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Assignments */}
        {activeTab === 'assignments' && (
          <div style={{ maxWidth: '800px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '24px', color: 'var(--text-primary)' }}>
              Assignment Submissions &amp; Evaluations
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {pendingAssignments.map(asg => (
                <div key={asg.id} className="luxury-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '17px', color: 'var(--text-primary)' }}>{asg.title}</h3>
                    <span className={`badge ${asg.feedback ? 'badge-emerald' : 'badge-gold'}`}>
                      {asg.status}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                    {asg.courseTitle} · Submitted: {asg.submittedDate}
                  </div>

                  {asg.feedback && (
                    <div style={{
                      background: 'var(--bg-secondary)',
                      borderLeft: '2px solid #74C69D',
                      padding: '12px 16px',
                      fontSize: '13.5px',
                      color: 'var(--text-secondary)'
                    }}>
                      <strong style={{ color: '#74C69D', display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '4px' }}>
                        Instructor Feedback (Moses Oladoye):
                      </strong>
                      {asg.feedback}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Certificates */}
        {activeTab === 'certificates' && (
          <div style={{ maxWidth: '800px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '24px', color: 'var(--text-primary)' }}>
              Verified Gain Mastery Certificates
            </h2>

            <div className="luxury-card" style={{ padding: '30px', border: '1px solid var(--gold-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                  <span className="badge badge-gold" style={{ marginBottom: '10px' }}>Certified Masterclass</span>
                  <h3 style={{ fontSize: '20px', marginBottom: '6px' }}>The Architecture of Intentional Growth</h3>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
                    CREDENTIAL ID: <span style={{ color: 'var(--gold-bright)' }}>TMD-CERT-98213</span> · Issued: Sep 14, 2026
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link href="/verify/certificate/tmd-cert-98213" target="_blank" className="btn btn-outline btn-sm">
                    <span>Public Verification</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Profile Settings */}
        {activeTab === 'profile' && (
          <div style={{ maxWidth: '640px' }}>
            <div className="luxury-card" style={{ padding: '36px' }}>
              <h2 style={{ fontSize: '20px', color: 'var(--gold-bright)', marginBottom: '24px' }}>
                Profile &amp; Account Settings
              </h2>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" defaultValue="Emmanuel O. Adeleke" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" defaultValue="emmanuel@gmail.com" disabled className="form-input" style={{ opacity: 0.7 }} />
              </div>
              <div className="form-group">
                <label className="form-label">Country of Residence</label>
                <input type="text" defaultValue="Nigeria" className="form-input" />
              </div>
              <button className="btn btn-gold btn-sm" style={{ marginTop: '10px' }}>
                Update Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
