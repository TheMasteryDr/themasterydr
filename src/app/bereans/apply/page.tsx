'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertCircle, BookOpen, Send } from 'lucide-react';

export default function BereansApplyPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    occupation: '',
    whyJoin: '',
    booksReadRecently: '',
    commitmentAgreement: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.commitmentAgreement) {
      setError('You must accept the commitment agreement to join The Bereans.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/v1/bereans/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Error submitting application.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', padding: '50px 0 90px' }}>
      <div className="wrap" style={{ maxWidth: '780px' }}>
        <div style={{ marginBottom: '32px' }}>
          <Link href="/bereans" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-muted)',
            fontSize: '13px',
            fontFamily: 'var(--font-mono)'
          }}>
            <ArrowLeft size={14} />
            <span>Return to The Bereans Overview</span>
          </Link>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <span className="eyebrow eyebrow-wine">Membership Screening</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '14px 0 16px' }}>
            Apply to Join The Bereans
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.7' }}>
            The Bereans is free, but membership is not automatic. We screen applicants to ensure every member brings intentionality, active participation, and commitment to the cohort discussions.
          </p>
        </div>

        {submitted ? (
          <div className="luxury-card" style={{
            border: '1px solid var(--wine)',
            padding: '48px 36px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--wine-subtle)',
              border: '2px solid var(--wine)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              color: '#F080A0'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <span className="badge badge-wine" style={{ marginBottom: '14px' }}>Application Under Review</span>
            <h2 style={{ fontSize: '26px', marginBottom: '16px' }}>Application Received</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15.5px', lineHeight: '1.7', maxWidth: '580px', margin: '0 auto 28px' }}>
              Thank you, <strong>{formData.fullName}</strong>. Your screening application has been forwarded to our cohort moderators. You will receive an approval email with your cohort meeting link and reading access.
            </p>

            <Link href="/" className="btn btn-gold">
              <span>Return to Homepage</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="luxury-card" style={{ padding: '36px' }}>
            {error && (
              <div style={{
                backgroundColor: 'rgba(155, 34, 38, 0.2)',
                border: '1px solid var(--status-error)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#FFB4A2',
                fontSize: '13.5px'
              }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Samuel Olawale"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="samuel@gmail.com"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+234 800 000 0000"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="occupation">Current Profession / Course of Study</label>
                <input
                  type="text"
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  placeholder="e.g. Software Engineer / Accounting Student"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="whyJoin">Why are you determined to cultivate the habit of reading right now? *</label>
              <textarea
                id="whyJoin"
                required
                rows={3}
                value={formData.whyJoin}
                onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })}
                placeholder="Describe your current relationship with books, your personal growth goals, and why you need cohort accountability."
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="booksReadRecently">What books have you read (or attempted to read) over the past 6 months?</label>
              <textarea
                id="booksReadRecently"
                rows={2}
                value={formData.booksReadRecently}
                onChange={(e) => setFormData({ ...formData, booksReadRecently: e.target.value })}
                placeholder="e.g. Deep Work, Mere Christianity, The Psychology of Money"
                className="form-textarea"
              />
            </div>

            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--line-dark)',
              padding: '18px',
              borderRadius: 'var(--radius-sm)',
              margin: '24px 0'
            }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                <input
                  type="checkbox"
                  required
                  checked={formData.commitmentAgreement}
                  onChange={(e) => setFormData({ ...formData, commitmentAgreement: e.target.checked })}
                  style={{ accentColor: 'var(--gold-primary)', width: '18px', height: '18px', marginTop: '3px' }}
                />
                <span>
                  <strong>The Bereans Honor Code:</strong> I commit to reading the weekly chapter allocations, submitting weekly reflection prompts, and showing up with thoughtful contributions during our virtual cohort sessions.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-gold"
              style={{ width: '100%', padding: '16px' }}
            >
              {loading ? <span>Submitting Application...</span> : (
                <>
                  <span>Submit Screening Application</span>
                  <Send size={15} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
