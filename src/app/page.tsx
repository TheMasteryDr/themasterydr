'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Compass,
  TrendingUp,
  Coins,
  Crown,
  Flame,
  Target,
  BookOpen,
  GraduationCap,
  Mic,
  MessageCircle,
  Star,
  CheckCircle2,
  Clock,
  Users,
  Play,
  X,
  Volume2,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Layers,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import {
  SEED_COURSES,
  SEED_REVIEWS,
  SEED_CONTENT_ITEMS,
  SEED_BEREANS_BOOK
} from '@/lib/data/seed-data';

export default function HomePage() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'personal_brand' | 'institute' | 'bereans'>('all');

  const featuredCourses = SEED_COURSES.slice(0, 3);
  const filteredReviews = reviewFilter === 'all'
    ? SEED_REVIEWS.filter(r => r.isFeatured)
    : SEED_REVIEWS.filter(r => r.category === reviewFilter);
  const featuredArticles = SEED_CONTENT_ITEMS.slice(0, 3);

  // 1. The 6 Proprietary Dimensions (Tony Robbins Life Pillars style)
  const pillars = [
    {
      roman: 'I',
      title: 'Purpose',
      tagline: "Knowing what you're built to carry.",
      description: 'Moving from accidental living to clear, conviction-driven clarity about your personal assignment and contribution.',
      diagnosis: 'Are you working hard on things that do not matter to your ultimate calling?',
      shift: 'From reactive survival to strategic stewardship of your divine design.',
      icon: Compass,
      accent: 'var(--gold-bright)',
      badge: 'Foundation',
      courseSlug: 'purpose-and-leadership-blueprint'
    },
    {
      roman: 'II',
      title: 'Personal Growth',
      tagline: 'Mindset, habits, and daily discipline.',
      description: 'Developing sustainable systems of personal mastery that turn human potential into tested, expressed capacity.',
      diagnosis: 'Are you frustrated by repeated cycles of high motivation followed by sudden burnout?',
      shift: 'From emotional willpower to non-negotiable daily architecture.',
      icon: TrendingUp,
      accent: '#E8C879',
      badge: 'Discipline',
      courseSlug: 'architecture-of-intentional-growth'
    },
    {
      roman: 'III',
      title: 'Financial Growth',
      tagline: 'Real intelligence about money and markets.',
      description: 'Mathematical, risk-governed capital stewardship and market understanding, rejecting get-rich-quick delusions.',
      diagnosis: 'Are you earning income but leaking wealth through lack of capital intelligence?',
      shift: 'From short-term speculation to generational asset accumulation.',
      icon: Coins,
      accent: '#74C69D',
      badge: 'Stewardship',
      courseSlug: 'financial-intelligence-strategic-market-discipline'
    },
    {
      roman: 'IV',
      title: 'Leadership',
      tagline: 'Influence, and building things that outlast you.',
      description: 'Cultivating moral authority, team mobilization, and integrity in the dark so your public influence does not collapse.',
      diagnosis: 'Are people complying with your authority or truly inspired by your example?',
      shift: 'From positional title to undeniable moral authority and vision.',
      icon: Crown,
      accent: '#F080A0',
      badge: 'Influence',
      courseSlug: 'purpose-and-leadership-blueprint'
    },
    {
      roman: 'V',
      title: 'Spiritual Depth',
      tagline: 'A disciplined relationship with God.',
      description: 'Grounded in a Christian worldview, recognizing that eternal purpose precedes temporary ambition and secular success.',
      diagnosis: 'Is your external success masking internal spiritual dryness and anxiety?',
      shift: 'From compartmentalized religion to unwavering spiritual conviction.',
      icon: Flame,
      accent: 'var(--gold-primary)',
      badge: 'Conviction',
      courseSlug: 'architecture-of-intentional-growth'
    },
    {
      roman: 'VI',
      title: 'Strategy',
      tagline: 'Clear thinking, systems, sharper decisions.',
      description: 'Transforming emotional ambition into executable quarterly architectures and decisive everyday maneuvers.',
      diagnosis: 'Do you know where you want to go, but constantly get bogged down in chaos?',
      shift: 'From wishful thinking to ruthless strategic execution.',
      icon: Target,
      accent: '#A5B4FC',
      badge: 'Execution',
      courseSlug: 'architecture-of-intentional-growth'
    },
  ];

  // 2. The Story & Formative Milestones (Patrick Bet-David Interactive Timeline style)
  const milestones = [
    {
      year: '2018',
      label: 'The Awakening',
      headline: 'The Detest for Drift and Passive Living',
      text: 'Moses Oladoye observed a tragic commonality among talented people across Nigeria and Africa: immense intellectual gifts, spiritual zeal, but absolute stagnation due to lack of personal systems and strategic discipline. The conviction was born: "No one is empty; every man is designed for something great; that greatness just needs to find expression."',
      image: '/images/2_moses_oladoye_in_a_reflective_.jpg',
      tag: 'Origin Mandate'
    },
    {
      year: '2020',
      label: 'The Bereans',
      headline: 'Founding The Bereans Reading Community',
      text: 'To cure shallow thinking, Moses launched The Bereans Reading Club, named after the diligent Bereans of the scriptures. Starting with a handful of hungry minds, the guild grew into a rigorous monthly reading cohort transforming readers into analytical thinkers across continents.',
      image: '/images/3_moses_teaching_on_productivity.jpg',
      tag: 'Intellectual Discipline'
    },
    {
      year: '2022',
      label: 'The Framework',
      headline: 'Codifying the Six Dimensions of Mastery',
      text: 'Recognizing that growth in isolation leads to eventual fracture, Moses codified the Six Dimensions of Mastery: Purpose, Personal Growth, Financial Growth, Leadership, Spiritual Depth, and Strategy. A balanced architecture ensuring leaders build things that do not collapse.',
      image: '/images/4_moses_oladoye_editorial_portra.jpg',
      tag: 'Proprietary Methodology'
    },
    {
      year: '2024',
      label: 'The Institute',
      headline: 'Gain Mastery Institute Digital Campus',
      text: 'The teaching mandate scaled into Gain Mastery Institute — an official digital learning institute offering structured certification courses, curriculum tracks, and intensive cohorts for ambitious builders, corporate executives, and emerging leaders.',
      image: '/images/7_moses_oladoye_studio_portrait.jpg',
      tag: 'LMS Platform'
    },
    {
      year: '2026',
      label: 'The Global Horizon',
      headline: 'Empowering Determined Minds Across the World',
      text: 'Today, The Mastery Dr ecosystem spans keynote stages, virtual cohorts across 20+ nations, corporate advisory sessions, and the private Mighty Men fraternity. The vision remains resolute: turning latent human potential into tested, expressed capacity for generational impact.',
      image: '/images/6_moses_oladoye_speaking_at_an_e.jpg',
      tag: 'Global Expansion'
    }
  ];

  // 3. The Ecosystem Pillars (Patrick Bet-David Flywheel style)
  const ecosystem = [
    {
      id: '01',
      title: 'Gain Mastery Institute',
      role: 'Educational Engine',
      description: 'Structured, rigorous LMS courses and cohort programs providing certificates of completion in purpose, financial intelligence, and systems.',
      href: '/institute',
      badge: 'Curriculum & Certification'
    },
    {
      id: '02',
      title: 'The Bereans Reading Club',
      role: 'Intellectual Guild',
      description: 'A global reading movement cultivating deep analytical reading, mental rigor, and disciplined monthly book discussions.',
      href: '/bereans',
      badge: 'Monthly Cohorts'
    },
    {
      id: '03',
      title: 'Keynote & Corporate Speaking',
      role: 'High-Impact Rooms',
      description: 'Transformative keynote addresses and executive seminars delivering paradigm-shifting clarity to conferences, corporations, and churches.',
      href: '/speaking',
      badge: 'Live Events'
    },
    {
      id: '04',
      title: 'The Mastery Dispatch',
      role: 'Strategic Publications',
      description: 'Weekly field notes, proprietary blueprints, and video masterclasses distributed to thousands of ambitious minds worldwide.',
      href: '/resources',
      badge: 'Weekly Insights'
    }
  ];

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>

      {/* ========================================================
          1. CINEMATIC AUTHORITY HERO (PATRICK BET-DAVID + TONY ROBBINS)
          ======================================================== */}
      <section style={{
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--line-dark)',
        position: 'relative',
        padding: '70px 0 90px',
        overflow: 'hidden'
      }}>
        {/* Ambient Luxury Lighting Glows */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '5%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(199, 162, 75, 0.12) 0%, transparent 65%)',
          pointerEvents: 'none'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '-5%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(124, 31, 62, 0.09) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>

        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '54px',
            alignItems: 'center'
          }}>
            {/* Hero Left Content */}
            <div>
              <div className="eyebrow" style={{ marginBottom: '20px' }}>
                <span>LAGOS</span>
                <span style={{ color: 'var(--text-faint)' }}>·</span>
                <span>LONDON</span>
                <span style={{ color: 'var(--text-faint)' }}>·</span>
                <span>GLOBAL DIASPORA</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(38px, 5.2vw, 74px)',
                lineHeight: '1.06',
                color: 'var(--text-primary)',
                marginBottom: '24px',
                letterSpacing: '-0.025em'
              }}>
                Growth without direction is just <em className="text-gold-gradient">motion.</em>
              </h1>

              <p style={{
                fontSize: 'clamp(16px, 1.6vw, 19px)',
                color: 'var(--text-secondary)',
                lineHeight: '1.65',
                maxWidth: '560px',
                borderLeft: '2.5px solid var(--gold-primary)',
                paddingLeft: '22px',
                marginBottom: '36px'
              }}>
                A rigorous framework for determined minds done drifting — Purpose, Personal Growth, Financial Intelligence, and Faith, built for generational impact.
              </p>

              {/* Action Buttons: Patrick Bet-David & Tony Robbins Style */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '38px' }}>
                <Link href="/institute" className="btn btn-gold">
                  <span>Explore Gain Mastery Institute</span>
                  <ArrowRight size={14} />
                </Link>

                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="btn btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'var(--gold-primary)',
                    color: '#070605',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Play size={10} fill="#070605" />
                  </div>
                  <span>Watch The Vision</span>
                </button>

                <Link href="/speaking" className="btn btn-ghost" style={{ padding: '12px 14px' }}>
                  <span>Invite to Speak</span>
                  <ChevronRight size={13} />
                </Link>
              </div>

              {/* Authority Byline & Credentials */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                paddingTop: '18px',
                borderTop: '1px solid var(--line-subtle)'
              }}>
                <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>MOSES OLADOYE</span>
                <span style={{ width: '28px', height: '1px', background: 'var(--gold-border)' }}></span>
                <span>GROWTH STRATEGIST &amp; HEAD COACH</span>
              </div>
            </div>

            {/* Hero Right: Signature Portrait Frame with Floating Credential Badge */}
            <div style={{ position: 'relative' }}>
              <div className="photo-frame" style={{ minHeight: '520px', aspectRatio: '4/5', boxShadow: '0 24px 60px rgba(0,0,0,0.7)' }}>
                <Image
                  src="/images/1_moses_oladoye_the_mastery_dr_e.jpg"
                  alt="Moses Oladoye — The Mastery Dr, editorial portrait"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
                <div className="glaze"></div>
                <div className="caption-tag">
                  <span>The Mastery Dr — Editorial Portrait, Lagos</span>
                </div>
              </div>

              {/* Floating Live Accreditation Badge */}
              <div style={{
                position: 'absolute',
                bottom: '-22px',
                left: '-18px',
                background: 'rgba(18, 15, 11, 0.95)',
                border: '1px solid var(--gold-border-bright)',
                padding: '16px 20px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 16px 36px rgba(0,0,0,0.6)',
                zIndex: 4,
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                maxWidth: '290px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--gold-surface)',
                  border: '1px solid var(--gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold-bright)',
                  flexShrink: 0
                }}>
                  <GraduationCap size={20} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--gold-bright)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Gain Mastery Institute
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                    1,000+ Leaders &amp; Minds Mentored
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. TONY ROBBINS STYLE LIVE PROOF MARQUEE / TICKER
          ======================================================== */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[
            '1,000+ LIVES DIRECTLY IMPACTED',
            '20+ COUNTRIES REACHED',
            '6 PROPRIETARY DIMENSIONS OF MASTERY',
            'GAIN MASTERY INSTITUTE',
            'THE BEREANS READING GUILD',
            '100% 5-STAR COMMUNITY SATISFACTION',
            'PROVEN LIFE STRATEGY & STEWARDSHIP',
            '1,000+ LIVES DIRECTLY IMPACTED',
            '20+ COUNTRIES REACHED',
            '6 PROPRIETARY DIMENSIONS OF MASTERY',
            'GAIN MASTERY INSTITUTE',
            'THE BEREANS READING GUILD',
            '100% 5-STAR COMMUNITY SATISFACTION',
            'PROVEN LIFE STRATEGY & STEWARDSHIP',
          ].map((text, idx) => (
            <div key={idx} className="marquee-item">
              <span>{text}</span>
              <span className="marquee-dot"></span>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          3. THE CORE MANIFESTO (PATRICK BET-DAVID STYLE)
          ======================================================== */}
      <section className="section-padding" style={{
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--line-dark)',
        position: 'relative'
      }}>
        <div className="wrap">
          <div className="quote-manifesto">
            <div className="quote-bracket">&ldquo;</div>
            <p className="quote-manifesto-text">
              No one is empty, every man is designed for something great; that greatness just needs to find expression.
            </p>
            <div className="quote-author">
              <span>— Moses Oladoye</span>
              <span style={{ margin: '0 10px', color: 'var(--line-dark)' }}>|</span>
              <span style={{ color: 'var(--text-muted)' }}>The Mastery Dr Mandate</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '32px' }}>
              <span className="badge badge-gold">Clarity over Confusion</span>
              <span className="badge badge-emerald">Capacity over Potential</span>
              <span className="badge badge-wine">Transformation over Information</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. THE SIX DIMENSIONS (TONY ROBBINS LIFE PILLARS MATRIX)
          ======================================================== */}
      <section className="section-padding" style={{
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--line-dark)'
      }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '48px' }}>
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">The Proprietary Framework</span>
              <h2>The Six Dimensions of Mastery</h2>
              <p>
                Interconnected, not isolated. Personal growth that neglects financial intelligence or spiritual depth invariably fractures under pressure.
              </p>
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--gold-bright)' }}>
              <span>SELECT A DIMENSION BELOW TO INSPECT</span>
            </div>
          </div>

          {/* Interactive Pillars Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = activePillarIndex === idx;

              return (
                <div
                  key={pillar.title}
                  onClick={() => setActivePillarIndex(idx)}
                  className="luxury-card"
                  style={{
                    borderLeft: `3px solid ${pillar.accent}`,
                    borderColor: isActive ? 'var(--gold-primary)' : undefined,
                    backgroundColor: isActive ? 'var(--bg-card-hover)' : undefined,
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 14px 34px rgba(199, 162, 75, 0.2)' : undefined,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: '32px',
                      color: isActive ? 'var(--gold-bright)' : 'var(--gold-dim)',
                      transition: 'var(--transition)'
                    }}>
                      {pillar.roman}
                    </span>
                    <span className="badge badge-gold">{pillar.badge}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <Icon size={20} color="var(--gold-primary)" />
                    <h3 style={{ fontSize: '22px', color: 'var(--text-primary)' }}>{pillar.title}</h3>
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12.5px',
                    color: 'var(--gold-dim)',
                    marginBottom: '14px'
                  }}>
                    {pillar.tagline}
                  </p>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '18px' }}>
                    {pillar.description}
                  </p>

                  {/* Deep Dive Details Shown on Selection */}
                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--line-subtle)',
                    fontSize: '12px'
                  }}>
                    <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>
                      <span style={{ color: 'var(--gold-bright)', fontWeight: 700 }}>THE DIAGNOSIS: </span>
                      {pillar.diagnosis}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                      <span style={{ color: '#74C69D', fontWeight: 700 }}>THE SHIFT: </span>
                      {pillar.shift}
                    </div>

                    <div style={{ marginTop: '16px' }}>
                      <Link
                        href={`/institute/course/${pillar.courseSlug}`}
                        className="btn btn-outline btn-sm"
                        style={{ width: '100%', justifyContent: 'space-between' }}
                      >
                        <span>Master This Dimension</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. THE MASTERY ECOSYSTEM & FLYWHEEL (PATRICK BET-DAVID STYLE)
          ======================================================== */}
      <section className="section-padding" style={{
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--line-dark)'
      }}>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">The Integrated Ecosystem</span>
            <h2>How The Mastery Flywheel Compounds</h2>
            <p>
              Moses Oladoye did not build isolated efforts. He created a self-reinforcing flywheel where reading fuels thinking, thinking informs strategy, and strategy builds generational capacity.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}>
            {ecosystem.map((node) => (
              <div key={node.id} className="flywheel-node">
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--gold-dim)',
                  marginBottom: '10px'
                }}>
                  {node.id}
                </div>
                <span className="badge badge-gold" style={{ marginBottom: '14px' }}>
                  {node.badge}
                </span>
                <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                  {node.title}
                </h3>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--gold-bright)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '12px'
                }}>
                  {node.role}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: '1.6', marginBottom: '20px' }}>
                  {node.description}
                </p>
                <Link
                  href={node.href}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11.5px',
                    color: 'var(--gold-bright)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Explore Channel</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>

          {/* Visual Compounding Cycle Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #13100C 0%, #1A150F 100%)',
            border: '1px solid var(--gold-border)',
            padding: '30px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px'
          }}>
            <div style={{ maxWidth: '600px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--gold-bright)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
                The Continuous Compounding Loop
              </div>
              <div style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Deep Reading (Bereans) &rarr; Structured Education (Institute) &rarr; Corporate Application (Speaking) &rarr; Generational Stewardship
              </div>
            </div>

            <Link href="/institute" className="btn btn-gold btn-sm">
              <span>Enter The Flywheel</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. THE STORY & MILESTONES (PATRICK BET-DAVID TIMELINE STYLE)
          ======================================================== */}
      <section className="section-padding" style={{
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--line-dark)'
      }}>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">The Origin Story</span>
            <h2>Formative Milestones</h2>
            <p>
              From a deep detest for ignorance and wasted human potential to an international growth coaching and learning ecosystem.
            </p>
          </div>

          {/* Interactive Year Controls (PBD Timeline Slider) */}
          <div className="story-timeline-controls" style={{ marginBottom: '36px' }}>
            {milestones.map((m, idx) => (
              <button
                key={m.year}
                onClick={() => setActiveStoryIndex(idx)}
                className={`story-tab-btn ${activeStoryIndex === idx ? 'active' : ''}`}
              >
                <span>{m.year}</span>
                <span style={{ opacity: 0.6 }}>·</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>

          {/* Active Milestone Card */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--gold-border)',
            padding: '40px',
            position: 'relative'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '28px',
                  fontWeight: 700,
                  color: 'var(--gold-bright)'
                }}>
                  {milestones[activeStoryIndex].year}
                </span>
                <span className="badge badge-gold">
                  {milestones[activeStoryIndex].tag}
                </span>
              </div>

              <h3 style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: '1.2', marginBottom: '18px' }}>
                {milestones[activeStoryIndex].headline}
              </h3>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '15.5px',
                lineHeight: '1.7',
                marginBottom: '28px'
              }}>
                {milestones[activeStoryIndex].text}
              </p>

              <div style={{ display: 'flex', gap: '14px' }}>
                <Link href="/about" className="btn btn-outline btn-sm">
                  <span>Read Moses&apos; Full Biography</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            <div className="photo-frame" style={{ minHeight: '360px', aspectRatio: '4/3' }}>
              <Image
                src={milestones[activeStoryIndex].image}
                alt={milestones[activeStoryIndex].headline}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="glaze"></div>
              <div className="caption-tag">
                <span>{milestones[activeStoryIndex].label} — {milestones[activeStoryIndex].year}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. MEDIA & MASTERCLASS SPOTLIGHT (MEL ROBBINS PODCAST STYLE)
          ======================================================== */}
      <section className="section-padding" style={{
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--line-dark)'
      }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '48px' }}>
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow eyebrow-wine">Featured Media &amp; Masterclass</span>
              <h2>Listen &amp; Learn On-Demand</h2>
              <p>
                Actionable teachings and strategic breakdowns curated for busy executives, builders, and ambitious minds.
              </p>
            </div>
            <Link href="/resources" className="btn btn-outline btn-sm">
              <span>All Field Notes &amp; Audio</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}>
            {/* Mel Robbins Style Interactive Audio Spotlight */}
            <div className="media-player-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-wine">Masterclass Audio Note</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                  32 Minutes · HQ Audio
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: '22px', lineHeight: '1.25', marginBottom: '10px' }}>
                  The Architecture of Intentional Growth: Escaping the Drift
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                  Moses Oladoye breaks down why intelligence and zeal fail without a calibrated personal growth system, and how to execute with ruthlessness.
                </p>
              </div>

              {/* Simulated Waveform & Play Control */}
              <div style={{
                background: 'rgba(7, 6, 5, 0.75)',
                border: '1px solid var(--line-dark)',
                padding: '16px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <button
                  onClick={() => setAudioPlaying(!audioPlaying)}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: audioPlaying ? 'var(--gold-bright)' : 'var(--gold-primary)',
                    border: 'none',
                    color: '#070605',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                  aria-label={audioPlaying ? 'Pause audio' : 'Play audio'}
                >
                  {audioPlaying ? <Volume2 size={18} /> : <Play size={18} fill="#070605" style={{ marginLeft: '2px' }} />}
                </button>

                <div className="waveform-container" style={{ flex: 1 }}>
                  {[12, 24, 18, 28, 8, 30, 20, 14, 26, 10, 22, 16, 28, 14, 20, 32, 18, 12, 24, 16, 22, 30, 14, 18, 26, 12, 20, 28].map((h, i) => (
                    <div
                      key={i}
                      className="wave-bar"
                      style={{
                        height: audioPlaying ? undefined : `${h}px`,
                        animationPlayState: audioPlaying ? 'running' : 'paused'
                      }}
                    ></div>
                  ))}
                </div>

                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--gold-bright)' }}>
                  {audioPlaying ? 'PLAYING' : 'READY'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '12px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  By Moses Oladoye · Recorded in Lagos
                </span>
                <Link href="/resources" style={{ fontSize: '12px', color: 'var(--gold-bright)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span>Read Transcript</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>

            {/* Video Lecture Preview Card */}
            <div className="luxury-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '220px', width: '100%' }}>
                <Image
                  src="/images/6_moses_oladoye_speaking_at_an_e.jpg"
                  alt="Keynote Lecture Session"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(7, 6, 5, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <button
                    onClick={() => setVideoModalOpen(true)}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'rgba(199, 162, 75, 0.9)',
                      border: '2px solid #FFFFFF',
                      color: '#070605',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 0 24px rgba(199, 162, 75, 0.6)'
                    }}
                    aria-label="Play keynote lecture video"
                  >
                    <Play size={22} fill="#070605" style={{ marginLeft: '3px' }} />
                  </button>
                </div>
                <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 2 }}>
                  <span className="badge badge-gold">Keynote Lecture</span>
                </div>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                  Leadership Summit · 48 Minutes
                </div>
                <h3 style={{ fontSize: '20px', lineHeight: '1.3', marginBottom: '10px' }}>
                  The Principles of Long-Horizon Capital and Moral Authority
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: '1.6', marginBottom: '18px' }}>
                  Addressing university leaders and builders on why private discipline always determines public sustainability.
                </p>
                <button
                  onClick={() => setVideoModalOpen(true)}
                  style={{
                    marginTop: 'auto',
                    background: 'none',
                    border: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--gold-bright)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  <span>Watch Keynote Clip</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. GAIN MASTERY INSTITUTE (COURSES SHOWCASE)
          ======================================================== */}
      <section className="section-padding" style={{
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--line-dark)'
      }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '48px' }}>
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Official Digital LMS</span>
              <h2>Gain Mastery Institute</h2>
              <p>
                Structured, rigorous educational tracks with quizzes, assignments, and verifiable certificates of completion.
              </p>
            </div>
            <Link href="/institute" className="btn btn-outline btn-sm">
              <span>View All Courses ({SEED_COURSES.length})</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}>
            {featuredCourses.map((course) => (
              <div key={course.id} className="luxury-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: '220px', width: '100%' }}>
                  <Image
                    src={course.thumbnailUrl}
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 2 }}>
                    <span className="badge badge-gold">{course.category}</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '14px', right: '14px', zIndex: 2 }}>
                    <span style={{
                      backgroundColor: 'rgba(7, 6, 5, 0.9)',
                      color: 'var(--gold-bright)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      padding: '4px 8px',
                      border: '1px solid var(--gold-border)'
                    }}>
                      {course.level}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '26px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} color="var(--gold-primary)" />
                      {course.durationHours} Hours
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={13} color="var(--gold-primary)" />
                      {course.studentsCount} Students
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginLeft: 'auto', color: 'var(--gold-bright)' }}>
                      <Star size={13} fill="var(--gold-primary)" color="var(--gold-primary)" />
                      {course.rating}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '20px', lineHeight: '1.28', marginBottom: '12px' }}>
                    <Link href={`/institute/course/${course.slug}`}>{course.title}</Link>
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: '1.6', marginBottom: '22px' }}>
                    {course.subtitle}
                  </p>

                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '18px',
                    borderTop: '1px solid var(--line-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '18px',
                        fontWeight: 700,
                        color: course.isFree ? '#74C69D' : 'var(--gold-bright)'
                      }}>
                        {course.isFree ? 'FREE' : `₦${course.price.toLocaleString()}`}
                      </span>
                    </div>
                    <Link href={`/institute/course/${course.slug}`} className="btn btn-gold btn-sm">
                      <span>Enroll</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          9. THE BEREANS READING GUILD (BOOK OF THE MONTH SPOTLIGHT)
          ======================================================== */}
      <section className="section-padding" style={{
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--line-dark)'
      }}>
        <div className="wrap">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '54px',
            alignItems: 'center'
          }}>
            <div className="photo-frame" style={{ minHeight: '380px', aspectRatio: '4/3' }}>
              <Image
                src="/images/3_moses_teaching_on_productivity.jpg"
                alt="Moses teaching on intellectual curiosity and deep reading"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="glaze"></div>
              <div className="caption-tag">
                <span>The Bereans: Intellectual Curiosity &amp; Depth</span>
              </div>
            </div>

            <div>
              <span className="eyebrow eyebrow-wine">Intellectual Mastery</span>
              <h2 style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', margin: '16px 0 20px' }}>
                The Bereans Reading Community
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.7', marginBottom: '22px' }}>
                Inspired by the biblical Bereans who examined every premise with analytical diligence, this reading community exists to help determined people cultivate the transformative habit of deep, structured reading.
              </p>

              {/* Current Book Feature Box */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--gold-border)',
                padding: '22px',
                marginBottom: '28px',
                position: 'relative'
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--gold-bright)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Current Cohort Reading Selection
                </div>
                <div style={{ fontSize: '19px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {SEED_BEREANS_BOOK.title}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  By {SEED_BEREANS_BOOK.author} · Virtual Weekly Cohort Sessions &amp; Reading Audits
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/bereans/apply" className="btn btn-gold">
                  <span>Apply to Join The Bereans</span>
                  <ArrowRight size={14} />
                </Link>
                <Link href="/bereans" className="btn btn-outline">
                  <span>Learn How Cohorts Work</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          10. KEYNOTE & CORPORATE SPEAKING SECTION
          ======================================================== */}
      <section className="section-padding" style={{
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--line-dark)'
      }}>
        <div className="wrap">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '54px',
            alignItems: 'center'
          }}>
            <div>
              <span className="eyebrow">Speaking &amp; Thought Leadership</span>
              <h2 style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', margin: '16px 0 20px' }}>
                Invite The Mastery Dr to teach your room.
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.7', marginBottom: '24px' }}>
                Moses Oladoye is regularly invited to keynote conferences, address executive leadership summits, university congresses, and strategic corporate retreats across Nigeria, Africa, and internationally.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                {['Conferences', 'Corporate Seminars', 'Churches', 'Universities', 'Executive Panels', 'Youth Summits'].map(item => (
                  <span key={item} className="badge badge-gold">{item}</span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/speaking/invite" className="btn btn-gold">
                  <span>Submit Speaking Invitation</span>
                  <ArrowRight size={14} />
                </Link>
                <Link href="/speaking" className="btn btn-outline">
                  <span>View Keynote Philosophy</span>
                </Link>
              </div>
            </div>

            <div className="photo-frame" style={{ minHeight: '440px', aspectRatio: '4/5' }}>
              <Image
                src="/images/6_moses_oladoye_speaking_at_an_e.jpg"
                alt="Moses Oladoye speaking at an executive conference"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="glaze"></div>
              <div className="caption-tag">
                <span>Keynote Delivery on Diligence &amp; Leadership</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          11. VERIFIED PROOF WALL & COMMUNITY REVIEWS
          ======================================================== */}
      <section className="section-padding" style={{
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--line-dark)'
      }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Verified Proof &amp; Transformations</span>
              <h2>Voices from the Community</h2>
              <p>
                Authentic testimonies from young executives, builders, students, and attendees across The Mastery Dr ecosystem.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All Reviews' },
                { id: 'personal_brand', label: 'Mentorship' },
                { id: 'institute', label: 'Institute' },
                { id: 'bereans', label: 'The Bereans' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setReviewFilter(f.id as any)}
                  style={{
                    background: reviewFilter === f.id ? 'var(--gold-surface)' : 'transparent',
                    border: `1px solid ${reviewFilter === f.id ? 'var(--gold-primary)' : 'var(--line-dark)'}`,
                    color: reviewFilter === f.id ? 'var(--gold-bright)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Testimonial Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {filteredReviews.map((rev) => (
              <div key={rev.id} className="luxury-card" style={{ borderTop: '2px solid var(--gold-primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="var(--gold-primary)" color="var(--gold-primary)" />
                    ))}
                  </div>
                  <span className="badge badge-gold" style={{ fontSize: '9px' }}>Verified</span>
                </div>

                <p style={{ color: 'var(--text-primary)', fontSize: '14.5px', lineHeight: '1.7', marginBottom: '20px' }}>
                  &ldquo;{rev.comment}&rdquo;
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--line-dark)' }}>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--gold-bright)' }}>
                    {rev.reviewerName}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                    {rev.reviewerTitle}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '44px' }}>
            <Link href="/reviews" className="btn btn-outline btn-sm">
              <span>Read All Community Reviews &amp; Submit Yours</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          12. FINAL GRAND AUTHORITY CTA (TONY ROBBINS STYLE)
          ======================================================== */}
      <section className="section-padding" style={{
        backgroundColor: 'var(--bg-primary)',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(199, 162, 75, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>

        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Take The First Step</span>
            <h2 style={{ fontSize: 'clamp(32px, 4.8vw, 56px)', margin: '20px 0 24px', letterSpacing: '-0.02em' }}>
              Stop drifting. Start building — <em className="text-gold-gradient">on purpose.</em>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16.5px', lineHeight: '1.7', marginBottom: '36px' }}>
              Whether you are an individual seeking structured clarity, an organization seeking a transformative keynote speaker, or a reader ready to train at the Institute, your growth starts today.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/institute" className="btn btn-gold">
                <span>Explore Gain Mastery Institute</span>
                <ArrowRight size={14} />
              </Link>
              <Link href="/speaking/invite" className="btn btn-outline">
                <span>Invite Moses to Speak</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          VIDEO TEASER MODAL (PATRICK BET-DAVID STYLE)
          ======================================================== */}
      {videoModalOpen && (
        <div className="modal-backdrop" onClick={() => setVideoModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-gold">The Vision</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
                  Moses Oladoye on The Mandate
                </span>
              </div>
              <button
                onClick={() => setVideoModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, overflow: 'hidden', background: '#000000', border: '1px solid var(--gold-border)' }}>
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="The Mastery Dr Vision Presentation"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Gain Mastery Institute · Purpose, Discipline &amp; Strategy
              </div>
              <Link href="/institute" className="btn btn-gold btn-sm">
                <span>View Full Curriculum</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
