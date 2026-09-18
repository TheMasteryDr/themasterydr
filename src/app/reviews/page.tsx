'use client';

import React, { useState } from 'react';
import { Star, MessageSquare, Plus, CheckCircle2, AlertCircle, Filter, Send } from 'lucide-react';
import { SEED_REVIEWS } from '@/lib/data/seed-data';

export default function ReviewsPage() {
  const [reviewsList, setReviewsList] = useState(SEED_REVIEWS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    reviewerName: '',
    reviewerEmail: '',
    reviewerTitle: '',
    category: 'personal_brand',
    rating: 5,
    comment: '',
    isAnonymous: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredReviews = selectedCategory === 'all'
    ? reviewsList
    : reviewsList.filter(r => r.category === selectedCategory);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/v1/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewerName: form.isAnonymous ? 'Anonymous Member' : form.reviewerName,
          reviewerEmail: form.reviewerEmail,
          reviewerTitle: form.isAnonymous ? 'Community Member' : form.reviewerTitle,
          category: form.category,
          rating: form.rating,
          comment: form.comment,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit review.');

      setSubmitted(true);
      setTimeout(() => {
        setShowModal(false);
        setSubmitted(false);
        setForm({
          reviewerName: '',
          reviewerEmail: '',
          reviewerTitle: '',
          category: 'personal_brand',
          rating: 5,
          comment: '',
          isAnonymous: false,
        });
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Error submitting review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', padding: '50px 0 100px' }}>
      <div className="wrap">
        {/* Header Banner */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '24px',
          marginBottom: '50px'
        }}>
          <div>
            <span className="eyebrow">Reputation &amp; Transformation</span>
            <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 54px)', margin: '14px 0 16px' }}>
              Stories of <em>Mastery.</em>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16.5px', maxWidth: '600px', lineHeight: '1.7' }}>
              Verified testimonials and transformation reflections from students, leaders, organizations, and members of The Bereans community.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="btn btn-gold"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Plus size={16} />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Filter Categories */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '40px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--line-dark)'
        }}>
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'personal_brand', label: 'The Mastery Dr' },
            { id: 'institute', label: 'Gain Mastery Institute' },
            { id: 'bereans', label: 'The Bereans' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                background: selectedCategory === cat.id ? 'var(--gold-primary)' : 'var(--bg-card)',
                color: selectedCategory === cat.id ? 'var(--bg-primary)' : 'var(--text-secondary)',
                border: `1px solid ${selectedCategory === cat.id ? 'var(--gold-primary)' : 'var(--line-dark)'}`,
                padding: '8px 18px',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11.5px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontWeight: selectedCategory === cat.id ? 700 : 500,
                transition: 'var(--transition)'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {filteredReviews.map((rev) => (
            <div key={rev.id} className="luxury-card" style={{ borderTop: '2px solid var(--gold-primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="var(--gold-primary)" color="var(--gold-primary)" />
                  ))}
                </div>
                <span className="badge badge-gold" style={{ fontSize: '9.5px' }}>
                  {rev.category.replace('_', ' ')}
                </span>
              </div>

              <p style={{ color: 'var(--text-primary)', fontSize: '15px', lineHeight: '1.7', marginBottom: '24px' }}>
                &ldquo;{rev.comment}&rdquo;
              </p>

              <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--line-dark)' }}>
                <div style={{ fontWeight: 600, fontSize: '14.5px', color: 'var(--gold-bright)' }}>
                  {rev.reviewerName}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                  {rev.reviewerTitle} · {rev.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Review Modal */}
        {showModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(7, 6, 5, 0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 150,
            padding: '20px'
          }}>
            <div className="luxury-card" style={{
              maxWidth: '600px',
              width: '100%',
              padding: '36px',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '1px solid var(--gold-primary)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
                <h3 style={{ fontSize: '22px' }}>Submit Your Experience</h3>
                <button
                  onClick={() => setShowModal(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '20px', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                  <CheckCircle2 size={48} color="var(--gold-primary)" style={{ margin: '0 auto 16px' }} />
                  <h4 style={{ fontSize: '20px', marginBottom: '10px' }}>Thank You for Your Review</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px' }}>
                    Your feedback has been submitted to our moderation team and will appear once approved.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview}>
                  {error && (
                    <div style={{ color: '#FFB4A2', fontSize: '13px', marginBottom: '14px' }}>{error}</div>
                  )}

                  {/* Rating Stars */}
                  <div className="form-group">
                    <label className="form-label">Your Rating *</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setForm({ ...form, rating: star })}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                        >
                          <Star
                            size={24}
                            fill={star <= form.rating ? 'var(--gold-primary)' : 'none'}
                            color="var(--gold-primary)"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="revCategory">Review Category *</label>
                    <select
                      id="revCategory"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="form-select"
                    >
                      <option value="personal_brand">The Mastery Dr (General Brand &amp; Mentorship)</option>
                      <option value="institute">Gain Mastery Institute (Course Curriculum)</option>
                      <option value="bereans">The Bereans Reading Community</option>
                      <option value="speaking">Speaking Engagement / Keynote</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="revComment">Your Written Review / Reflection *</label>
                    <textarea
                      id="revComment"
                      required
                      rows={4}
                      value={form.comment}
                      onChange={(e) => setForm({ ...form, comment: e.target.value })}
                      placeholder="Describe how The Mastery Dr or Gain Mastery Institute has impacted your growth, mindset, or career..."
                      className="form-textarea"
                    />
                  </div>

                  <div style={{ marginBottom: '18px' }}>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                      <input
                        type="checkbox"
                        checked={form.isAnonymous}
                        onChange={(e) => setForm({ ...form, isAnonymous: e.target.checked })}
                        style={{ accentColor: 'var(--gold-primary)', width: '16px', height: '16px' }}
                      />
                      <span>Post as Anonymous Community Member</span>
                    </label>
                  </div>

                  {!form.isAnonymous && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div className="form-group">
                        <label className="form-label" htmlFor="revName">Your Name</label>
                        <input
                          type="text"
                          id="revName"
                          value={form.reviewerName}
                          onChange={(e) => setForm({ ...form, reviewerName: e.target.value })}
                          placeholder="e.g. Samuel Ade"
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="revTitle">Profession / Role</label>
                        <input
                          type="text"
                          id="revTitle"
                          value={form.reviewerTitle}
                          onChange={(e) => setForm({ ...form, reviewerTitle: e.target.value })}
                          placeholder="e.g. Lead Engineer"
                          className="form-input"
                        />
                      </div>
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label" htmlFor="revEmail">Email (Private, for verification only)</label>
                    <input
                      type="email"
                      id="revEmail"
                      value={form.reviewerEmail}
                      onChange={(e) => setForm({ ...form, reviewerEmail: e.target.value })}
                      placeholder="yourname@gmail.com"
                      className="form-input"
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="btn btn-outline btn-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-gold btn-sm"
                    >
                      {loading ? 'Submitting...' : 'Submit For Review'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
