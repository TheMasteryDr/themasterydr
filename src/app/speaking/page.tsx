import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mic, Users, Calendar, Award, CheckCircle2, MessageSquare } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Speaking & Keynotes — The Mastery Dr',
  description: 'Invite Moses Oladoye to keynote your conference, corporate seminar, university congress, or church leadership summit.',
};

export default function SpeakingPage() {
  const speakingTopics = [
    {
      title: 'The Architecture of Intentional Growth',
      category: 'Mastery & Discipline',
      summary: 'Why potential without structured daily architecture invariably leads to drift and burnout. How to engineer sustainable growth systems.',
      idealFor: 'Conferences, Corporate Retreats, Leadership Summits',
    },
    {
      title: 'Financial Intelligence & Strategic Capital',
      category: 'Economics & Markets',
      summary: 'Demystifying capital accumulation, risk management, and the mathematics of compounding for forward-thinking professionals.',
      idealFor: 'Fintech Forums, Young Professionals, Corporate Seminars',
    },
    {
      title: 'Integrity in the Dark: The Price of Leadership',
      category: 'Leadership & Influence',
      summary: 'Building unshakeable moral authority that outlasts crisis. Why private discipline must always exceed public visibility.',
      idealFor: 'Executive Summits, Church Leadership Retreats, Youth Congreses',
    },
    {
      title: 'Discerning Calling Before Life Demands It Under Pressure',
      category: 'Purpose & Calling',
      summary: 'Unpacking the mechanics of purpose discovery and aligning career decisions with God-given capacity.',
      idealFor: 'Universities, Youth Conventions, Emerging Builders',
    },
  ];

  return (
    <div>
      {/* Speaking Hero */}
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
              <span className="eyebrow">Speaking &amp; Thought Leadership</span>
              <h1 style={{ fontSize: 'clamp(34px, 4.8vw, 62px)', margin: '18px 0 24px', lineHeight: '1.1' }}>
                Commanding authority. <em>Transformative clarity.</em>
              </h1>
              <p style={{
                fontSize: '18px',
                color: 'var(--text-secondary)',
                lineHeight: '1.7',
                borderLeft: '2px solid var(--gold-primary)',
                paddingLeft: '20px',
                marginBottom: '32px'
              }}>
                Moses Oladoye addresses audiences not with transient motivational hype, but with conviction-driven intellectual frameworks that shift mindsets and spur immediate action.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/speaking/invite" className="btn btn-gold">
                  <span>Submit Speaking Invitation</span>
                  <ArrowRight size={14} />
                </Link>
                <a href="#topics" className="btn btn-outline">
                  <span>Explore Keynote Topics</span>
                </a>
              </div>
            </div>

            <div className="photo-frame" style={{ minHeight: '460px', aspectRatio: '4/5' }}>
              <Image
                src="/images/6_moses_oladoye_speaking_at_an_e.jpg"
                alt="Moses Oladoye delivering a keynote"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="glaze"></div>
              <div className="caption-tag">
                <span>Keynote Delivery — Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy of the Stage */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-dark)' }}>
        <div className="wrap">
          <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Speaking Philosophy</span>
            <h2 style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', margin: '16px 0 22px' }}>
              We do not leave rooms feeling good; we leave rooms transformed.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16.5px', lineHeight: '1.8' }}>
              A keynote must do more than entertain. It must diagnose root causes, dismantle false assumptions, and equip each listener with a concrete blueprint for execution. Every engagement is deeply researched and tailored to your specific audience demographic.
            </p>
          </div>
        </div>
      </section>

      {/* Keynote Topics */}
      <section id="topics" className="section-padding" style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--line-dark)' }}>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Signature Presentations</span>
            <h2>Core Speaking Topics</h2>
            <p>
              Derived from the Six Dimensions of Mastery, these keynotes can be delivered as 45-minute addresses, half-day masterclasses, or executive retreats.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}>
            {speakingTopics.map((topic, i) => (
              <div key={i} className="luxury-card" style={{ borderTop: '2px solid var(--gold-primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span className="badge badge-gold">{topic.category}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--gold-dim)' }}>TOPIC 0{i + 1}</span>
                </div>
                <h3 style={{ fontSize: '21px', lineHeight: '1.3', marginBottom: '12px' }}>{topic.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                  {topic.summary}
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--line-dark)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Ideal Audience:
                  </span>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)', marginTop: '4px' }}>
                    {topic.idealFor}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audiences */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-dark)' }}>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Event Environments</span>
            <h2>Environments Where Moses Serves</h2>
            <p>Moses frequently partners with leaders across multiple organizational structures:</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px'
          }}>
            {[
              { title: 'Conferences & Summits', desc: 'Opening or closing keynotes on personal mastery, purpose, and leadership.' },
              { title: 'Corporate & Strategy Retreats', desc: 'Deep-dive interactive workshops for executive teams and emerging talent.' },
              { title: 'Universities & Youth Programs', desc: 'Inspiring young minds with practical career and financial direction.' },
              { title: 'Churches & Ministry Retreats', desc: 'Faith-anchored teachings on calling, stewardship, and personal discipline.' },
            ].map((env, idx) => (
              <div key={idx} className="luxury-card">
                <h3 style={{ fontSize: '19px', marginBottom: '10px', color: 'var(--gold-bright)' }}>{env.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>{env.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Link href="/speaking/invite" className="btn btn-gold">
              <span>Open Speaking Invitation Application</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
