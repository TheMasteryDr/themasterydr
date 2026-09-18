import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Award, Compass, TrendingUp, Coins, Crown, Flame, Target } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Moses Oladoye — The Mastery Dr',
  description: 'The story, philosophy, calling, and credentials of Moses Oladoye — Head Growth Coach at Gain Mastery Institute and founder of The Mastery Dr.',
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--line-dark)',
        padding: '70px 0 90px'
      }}>
        <div className="wrap">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px',
            alignItems: 'center'
          }}>
            <div>
              <span className="eyebrow">Biography &amp; Calling</span>
              <h1 style={{ fontSize: 'clamp(34px, 4.8vw, 64px)', margin: '18px 0 24px', lineHeight: '1.1' }}>
                Moses did not set out to build a brand. He set out to understand why people <em>drift.</em>
              </h1>
              <p style={{
                fontSize: '18px',
                color: 'var(--text-secondary)',
                lineHeight: '1.7',
                borderLeft: '2px solid var(--gold-primary)',
                paddingLeft: '20px'
              }}>
                From a deep personal detest for ignorance and stagnation arose a singular calling: helping individuals discover their God-given design and cultivate the discipline to express it.
              </p>
            </div>

            <div className="photo-frame" style={{ minHeight: '460px', aspectRatio: '4/5' }}>
              <Image
                src="/images/7_moses_oladoye_studio_portrait.jpg"
                alt="Moses Oladoye, studio portrait"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="glaze"></div>
              <div className="caption-tag">
                <span>Moses Oladoye — Head Growth Coach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Origins */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-dark)' }}>
        <div className="wrap">
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <span className="eyebrow">The Origin Story</span>
            <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', margin: '16px 0 28px' }}>
              The Anatomy of a Calling
            </h2>

            <div style={{ color: 'var(--text-secondary)', fontSize: '16.5px', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <p>
                In a world characterized by unprecedented noise, superficial motivational platitudes, and constant distraction, millions of capable individuals spend their entire lives in passive motion without true directional progress. They wake up, react to the day, pursue a living, and never ask what they were built to carry.
              </p>
              <p>
                Moses Oladoye observed this reality early and developed an enduring intolerance for human waste—the tragic reality of enormous potential buried beneath confusion, lack of strategy, and emotional inconsistency.
              </p>
              <blockquote style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '24px',
                lineHeight: '1.4',
                color: 'var(--gold-bright)',
                borderLeft: '3px solid var(--gold-primary)',
                padding: '16px 0 16px 26px',
                margin: '20px 0'
              }}>
                &ldquo;No one is empty. Every man is designed for something great; that greatness just needs to find expression.&rdquo;
              </blockquote>
              <p>
                That conviction took Moses through intensive study across finance, global currency markets (specializing in XAUUSD/gold market liquidity), corporate leadership, and biblical theology. He realized that true growth is not merely emotional inspiration; it is measurable, systematic, and requires disciplined architecture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--line-dark)' }}>
        <div className="wrap">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px'
          }}>
            <div className="luxury-card" style={{ borderTop: '3px solid var(--gold-primary)' }}>
              <span className="eyebrow" style={{ marginBottom: '16px' }}>The Vision</span>
              <h3 style={{ fontSize: '26px', marginBottom: '16px' }}>
                To raise a generation of growth- and purpose-inclined minds.
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7' }}>
                People who will not just live life to make a living, but to make undeniable, generational impact. Individuals grounded in spiritual depth, equipped with financial intelligence, and operating with strategic excellence.
              </p>
            </div>

            <div className="luxury-card" style={{ borderTop: '3px solid #74C69D' }}>
              <span className="eyebrow eyebrow-emerald" style={{ marginBottom: '16px' }}>The Mission</span>
              <h3 style={{ fontSize: '26px', marginBottom: '16px' }}>
                Empowering individuals from ignorance to consistent mastery.
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7' }}>
                Through Gain Mastery Institute, The Bereans reading cohorts, executive thought leadership, and curated field notes, we deliver the frameworks and accountability systems required for sustained personal transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials & Institutional Grounding */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-dark)' }}>
        <div className="wrap">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px',
            alignItems: 'center'
          }}>
            <div>
              <span className="eyebrow">Institutional Track Record</span>
              <h2 style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', margin: '16px 0 24px' }}>
                Tested Principles. Real Outcomes.
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15.5px', lineHeight: '1.7', marginBottom: '28px' }}>
                The insights shared by The Mastery Dr are not theoretical conjectures. They are forged through years of analytical training, market analysis, coaching over 1,000 individuals across 20+ nations, and leading transformative cohorts.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { role: 'Head Growth Coach', org: 'Gain Mastery Institute' },
                  { role: 'Convener', org: 'Gain Mastery Conference' },
                  { role: 'Creator & Mentor', org: 'Mighty Men of Mastery' },
                  { role: 'Founder', org: 'Gain Mastery Movement' },
                  { role: 'Executive Education', org: 'IBMI Berlin · Cardone University' },
                  { role: 'Financial & Market Analyst', org: 'Specializing in XAUUSD & Global Capital Systems' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: '1px solid var(--line-dark)',
                      fontSize: '14px'
                    }}
                  >
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.role}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold-bright)', fontSize: '12px' }}>{item.org}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="photo-frame" style={{ minHeight: '440px', aspectRatio: '4/5' }}>
              <Image
                src="/images/4_moses_oladoye_editorial_portra.jpg"
                alt="Moses Oladoye, editorial portrait"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="glaze"></div>
              <div className="caption-tag">
                <span>The Discipline of Strategic Thinking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faith & Worldview */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)', textAlign: 'center' }}>
        <div className="wrap">
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Worldview &amp; Conviction</span>
            <h2 style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', margin: '18px 0 20px' }}>
              Faith as a Foundation, Not a Façade.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.7', marginBottom: '36px' }}>
              The Mastery Dr welcomes individuals of all backgrounds while unapologetically acknowledging that true wisdom, moral integrity, and ultimate purpose originate in God. Faith is not an isolated Sunday ritual; it informs daily work ethic, financial honesty, and relational excellence.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/institute" className="btn btn-gold">
                <span>Join the Institute</span>
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
