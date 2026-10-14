import React from 'react';
import { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import ReviewsShowcase from '@/components/reviews/ReviewsShowcase';
import { getFeaturedReviews } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Reviews & Testimonials — The Mastery Dr',
  description: 'Verified reviews and impact testimonies from students, conference delegates, and mentored builders.',
};

export const revalidate = 60;

export default async function ReviewsPage() {
  const reviews = await getFeaturedReviews();

  return (
    <div className="reviews-page-root">
      <section className="reviews-hero-section">
        <div className="wrap">
          <div className="reviews-hero-copy">
            <span className="pill-badge amber">
              <Sparkles size={12} /> Trajectory Shifts &bull; Verified Impact
            </span>
            <h1 className="hero-title">
              Proof &amp; <span className="gradient-amber">Testimonies</span>
            </h1>
            <p className="hero-subtitle">
              Words from students, conference delegates, community members, and mentored builders whose trajectories shifted through intentional, disciplined growth.
            </p>
          </div>
        </div>
      </section>

      <section className="site-section main-reviews-section">
        <div className="wrap">
          <ReviewsShowcase initialReviews={reviews} showSubmitModal={true} />
        </div>
      </section>
    </div>
  );
}
