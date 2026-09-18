'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle2, Mail, MessageSquare, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    inquiryType: 'general',
    subject: '',
    message: '',
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
      <div className="wrap" style={{ maxWidth: '900px' }}>
        <div style={{ marginBottom: '44px' }}>
          <span className="eyebrow">Connect &amp; Inquire</span>
          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 54px)', margin: '14px 0 16px' }}>
            Start a <em>Conversation.</em>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16.5px', maxWidth: '640px', lineHeight: '1.7' }}>
            For executive growth coaching inquiries, institutional partnerships, speaking engagements, or general feedback, connect directly with our office.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'start'
        }}>
          {/* Contact Form */}
          <div className="luxury-card" style={{ padding: '36px' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <CheckCircle2 size={48} color="var(--gold-primary)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '22px', marginBottom: '12px' }}>Message Dispatched</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6' }}>
                  Thank you, <strong>{form.name}</strong>. Your inquiry has been routed to our communications desk. We typically respond within 24 to 48 business hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', inquiryType: 'general', subject: '', message: '' }); }}
                  className="btn btn-outline btn-sm"
                  style={{ marginTop: '24px' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Oluwaseun Davies"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="inquiryType">Nature of Inquiry *</label>
                  <select
                    id="inquiryType"
                    value={form.inquiryType}
                    onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                    className="form-select"
                  >
                    <option value="general">General Inquiry / Question</option>
                    <option value="coaching">Executive Personal Growth Coaching Inquiry</option>
                    <option value="institute">Gain Mastery Institute Support</option>
                    <option value="bereans">The Bereans Reading Club Inquiries</option>
                    <option value="partnership">Institutional Partnership</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Brief summary of your inquiry"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Provide details regarding your inquiry..."
                    className="form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-gold"
                  style={{ width: '100%', padding: '15px' }}
                >
                  <Send size={15} />
                  <span>{loading ? 'Transmitting...' : 'Send Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Channels & Coaching Note */}
          <div>
            <div className="luxury-card" style={{ padding: '30px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--gold-bright)', marginBottom: '14px' }}>
                One-on-One Growth Coaching
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.7', marginBottom: '14px' }}>
                Moses Oladoye accepts a limited number of high-commitment personal coaching engagements each quarter across clarity, purpose, and financial strategy.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                Inquiries are screened for fit, capacity, and readiness for rigorous accountability. Select &ldquo;Executive Personal Growth Coaching Inquiry&rdquo; in the form to begin.
              </p>
            </div>

            <div className="luxury-card" style={{ padding: '30px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '16px' }}>
                Direct Channels
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>
                    OFFICIAL EMAIL
                  </span>
                  <a href="mailto:moses@gainmastery.org" style={{ color: 'var(--gold-bright)' }}>
                    moses@gainmastery.org
                  </a>
                </div>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>
                    HEADQUARTERS
                  </span>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    Lagos, Nigeria (Global Digital Delivery)
                  </span>
                </div>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>
                    LOOKING FOR A SPEAKER?
                  </span>
                  <Link href="/speaking/invite" style={{ color: 'var(--gold-bright)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <span>Use our Dedicated Speaking Portal</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
