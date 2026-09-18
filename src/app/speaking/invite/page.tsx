'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowLeft, Send, AlertCircle, Calendar, MapPin, Building, User, Mail, Phone, Clock } from 'lucide-react';

export default function SpeakingInvitePage() {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    eventName: '',
    eventType: 'Conference',
    eventDate: '',
    eventLocation: '',
    isVirtual: false,
    audienceSize: '100 - 500',
    demographic: '',
    proposedTopic: '',
    eventTheme: '',
    keyObjectives: '',
    duration: '60 minutes',
    budgetRange: '₦500,000 - ₦1,500,000',
    travelProvision: '',
    websiteSocial: '',
    additionalInfo: '',
  });

  const [loading, setLoading] = useState(false);
  const [successCode, setSuccessCode] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/v1/speaking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit invitation.');
      }

      setSuccessCode(data.applicationCode);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', padding: '50px 0 90px' }}>
      <div className="wrap" style={{ maxWidth: '880px' }}>
        <div style={{ marginBottom: '32px' }}>
          <Link href="/speaking" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-muted)',
            fontSize: '13px',
            fontFamily: 'var(--font-mono)'
          }}>
            <ArrowLeft size={14} />
            <span>Return to Speaking Overview</span>
          </Link>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <span className="eyebrow">Official Invitation Portal</span>
          <h1 style={{ fontSize: 'clamp(30px, 4vw, 46px)', margin: '14px 0 16px' }}>
            Invite The Mastery Dr to Speak
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.7' }}>
            Please complete this detailed inquiry with your event specifications. Our executive management team reviews all invitations and responds within 48 business hours.
          </p>
        </div>

        {/* Success Confirmation State */}
        {successCode ? (
          <div className="luxury-card" style={{
            border: '1px solid var(--gold-primary)',
            padding: '48px 36px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--gold-surface)',
              border: '2px solid var(--gold-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              color: 'var(--gold-bright)'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <span className="badge badge-gold" style={{ marginBottom: '14px' }}>Invitation Received</span>
            <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>Thank You for Your Invitation</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.7', maxWidth: '600px', margin: '0 auto 28px' }}>
              Your speaking request has been officially recorded in our management system. A confirmation email has been dispatched to <strong>{formData.email}</strong>.
            </p>

            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--line-dark)',
              padding: '20px',
              borderRadius: 'var(--radius-sm)',
              maxWidth: '400px',
              margin: '0 auto 32px'
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>
                UNIQUE APPLICATION CODE:
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', fontWeight: 700, color: 'var(--gold-bright)' }}>
                {successCode}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <Link href="/" className="btn btn-gold">
                <span>Return to Homepage</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Form Card */
          <form onSubmit={handleSubmit} className="luxury-card" style={{ padding: '40px 36px' }}>
            {errorMessage && (
              <div style={{
                backgroundColor: 'rgba(155, 34, 38, 0.2)',
                border: '1px solid var(--status-error)',
                padding: '14px 18px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '26px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#FFB4A2',
                fontSize: '14px'
              }}>
                <AlertCircle size={18} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Section 1: Contact Details */}
            <div style={{ marginBottom: '36px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--gold-bright)', marginBottom: '18px', paddingBottom: '8px', borderBottom: '1px solid var(--line-dark)' }}>
                1. Host &amp; Organization Information
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="fullName">Your Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Adeyemi Williams"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="organization">Organization / Host Body *</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    required
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="e.g. Covenant University / Tech Builders Summit"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Official Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@organization.org"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+234 800 000 0000"
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Event Details */}
            <div style={{ marginBottom: '36px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--gold-bright)', marginBottom: '18px', paddingBottom: '8px', borderBottom: '1px solid var(--line-dark)' }}>
                2. Event Specifications
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="eventName">Event Title / Name *</label>
                  <input
                    type="text"
                    id="eventName"
                    name="eventName"
                    required
                    value={formData.eventName}
                    onChange={handleChange}
                    placeholder="e.g. Annual Growth & Leadership Congress 2026"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="eventType">Event Type *</label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Conference">Major Conference / Summit</option>
                    <option value="Church Leadership">Church / Ministry Event</option>
                    <option value="University">University / Academic Assembly</option>
                    <option value="Corporate Retreat">Corporate Growth Workshop / Retreat</option>
                    <option value="Youth Program">Youth & Emerging Leaders Convention</option>
                    <option value="Podcast/Media">Podcast / Media Appearance</option>
                    <option value="Executive Panel">Executive Panel Session</option>
                    <option value="Other">Other Engagement</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="eventDate">Target Event Date *</label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    required
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="eventLocation">Event Location (City, State/Country) *</label>
                  <input
                    type="text"
                    id="eventLocation"
                    name="eventLocation"
                    required
                    value={formData.eventLocation}
                    onChange={handleChange}
                    placeholder="e.g. Lagos, Nigeria or Virtual (Zoom)"
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ marginTop: '10px', marginBottom: '20px' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14.5px', color: 'var(--text-secondary)' }}>
                  <input
                    type="checkbox"
                    name="isVirtual"
                    checked={formData.isVirtual}
                    onChange={handleChange}
                    style={{ accentColor: 'var(--gold-primary)', width: '16px', height: '16px' }}
                  />
                  <span>This is a purely virtual / online engagement</span>
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="audienceSize">Expected Audience Size</label>
                  <select
                    id="audienceSize"
                    name="audienceSize"
                    value={formData.audienceSize}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Under 100">Under 100 attendees</option>
                    <option value="100 - 500">100 – 500 attendees</option>
                    <option value="500 - 2,000">500 – 2,000 attendees</option>
                    <option value="2,000+">2,000+ attendees</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="duration">Session Duration</label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g. 45 mins + 15 mins Q&A"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="demographic">Audience Demographic Profile</label>
                <input
                  type="text"
                  id="demographic"
                  name="demographic"
                  value={formData.demographic}
                  onChange={handleChange}
                  placeholder="e.g. Corporate executives, university graduates, young founders ages 22-38"
                  className="form-input"
                />
              </div>
            </div>

            {/* Section 3: Topic & Objectives */}
            <div style={{ marginBottom: '36px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--gold-bright)', marginBottom: '18px', paddingBottom: '8px', borderBottom: '1px solid var(--line-dark)' }}>
                3. Content &amp; Engagement Objectives
              </h3>
              <div className="form-group">
                <label className="form-label" htmlFor="proposedTopic">Proposed Topic / Desired Focus *</label>
                <input
                  type="text"
                  id="proposedTopic"
                  name="proposedTopic"
                  required
                  value={formData.proposedTopic}
                  onChange={handleChange}
                  placeholder="e.g. The Architecture of Intentional Growth or Custom Topic"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="eventTheme">Event Theme (if any)</label>
                <input
                  type="text"
                  id="eventTheme"
                  name="eventTheme"
                  value={formData.eventTheme}
                  onChange={handleChange}
                  placeholder="e.g. Rebuilding Capacity in Uncertain Times"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="keyObjectives">What would you like The Mastery Dr to accomplish in this room?</label>
                <textarea
                  id="keyObjectives"
                  name="keyObjectives"
                  rows={3}
                  value={formData.keyObjectives}
                  onChange={handleChange}
                  placeholder="Describe your desired outcomes and core message you want impressed upon the audience."
                  className="form-textarea"
                />
              </div>
            </div>

            {/* Section 4: Budget & Logistics */}
            <div style={{ marginBottom: '36px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--gold-bright)', marginBottom: '18px', paddingBottom: '8px', borderBottom: '1px solid var(--line-dark)' }}>
                4. Logistics &amp; Honorarium
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="budgetRange">Budget / Honorarium Provision</label>
                  <input
                    type="text"
                    id="budgetRange"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    placeholder="e.g. ₦1,000,000 or Standard Retainer"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="websiteSocial">Organization Website / Socials</label>
                  <input
                    type="text"
                    id="websiteSocial"
                    name="websiteSocial"
                    value={formData.websiteSocial}
                    onChange={handleChange}
                    placeholder="https://yourorganization.com or @handle"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="travelProvision">Travel &amp; Accommodation Provisions (for In-Person)</label>
                <input
                  type="text"
                  id="travelProvision"
                  name="travelProvision"
                  value={formData.travelProvision}
                  onChange={handleChange}
                  placeholder="e.g. Flight, hotel, and local security protocol provided"
                  className="form-input"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-gold"
              style={{ width: '100%', padding: '16px', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <span>Submitting Application...</span>
              ) : (
                <>
                  <span>Submit Speaking Invitation</span>
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
