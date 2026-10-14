'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Check, ArrowRight, Sparkles, Send, CheckCircle2 } from 'lucide-react';

export default function BereansPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cityCountry, setCityCountry] = useState('');
  const [readingHabit, setReadingHabit] = useState('1 - 2 books per month');
  const [whyJoin, setWhyJoin] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/bereans/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email,
          phone_number: phoneNumber,
          city_country: cityCountry,
          current_reading_habit: readingHabit,
          motivation_statement: whyJoin,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrorMsg('Submission error. Please ensure all required fields are filled.');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bereans-page-root">
      {/* Hero */}
      <section className="bereans-hero-section">
        <div className="wrap">
          <div className="bereans-hero-grid">
            <div className="bereans-hero-copy">
              <span className="pill-badge emerald">
                <BookOpen size={12} /> The Bereans Reading Fellowship
              </span>
              <h1 className="hero-title">
                Cultivate the transformative habit of <span className="gradient-amber">deep reading.</span>
              </h1>
              <p className="hero-subtitle">
                Inspired by the biblical Bereans who searched scriptures daily with open and discerning minds. A curated reading community designed to build mental discipline, intellectual capacity, and godly wisdom.
              </p>

              <div className="bereans-tags">
                <span className="tag-pill">100% Free Membership</span>
                <span className="tag-pill">Strict Screening Admission</span>
                <span className="tag-pill">Weekly Live Deliberations</span>
              </div>
            </div>

            <div className="bereans-hero-media">
              <div className="book-card-stage">
                <span className="book-pill">CURRENT DELIBERATION</span>
                <img 
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80" 
                  alt="Atomic Habits" 
                  className="book-img"
                />
                <h4>Atomic Habits</h4>
                <p>James Clear &bull; Habit Architecture &amp; 1% Systems</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fellowship Pillars Bento */}
      <section className="site-section pillars-section">
        <div className="wrap">
          <div className="section-header">
            <span className="pill-badge amber">Community Architecture</span>
            <h2>Why The Bereans is Different</h2>
            <p>We do not collect passive members. The Bereans is engineered for rigorous intellectual growth.</p>
          </div>

          <div className="pillars-bento-grid">
            <div className="bento-card bp-card">
              <span className="bp-num">01</span>
              <h4>Curated Non-Fiction Library</h4>
              <p>Books are selected across four pillars: Personal Discipline, Economic Literacy, Leadership &amp; Institutions, and Spiritual Depth.</p>
            </div>

            <div className="bento-card bp-card">
              <span className="bp-num">02</span>
              <h4>Structured Weekly Deliberations</h4>
              <p>Weekly live virtual deliberations with chapter breakdowns, reflection questions, peer accountability, and practical application.</p>
            </div>

            <div className="bento-card bp-card">
              <span className="bp-num">03</span>
              <h4>Admission by Screening Only</h4>
              <p>100% free of financial charge, but highly screened to ensure every cohort member is intellectually serious and committed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="site-section apply-section">
        <div className="wrap wrap-narrow">
          <div className="bento-card form-card">
            {submitted ? (
              <div className="submitted-success">
                <CheckCircle2 size={48} className="icon-emerald" />
                <h3>Application Submitted for Screening</h3>
                <p>Thank you for applying to join The Bereans Reading Community. Our admissions team reviews applications in batches before each cohort begins. You will receive an email update with next steps.</p>
              </div>
            ) : (
              <>
                <div className="form-head">
                  <span className="pill-badge emerald">Cohort Screening</span>
                  <h3>Apply to Join The Bereans</h3>
                  <p>Admission is free. Please answer thoughtfully to help us understand your intellectual goals.</p>
                </div>

                {errorMsg && (
                  <div className="form-alert error">
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleApply} className="bereans-form">
                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="e.g. David Adeyemi"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input 
                        type="email" 
                        required 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="david@domain.com"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Phone / WhatsApp *</label>
                      <input 
                        type="tel" 
                        required 
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        placeholder="+234 800 000 0000"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">City &amp; Country *</label>
                      <input 
                        type="text" 
                        required 
                        value={cityCountry}
                        onChange={e => setCityCountry(e.target.value)}
                        placeholder="e.g. Abuja, Nigeria / Toronto, Canada"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Current Reading Habit</label>
                    <select 
                      value={readingHabit}
                      onChange={e => setReadingHabit(e.target.value)}
                      className="form-select"
                    >
                      <option value="Rarely finish a book">Rarely finish a book (seeking accountability)</option>
                      <option value="1 - 2 books per month">1 - 2 books per month</option>
                      <option value="3+ books per month">3+ books per month (avid reader)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Why do you want to join The Bereans? *</label>
                    <textarea 
                      required 
                      rows={4}
                      value={whyJoin}
                      onChange={e => setWhyJoin(e.target.value)}
                      placeholder="Share what areas of intellectual growth, habit discipline, or spiritual depth you are focusing on..."
                      className="form-textarea"
                    />
                  </div>

                  <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '12px' }}>
                    {loading ? 'Submitting Application...' : 'Submit Application for Screening'} <Send size={15} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        .bereans-page-root {
          width: 100%;
          padding-bottom: 80px;
        }
        .wrap-narrow {
          max-width: 760px;
        }
        .bereans-hero-section {
          padding: 80px 0;
          border-bottom: 1px solid var(--border-subtle);
          background: var(--bg-subtle);
        }
        .bereans-hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
          align-items: center;
        }
        .hero-title {
          font-size: clamp(34px, 4.2vw, 54px);
          margin-top: 18px;
          margin-bottom: 16px;
        }
        .hero-subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 24px;
        }
        .bereans-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .tag-pill {
          font-family: var(--font-mono);
          font-size: 11.5px;
          color: var(--accent-emerald);
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          padding: 6px 14px;
          border-radius: var(--radius-full);
        }

        .book-card-stage {
          background: var(--bg-card);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-xl);
          padding: 32px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }
        .book-pill {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          color: var(--accent-emerald);
          display: block;
          margin-bottom: 16px;
        }
        .book-img {
          width: 160px;
          height: 220px;
          border-radius: var(--radius-md);
          margin: 0 auto 16px;
          object-fit: cover;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.6);
        }
        .book-card-stage h4 {
          font-size: 18px;
          margin-bottom: 4px;
        }
        .book-card-stage p {
          font-size: 12.5px;
          color: var(--text-muted);
        }

        /* Pillars */
        .pillars-bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .bp-card {
          padding: 32px;
        }
        .bp-num {
          font-family: var(--font-mono);
          font-size: 16px;
          color: var(--accent-amber);
          margin-bottom: 12px;
          display: block;
        }
        .bp-card h4 {
          font-size: 18px;
          margin-bottom: 8px;
        }
        .bp-card p {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Form */
        .form-card {
          padding: 44px;
        }
        .form-head {
          margin-bottom: 28px;
        }
        .form-head h3 {
          font-size: 24px;
          margin-top: 12px;
          margin-bottom: 6px;
        }
        .form-head p {
          font-size: 14px;
          color: var(--text-secondary);
        }
        .bereans-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-label {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
        }
        .form-input, .form-select, .form-textarea {
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          font-family: var(--font-sans);
          font-size: 14px;
          color: var(--text-primary);
          outline: none;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: var(--accent-emerald);
        }
        .submitted-success {
          text-align: center;
          padding: 48px 0;
        }
        .icon-emerald {
          color: var(--accent-emerald);
          margin-bottom: 16px;
        }
        .submitted-success h3 {
          font-size: 24px;
          margin-bottom: 12px;
        }
        .submitted-success p {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.65;
          max-width: 580px;
          margin: 0 auto;
        }

        @media (max-width: 900px) {
          .bereans-hero-grid, .pillars-bento-grid {
            grid-template-columns: 1fr;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
          }
          .form-card {
            padding: 28px 20px;
          }
        }
      `}</style>
    </div>
  );
}
