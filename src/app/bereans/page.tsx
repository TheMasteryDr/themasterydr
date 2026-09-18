import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, CheckCircle2, Users, Compass, Award, MessageCircle } from 'lucide-react';
import { SEED_BEREANS_BOOK } from '@/lib/data/seed-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Bereans Reading Community — The Mastery Dr',
  description: 'A screened, disciplined reading community committed to cultivating intellectual curiosity, deep study, and purposeful transformation.',
};

export default function BereansPage() {
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
              <span className="eyebrow eyebrow-wine">Intellectual Depth &amp; Community</span>
              <h1 style={{ fontSize: 'clamp(34px, 4.8vw, 62px)', margin: '18px 0 24px', lineHeight: '1.1' }}>
                Cultivating minds that <em>read to build.</em>
              </h1>
              <p style={{
                fontSize: '18px',
                color: 'var(--text-secondary)',
                lineHeight: '1.7',
                borderLeft: '2px solid var(--wine)',
                paddingLeft: '20px',
                marginBottom: '32px'
              }}>
                The Bereans is a selective reading community helping determined individuals cultivate the life-altering habit of deep, structured study across personal development, finance, leadership, and faith.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/bereans/apply" className="btn btn-gold">
                  <span>Apply for Membership</span>
                  <ArrowRight size={14} />
                </Link>
                <a href="#current-book" className="btn btn-outline">
                  <span>View Current Cohort Book</span>
                </a>
              </div>
            </div>

            <div className="photo-frame" style={{ minHeight: '440px', aspectRatio: '4/3' }}>
              <Image
                src="/images/3_moses_teaching_on_productivity.jpg"
                alt="The Bereans reading community session"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="glaze"></div>
              <div className="caption-tag">
                <span>The Bereans — Socratic Study &amp; Discussion</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Origin & Biblical Bereans Metaphor */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-dark)' }}>
        <div className="wrap">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <span className="eyebrow eyebrow-wine" style={{ justifyContent: 'center' }}>The Biblical Metaphor</span>
            <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', margin: '16px 0 24px' }}>
              &ldquo;They received the word with all readiness of mind, and searched the scriptures daily.&rdquo;
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16.5px', lineHeight: '1.8' }}>
              In the ancient city of Berea, people were commended because they were more noble-minded: they did not passively swallow opinion; they examined ideas with analytical discipline. The modern Bereans community carries this legacy. We read not for vanity or superficial page counts, but for behavioral mastery.
            </p>
          </div>
        </div>
      </section>

      {/* Current Book Feature */}
      <section id="current-book" className="section-padding" style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--line-dark)' }}>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Active Cohort Syllabus</span>
            <h2>Current Reading Selection</h2>
            <p>Every month, members dissect a seminal text through weekly reading benchmarks and interactive virtual discussions.</p>
          </div>

          <div className="luxury-card" style={{ padding: '40px', border: '1px solid var(--gold-border)' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '40px',
              alignItems: 'center'
            }}>
              <div>
                <span className="badge badge-gold" style={{ marginBottom: '16px' }}>{SEED_BEREANS_BOOK.readingMonth} Cohort</span>
                <h3 style={{ fontSize: '28px', lineHeight: '1.2', marginBottom: '8px' }}>
                  {SEED_BEREANS_BOOK.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--gold-dim)', marginBottom: '18px' }}>
                  By {SEED_BEREANS_BOOK.author} · {SEED_BEREANS_BOOK.totalChapters} Chapters
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7', marginBottom: '28px' }}>
                  {SEED_BEREANS_BOOK.description}
                </p>

                <h4 style={{ fontSize: '16px', color: 'var(--gold-bright)', marginBottom: '12px' }}>Upcoming Virtual Sessions</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {SEED_BEREANS_BOOK.meetings.map((m, idx) => (
                    <div key={idx} style={{
                      padding: '12px 16px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--line-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '13px'
                    }}>
                      <Calendar size={16} color="var(--gold-primary)" />
                      <div>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{m.title}</span>
                        <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '12px' }}>{m.date} · {m.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--line-dark)',
                padding: '24px',
                borderRadius: 'var(--radius-sm)'
              }}>
                <h4 style={{ fontSize: '16px', color: 'var(--text-primary)', marginBottom: '16px' }}>Weekly Schedule Preview</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {SEED_BEREANS_BOOK.schedule.map(sch => (
                    <div key={sch.week} style={{ paddingBottom: '12px', borderBottom: '1px solid var(--line-subtle)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 700, color: 'var(--gold-bright)' }}>Week {sch.week}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Due: {sch.dueDate}</span>
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--text-primary)', marginBottom: '4px' }}>{sch.chapters}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic' }}>&ldquo;{sch.prompt}&rdquo;</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/bereans/apply" className="btn btn-gold">
              <span>Submit Application for Next Cohort</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
