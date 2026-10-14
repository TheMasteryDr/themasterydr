import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Sparkles, 
  Check, 
  Users, 
  BookOpen, 
  Mic, 
  TrendingUp, 
  Globe, 
  ShieldCheck, 
  Award, 
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';
import SixDimensions from '@/components/home/SixDimensions';
import CourseCard from '@/components/courses/CourseCard';
import ReviewsShowcase from '@/components/reviews/ReviewsShowcase';
import { getAllCourses, getFeaturedReviews, getAllContent } from '@/lib/db';

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const courses = await getAllCourses();
  const featuredReviews = await getFeaturedReviews();
  const articles = await getAllContent();

  return (
    <div className="homepage-root">
      {/* 1. HERO SECTION: ULTRA-MODERN EXECUTIVE ACADEMY */}
      <section className="hero-section">
        <div className="wrap">
          <div className="hero-bento-grid">
            {/* Left Content Column */}
            <div className="hero-content">
              <div className="hero-badge-wrap">
                <span className="pill-badge amber">
                  <span className="indicator-dot" /> The Mastery Dr &bull; Executive Academy
                </span>
              </div>

              <h1 className="hero-headline">
                Raising a Generation of <span className="gradient-amber">Growth &amp; Purpose Inclined Minds.</span>
              </h1>

              <p className="hero-subtext">
                Growth without direction is just motion. The Mastery Dr is an educational ecosystem and faith-informed platform dedicated to moving determined minds from ignorance and stagnation toward consistent growth and purposeful impact.
              </p>

              <div className="hero-actions">
                <Link href="#framework" className="btn btn-primary btn-lg btn-pill">
                  Explore The Framework <ArrowRight size={16} />
                </Link>
                <Link href="/speaking" className="btn btn-secondary btn-lg btn-pill">
                  Invite Me to Speak
                </Link>
              </div>

              {/* Social Proof Stack */}
              <div className="hero-proof-bar">
                <div className="avatar-stack">
                  <img src="/images/founder/founder_photo_1.jpg" alt="Mentee" className="proof-avatar" />
                  <img src="/images/founder/founder_photo_3.jpg" alt="Mentee" className="proof-avatar" />
                  <img src="/images/founder/founder_photo_5.jpg" alt="Mentee" className="proof-avatar" />
                </div>
                <div className="proof-text">
                  <span className="proof-highlight">1,000+ Leaders &amp; Students Coached</span>
                  <span className="proof-sub">Across 20+ countries worldwide</span>
                </div>
              </div>
            </div>

            {/* Right Media Frame */}
            <div className="hero-media-col">
              <div className="portrait-glass-card">
                <img 
                  src="/images/founder/founder_photo_1.jpg" 
                  alt="Moses Oladoye — The Mastery Dr" 
                  className="founder-portrait-img"
                  loading="eager"
                />
                <div className="portrait-glaze" />

                {/* Floating Live Badge 1 */}
                <div className="floating-metric-card top-right">
                  <div className="metric-icon-wrap amber">
                    <Award size={18} />
                  </div>
                  <div className="metric-meta">
                    <span className="metric-num">4.9 / 5.0</span>
                    <span className="metric-lbl">Masterclass Rating</span>
                  </div>
                </div>

                {/* Floating Live Badge 2 */}
                <div className="floating-metric-card bottom-left">
                  <div className="metric-icon-wrap indigo">
                    <Globe size={18} />
                  </div>
                  <div className="metric-meta">
                    <span className="metric-num">20+ Nations</span>
                    <span className="metric-lbl">Global Community</span>
                  </div>
                </div>

                {/* Bottom Title Bar */}
                <div className="portrait-caption-bar">
                  <span className="founder-name">MOSES OLADOYE</span>
                  <span className="founder-title">FOUNDER &bull; GAIN MASTERY INSTITUTE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & KEY METRICS TICKER BAR */}
      <section className="metrics-ticker-section">
        <div className="wrap">
          <div className="metrics-bento-grid">
            <div className="metric-ticker-card">
              <div className="ticker-icon-box">
                <Users size={22} className="icon-amber" />
              </div>
              <div className="ticker-data">
                <span className="ticker-value">1,000+</span>
                <span className="ticker-label">Builders &amp; Students Coached</span>
              </div>
            </div>

            <div className="metric-ticker-card">
              <div className="ticker-icon-box">
                <Globe size={22} className="icon-indigo" />
              </div>
              <div className="ticker-data">
                <span className="ticker-value">20+</span>
                <span className="ticker-label">Countries Represented</span>
              </div>
            </div>

            <div className="metric-ticker-card">
              <div className="ticker-icon-box">
                <ShieldCheck size={22} className="icon-emerald" />
              </div>
              <div className="ticker-data">
                <span className="ticker-value">6</span>
                <span className="ticker-label">Proprietary Dimensions</span>
              </div>
            </div>

            <div className="metric-ticker-card">
              <div className="ticker-icon-box">
                <BookOpen size={22} className="icon-cyan" />
              </div>
              <div className="ticker-data">
                <span className="ticker-value">100%</span>
                <span className="ticker-label">Free Reading Fellowship</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE PHILOSOPHY & TARGET AUDIENCE (BENTO GRID) */}
      <section className="site-section philosophy-section">
        <div className="wrap">
          <div className="section-header">
            <span className="pill-badge amber">Core Philosophy &amp; Ethos</span>
            <h2>Engineered for determined minds ready for depth.</h2>
            <p>
              We do not offer shallow motivational slogans. The Mastery Dr was built from a deep conviction that every individual carries latent capacity that requires disciplined structure to express.
            </p>
          </div>

          <div className="philosophy-bento-grid">
            {/* Quote Bento Card */}
            <div className="bento-card phil-quote-card">
              <div className="quote-badge">
                <Sparkles size={16} className="icon-amber" />
                <span>The Core Conviction</span>
              </div>
              <blockquote className="phil-main-quote">
                &ldquo;No one is empty, everyman is designed for something great, that greatness just needs to find expression.&rdquo;
              </blockquote>
              <div className="quote-author-row">
                <img src="/images/founder/founder_photo_2.jpg" alt="Moses Oladoye" className="author-avatar" />
                <div>
                  <span className="author-name">Moses Oladoye</span>
                  <span className="author-role">Founder, Gain Mastery Institute</span>
                </div>
              </div>
            </div>

            {/* Mission Statement Card */}
            <div className="bento-card phil-meaning-card">
              <span className="pill-badge emerald">The Gain Mastery Standard</span>
              <h3 className="meaning-title">Growth. Consistent Growth.</h3>
              <p className="meaning-text">
                Birthed from a personal detest for ignorance, stagnation, and aimless living. God has placed within human beings the capacity for extraordinary stewardship, economic competence, and intellectual depth.
              </p>
              <div className="pillars-list">
                <span className="pillar-item">✓ Clarity Over Confusion</span>
                <span className="pillar-item">✓ Capacity Over Potential</span>
                <span className="pillar-item">✓ Transformation Over Information</span>
              </div>
            </div>

            {/* Audience Bento Card: Young Professionals */}
            <div className="bento-card audience-card">
              <span className="audience-num">01</span>
              <h4>Young Professionals &amp; Builders</h4>
              <p>Navigating demanding career trajectories while maintaining spiritual grounding, mental clarity, and aggressive financial intelligence.</p>
            </div>

            {/* Audience Bento Card: Entrepreneurs */}
            <div className="bento-card audience-card">
              <span className="audience-num">02</span>
              <h4>Entrepreneurs &amp; Leaders</h4>
              <p>Building enterprises, ministries, and initiatives that require high-leverage decision models and moral authority that outlasts titles.</p>
            </div>

            {/* Audience Bento Card: Young Men */}
            <div className="bento-card audience-card">
              <span className="audience-num">03</span>
              <h4>Young Men Especially</h4>
              <p>Cultivating disciplined habits, emotional resilience, financial sovereignty, and godly character in a world of pervasive distraction.</p>
            </div>

            {/* Audience Bento Card: Emerging Thinkers */}
            <div className="bento-card audience-card">
              <span className="audience-num">04</span>
              <h4>Students &amp; Emerging Thinkers</h4>
              <p>Discovering identity, purpose, and intellectual competence before the unforgiving pressures of adult life demand them.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE SIX DIMENSIONS OF MASTERY (INTERACTIVE BENTO) */}
      <SixDimensions />

      {/* 5. GAIN MASTERY INSTITUTE (DIGITAL LMS ACADEMY) */}
      <section className="site-section institute-section">
        <div className="wrap">
          <div className="section-head-flex">
            <div className="section-header" style={{ marginBottom: 0 }}>
              <span className="pill-badge indigo">Digital Academy &bull; LMS</span>
              <h2>Gain Mastery Institute</h2>
              <p>Rigorous, self-paced, and cohort masterclasses engineered to cultivate intellectual depth and tactical transformation.</p>
            </div>
            <Link href="/courses" className="btn btn-secondary btn-pill">
              <span>View All Programs</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="courses-bento-grid">
            {courses.slice(0, 3).map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. THE BEREANS READING COMMUNITY (BENTO SHOWCASE) */}
      <section className="site-section bereans-section">
        <div className="wrap">
          <div className="bereans-bento-container">
            <div className="bereans-copy-col">
              <span className="pill-badge emerald">Reading Fellowship</span>
              <h2 className="bereans-title">The Bereans Reading Community</h2>
              <p className="bereans-intro">
                Dedicated to helping determined people cultivate the transformative habit of deep reading. Screened membership, rigorous weekly reflection questions, and virtual deliberations.
              </p>

              <div className="bereans-features-grid">
                <div className="bf-card">
                  <Check size={18} className="icon-emerald" />
                  <div>
                    <h5>Curated Global Books</h5>
                    <p>Rigorous titles on Leadership, Capital Allocation, Faith, and Personal Discipline.</p>
                  </div>
                </div>

                <div className="bf-card">
                  <Check size={18} className="icon-emerald" />
                  <div>
                    <h5>Weekly Virtual Deliberations</h5>
                    <p>Live structured breakout discussions, chapter breakdowns, and peer accountability.</p>
                  </div>
                </div>

                <div className="bf-card">
                  <Check size={18} className="icon-emerald" />
                  <div>
                    <h5>100% Free Membership</h5>
                    <p>Admission is strictly by application and screening to preserve community depth.</p>
                  </div>
                </div>
              </div>

              <div className="bereans-action-row">
                <Link href="/bereans" className="btn btn-primary btn-pill">
                  Discover The Bereans &amp; Apply <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Book Preview Card */}
            <div className="bereans-preview-col">
              <div className="book-stage-card">
                <span className="current-badge">CURRENTLY DELIBERATING</span>
                <div className="book-img-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80" 
                    alt="Current Deliberation Book"
                    className="book-cover-image"
                  />
                </div>
                <div className="book-meta-strip">
                  <span className="book-title">Atomic Habits</span>
                  <span className="book-author">James Clear &bull; Habit Architecture</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SPEAKING & EXECUTIVE ENGAGEMENTS */}
      <section className="site-section speaking-section">
        <div className="wrap">
          <div className="speaking-bento-card">
            <div className="speaking-media">
              <img 
                src="/images/founder/founder_photo_4.jpg" 
                alt="Moses Oladoye speaking at conference"
                className="speaking-img"
              />
            </div>

            <div className="speaking-content">
              <span className="pill-badge amber">Keynotes &amp; Facilitation</span>
              <h2>Invite Moses Oladoye to teach your room.</h2>
              <p>
                Whether delivering a keynote at an international leadership conference, ministering in church assemblies, or facilitating executive retreats for founders, The Mastery Dr brings conviction, poise, and intellectual clarity.
              </p>

              <div className="speaking-topics-chips">
                <span className="topic-chip">Purpose &amp; Divine Mandate</span>
                <span className="topic-chip">The Six Dimensions of Mastery</span>
                <span className="topic-chip">Financial Intelligence for Builders</span>
                <span className="topic-chip">Leadership Integrity</span>
                <span className="topic-chip">Overcoming Stagnation</span>
                <span className="topic-chip">Habit Architecture</span>
              </div>

              <div className="speaking-btn-row">
                <Link href="/speaking" className="btn btn-primary btn-pill">
                  Submit Invitation Application <ArrowRight size={15} />
                </Link>
                <span className="speaking-note">Applications reviewed by executive scheduling team.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS & PROOF */}
      <section className="site-section reviews-section">
        <div className="wrap">
          <div className="section-header">
            <span className="pill-badge amber">Real Impact &amp; Testimonies</span>
            <h2>Words from people whose trajectories shifted.</h2>
            <p>Authentic reviews from students, conference delegates, community members, and mentored builders.</p>
          </div>

          <ReviewsShowcase initialReviews={featuredReviews} showSubmitModal={true} />
        </div>
      </section>

      {/* 9. FIELD NOTES & RESOURCES */}
      <section className="site-section resources-section">
        <div className="wrap">
          <div className="section-head-flex">
            <div className="section-header" style={{ marginBottom: 0 }}>
              <span className="pill-badge cyan">Curated Insights</span>
              <h2>Field Notes &amp; Educational Publications</h2>
              <p>Articles, masterclass recordings, downloadable frameworks, and reflective teachings.</p>
            </div>
            <Link href="/resources" className="btn btn-secondary btn-pill">
              <span>Explore All Notes</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="articles-bento-grid">
            {articles.slice(0, 2).map(item => (
              <div key={item.id} className="bento-card article-card">
                <div className="article-img-wrap">
                  <img 
                    src={item.featured_image_url || '/images/founder/founder_photo_5.jpg'} 
                    alt={item.title} 
                    className="article-cover-img"
                  />
                  <span className="article-category-pill">{item.category}</span>
                </div>
                <div className="article-content">
                  <h3 className="article-headline">
                    <Link href={`/resources/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p className="article-summary-text">{item.summary}</p>
                  <div className="article-meta-bottom">
                    <span className="read-time-pill">{item.read_time_minutes} min read</span>
                    <Link href={`/resources/${item.slug}`} className="read-note-action">
                      <span>Read Note</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. TELEGRAM COMMUNITY: THE MASTERY MASTERMINDS */}
      <section className="site-section telegram-section">
        <div className="wrap">
          <div className="telegram-glow-card">
            <div className="telegram-copy-box">
              <span className="pill-badge cyan">
                <span className="indicator-dot" /> Global Fellowship
              </span>
              <h2>Join The Mastery Masterminds Community</h2>
              <p>
                Connect directly with growth-inclined minds across Africa and the diaspora in our official Telegram community. Access spontaneous audio dispatches, reading notes, and live Q&amp;As.
              </p>
              <a 
                href={process.env.NEXT_PUBLIC_TELEGRAM_COMMUNITY_URL || "https://t.me/masterymasterminds"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary btn-lg btn-pill"
              >
                Join Telegram Community <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

