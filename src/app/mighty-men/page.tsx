'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Shield, Send } from 'lucide-react';

export default function MightyMenPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    cityCountry: '',
    whyApply: '',
    currentChallenges: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', padding: '60px 0 100px' }}>
      <div className="wrap" style={{ maxWidth: '780px' }}>
        <div style={{ marginBottom: '32px' }}>
          <Link href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-muted)',
            fontSize: '13px',
            fontFamily: 'var(--font-mono)'
          }}>
            <ArrowLeft size={14} />
            <span>Return to The Mastery Dr</span>
          </Link>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '14px' }}>Private Brotherhood Initiative</span>
          <h1 style={{ fontSize: 'clamp(30px, 4.2vw, 46px)', margin: '12px 0 16px' }}>
            Mighty Men of <em>Mastery.</em>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16.5px', lineHeight: '1.7' }}>
            An intentional brotherhood and inner circle for determined men committed to disciplined spiritual depth, physical fortitude, financial intelligence, and masculine responsibility.
          </p>
        </div>

        {submitted ? (
          <div className="luxury-card" style={{ padding: '48px 36px', textAlign: 'center', border: '1px solid var(--gold-primary)' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--gold-surface)',
              border: '2px solid var(--gold-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              color: 'var(--gold-bright)'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h2 style={{ fontSize: '26px', marginBottom: '14px' }}>Application Under Confidential Review</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15.5px', lineHeight: '1.7', maxWidth: '580px', margin: '0 auto 28px' }}>
              Thank you, <strong>{form.fullName}</strong>. Membership into Mighty Men of Mastery is granted through personal review by Moses Oladoye. You will be contacted via private correspondence regarding cohort eligibility.
            </p>
            <Link href="/" className="btn btn-gold">
              <span>Return to Homepage</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="luxury-card" style={{ padding: '36px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                required
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="e.g. David Olumide"
                className="form-input"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="david@gmail.com"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+234 800 000 0000"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="cityCountry">City &amp; Country of Residence *</label>
              <input
                type="text"
                id="cityCountry"
                required
                value={form.cityCountry}
                onChange={(e) => setForm({ ...form, cityCountry: e.target.value })}
                placeholder="e.g. Abuja, Nigeria / London, UK"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="whyApply">Why are you seeking brotherhood and accountability right now? *</label>
              <textarea
                id="whyApply"
                required
                rows={4}
                value={form.whyApply}
                onChange={(e) => setForm({ ...form, whyApply: e.target.value })}
                placeholder="Describe your current season of life and why you are seeking a high-discipline inner circle of men."
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="currentChallenges">What area of your life requires the greatest discipline? (Mindset, Finances, Spiritual, Character)</label>
              <textarea
                id="currentChallenges"
                rows={3}
                value={form.currentChallenges}
                onChange={(e) => setForm({ ...form, currentChallenges: e.target.value })}
                placeholder="Be candid and transparent..."
                className="form-textarea"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-gold"
              style={{ width: '100%', padding: '16px' }}
            >
              <Send size={15} />
              <span>{loading ? 'Submitting Application...' : 'Submit Confidential Application'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
