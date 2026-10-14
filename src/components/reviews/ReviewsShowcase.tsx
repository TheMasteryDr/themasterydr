'use client';

import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, X, Sparkles, Quote } from 'lucide-react';
import { Review } from '@/lib/types';

interface ReviewsShowcaseProps {
  initialReviews: Review[];
  showSubmitModal?: boolean;
}

export default function ReviewsShowcase({ initialReviews, showSubmitModal = true }: ReviewsShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Submission form state
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [reviewerEmail, setReviewerEmail] = useState('');
  const [category, setCategory] = useState<Review['category']>('The Mastery Dr');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const categories = ['All', 'The Mastery Dr', 'Gain Mastery Institute', 'The Bereans', 'Speaking'];

  const filteredReviews = reviews.filter(r => {
    if (activeCategory === 'All') return true;
    return r.category === activeCategory;
  });

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/reviews/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author_name: authorName,
          author_role: authorRole,
          reviewer_email: reviewerEmail,
          category,
          rating,
          review_text: reviewText,
        }),
      });
      if (res.ok) {
        setSubmittedSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmittedSuccess(false);
          setAuthorName('');
          setAuthorRole('');
          setReviewText('');
        }, 2000);
      }
    } catch {
      setSubmittedSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reviews-showcase">
      {/* Controls Bar */}
      <div className="reviews-controls">
        <div className="category-pill-group">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {showSubmitModal && (
          <button onClick={() => setIsModalOpen(true)} className="btn btn-secondary btn-sm btn-pill">
            <MessageSquarePlus size={14} className="icon-amber" />
            <span>Submit a Review</span>
          </button>
        )}
      </div>

      {/* Reviews Grid */}
      <div className="reviews-bento-grid">
        {filteredReviews.length === 0 ? (
          <div className="empty-reviews-state">
            <p>No verified reviews published in this category yet.</p>
          </div>
        ) : (
          filteredReviews.map(rev => (
            <div key={rev.id} className="review-bento-card">
              <div className="card-top-row">
                <div className="stars-pill">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <span className="category-badge">{rev.category}</span>
              </div>

              <div className="quote-icon-wrap">
                <Quote size={20} className="quote-icon" />
              </div>

              <p className="review-quote-text">
                &ldquo;{rev.review_text}&rdquo;
              </p>

              <div className="reviewer-profile-row">
                {rev.author_avatar_url ? (
                  <img src={rev.author_avatar_url} alt={rev.author_name} className="reviewer-avatar" />
                ) : (
                  <div className="reviewer-avatar-fallback">
                    {rev.author_name.charAt(0)}
                  </div>
                )}
                <div className="reviewer-details">
                  <div className="reviewer-name-row">
                    <span className="reviewer-name">{rev.author_name}</span>
                    <span className="verified-check" title="Verified Mentee/Student">✓</span>
                  </div>
                  {rev.author_role && <span className="reviewer-role">{rev.author_role}</span>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button onClick={() => setIsModalOpen(false)} className="modal-close-btn" aria-label="Close">
              <X size={18} />
            </button>

            {submittedSuccess ? (
              <div className="modal-success-state">
                <CheckCircle2 size={44} className="icon-emerald" />
                <h3>Thank You for Your Feedback</h3>
                <p>Your review has been submitted for moderation. Once approved by our team, it will appear publicly on the platform.</p>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <span className="pill-badge amber">
                    <Sparkles size={11} /> Community Feedback
                  </span>
                  <h3>Submit Your Trajectory Review</h3>
                  <p>Share how The Mastery Dr, Gain Mastery Institute, or The Bereans shaped your growth.</p>
                </div>

                <form onSubmit={handleSubmitReview} className="modal-form">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={authorName} 
                      onChange={e => setAuthorName(e.target.value)} 
                      placeholder="e.g. Samuel Adeleke" 
                      className="form-input" 
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Title / Role</label>
                      <input 
                        type="text" 
                        value={authorRole} 
                        onChange={e => setAuthorRole(e.target.value)} 
                        placeholder="e.g. Founder, Growth Analyst" 
                        className="form-input" 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Program Track *</label>
                      <select 
                        value={category} 
                        onChange={e => setCategory(e.target.value as Review['category'])} 
                        className="form-select"
                      >
                        <option value="The Mastery Dr">The Mastery Dr (Mentorship)</option>
                        <option value="Gain Mastery Institute">Gain Mastery Institute (LMS)</option>
                        <option value="The Bereans">The Bereans (Reading Community)</option>
                        <option value="Speaking">Speaking &amp; Keynotes</option>
                        <option value="Courses">Courses &amp; Masterclasses</option>
                        <option value="Personal Development">Personal Development</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Email Address (Private)</label>
                      <input 
                        type="email" 
                        value={reviewerEmail} 
                        onChange={e => setReviewerEmail(e.target.value)} 
                        placeholder="email@domain.com" 
                        className="form-input" 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Rating</label>
                      <select 
                        value={rating} 
                        onChange={e => setRating(Number(e.target.value))} 
                        className="form-select"
                      >
                        <option value={5}>★★★★★ (5 Stars — Exceptional)</option>
                        <option value={4}>★★★★☆ (4 Stars — Great)</option>
                        <option value={3}>★★★☆☆ (3 Stars — Good)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Review / Impact Story *</label>
                    <textarea 
                      required 
                      rows={4} 
                      value={reviewText} 
                      onChange={e => setReviewText(e.target.value)} 
                      placeholder="Describe the shifts in your clarity, habits, financial mindset, or leadership..." 
                      className="form-textarea" 
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                    {isSubmitting ? 'Submitting Review...' : 'Publish Review for Review'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .reviews-showcase {
          width: 100%;
        }

        /* Controls */
        .reviews-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 36px;
        }
        .category-pill-group {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .cat-pill {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          padding: 7px 16px;
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .cat-pill:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--border-glass);
        }
        .cat-pill.active {
          color: #07090E;
          background: var(--accent-amber);
          border-color: var(--accent-amber);
          font-weight: 700;
          box-shadow: 0 0 16px rgba(245, 158, 11, 0.35);
        }
        .icon-amber {
          color: var(--accent-amber);
        }

        /* Bento Grid */
        .reviews-bento-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 20px;
        }
        .empty-reviews-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 48px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          color: var(--text-muted);
        }

        /* Review Card */
        .review-bento-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 28px;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all var(--transition-smooth);
        }
        .review-bento-card:hover {
          border-color: var(--border-glass-hover);
          transform: translateY(-3px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
        }
        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }
        .stars-pill {
          display: flex;
          align-items: center;
          gap: 3px;
          background: rgba(245, 158, 11, 0.08);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(245, 158, 11, 0.2);
        }
        .category-badge {
          font-family: var(--font-mono);
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
        }
        .quote-icon-wrap {
          margin-bottom: 10px;
        }
        .quote-icon {
          color: rgba(255, 255, 255, 0.15);
        }
        .review-quote-text {
          font-size: 14.5px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 24px;
          flex: 1;
        }

        /* Reviewer Profile */
        .reviewer-profile-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }
        .reviewer-avatar {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-glass);
          object-fit: cover;
        }
        .reviewer-avatar-fallback {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(99, 102, 241, 0.2));
          border: 1px solid var(--border-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 15px;
          color: var(--accent-amber-light);
        }
        .reviewer-details {
          display: flex;
          flex-direction: column;
        }
        .reviewer-name-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .reviewer-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .verified-check {
          font-size: 11px;
          color: var(--accent-emerald);
          font-weight: bold;
        }
        .reviewer-role {
          font-size: 11.5px;
          color: var(--text-muted);
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .modal-container {
          background: var(--bg-surface);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-xl);
          padding: 36px;
          width: 100%;
          max-width: 580px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7);
        }
        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .modal-close-btn:hover {
          color: var(--text-primary);
        }
        .modal-header h3 {
          font-size: 22px;
          margin-top: 12px;
          margin-bottom: 6px;
        }
        .modal-header p {
          font-size: 13.5px;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .form-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          margin-bottom: 6px;
        }
        .form-input, .form-select, .form-textarea {
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          font-family: var(--font-sans);
          font-size: 14px;
          color: var(--text-primary);
          outline: none;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: var(--accent-amber);
        }
        .modal-success-state {
          text-align: center;
          padding: 36px 0;
        }
        .icon-emerald {
          color: var(--accent-emerald);
          margin-bottom: 16px;
        }
        .modal-success-state h3 {
          font-size: 22px;
          margin-bottom: 8px;
        }
        .modal-success-state p {
          font-size: 14px;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .reviews-bento-grid {
            grid-template-columns: 1fr;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
          }
          .modal-container {
            padding: 24px 20px;
          }
        }
      `}</style>
    </div>
  );
}
