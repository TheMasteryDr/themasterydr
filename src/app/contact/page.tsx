'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, MapPin, Send, CheckCircle2, Instagram, Facebook, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Personal Coaching Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="contact-page-root">
      <section className="contact-hero-section">
        <div className="wrap">
          <div className="contact-hero-copy">
            <span className="pill-badge amber">
              <Sparkles size={12} /> Direct Channels
            </span>
            <h1 className="hero-title">
              Inquiries &amp; <span className="gradient-amber">Direct Communication</span>
            </h1>
            <p className="hero-subtitle">
              Have a question about Gain Mastery Institute courses, The Bereans reading fellowship, or executive growth coaching? Reach out directly.
            </p>
          </div>
        </div>
      </section>

      <section className="site-section form-section">
        <div className="wrap">
          <div className="contact-bento-grid">
            {/* Direct Cards Column */}
            <div className="contact-info-col">
              <div className="bento-card ci-card">
                <div className="ci-icon-box">
                  <Mail size={20} className="icon-amber" />
                </div>
                <h4>Official Correspondence</h4>
                <p>For executive inquiries, speaking invitations, and institutional partnerships:</p>
                <a href="mailto:contact@themasterydr.com" className="contact-link">
                  contact@themasterydr.com
                </a>
              </div>

              <div className="bento-card ci-card">
                <div className="ci-icon-box">
                  <MessageSquare size={20} className="icon-cyan" />
                </div>
                <h4>The Mastery Masterminds</h4>
                <p>Join over 3,000+ growth-oriented builders in our active global Telegram fellowship:</p>
                <a href="https://t.me/masterymasterminds" target="_blank" rel="noopener noreferrer" className="contact-link cyan">
                  t.me/masterymasterminds
                </a>
              </div>

              <div className="bento-card ci-card">
                <div className="ci-icon-box">
                  <MapPin size={20} className="icon-emerald" />
                </div>
                <h4>Headquarters</h4>
                <p>Gain Mastery Institute</p>
                <span className="contact-meta">Lagos, Nigeria &bull; Serving Global Builders</span>
              </div>
            </div>

            {/* Message Form Column */}
            <div className="contact-form-col">
              <div className="bento-card form-card">
                {submitted ? (
                  <div className="submitted-box">
                    <CheckCircle2 size={48} className="icon-emerald" />
                    <h3>Message Dispatched</h3>
                    <p>Thank you for reaching out. Your communication has been routed to the appropriate desk. You will receive a response within 24–48 business hours.</p>
                  </div>
                ) : (
                  <>
                    <h3>Send a Direct Dispatch</h3>
                    <p className="form-sub">Please specify the exact nature of your inquiry so we can route it efficiently.</p>

                    <form onSubmit={handleSubmit} className="contact-form">
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input 
                          type="text" 
                          required 
                          value={fullName}
                          onChange={e => setFullName(e.target.value)}
                          placeholder="e.g. Samuel Adeleke"
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
                          placeholder="samuel@domain.com"
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Inquiry Focus</label>
                        <select 
                          value={subject}
                          onChange={e => setSubject(e.target.value)}
                          className="form-select"
                        >
                          <option value="Personal Coaching Inquiry">Personal Growth Coaching</option>
                          <option value="Institute Courses Support">Gain Mastery Institute / Course Access</option>
                          <option value="The Bereans Membership">The Bereans Reading Fellowship</option>
                          <option value="General Strategic Inquiry">General Strategic Inquiries</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Message *</label>
                        <textarea 
                          required 
                          rows={5}
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                          placeholder="Please provide clear details regarding your inquiry..."
                          className="form-textarea"
                        />
                      </div>

                      <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '8px' }}>
                        {loading ? 'Transmitting...' : 'Transmit Message'} <Send size={15} />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-page-root {
          width: 100%;
          padding-bottom: 80px;
        }
        .contact-hero-section {
          padding: 80px 0 60px;
          border-bottom: 1px solid var(--border-subtle);
          background: var(--bg-subtle);
        }
        .contact-hero-copy {
          max-width: 720px;
        }
        .hero-title {
          font-size: clamp(34px, 4.2vw, 54px);
          margin-top: 18px;
          margin-bottom: 16px;
        }
        .hero-subtitle {
          font-size: 16.5px;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .contact-bento-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 36px;
        }
        .contact-info-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .ci-card {
          padding: 28px;
        }
        .ci-icon-box {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .ci-card h4 {
          font-size: 17px;
          margin-bottom: 6px;
        }
        .ci-card p {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 12px;
        }
        .contact-link {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--accent-amber-light);
          font-weight: 600;
        }
        .contact-link.cyan {
          color: var(--accent-cyan);
        }
        .contact-meta {
          font-size: 13px;
          color: var(--text-muted);
        }

        /* Form */
        .form-card {
          padding: 40px;
        }
        .form-card h3 {
          font-size: 24px;
          margin-bottom: 6px;
        }
        .form-sub {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
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
          border-color: var(--accent-amber);
        }
        .submitted-box {
          text-align: center;
          padding: 48px 0;
        }
        .icon-emerald {
          color: var(--accent-emerald);
          margin-bottom: 16px;
        }
        .submitted-box h3 {
          font-size: 24px;
          margin-bottom: 10px;
        }
        .submitted-box p {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.65;
        }

        @media (max-width: 900px) {
          .contact-bento-grid {
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
