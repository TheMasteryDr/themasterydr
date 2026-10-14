import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Compass, Shield, Target, BookOpen, Users, CheckCircle2, Sparkles, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Moses Oladoye — The Mastery Dr',
  description: 'The personal story, calling, philosophy, and professional background of Moses Oladoye — Head Growth Coach at Gain Mastery Institute and founder of The Mastery Dr.',
};

export default function AboutPage() {
  return (
    <div className="about-page-root">
      {/* 1. Hero Section */}
      <section className="about-hero-section">
        <div className="wrap">
          <div className="about-hero-grid">
            <div className="about-hero-copy">
              <span className="pill-badge amber">
                <Sparkles size={12} /> Biography &amp; Divine Mandate
              </span>
              <h1 className="hero-title">
                &ldquo;Every man is designed for something great; that greatness just needs to find <span className="gradient-amber">expression.</span>&rdquo;
              </h1>
              <p className="hero-subtitle">
                Moses Oladoye is a growth strategist, purpose coach, financial analyst, and educator based in Lagos, Nigeria. He exists to move determined minds from ignorance and stagnation toward clarity, consistent growth, and purposeful impact.
              </p>

              <div className="hero-actions-row">
                <Link href="/speaking" className="btn btn-primary btn-pill">
                  Invite Moses to Speak <ArrowRight size={14} />
                </Link>
                <Link href="/courses" className="btn btn-secondary btn-pill">
                  Explore Institute
                </Link>
              </div>
            </div>

            <div className="about-hero-media">
              <div className="portrait-card">
                <img 
                  src="/images/founder/founder_photo_1.jpg" 
                  alt="Moses Oladoye — The Mastery Dr" 
                  className="portrait-img"
                />
                <div className="portrait-glaze" />
                <div className="portrait-caption">
                  <span className="p-name">MOSES OLADOYE</span>
                  <span className="p-sub">HEAD GROWTH COACH &bull; LAGOS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Origin Story & Core Detest for Stagnation */}
      <section className="site-section story-section">
        <div className="wrap wrap-narrow">
          <div className="bento-card story-card">
            <span className="pill-badge amber">The Origin Story</span>
            <h2 className="story-heading">A Holy Detest for Stagnation</h2>
            
            <p className="lead-paragraph">
              The Mastery Dr was not invented in a marketing boardroom. It was birthed from a deep personal detest for ignorance, stagnation, and a life lived without clear coordinates.
            </p>

            <p className="story-text">
              Growing up and observing human potential across diverse environments, Moses witnessed the tragedy of gifted individuals drifting through existence—working relentlessly to make a living, but completely divorced from making a purposeful impact.
            </p>

            <div className="quote-callout-box">
              <p className="quote-text">
                &ldquo;No one is empty. Ignorance is the primary tax that unexamined potential pays to stagnation. When you remove ignorance through intentional growth, purpose ceases to be a mystery and becomes an actionable discipline.&rdquo;
              </p>
              <span className="quote-author">— Moses Oladoye</span>
            </div>

            <p className="story-text">
              The conviction took root: God has placed within every human being the capacity for something meaningful, excellent, and transformative. His calling is to help people come out of ignorance, discover direction, and grow into the people they were designed to become.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Bento */}
      <section className="site-section vision-mission-section">
        <div className="wrap">
          <div className="vm-bento-grid">
            <div className="bento-card vm-card">
              <span className="pill-badge indigo">Long-Term Ambition</span>
              <h3>The Vision</h3>
              <p>
                To raise a global generation of growth- and purpose-inclined minds—builders, leaders, and thinkers who will not just live life to make a living, but to make a lasting, righteous impact.
              </p>
            </div>

            <div className="bento-card vm-card">
              <span className="pill-badge emerald">Daily Execution</span>
              <h3>The Mission</h3>
              <p>
                To build The Mastery Dr and Gain Mastery Institute into an enduring global benchmark for clarity, strategic direction, personal growth, and faith-informed excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Professional Identity & Roles */}
      <section className="site-section credentials-section">
        <div className="wrap wrap-narrow">
          <div className="section-header">
            <span className="pill-badge cyan">Leadership &amp; Operations</span>
            <h2>Professional Identity &amp; Roles</h2>
            <p>A track record grounded in practical education, operations, and financial analysis.</p>
          </div>

          <div className="credentials-bento-list">
            <div className="bento-card cred-item">
              <div className="cred-top">
                <h4>Head Growth Coach</h4>
                <span className="cred-org-pill">Gain Mastery Institute</span>
              </div>
              <p>Directing curriculum development and coaching programs across the Six Dimensions of Mastery. Mentoring students across 20+ countries in structured personal development, financial literacy, and purpose discovery.</p>
            </div>

            <div className="bento-card cred-item">
              <div className="cred-top">
                <h4>Curator &amp; Host</h4>
                <span className="cred-org-pill">The Bereans Reading Community</span>
              </div>
              <p>Founder and lead curator of an exclusive virtual reading fellowship dedicated to rigorous non-fiction study, weekly live deliberations, and cultivating high-leverage intellectual habits.</p>
            </div>

            <div className="bento-card cred-item">
              <div className="cred-top">
                <h4>Technical &amp; Operations Lead</h4>
                <span className="cred-org-pill">Project RISE Initiative</span>
              </div>
              <p>Directing operations, technical systems, and program delivery for youth empowerment and development initiatives across higher institutions and emerging communities in Nigeria.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Faith & Purpose Conviction */}
      <section className="site-section faith-section">
        <div className="wrap wrap-narrow">
          <div className="bento-card faith-card">
            <span className="pill-badge amber">Faith &amp; Conviction</span>
            <h2>The Spiritual Anchor</h2>
            <p>
              Underpinning everything Moses does is a sincere, uncompromising Christian worldview. He believes that true mastery is never about selfish ambition or hollow worldly acclaim; it is about faithful stewardship of God-given capacity.
            </p>
            <p>
              Whether teaching economic literacy, speaking to corporate executives, or mentoring young men in the faith, he brings an authentic witness to the power of a life aligned with divine intent.
            </p>

            <div className="faith-actions">
              <Link href="/speaking" className="btn btn-primary btn-pill">
                Request Keynote or Ministry Engagement <ArrowRight size={14} />
              </Link>
              <Link href="/bereans" className="btn btn-secondary btn-pill">
                Explore The Bereans Fellowship
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
