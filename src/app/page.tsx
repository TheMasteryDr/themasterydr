'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Play,
  X,
  Plus,
  Minus,
  Star,
  Clock,
  Users,
  Compass,
  TrendingUp,
  Coins,
  Crown,
  Flame,
  Target,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import {
  SEED_COURSES,
  SEED_REVIEWS,
  SEED_CONTENT_ITEMS,
  SEED_BEREANS_BOOK
} from '@/lib/data/seed-data';

export default function HomePage() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [expandedCompanies, setExpandedCompanies] = useState<{ [key: string]: boolean }>({
    'gmi': true,
    'bereans': false,
    'speaking': false,
    'dispatch': false,
    'mighty-men': false,
    'advisory': false
  });
  const [flywheelZoomOpen, setFlywheelZoomOpen] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'personal_brand' | 'institute' | 'bereans'>('all');

  const toggleCompany = (id: string) => {
    setExpandedCompanies(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const featuredCourses = SEED_COURSES.slice(0, 3);
  const filteredReviews = reviewFilter === 'all'
    ? SEED_REVIEWS.filter(r => r.isFeatured)
    : SEED_REVIEWS.filter(r => r.category === reviewFilter);

  // 1. PBD Style "The Story" Milestones
  const storyMilestones = [
    {
      year: '2018',
      label: 'Lagos, Nigeria',
      chapter: 'The Awakening & The Detest for Drift',
      body: 'Moses Oladoye was confronted by a pervasive reality across Nigeria and Africa: brilliant minds, intense spiritual zeal, but rampant stagnation and accidental living. The conviction took root: "No one is empty; every man is designed for something great; that greatness just needs to find expression." He began mentoring young men and professionals on discipline, systems, and directional clarity.',
      image: '/images/2_moses_oladoye_in_a_reflective_.jpg',
    },
    {
      year: '2020',
      label: 'Virtual Guild',
      chapter: 'The Bereans Reading Movement',
      body: 'Recognizing that shallow thinking produces shallow lives, Moses launched The Bereans Reading Community, inspired by the biblical Bereans who examined principles with diligence. What started with a small group quickly expanded into an international monthly guild, training readers to become critical thinkers and strategic executors.',
      image: '/images/3_moses_teaching_on_productivity.jpg',
    },
    {
      year: '2022',
      label: 'The Framework',
      chapter: 'Codifying The Six Dimensions of Mastery',
      body: 'Understanding that isolated growth leads to sudden collapse, Moses codified the proprietary Six Dimensions of Mastery: Purpose, Personal Growth, Financial Growth, Leadership, Spiritual Depth, and Strategy. An integrated life architecture ensuring that outer influence is matched by inner moral fortitude.',
      image: '/images/4_moses_oladoye_editorial_portra.jpg',
    },
    {
      year: '2024',
      label: 'Digital Campus',
      chapter: 'Gain Mastery Institute Launch',
      body: 'The mandate scaled from informal coaching to a structured educational institution. Gain Mastery Institute was launched as a digital LMS platform offering certified curriculum, quizzes, and quarterly cohort intensives for builders, executives, and emerging leaders across 20+ countries.',
      image: '/images/7_moses_oladoye_studio_portrait.jpg',
    },
    {
      year: '2026',
      label: 'Global Expansion',
      chapter: 'The Flywheel in Motion',
      body: 'Today, the ecosystem spans global keynotes, digital learning tracks, published field notes, and the private Mighty Men fraternity. Operating across Lagos, London, and the global diaspora, Moses continues to build systems that turn human potential into tested, expressed capacity for generational impact.',
      image: '/images/6_moses_oladoye_speaking_at_an_e.jpg',
    },
  ];

  // 2. PBD Style "His Companies / Ecosystem"
  const companies = [
    {
      id: 'gmi',
      title: 'Gain Mastery Institute',
      role: 'Educational Engine · LMS & Certification',
      excerpt: 'A structured digital academy offering certified curriculum on purpose, capital stewardship, and high-performance execution.',
      fullText: 'Gain Mastery Institute equips ambitious minds with university-level rigor. Features multi-module video curriculum, assessments, practical projects, and verified digital certificates of completion for ambitious career builders and founders.',
      link: '/institute',
      badge: 'LMS Platform'
    },
    {
      id: 'bereans',
      title: 'The Bereans Reading Club',
      role: 'Intellectual Discipline · Monthly Guild',
      excerpt: 'A global reading movement cultivating deep analytical reading, mental rigor, and disciplined monthly book audits.',
      fullText: 'Inspired by the biblical Bereans, this community reads one transformative book each month with structured weekly audits, guided prompts, and live virtual discussions to convert information into behavioral habit.',
      link: '/bereans',
      badge: 'Reading Guild'
    },
    {
      id: 'speaking',
      title: 'Keynote & Corporate Speaking',
      role: 'High-Impact Rooms · Executive Seminars',
      excerpt: 'Keynote delivery and corporate training designed to bring clarity, accountability, and execution to leadership rooms.',
      fullText: 'Moses Oladoye is regularly invited to address leadership summits, corporate strategy sessions, church conferences, and university congresses on diligence, leadership under pressure, and strategic life alignment.',
      link: '/speaking',
      badge: 'Keynotes & Events'
    },
    {
      id: 'dispatch',
      title: 'The Mastery Dispatch',
      role: 'Weekly Publications · Strategic Letters',
      excerpt: 'Unfiltered, direct field notes and video masterclasses distributed weekly to thousands of determined minds.',
      fullText: 'One honest letter every week breaking down mental models, capital stewardship, purpose alignment, and operational frameworks. Reaches readers across 20+ nations.',
      link: '/resources',
      badge: 'Media & Field Notes'
    },
    {
      id: 'mighty-men',
      title: 'Mighty Men of Mastery',
      role: 'Private Brotherhood · Executive Fellowship',
      excerpt: 'An exclusive fraternity for purposeful men committed to spiritual depth, masculine responsibility, and financial dominion.',
      fullText: 'A high-accountability cohort for men seeking to master their private discipline, build generational family legacies, and lead with moral authority in culture and commerce.',
      link: '/mighty-men',
      badge: 'Private Guild'
    },
    {
      id: 'advisory',
      title: 'Strategic Growth Advisory',
      role: 'Executive Advisory · 1-on-1 Frameworks',
      excerpt: 'Bespoke strategic guidance for founders and high-performing leaders seeking quarterly life architectures.',
      fullText: 'Direct diagnostic engagement analyzing personal bottlenecks, capital allocation habits, and leadership alignment to build an executable roadmap for sustainable scaling.',
      link: '/contact',
      badge: 'Executive Advisory'
    },
  ];

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>

      {/* ========================================================
          1. PBD EXACT CINEMATIC HERO (.h-hero)
          ======================================================== */}
      <section style={{
        backgroundColor: '#0A0A0A',
        borderBottom: '1px solid var(--line-dark)',
        position: 'relative',
        padding: '70px 0 90px',
        overflow: 'hidden'
      }}>
        {/* Subtle Ambient Red Glow */}
        <div style={{
          position: 'absolute',
          top: '-15%',
          right: '0',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(207, 46, 46, 0.12) 0%, transparent 65%)',
          pointerEvents: 'none'
        }}></div>

        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px',
            alignItems: 'center'
          }}>
            {/* Left Typographic Hierarchy: PBD Exact Format */}
            <div>
              <div className="eyebrow" style={{ marginBottom: '16px' }}>
                <span>LAGOS · LONDON · GLOBAL DIASPORA</span>
              </div>

              {/* Giant Stacked 2-Line Heading */}
              <h1 style={{
                fontFamily: 'var(--font-hero)',
                fontSize: 'clamp(44px, 12vw, 108px)',
                lineHeight: '0.9',
                letterSpacing: '0.02em',
                color: '#FFFFFF',
                marginBottom: '20px',
                textTransform: 'uppercase'
              }}>
                MOSES<br />
                <span style={{ color: 'var(--pbd-red)' }}>OLADOYE</span>
              </h1>

              {/* Punchy PBD 4-Word Identity Subtitle */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(14px, 1.4vw, 17px)',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#CCCCCC',
                marginBottom: '24px'
              }}>
                Growth Coach · Author · Founder · Strategist
              </p>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '16px',
                lineHeight: '1.65',
                maxWidth: '520px',
                marginBottom: '32px'
              }}>
                A rigorous framework for determined minds done drifting. Purpose, financial intelligence, leadership, and disciplined execution for generational impact.
              </p>

              {/* PBD "Watch his story" Play Button + Dual Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="h-hero__play"
                >
                  <div className="h-hero__play-btn">
                    <Play size={15} fill="#FFFFFF" style={{ marginLeft: '2px' }} />
                  </div>
                  <div className="h-hero__play-text">
                    Watch His Story
                  </div>
                </button>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                  <Link href="/institute" className="c-btn c-btn--red">
                    <span>Explore Gain Mastery Institute</span>
                    <ArrowRight size={13} />
                  </Link>
                  <Link href="/speaking" className="c-btn c-btn--dark">
                    <span>Invite to Speak</span>
                  </Link>
                </div>
              </div>

              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                paddingTop: '16px',
                borderTop: '1px solid #1E1E1E'
              }}>
                <span style={{ color: '#FFFFFF', fontWeight: 700 }}>THE MASTERY DR</span>
                <span>/</span>
                <span>HEAD COACH, GAIN MASTERY INSTITUTE</span>
              </div>
            </div>

            {/* Right: Signature Portrait with PBD High-Contrast Vignette */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                minHeight: '520px',
                aspectRatio: '4/5',
                background: '#121212',
                border: '1px solid #2B2B2B',
                overflow: 'hidden'
              }}>
                <Image
                  src="/images/1_moses_oladoye_the_mastery_dr_e.jpg"
                  alt="Moses Oladoye — The Mastery Dr"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(10,10,10,0.1) 60%, rgba(10,10,10,0.95) 100%)',
                  pointerEvents: 'none'
                }}></div>

                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#FFFFFF'
                  }}>
                    Moses Oladoye — Lagos
                  </span>
                  <span style={{
                    background: 'var(--pbd-red)',
                    color: '#FFFFFF',
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '2px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}>
                    Head Coach
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. PBD EXACT MANIFESTO QUOTE (.h-quote)
          ======================================================== */}
      <section className="h-quote">
        <div className="h-quote__inner">
          <div className="h-quote__mark">&ldquo;</div>
          <blockquote className="h-quote__text">
            No one is empty.<br />
            Every man is designed for something great.<br />
            That greatness just needs to find expression.
          </blockquote>
          <p className="h-quote__attribution">- Moses Oladoye</p>
        </div>
      </section>

      {/* ========================================================
          3. PBD EXACT "THE STORY" TIMELINE (.h-story)
          ======================================================== */}
      <section className="section-padding" style={{
        backgroundColor: '#0D0D0D',
        borderBottom: '1px solid var(--line-dark)'
      }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Milestones</span>
              <h2>The Story</h2>
              <p>
                From an acute detest for stagnation to an international growth coaching and learning ecosystem.
              </p>
            </div>

            {/* Timeline Previous / Next Navigation Arrows */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setActiveStoryIndex(prev => (prev > 0 ? prev - 1 : storyMilestones.length - 1))}
                aria-label="Previous story milestone"
                className="c-btn c-btn--dark"
                style={{ width: '42px', height: '42px', padding: 0, borderRadius: '4px' }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setActiveStoryIndex(prev => (prev < storyMilestones.length - 1 ? prev + 1 : 0))}
                aria-label="Next story milestone"
                className="c-btn c-btn--dark"
                style={{ width: '42px', height: '42px', padding: 0, borderRadius: '4px' }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Horizontal Timeline Bar with Year Dots */}
          <div className="h-story__timeline">
            {storyMilestones.map((m, idx) => (
              <button
                key={m.year}
                onClick={() => setActiveStoryIndex(idx)}
                className={`h-story__dot ${activeStoryIndex === idx ? 'is-active' : ''}`}
              >
                <span>{m.year}</span>
                <span style={{ opacity: 0.6 }}>·</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>

          {/* Active Story Card */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            alignItems: 'center',
            background: '#141414',
            border: '1px solid #282828',
            padding: 'clamp(20px, 4vw, 40px)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <span style={{
                  fontFamily: 'var(--font-hero)',
                  fontSize: '36px',
                  color: 'var(--pbd-red)',
                  lineHeight: '1'
                }}>
                  {storyMilestones[activeStoryIndex].year}
                </span>
                <span style={{
                  background: '#222222',
                  color: '#CCCCCC',
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  borderRadius: '2px'
                }}>
                  {storyMilestones[activeStoryIndex].label}
                </span>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-hero)',
                fontSize: 'clamp(26px, 3.2vw, 40px)',
                lineHeight: '1.05',
                color: '#FFFFFF',
                marginBottom: '18px',
                textTransform: 'uppercase'
              }}>
                {storyMilestones[activeStoryIndex].chapter}
              </h3>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '15.5px',
                lineHeight: '1.7',
                marginBottom: '28px'
              }}>
                {storyMilestones[activeStoryIndex].body}
              </p>

              <Link href="/about" className="c-btn c-btn--white" style={{ fontSize: '12px' }}>
                <span>Read Full Biography</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            <div style={{
              position: 'relative',
              minHeight: '360px',
              aspectRatio: '4/3',
              background: '#0A0A0A',
              border: '1px solid #2A2A2A',
              overflow: 'hidden'
            }}>
              <Image
                src={storyMilestones[activeStoryIndex].image}
                alt={storyMilestones[activeStoryIndex].chapter}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 60%, rgba(10,10,10,0.85) 100%)'
              }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. PBD EXACT "HIS COMPANIES" / ECOSYSTEM WITH "+" TOGGLES (.h-companies)
          ======================================================== */}
      <section className="section-padding" style={{
        backgroundColor: '#0A0A0A',
        borderBottom: '1px solid var(--line-dark)'
      }}>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Operating Portfolio</span>
            <h2>His Initiatives &amp; Companies</h2>
            <p>
              Founder &amp; Head Growth Coach. Built around the mission to eradicate stagnation, instill discipline, and empower current and emerging leaders.
            </p>
          </div>

          <div className="h-companies__logos-row">
            {companies.map((co) => {
              const isExpanded = !!expandedCompanies[co.id];

              return (
                <div
                  key={co.id}
                  className={`h-companies__logo-card ${isExpanded ? 'is-expanded' : ''}`}
                >
                  <button
                    onClick={() => toggleCompany(co.id)}
                    className="h-companies__logo-toggle"
                    aria-label={`Toggle details for ${co.title}`}
                  >
                    {isExpanded ? <Minus size={14} /> : <Plus size={14} />}
                  </button>

                  <div style={{ marginBottom: '16px' }}>
                    <span style={{
                      background: 'rgba(207, 46, 46, 0.15)',
                      color: 'var(--pbd-red)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '10px',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      padding: '4px 8px',
                      borderRadius: '2px',
                      display: 'inline-block',
                      marginBottom: '10px'
                    }}>
                      {co.badge}
                    </span>
                    <h3 style={{
                      fontFamily: 'var(--font-hero)',
                      fontSize: '24px',
                      letterSpacing: '0.02em',
                      color: '#FFFFFF',
                      marginBottom: '4px'
                    }}>
                      {co.title}
                    </h3>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}>
                      {co.role}
                    </div>
                  </div>

                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    marginBottom: '18px'
                  }}>
                    {isExpanded ? co.fullText : co.excerpt}
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #222222' }}>
                    <Link
                      href={co.link}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--pbd-red)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>Learn More</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. PBD EXACT "THE FLYWHEEL" (.h-flywheel)
          ======================================================== */}
      <section className="section-padding" style={{
        backgroundColor: '#0D0D0D',
        borderBottom: '1px solid var(--line-dark)'
      }}>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">The Compounding Flywheel</span>
            <h2>The Mastery Flywheel</h2>
            <p>
              Moses didn&apos;t build separate initiatives. He built a system where each one feeds the next. The result is a compounding flywheel that accelerates every year.
            </p>
          </div>

          <div style={{
            background: '#141414',
            border: '1px solid #282828',
            padding: '40px',
            position: 'relative'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              {[
                { step: '01', title: 'Deep Reading', sub: 'The Bereans Reading Guild', desc: 'Cultivating mental rigor and critical analysis of foundational literature.' },
                { step: '02', title: 'Structured Education', sub: 'Gain Mastery Institute', desc: 'Formalizing knowledge into actionable curriculum and certification tracks.' },
                { step: '03', title: 'Executive Clarity', sub: 'Corporate Speaking & Seminars', desc: 'Mobilizing organizations, universities, and churches with strategic models.' },
                { step: '04', title: 'Generational Impact', sub: 'Strategic Briefings & Advisory', desc: 'Compounding influence and building things that outlast the builder.' },
              ].map((n) => (
                <div key={n.step} style={{ borderLeft: '2px solid var(--pbd-red)', paddingLeft: '16px' }}>
                  <div style={{
                    fontFamily: 'var(--font-hero)',
                    fontSize: '32px',
                    color: 'var(--pbd-red)',
                    lineHeight: '1'
                  }}>
                    {n.step}
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-hero)', fontSize: '20px', color: '#FFFFFF', marginTop: '6px' }}>
                    {n.title}
                  </h4>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#CCCCCC', textTransform: 'uppercase', margin: '4px 0 8px' }}>
                    {n.sub}
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.55' }}>
                    {n.desc}
                  </p>
                </div>
              ))}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              paddingTop: '24px',
              borderTop: '1px solid #242424'
            }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#CCCCCC' }}>
                Every book read feeds a teaching. Every teaching feeds a course. Every course builds a leader.
              </div>

              <Link href="/institute" className="c-btn c-btn--red" style={{ fontSize: '12px' }}>
                <span>Enter The Institute Engine</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. PBD "BY THE NUMBERS" STATISTICAL GRID (.h-vt)
          ======================================================== */}
      <section className="section-padding" style={{
        backgroundColor: '#000000',
        borderBottom: '1px solid var(--line-dark)'
      }}>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Proven Scale</span>
            <h2>By The Numbers</h2>
            <p>
              Tested across cohorts, conferences, digital campuses, and corporate boardrooms.
            </p>
          </div>

          <div className="h-stats-grid">
            <div className="h-stat-box">
              <div className="h-stat-number">
                1,000<span className="accent">+</span>
              </div>
              <div className="h-stat-label">
                Minds Directly Mentored &amp; Coached
              </div>
            </div>

            <div className="h-stat-box">
              <div className="h-stat-number">
                20<span className="accent">+</span>
              </div>
              <div className="h-stat-label">
                Countries Reached Globally
              </div>
            </div>

            <div className="h-stat-box">
              <div className="h-stat-number">
                6
              </div>
              <div className="h-stat-label">
                Proprietary Dimensions of Mastery
              </div>
            </div>

            <div className="h-stat-box">
              <div className="h-stat-number">
                100<span className="accent">%</span>
              </div>
              <div className="h-stat-label">
                5-Star Community Feedback
              </div>
            </div>

            <div className="h-stat-box">
              <div className="h-stat-number">
                12<span className="accent">+</span>
              </div>
              <div className="h-stat-label">
                Certification Curriculum Modules
              </div>
            </div>

            <div className="h-stat-box">
              <div className="h-stat-number">
                52<span className="accent">+</span>
              </div>
              <div className="h-stat-label">
                Weekly Strategic Briefings Annually
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. PBD EXACT "BESTSELLING CURRICULUM & COURSES" (.h-books / .h-events)
          ======================================================== */}
      <section className="section-padding" style={{
        backgroundColor: '#0A0A0A',
        borderBottom: '1px solid var(--line-dark)'
      }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Flagship Education</span>
              <h2>Curriculum &amp; Certification</h2>
              <p>
                Structured, rigorous educational programs from Gain Mastery Institute covering purpose, finance, leadership, and personal systems.
              </p>
            </div>
            <Link href="/institute" className="c-btn c-btn--dark">
              <span>View All Courses ({SEED_COURSES.length})</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {featuredCourses.map((course) => (
              <div key={course.id} style={{
                background: '#141414',
                border: '1px solid #282828',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ position: 'relative', height: '220px', width: '100%', background: '#0A0A0A' }}>
                  <Image
                    src={course.thumbnailUrl}
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 2 }}>
                    <span style={{
                      background: 'var(--pbd-red)',
                      color: '#FFFFFF',
                      fontSize: '10px',
                      fontWeight: 800,
                      padding: '4px 8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      borderRadius: '2px'
                    }}>
                      {course.category}
                    </span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '14px', right: '14px', zIndex: 2 }}>
                    <span style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.9)',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 8px',
                      border: '1px solid #333333'
                    }}>
                      {course.level}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} color="var(--pbd-red)" />
                      {course.durationHours} Hours
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={13} color="var(--pbd-red)" />
                      {course.studentsCount} Students
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginLeft: 'auto', color: '#FFFFFF' }}>
                      <Star size={13} fill="var(--gold-primary)" color="var(--gold-primary)" />
                      {course.rating}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-hero)',
                    fontSize: '24px',
                    lineHeight: '1.1',
                    marginBottom: '10px'
                  }}>
                    <Link href={`/institute/course/${course.slug}`}>{course.title}</Link>
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: '1.6', marginBottom: '22px' }}>
                    {course.subtitle}
                  </p>

                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '18px',
                    borderTop: '1px solid #222222',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <span style={{
                        fontFamily: 'var(--font-hero)',
                        fontSize: '24px',
                        letterSpacing: '0.04em',
                        color: course.isFree ? '#74C69D' : '#FFFFFF'
                      }}>
                        {course.isFree ? 'FREE' : `₦${course.price.toLocaleString()}`}
                      </span>
                    </div>
                    <Link href={`/institute/course/${course.slug}`} className="c-btn c-btn--red" style={{ padding: '9px 18px', fontSize: '11px' }}>
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
          8. PBD EXACT "WHAT LEADERS SAY" CAROUSEL (.h-leaders)
          ======================================================== */}
      <section className="section-padding" style={{
        backgroundColor: '#0D0D0D',
        borderBottom: '1px solid var(--line-dark)'
      }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Endorsements &amp; Proof</span>
              <h2>What Leaders Say</h2>
              <p>
                Testimonials from executives, community leaders, and students transformed by The Mastery Dr framework.
              </p>
            </div>

            {/* Filter Tabs */}
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
                  className={`c-btn ${reviewFilter === f.id ? 'c-btn--red' : 'c-btn--dark'}`}
                  style={{ padding: '7px 14px', fontSize: '11px' }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {filteredReviews.map((rev) => (
              <div key={rev.id} style={{
                background: '#141414',
                border: '1px solid #282828',
                borderTop: '2px solid var(--pbd-red)',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="var(--pbd-red)" color="var(--pbd-red)" />
                    ))}
                  </div>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    Verified Attendee
                  </span>
                </div>

                <p style={{ color: '#F0F0F0', fontSize: '15px', lineHeight: '1.65', marginBottom: '22px' }}>
                  &ldquo;{rev.comment}&rdquo;
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #242424' }}>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: '#FFFFFF' }}>
                    {rev.reviewerName}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {rev.reviewerTitle}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/reviews" className="c-btn c-btn--dark">
              <span>Read All Community Reviews</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          9. PBD EXACT "SPEAKING & HIGH-STAKES ROOMS" (.h-events)
          ======================================================== */}
      <section className="section-padding" style={{
        backgroundColor: '#0A0A0A',
        borderBottom: '1px solid var(--line-dark)'
      }}>
        <div className="wrap">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}>
            <div>
              <span className="eyebrow">Keynote Delivery</span>
              <h2 style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(36px, 5.5vw, 60px)', margin: '12px 0 20px', lineHeight: '1' }}>
                Invite The Mastery Dr to teach your room.
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.7', marginBottom: '24px' }}>
                Moses Oladoye is regularly invited to keynote conferences, address church leadership summits, university congresses, and conduct strategic corporate growth seminars across Nigeria and internationally.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                {['Executive Panels', 'Corporate Seminars', 'Churches', 'Universities', 'Youth Congresses', 'Leadership Retreats'].map(item => (
                  <span key={item} style={{
                    background: '#1A1A1A',
                    border: '1px solid #333333',
                    color: '#CCCCCC',
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '5px 12px',
                    borderRadius: '2px'
                  }}>
                    {item}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link href="/speaking/invite" className="c-btn c-btn--red">
                  <span>Submit Speaking Invitation</span>
                  <ArrowRight size={13} />
                </Link>
                <Link href="/speaking" className="c-btn c-btn--dark">
                  <span>View Keynote Philosophy</span>
                </Link>
              </div>
            </div>

            <div style={{
              position: 'relative',
              minHeight: '440px',
              aspectRatio: '4/5',
              background: '#121212',
              border: '1px solid #2B2B2B',
              overflow: 'hidden'
            }}>
              <Image
                src="/images/6_moses_oladoye_speaking_at_an_e.jpg"
                alt="Moses Oladoye speaking at an executive summit"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 65%, rgba(10,10,10,0.95) 100%)'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#FFFFFF'
              }}>
                Keynote Delivery on Diligence &amp; Leadership
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          10. PBD EXACT FINAL CALL TO ACTION
          ======================================================== */}
      <section className="section-padding" style={{
        backgroundColor: '#000000',
        textAlign: 'center'
      }}>
        <div className="wrap">
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Take The Next Step</span>
            <h2 style={{
              fontFamily: 'var(--font-hero)',
              fontSize: 'clamp(44px, 7vw, 84px)',
              margin: '16px 0 20px',
              lineHeight: '0.95'
            }}>
              Stop drifting. Start building — <span style={{ color: 'var(--pbd-red)' }}>on purpose.</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16.5px', lineHeight: '1.7', marginBottom: '36px' }}>
              Whether you are an ambitious professional seeking structured clarity, an organization seeking a keynote speaker, or a reader ready to train at the Institute, the journey starts today.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/institute" className="c-btn c-btn--red">
                <span>Explore The Institute</span>
                <ArrowRight size={14} />
              </Link>
              <Link href="/speaking/invite" className="c-btn c-btn--white">
                <span>Invite Moses to Speak</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          11. PBD EXACT VIDEO LIGHTBOX MODAL (video-lightbox)
          ======================================================== */}
      {videoModalOpen && (
        <div className="video-lightbox" onClick={() => setVideoModalOpen(false)}>
          <div className="video-lightbox__frame" onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 18px',
              background: '#141414',
              borderBottom: '1px solid #2B2B2B'
            }}>
              <span style={{
                fontFamily: 'var(--font-hero)',
                fontSize: '18px',
                letterSpacing: '0.04em',
                color: '#FFFFFF'
              }}>
                THE ORIGIN STORY
              </span>
              <button
                onClick={() => setVideoModalOpen(false)}
                aria-label="Close video"
                style={{
                  background: '#222222',
                  border: '1px solid #333333',
                  color: '#FFFFFF',
                  width: '32px',
                  height: '32px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} color="var(--pbd-red)" />
              </button>
            </div>

            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="The Mastery Dr Vision Story"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>

            <div style={{
              padding: '20px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              background: '#141414',
              borderTop: '1px solid #2B2B2B'
            }}>
              <div>
                <div style={{ fontFamily: 'var(--font-hero)', fontSize: '20px', color: '#FFFFFF' }}>
                  Moses Oladoye — The Origin Mandate
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Gain Mastery Institute · Lagos · London · Global Diaspora
                </div>
              </div>
              <Link href="/institute" className="c-btn c-btn--red" style={{ padding: '8px 16px', fontSize: '11px' }}>
                <span>Explore Institute Programs</span>
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
