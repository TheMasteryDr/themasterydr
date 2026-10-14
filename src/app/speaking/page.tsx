'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mic, Calendar, MapPin, Users, CheckCircle2, ArrowRight, Sparkles, Send } from 'lucide-react';

export default function SpeakingPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [eventType, setEventType] = useState('Conference Keynote');
  const [location, setLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [audienceSize, setAudienceSize] = useState('100 - 500');
  const [topicInterest, setTopicInterest] = useState('The Six Dimensions of Mastery');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/speaking/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizer_name: fullName,
          organizer_email: email,
          organization_name: organization,
          event_title: `${eventType} (${organization})`,
          event_type: eventType,
          event_date: eventDate,
          location,
          audience_size: audienceSize,
          topic_interest: topicInterest,
          additional_notes: notes,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrorMsg('Failed to submit application. Please verify required fields.');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="speaking-page-root">
      {/* Hero */}
      <section className="speaking-hero-section">
        <div className="wrap">
          <div className="speaking-hero-grid">
            <div className="speaking-hero-copy">
              <span className="pill-badge amber">
                <Mic size={12} /> Keynotes &bull; Facilitation &bull; Ministry
              </span>
              <h1 className="hero-title">
                Invite Moses Oladoye to <span className="gradient-amber">teach your room.</span>
              </h1>
              <p className="hero-subtitle">
                The Mastery Dr brings intellectual rigor, poise, and spiritual conviction to stages worldwide. Whether delivering an international keynote or facilitating an executive leadership retreat, his teachings shift mindsets and establish strategic direction.
              </p>
            </div>

            <div className="speaking-hero-media">
              <div className="speaking-portrait-card">
                <img 
                  src="/images/founder/founder_photo_4.jpg" 
                  alt="The Mastery Dr speaking at international conference"
                  className="speaking-portrait-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Topics Bento */}
      <section className="site-section topics-section">
        <div className="wrap">
          <div className="section-header">
            <span className="pill-badge indigo">Core Curriculums</span>
            <h2>Signature Keynote Topics</h2>
            <p>Customized to the exact strategic objectives and demographic of your gathering.</p>
          </div>

          <div className="topics-bento-grid">
            <div className="bento-card topic-card">
              <span className="topic-num">01</span>
              <h4>The Six Dimensions of Mastery</h4>
              <p>A comprehensive architectural blueprint for multidimensional human stewardship, personal capacity, and building institutions that outlast trends.</p>
            </div>

            <div className="bento-card topic-card">
              <span className="topic-num">02</span>
              <h4>Purpose &amp; Divine Mandate</h4>
              <p>Dismantling the confusion between making a living and making purposeful impact. Aligning talent, divine coordinates, and generational responsibility.</p>
            </div>

            <div className="bento-card topic-card">
              <span className="topic-num">03</span>
              <h4>Financial Intelligence for Builders</h4>
              <p>Rigorous, non-cliche economic wisdom: cash flow management, capital preservation, understanding economic cycles, and sovereign wealth creation.</p>
            </div>

            <div className="bento-card topic-card">
              <span className="topic-num">04</span>
              <h4>Leadership &amp; Moral Authority</h4>
              <p>Why title without character guarantees collapse. Engineering cultures of competence, loyalty, clarity, and principled succession.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="site-section booking-section">
        <div className="wrap wrap-narrow">
          <div className="bento-card form-card">
            {submitted ? (
              <div className="submitted-success">
                <CheckCircle2 size={48} className="icon-emerald" />
                <h3>Invitation Application Received</h3>
                <p>Thank you for extending an invitation to Moses Oladoye. Our executive scheduling team reviews applications weekly and will respond with availability and engagement terms within 48–72 hours.</p>
              </div>
            ) : (
              <>
                <div className="form-head">
                  <span className="pill-badge amber">Executive Booking</span>
                  <h3>Submit Speaking &amp; Teaching Request</h3>
                  <p>Please provide details about your organization, gathering format, and proposed dates.</p>
                </div>

                {errorMsg && (
                  <div className="form-alert error">
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="speaking-form">
                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="e.g. Dr. Kemi Balogun"
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
                        placeholder="kemi@organization.org"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Organization / Ministry *</label>
                      <input 
                        type="text" 
                        required 
                        value={organization}
                        onChange={e => setOrganization(e.target.value)}
                        placeholder="e.g. Lead City Leadership Summit"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Gathering Type *</label>
                      <select 
                        value={eventType}
                        onChange={e => setEventType(e.target.value)}
                        className="form-select"
                      >
                        <option value="Conference Keynote">Conference Keynote</option>
                        <option value="Church / Ministry Assembly">Church / Ministry Assembly</option>
                        <option value="Corporate Executive Retreat">Corporate Executive Retreat</option>
                        <option value="University / Campus Assembly">University / Campus Assembly</option>
                        <option value="Virtual Global Masterclass">Virtual Global Masterclass</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">City &amp; Country *</label>
                      <input 
                        type="text" 
                        required 
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        placeholder="e.g. London, UK / Lagos, Nigeria"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Proposed Date *</label>
                      <input 
                        type="date" 
                        required 
                        value={eventDate}
                        onChange={e => setEventDate(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Primary Topic of Interest</label>
                    <input 
                      type="text" 
                      value={topicInterest}
                      onChange={e => setTopicInterest(e.target.value)}
                      placeholder="e.g. Purpose, Habits, Financial Intelligence"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Additional Context / Audience Background</label>
                    <textarea 
                      rows={4}
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="Describe expected attendees, theme of the event, and desired outcomes..."
                      className="form-textarea"
                    />
                  </div>

                  <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '12px' }}>
                    {loading ? 'Submitting Application...' : 'Submit Speaking Request'} <Send size={15} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        .speaking-page-root {
          width: 100%;
          padding-bottom: 80px;
        }
        .wrap-narrow {
          max-width: 760px;
        }
        .speaking-hero-section {
          padding: 80px 0;
          border-bottom: 1px solid var(--border-subtle);
          background: var(--bg-subtle);
        }
        .speaking-hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 60px;
          align-items: center;
        }
        .hero-title {
          font-size: clamp(34px, 4vw, 54px);
          margin-top: 18px;
          margin-bottom: 16px;
        }
        .hero-subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .speaking-portrait-card {
          width: 100%;
          max-width: 440px;
          height: 480px;
          border-radius: var(--radius-xl);
          overflow: hidden;
          border: 1px solid var(--border-glass);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }
        .speaking-portrait-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Topics */
        .topics-bento-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .topic-card {
          padding: 32px;
        }
        .topic-num {
          font-family: var(--font-mono);
          font-size: 16px;
          color: var(--accent-amber);
          margin-bottom: 12px;
          display: block;
        }
        .topic-card h4 {
          font-size: 18px;
          margin-bottom: 8px;
        }
        .topic-card p {
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
        .speaking-form {
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
          transition: border-color var(--transition-fast);
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: var(--accent-amber);
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
          .speaking-hero-grid {
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
