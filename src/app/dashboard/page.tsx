'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Award, CheckCircle2, Clock, ArrowRight, Shield, User } from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState<{ fullName: string; email: string } | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.user) {
          setUser({
            fullName: data.user.profile?.full_name || 'Member',
            email: data.user.email,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="dashboard-page-root">
      <div className="wrap">
        <div className="dashboard-welcome-banner">
          <div className="dw-copy">
            <span className="pill-badge emerald">
              <CheckCircle2 size={12} /> Student Learning Portal
            </span>
            <h2>Welcome back, {user ? user.fullName : 'Builder'}.</h2>
            <p>Track your curriculum progress across Gain Mastery Institute and access your deliberations.</p>
          </div>
          <Link href="/courses" className="btn btn-primary btn-pill">
            <span>Explore New Courses</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Bento Stats */}
        <div className="dashboard-bento-grid">
          <div className="bento-card db-stat-card">
            <span className="db-sub">ENROLLED PROGRAMS</span>
            <h3>2 Tracks Active</h3>
            <p>Foundations of Personal Mastery &bull; Six Dimensions</p>
          </div>

          <div className="bento-card db-stat-card">
            <span className="db-sub">COMPLETION PROGRESS</span>
            <h3>64% Average</h3>
            <p>12 of 18 lessons completed</p>
          </div>

          <div className="bento-card db-stat-card">
            <span className="db-sub">THE BEREANS STATUS</span>
            <h3 style={{ color: 'var(--accent-emerald)' }}>Active Fellow</h3>
            <p>Current: Atomic Habits (Ch. 4 Deliberation)</p>
          </div>
        </div>

        {/* Active Courses */}
        <div className="dashboard-section">
          <h3>Your Active Curriculums</h3>
          <div className="active-courses-list">
            <div className="bento-card active-course-item">
              <div className="aci-left">
                <span className="pill-badge amber">Core Track</span>
                <h4>Foundations of Personal Mastery</h4>
                <p>Purpose, Habits &amp; Daily Disciplines &bull; 8 of 10 Modules Completed</p>
                <div className="progress-bar-wrap">
                  <div className="progress-bar-fill" style={{ width: '80%' }} />
                </div>
              </div>
              <Link href="/courses/foundations-of-personal-mastery" className="btn btn-secondary btn-sm btn-pill">
                Resume Course <ArrowRight size={13} />
              </Link>
            </div>

            <div className="bento-card active-course-item">
              <div className="aci-left">
                <span className="pill-badge indigo">Executive Track</span>
                <h4>Six Dimensions of Strategic Growth</h4>
                <p>Spiritual, Financial &amp; Leadership Mastery &bull; 4 of 8 Modules Completed</p>
                <div className="progress-bar-wrap">
                  <div className="progress-bar-fill" style={{ width: '50%' }} />
                </div>
              </div>
              <Link href="/courses/six-dimensions-strategic-growth" className="btn btn-secondary btn-sm btn-pill">
                Resume Course <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-page-root {
          padding: 60px 0 100px;
        }
        .dashboard-welcome-banner {
          background: var(--bg-card);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-xl);
          padding: 40px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
          margin-bottom: 36px;
        }
        .dw-copy h2 {
          font-size: clamp(26px, 3.2vw, 38px);
          margin-top: 12px;
          margin-bottom: 8px;
        }
        .dw-copy p {
          font-size: 15px;
          color: var(--text-secondary);
        }

        .dashboard-bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 48px;
        }
        .db-stat-card {
          padding: 28px;
        }
        .db-sub {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 8px;
        }
        .db-stat-card h3 {
          font-size: 24px;
          margin-bottom: 6px;
        }
        .db-stat-card p {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .dashboard-section h3 {
          font-size: 22px;
          margin-bottom: 20px;
        }
        .active-courses-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .active-course-item {
          padding: 28px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }
        .aci-left {
          flex: 1;
          min-width: 280px;
        }
        .aci-left h4 {
          font-size: 18px;
          margin-top: 10px;
          margin-bottom: 4px;
        }
        .aci-left p {
          font-size: 13.5px;
          color: var(--text-secondary);
          margin-bottom: 12px;
        }
        .progress-bar-wrap {
          width: 100%;
          max-width: 380px;
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-amber), var(--accent-emerald));
          border-radius: var(--radius-full);
        }

        @media (max-width: 900px) {
          .dashboard-bento-grid {
            grid-template-columns: 1fr;
          }
          .dashboard-welcome-banner {
            padding: 28px 20px;
          }
        }
      `}</style>
    </div>
  );
}
