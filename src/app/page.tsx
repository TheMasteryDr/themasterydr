import React from 'react';
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
  Users
} from 'lucide-react';
import { SEED_COURSES, SEED_REVIEWS, SEED_CONTENT_ITEMS, SEED_BEREANS_BOOK } from '@/lib/data/seed-data';

export default function HomePage() {
  const featuredCourses = SEED_COURSES.slice(0, 3);
  const featuredReviews = SEED_REVIEWS.filter(r => r.isFeatured).slice(0, 3);
  const featuredArticles = SEED_CONTENT_ITEMS.slice(0, 3);

  const pillars = [
    {
      roman: 'I',
      title: 'Purpose',
      tagline: "Knowing what you're built to carry.",
      description: 'Moving from accidental living to clear, conviction-driven clarity about your personal assignment and contribution.',
      icon: Compass,
      accent: 'var(--gold-bright)',
      badge: 'Foundation',
    },
    {
      roman: 'II',
      title: 'Personal Growth',
      tagline: 'Mindset, habits, and daily discipline.',
      description: 'Developing sustainable systems of personal mastery that turn human potential into tested, expressed capacity.',
      icon: TrendingUp,
      accent: 'var(--text-primary)',
      badge: 'Discipline',
    },
    {
      roman: 'III',
      title: 'Financial Growth',
      tagline: 'Real intelligence about money and markets.',
      description: 'Mathematical, risk-governed capital stewardship and market understanding, rejecting get-rich-quick delusions.',
      icon: Coins,
      accent: '#74C69D',
      badge: 'Stewardship',
    },
    {
      roman: 'IV',
      title: 'Leadership',
      tagline: 'Influence, and building things that outlast you.',
      description: 'Cultivating moral authority, team mobilization, and integrity in the dark so your public influence does not collapse.',
      icon: Crown,
      accent: '#E26D8C',
      badge: 'Influence',
    },
    {
      roman: 'V',
      title: 'Spiritual Depth',
      tagline: 'A disciplined relationship with God.',
      description: 'Grounded in a Christian worldview, recognizing that eternal purpose precedes temporary ambition and secular success.',
      icon: Flame,
      accent: 'var(--gold-primary)',
      badge: 'Conviction',
    },
    {
      roman: 'VI',
      title: 'Strategy',
      tagline: 'Clear thinking, systems, sharper decisions.',
      description: 'Transforming emotional ambition into executable quarterly architectures and decisive everyday maneuvers.',
      icon: Target,
      accent: 'var(--text-secondary)',
      badge: 'Execution',
    },
  ];

  return (
    <div style={{ position: 'relative' }}>
      {/* ========================================================
          1. HERO SECTION (THE AUTHORITY)
          ======================================================== */}
      <section style={{
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--line-dark)',
        position: 'relative',
        padding: '80px 0 100px'
      }}>
        <div className="wrap">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '54px',
            alignItems: 'center'
          }}>
            {/* Hero Left Copy */}
            <div>
              <div className="eyebrow" style={{ marginBottom: '22px' }}>
                <span>LAGOS, NIGERIA</span>
                <span style={{ color: 'var(--text-faint)' }}>·</span>
                <span>GROWTH STRATEGY</span>
                <span style={{ color: 'var(--text-faint)' }}>·</span>
                <span>PURPOSE &amp; FAITH</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(36px, 5.5vw, 76px)',
                lineHeight: '1.05',
                color: 'var(--text-primary)',
                marginBottom: '26px'
              }}>
                Growth without direction is just <em>motion.</em>
              </h1>

              <p style={{
                fontSize: 'clamp(16px, 1.8vw, 20px)',
                color: 'var(--text-secondary)',
                lineHeight: '1.65',
                maxWidth: '540px',
                borderLeft: '2px solid var(--gold-primary)',
                paddingLeft: '22px',
                marginBottom: '36px'
              }}>
                A rigorous framework for determined minds done drifting — purpose, discipline, strategy, and faith, for a life built on deliberate impact.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '44px' }}>
                <Link href="/institute" className="btn btn-gold">
                  <span>Explore Gain Mastery Institute</span>
                  <ArrowRight size={14} />
                </Link>
                <Link href="/speaking" className="btn btn-outline">
                  <span>Invite Me to Speak</span>
                </Link>
              </div>

              {/* Byline Proof */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-muted)',
                letterSpacing: '0.06em'
              }}>
                <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>MOSES OLADOYE</span>
                <span style={{ width: '28px', height: '1px', background: 'var(--gold-border)' }}></span>
                <span>FOUNDER &amp; HEAD GROWTH COACH</span>
              </div>
            </div>

            {/* Hero Right: Signature Portrait Frame */}
            <div>
              <div className="photo-frame" style={{ minHeight: '520px', aspectRatio: '4/5' }}>
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
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. CORE PHILOSOPHY & THE ORIGIN
          ======================================================== */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-dark)' }}>
        <div className="wrap">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '56px',
            alignItems: 'center'
          }}>
            <div className="photo-frame" style={{ minHeight: '380px', aspectRatio: '4/3' }}>
              <Image
                src="/images/2_moses_oladoye_in_a_reflective_.jpg"
                alt="Moses Oladoye in a reflective moment"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="glaze"></div>
              <div className="caption-tag">
                <span>The Mandate: Growth. Consistent Growth.</span>
              </div>
            </div>

            <div>
              <span className="eyebrow">The Brand Philosophy</span>
              <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 44px)', margin: '16px 0 22px' }}>
                &ldquo;No one is empty, everyman is designed for something great; that greatness just needs to find expression.&rdquo;
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.7', marginBottom: '22px' }}>
                The Mastery Dr was birthed from a deep detest for ignorance, stagnation, and living without direction. God has placed within every human being the capacity for generational impact, but without structured discipline and strategic clarity, potential remains buried.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '24px' }}>
                <span className="badge badge-gold">Clarity over Confusion</span>
                <span className="badge badge-emerald">Capacity over Potential</span>
                <span className="badge badge-wine">Transformation over Information</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. THE SIX DIMENSIONS OF MASTERY (PROPRIETARY FRAMEWORK)
          ======================================================== */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--line-dark)' }}>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">The Proprietary Framework</span>
            <h2>Six Dimensions of Mastery</h2>
            <p>
              Interconnected, not isolated. Personal growth that neglects financial intelligence or spiritual depth will invariably fracture under pressure.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="luxury-card"
                  style={{ borderLeft: `3px solid ${pillar.accent}` }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: '32px',
                      color: 'var(--gold-bright)'
                    }}>
                      {pillar.roman}
                    </span>
                    <span className="badge badge-gold">{pillar.badge}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <Icon size={20} color="var(--gold-primary)" />
                    <h3 style={{ fontSize: '22px' }}>{pillar.title}</h3>
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12.5px',
                    color: 'var(--gold-dim)',
                    marginBottom: '14px'
                  }}>
                    {pillar.tagline}
                  </p>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginTop: 'auto' }}>
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. WHO THIS IS FOR (THE LEDGER)
          ======================================================== */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-dark)' }}>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Audience Alignment</span>
            <h2>Built for people ready for more.</h2>
            <p>
              The Mastery Dr is designed for intentional growth seekers refusing mediocrity across Africa and the global diaspora.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { num: 'I', title: 'Young Professionals & Leaders', desc: 'Building career authority, strategic thinking, and financial intelligence simultaneously.' },
              { num: 'II', title: 'Entrepreneurs & Builders', desc: 'Constructing resilient ventures and the psychological discipline required to sustain them.' },
              { num: 'III', title: 'Young Men with Purpose', desc: 'Developing structured spiritual depth, mental fortitude, and disciplined masculine responsibility.' },
              { num: 'IV', title: 'Students & Emerging Minds', desc: 'Discovering calling and principles of mastery before life demands them under crisis.' },
            ].map((item, idx) => (
              <div
                key={item.num}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr',
                  gap: '24px',
                  padding: '28px 0',
                  borderTop: '1px solid var(--line-dark)',
                  borderBottom: idx === 3 ? '1px solid var(--line-dark)' : 'none',
                  alignItems: 'baseline'
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: '26px',
                  color: 'var(--gold-primary)'
                }}>
                  {item.num}.
                </span>
                <div>
                  <h3 style={{ fontSize: '20px', display: 'inline', color: 'var(--text-primary)', marginRight: '12px' }}>
                    {item.title}
                  </h3>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
                    — {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. GAIN MASTERY INSTITUTE (LMS SHOWCASE)
          ======================================================== */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--line-dark)' }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '50px' }}>
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Official Learning Platform</span>
              <h2>Gain Mastery Institute</h2>
              <p>
                Structured, rigorous educational programs covering purpose, finance, leadership, and personal systems.
              </p>
            </div>
            <Link href="/institute" className="btn btn-outline btn-sm">
              <span>View All Courses</span>
              <ArrowRight size={14} />
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
                  <div style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    zIndex: 2
                  }}>
                    <span className="badge badge-gold">{course.category}</span>
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '14px',
                    right: '14px',
                    zIndex: 2
                  }}>
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

                <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
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

                  <h3 style={{ fontSize: '20px', lineHeight: '1.25', marginBottom: '12px' }}>
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
          6. SPEAKING & INVITATION SECTION
          ======================================================== */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-dark)' }}>
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
                Moses Oladoye is regularly invited to keynote conferences, address university youth congresses, speak at church leadership summits, and conduct strategic corporate growth seminars across Nigeria and internationally.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                {['Conferences', 'Corporate Seminars', 'Churches', 'Universities', 'Executive Panels', 'Youth Programs'].map(item => (
                  <span key={item} className="badge badge-gold">{item}</span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/speaking/invite" className="btn btn-gold">
                  <span>Submit Speaking Invitation</span>
                  <ArrowRight size={14} />
                </Link>
                <Link href="/speaking" className="btn btn-outline">
                  <span>View Topics &amp; Philosophy</span>
                </Link>
              </div>
            </div>

            <div className="photo-frame" style={{ minHeight: '440px', aspectRatio: '4/5' }}>
              <Image
                src="/images/6_moses_oladoye_speaking_at_an_e.jpg"
                alt="Moses Oladoye speaking at an event"
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
          7. THE BEREANS READING COMMUNITY
          ======================================================== */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--line-dark)' }}>
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
                alt="Moses teaching on productivity and deep reading"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="glaze"></div>
              <div className="caption-tag">
                <span>The Bereans: Cultivating Intellectual Curiosity</span>
              </div>
            </div>

            <div>
              <span className="eyebrow eyebrow-wine">Intellectual Growth</span>
              <h2 style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', margin: '16px 0 20px' }}>
                The Bereans Reading Community
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.7', marginBottom: '20px' }}>
                Inspired by the biblical Bereans who examined information with analytical diligence, this reading community exists to help determined people cultivate the transformative habit of deep, structured reading.
              </p>

              {/* Current Book Feature */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--gold-border)',
                padding: '20px',
                marginBottom: '28px'
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--gold-bright)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Current Cohort Reading Selection
                </div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {SEED_BEREANS_BOOK.title}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  By {SEED_BEREANS_BOOK.author} · Virtual Cohort Sessions
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/bereans/apply" className="btn btn-gold">
                  <span>Apply to Join The Bereans</span>
                  <ArrowRight size={14} />
                </Link>
                <Link href="/bereans" className="btn btn-outline">
                  <span>Learn How It Works</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. TESTIMONIALS & VERIFIED PROOF
          ======================================================== */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-dark)' }}>
        <div className="wrap">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '30px',
            paddingBottom: '50px',
            borderBottom: '1px solid var(--line-dark)'
          }}>
            <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '42px', color: 'var(--gold-bright)', fontWeight: 600 }}>
                  1,000+
                </span>
                <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Lives Impacted
                </span>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '42px', color: '#74C69D', fontWeight: 600 }}>
                  20+
                </span>
                <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Countries Reached
                </span>
              </div>
            </div>
            <div style={{ maxWidth: '400px', fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '14.5px', borderLeft: '2px solid var(--gold-primary)', paddingLeft: '16px' }}>
              &ldquo;What you do — not what happens — determines the quality of your life and the fruit of your leadership.&rdquo;
            </div>
          </div>

          {/* Testimonial Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginTop: '50px'
          }}>
            {featuredReviews.map((rev) => (
              <div key={rev.id} className="luxury-card" style={{ borderTop: '2px solid var(--gold-primary)' }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="var(--gold-primary)" color="var(--gold-primary)" />
                  ))}
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
          9. CURATED RESOURCES & FIELD NOTES
          ======================================================== */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--line-dark)' }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '48px' }}>
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Field Notes &amp; Insights</span>
              <h2>Ideas, taught consistently.</h2>
              <p>Articles, videos, and downloadable blueprints curated by The Mastery Dr.</p>
            </div>
            <Link href="/resources" className="btn btn-outline btn-sm">
              <span>Browse All Resources</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}>
            {featuredArticles.map((item) => (
              <div key={item.id} className="luxury-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                  <Image
                    src={item.featuredImage}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 2 }}>
                    <span className="badge badge-gold">{item.category}</span>
                  </div>
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                    {item.date} · {item.readTime}
                  </div>
                  <h3 style={{ fontSize: '19px', lineHeight: '1.3', marginBottom: '12px' }}>
                    <Link href={`/resources/${item.category.toLowerCase()}/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: '1.6', marginBottom: '18px' }}>
                    {item.excerpt}
                  </p>
                  <Link
                    href={`/resources/${item.category.toLowerCase()}/${item.slug}`}
                    style={{
                      marginTop: 'auto',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--gold-bright)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>Read Note</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          10. FINAL AUTHORITY CTA
          ======================================================== */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', textAlign: 'center' }}>
        <div className="wrap">
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Work With Moses</span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', margin: '20px 0 24px' }}>
              Stop drifting. Start building — <em>on purpose.</em>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.7', marginBottom: '36px' }}>
              Whether you are an individual seeking structured clarity, an organization seeking a transformative speaker, or an eager mind ready to learn at the Institute, the journey starts today.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/institute" className="btn btn-gold">
                <span>Explore The Institute</span>
                <ArrowRight size={14} />
              </Link>
              <Link href="/speaking/invite" className="btn btn-outline">
                <span>Invite Moses to Speak</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
