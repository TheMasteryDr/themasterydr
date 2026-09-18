'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, ArrowUpRight, CheckCircle2, MessageCircle, ArrowUp, ShieldCheck, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--line-dark)',
      padding: '80px 0 36px',
      position: 'relative'
    }}>
      <div className="wrap">
        {/* Mel Robbins & PBD Style "The Mastery Dispatch" VIP Newsletter Module */}
        <div style={{
          background: 'linear-gradient(135deg, #13100C 0%, #1B1610 100%)',
          border: '1px solid var(--gold-border)',
          padding: '48px var(--edge)',
          marginBottom: '64px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 48px rgba(0,0,0,0.5)'
        }}>
          {/* Subtle Ambient Radial Glow */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(199, 162, 75, 0.12) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}></div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{ maxWidth: '560px' }}>
              <div className="eyebrow" style={{ marginBottom: '10px' }}>
                <span>The Mastery Dispatch · Weekly VIP Letter</span>
              </div>
              <h3 style={{ fontSize: 'clamp(22px, 2.6vw, 32px)', lineHeight: '1.2', color: 'var(--text-primary)' }}>
                One honest letter on discipline, strategic execution, and purpose.
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginTop: '10px', lineHeight: '1.65' }}>
                Join 1,000+ intentional minds worldwide. Includes immediate access to Moses Oladoye&apos;s <em>&ldquo;Six Dimensions of Mastery&rdquo;</em> self-assessment blueprint. No spam or vanity advice.
              </p>
            </div>

            <div style={{ flex: '1', minWidth: '280px', maxWidth: '440px' }}>
              {subscribed ? (
                <div style={{
                  background: 'rgba(27, 67, 50, 0.4)',
                  border: '1px solid var(--emerald-bright)',
                  padding: '18px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#A7F3D0',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12.5px'
                }}>
                  <CheckCircle2 size={22} color="#34D399" />
                  <div>
                    <div style={{ fontWeight: 700 }}>You are officially on the Dispatch list.</div>
                    <div style={{ fontSize: '11px', opacity: 0.85, marginTop: '2px' }}>Check your inbox for your welcome framework.</div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleNewsletter}>
                  <div style={{
                    display: 'flex',
                    background: 'rgba(7, 6, 5, 0.8)',
                    border: '1px solid var(--gold-border)',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    transition: 'var(--transition)'
                  }}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your private email address"
                      required
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        padding: '14px 16px',
                        outline: 'none'
                      }}
                    />
                    <button
                      type="submit"
                      className="btn-gold"
                      style={{
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '0 22px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontWeight: 700
                      }}
                    >
                      <span>Join</span>
                      <Send size={12} />
                    </button>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--text-muted)'
                  }}>
                    <ShieldCheck size={12} color="var(--gold-primary)" />
                    <span>Strict confidentiality. Unsubscribe at any time with one click.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div style={{
          display: 'grid',
          gap: '48px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          paddingBottom: '54px',
          borderBottom: '1px solid var(--line-dark)'
        }}>
          {/* Brand Column */}
          <div style={{ maxWidth: '340px' }}>
            <Link href="/" className="wordmark" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                border: '1.5px solid var(--gold-primary)',
                background: 'linear-gradient(145deg, rgba(199, 162, 75, 0.15), rgba(7, 6, 5, 0.9))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '14px',
                color: 'var(--gold-bright)'
              }}>
                MD
              </div>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  The Mastery Dr
                </div>
                <span className="sub" style={{ display: 'block', fontSize: '8.5px', letterSpacing: '0.2em' }}>
                  MOSES OLADOYE
                </span>
              </div>
            </Link>

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '14px',
              marginTop: '18px',
              lineHeight: '1.65'
            }}>
              A comprehensive personal brand and educational ecosystem committed to moving individuals from stagnation to clarity, consistent growth, and purposeful impact.
            </p>

            <div style={{ marginTop: '22px' }}>
              <a
                href="https://t.me/masterymasterminds"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}
              >
                <MessageCircle size={14} color="var(--gold-primary)" />
                <span>The Mastery Masterminds (Telegram)</span>
              </a>
            </div>
          </div>

          {/* Navigation Column 1: Ecosystem */}
          <div>
            <h5 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--gold-primary)',
              marginBottom: '18px'
            }}>
              Ecosystem
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px' }}>
              <Link href="/about" style={{ color: 'var(--text-secondary)' }}>About Moses Oladoye</Link>
              <Link href="/institute" style={{ color: 'var(--text-secondary)' }}>Gain Mastery Institute</Link>
              <Link href="/bereans" style={{ color: 'var(--text-secondary)' }}>The Bereans Reading Club</Link>
              <Link href="/speaking" style={{ color: 'var(--text-secondary)' }}>Speaking Engagements</Link>
              <Link href="/mighty-men" style={{ color: 'var(--text-muted)' }}>Mighty Men of Mastery (Private)</Link>
            </div>
          </div>

          {/* Navigation Column 2: Knowledge & Proof */}
          <div>
            <h5 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--gold-primary)',
              marginBottom: '18px'
            }}>
              Knowledge &amp; Trust
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px' }}>
              <Link href="/resources" style={{ color: 'var(--text-secondary)' }}>Articles &amp; Field Notes</Link>
              <Link href="/resources" style={{ color: 'var(--text-secondary)' }}>Video &amp; Audio Teachings</Link>
              <Link href="/reviews" style={{ color: 'var(--text-secondary)' }}>Public Reviews &amp; Stories</Link>
              <Link href="/verify/certificate/sample" style={{ color: 'var(--text-secondary)' }}>Certificate Verification</Link>
              <Link href="/contact" style={{ color: 'var(--text-secondary)' }}>Coaching Inquiry</Link>
            </div>
          </div>

          {/* Navigation Column 3: Presence */}
          <div>
            <h5 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--gold-primary)',
              marginBottom: '18px'
            }}>
              Official Channels
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px' }}>
              <a
                href="https://instagram.com/themasterydr"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>Instagram — @themasterydr</span>
                <ArrowUpRight size={13} color="var(--gold-primary)" />
              </a>
              <a
                href="https://youtube.com/@themasterydr"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>YouTube — @themasterydr</span>
                <ArrowUpRight size={13} color="var(--gold-primary)" />
              </a>
              <a
                href="https://tiktok.com/@themasterydr"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>TikTok — @themasterydr</span>
                <ArrowUpRight size={13} color="var(--gold-primary)" />
              </a>
              <a
                href="mailto:moses@gainmastery.org"
                style={{ color: 'var(--gold-bright)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Mail size={13} />
                <span>moses@gainmastery.org</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Metadata, Copyright & Back to Top */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          paddingTop: '28px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--text-muted)',
          letterSpacing: '0.04em'
        }}>
          <div>
            <span>© {new Date().getFullYear()} THE MASTERY DR. MOSES OLADOYE. ALL RIGHTS RESERVED.</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span>LAGOS · LONDON · GLOBAL DIASPORA</span>
            <button
              onClick={scrollToTop}
              style={{
                background: 'rgba(199, 162, 75, 0.1)',
                border: '1px solid var(--gold-border)',
                color: 'var(--gold-bright)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '10.5px',
                transition: 'var(--transition)'
              }}
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
