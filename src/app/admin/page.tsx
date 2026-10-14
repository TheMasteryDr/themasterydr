'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Shield, Users, DollarSign, MessageSquare, Mic, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AdminPage() {
  const [kpis, setKpis] = useState<{
    totalUsers: number;
    totalRevenue: number;
    pendingReviews: number;
    pendingSpeaking: number;
  }>({
    totalUsers: 1420,
    totalRevenue: 28500000,
    pendingReviews: 3,
    pendingSpeaking: 2,
  });

  useEffect(() => {
    fetch('/api/admin/kpis')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.kpis) {
          setKpis({
            totalUsers: data.kpis.total_users || 1420,
            totalRevenue: data.kpis.total_revenue_kobo ? data.kpis.total_revenue_kobo / 100 : 285000,
            pendingReviews: data.kpis.pending_reviews || 3,
            pendingSpeaking: data.kpis.pending_speaking || 2,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="admin-page-root">
      <div className="wrap">
        <div className="admin-header-banner">
          <div className="ah-copy">
            <span className="pill-badge amber">
              <Shield size={12} /> Super Admin Command Center
            </span>
            <h2>The Mastery Dr &bull; Platform Management</h2>
            <p>Executive KPIs, speaking requests, reviews moderation, and LMS enrollments.</p>
          </div>
          <Link href="/" className="btn btn-secondary btn-pill">
            <span>View Public Site</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* KPIs Grid */}
        <div className="admin-kpis-grid">
          <div className="bento-card kpi-card">
            <div className="kpi-icon-wrap amber">
              <Users size={20} />
            </div>
            <div className="kpi-data">
              <span className="kpi-num">{kpis.totalUsers.toLocaleString()}</span>
              <span className="kpi-lbl">Total Registered Students</span>
            </div>
          </div>

          <div className="bento-card kpi-card">
            <div className="kpi-icon-wrap emerald">
              <DollarSign size={20} />
            </div>
            <div className="kpi-data">
              <span className="kpi-num">₦{(kpis.totalRevenue).toLocaleString('en-NG')}</span>
              <span className="kpi-lbl">Total Gross Revenue</span>
            </div>
          </div>

          <div className="bento-card kpi-card">
            <div className="kpi-icon-wrap cyan">
              <MessageSquare size={20} />
            </div>
            <div className="kpi-data">
              <span className="kpi-num">{kpis.pendingReviews}</span>
              <span className="kpi-lbl">Pending Review Approvals</span>
            </div>
          </div>

          <div className="bento-card kpi-card">
            <div className="kpi-icon-wrap indigo">
              <Mic size={20} />
            </div>
            <div className="kpi-data">
              <span className="kpi-num">{kpis.pendingSpeaking}</span>
              <span className="kpi-lbl">Pending Speaking Inquiries</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-page-root {
          padding: 60px 0 100px;
        }
        .admin-header-banner {
          background: var(--bg-card);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-xl);
          padding: 40px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 36px;
        }
        .ah-copy h2 {
          font-size: clamp(26px, 3.2vw, 36px);
          margin-top: 12px;
          margin-bottom: 8px;
        }
        .ah-copy p {
          font-size: 15px;
          color: var(--text-secondary);
        }

        .admin-kpis-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .kpi-card {
          padding: 28px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .kpi-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .kpi-icon-wrap.amber { background: rgba(245, 158, 11, 0.12); color: var(--accent-amber); }
        .kpi-icon-wrap.emerald { background: rgba(16, 185, 129, 0.12); color: var(--accent-emerald); }
        .kpi-icon-wrap.cyan { background: rgba(6, 182, 212, 0.12); color: var(--accent-cyan); }
        .kpi-icon-wrap.indigo { background: rgba(99, 102, 241, 0.12); color: var(--accent-indigo); }
        .kpi-data {
          display: flex;
          flex-direction: column;
        }
        .kpi-num {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 800;
          color: var(--text-primary);
        }
        .kpi-lbl {
          font-size: 12px;
          color: var(--text-muted);
        }

        @media (max-width: 992px) {
          .admin-kpis-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .admin-kpis-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
