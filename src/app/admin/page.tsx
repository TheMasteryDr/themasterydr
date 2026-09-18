'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Users,
  Calendar,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Eye,
  DollarSign,
  Award,
  Clock,
  Filter
} from 'lucide-react';
import { SEED_COURSES, SEED_REVIEWS } from '@/lib/data/seed-data';

export default function AdminDashboardPage() {
  const [activeModule, setActiveModule] = useState<'speaking' | 'bereans' | 'reviews' | 'courses'>('speaking');

  // Sample Speaking Pipeline State
  const [speakingList, setSpeakingList] = useState([
    {
      id: 'spk-1',
      code: 'SPK-2026-48912',
      name: 'Dr. Adeyemi Williams',
      org: 'Covenant University Alumni Assembly',
      event: 'Annual Leadership & Purpose Summit',
      date: 'Nov 14, 2026',
      location: 'Ogun / Lagos, Nigeria',
      status: 'New',
      budget: '₦1,500,000',
    },
    {
      id: 'spk-2',
      code: 'SPK-2026-10492',
      name: 'Fola Adebayo',
      org: 'Tech Builders Africa',
      event: 'Product Strategy & Scale Convention',
      date: 'Dec 05, 2026',
      location: 'Virtual (Zoom)',
      status: 'Reviewing',
      budget: '₦750,000',
    },
  ]);

  // Sample Bereans Applications State
  const [bereansList, setBereansList] = useState([
    {
      id: 'ber-1',
      name: 'Kelechi Okafor',
      email: 'kelechi@gmail.com',
      occupation: 'Investment Analyst',
      date: 'Sep 17, 2026',
      why: 'Looking to cultivate a disciplined reading habit around global markets and behavioral psychology.',
      status: 'Pending',
    },
    {
      id: 'ber-2',
      name: 'Grace Bamidele',
      email: 'grace.b@outlook.com',
      occupation: 'Brand Designer',
      date: 'Sep 16, 2026',
      why: 'Need community accountability to finish at least one non-fiction book per month.',
      status: 'Pending',
    },
  ]);

  // Sample Reviews Moderation State
  const [reviewsList, setReviewsList] = useState([
    {
      id: 'rev-mod-1',
      name: 'Timothy Alabi',
      role: 'Growth Strategist',
      rating: 5,
      comment: 'The clarity Moses brings to intentional growth is unmatched. A must-attend institute.',
      status: 'Pending',
    },
  ]);

  const updateSpeakingStatus = (id: string, newStatus: string) => {
    setSpeakingList(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const updateBereansStatus = (id: string, newStatus: string) => {
    setBereansList(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const updateReviewStatus = (id: string, newStatus: string) => {
    setReviewsList(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', padding: '50px 0 100px' }}>
      <div className="wrap">
        {/* Executive Header */}
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
            <span className="badge badge-gold" style={{ marginBottom: '10px' }}>Command Center</span>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', margin: '8px 0' }}>
              Good morning, <em>Moses</em>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
              Overview of platform revenue, student progression, speaking pipeline, and community cohorts.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/" target="_blank" className="btn btn-outline btn-sm">
              <Eye size={14} />
              <span>View Live Website</span>
            </Link>
          </div>
        </div>

        {/* Analytics Key Metrics Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '48px'
        }}>
          {[
            { label: 'Total Revenue (MTD)', val: '₦14,850,000', icon: DollarSign, color: 'var(--gold-bright)' },
            { label: 'Enrolled Students', val: '1,620', icon: Users, color: '#74C69D' },
            { label: 'Speaking Inquiries', val: '14 Active', icon: Calendar, color: '#E26D8C' },
            { label: 'Bereans Applicants', val: '38 Pending', icon: BookOpen, color: 'var(--gold-primary)' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="luxury-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    {stat.label}
                  </span>
                  <Icon size={18} color={stat.color} />
                </div>
                <div style={{ fontSize: '26px', fontFamily: 'var(--font-display)', fontWeight: 700, color: stat.color }}>
                  {stat.val}
                </div>
              </div>
            );
          })}
        </div>

        {/* Admin Navigation Modules */}
        <div style={{
          display: 'flex',
          gap: '12px',
          borderBottom: '1px solid var(--line-dark)',
          marginBottom: '36px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'speaking', label: `Speaking Inquiries (${speakingList.length})`, icon: Calendar },
            { id: 'bereans', label: `Bereans Screening (${bereansList.length})`, icon: BookOpen },
            { id: 'reviews', label: `Reviews Moderation (${reviewsList.length})`, icon: MessageSquare },
            { id: 'courses', label: `Course Catalog (${SEED_COURSES.length})`, icon: Award },
          ].map(mod => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id as any)}
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
                  cursor: 'pointer'
                }}
              >
                <Icon size={14} />
                <span>{mod.label}</span>
              </button>
            );
          })}
        </div>

        {/* Module 1: Speaking Requests CRM Pipeline */}
        {activeModule === 'speaking' && (
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Speaking &amp; Keynote Applications Pipeline</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {speakingList.map(req => (
                <div key={req.id} className="luxury-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '12px' }}>
                    <div>
                      <span className="badge badge-gold" style={{ marginBottom: '6px' }}>{req.code}</span>
                      <h3 style={{ fontSize: '18px' }}>{req.event}</h3>
                      <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                        Host: <strong>{req.name}</strong> ({req.org})
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>Status:</span>
                      <span className={`badge ${req.status === 'New' ? 'badge-gold' : 'badge-emerald'}`}>
                        {req.status}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    fontSize: '13px',
                    color: 'var(--text-muted)',
                    padding: '12px 0',
                    borderTop: '1px solid var(--line-subtle)',
                    borderBottom: '1px solid var(--line-subtle)',
                    marginBottom: '16px'
                  }}>
                    <span>Target Date: <strong style={{ color: 'var(--text-primary)' }}>{req.date}</strong></span>
                    <span>Location: <strong style={{ color: 'var(--text-primary)' }}>{req.location}</strong></span>
                    <span>Budget: <strong style={{ color: 'var(--gold-bright)' }}>{req.budget}</strong></span>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => updateSpeakingStatus(req.id, 'Contacted')} className="btn btn-outline btn-sm">
                      Mark as Contacted
                    </button>
                    <button onClick={() => updateSpeakingStatus(req.id, 'Accepted')} className="btn btn-gold btn-sm">
                      Accept Engagement
                    </button>
                    <button onClick={() => updateSpeakingStatus(req.id, 'Declined')} className="btn btn-ghost btn-sm" style={{ color: '#FFB4A2' }}>
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Module 2: The Bereans Applications */}
        {activeModule === 'bereans' && (
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>The Bereans Cohort Applications</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {bereansList.map(item => (
                <div key={item.id} className="luxury-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                    <div>
                      <h3 style={{ fontSize: '18px' }}>{item.name}</h3>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                        {item.occupation} · {item.email}
                      </div>
                    </div>
                    <span className="badge badge-gold">{item.status}</span>
                  </div>

                  <p style={{
                    background: 'var(--bg-secondary)',
                    padding: '12px 16px',
                    fontSize: '13.5px',
                    color: 'var(--text-secondary)',
                    fontStyle: 'italic',
                    marginBottom: '16px'
                  }}>
                    &ldquo;{item.why}&rdquo;
                  </p>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => updateBereansStatus(item.id, 'Approved')} className="btn btn-gold btn-sm">
                      Approve &amp; Send Cohort Access
                    </button>
                    <button onClick={() => updateBereansStatus(item.id, 'Rejected')} className="btn btn-outline btn-sm">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Module 3: Reviews Moderation */}
        {activeModule === 'reviews' && (
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Reviews Moderation Queue</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {reviewsList.map(rev => (
                <div key={rev.id} className="luxury-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div>
                      <strong style={{ color: 'var(--gold-bright)' }}>{rev.name}</strong> ({rev.role})
                    </div>
                    <span className="badge badge-gold">{rev.status}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginBottom: '16px' }}>
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => updateReviewStatus(rev.id, 'Approved & Published')} className="btn btn-gold btn-sm">
                      Approve &amp; Publish Publicly
                    </button>
                    <button onClick={() => updateReviewStatus(rev.id, 'Archived')} className="btn btn-outline btn-sm">
                      Archive
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Module 4: Course Management */}
        {activeModule === 'courses' && (
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Course Management</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {SEED_COURSES.map(course => (
                <div key={course.id} className="luxury-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '17px', color: 'var(--text-primary)' }}>{course.title}</h3>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                      {course.category} · {course.studentsCount} Students · {course.isFree ? 'FREE' : `₦${course.price.toLocaleString()}`}
                    </div>
                  </div>
                  <Link href={`/institute/course/${course.slug}`} target="_blank" className="btn btn-outline btn-sm">
                    View Course Page
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
