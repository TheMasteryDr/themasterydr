'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, ArrowUpRight, CheckCircle2, MessageCircle, ArrowUp, Mail, ShieldCheck } from 'lucide-react';

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
      background: '#070707',
      borderTop: '1px solid var(--line-dark)',
      padding: '80px 0 36px',
      position: 'relative'
    }}>
      <div className="wrap">
        {/* PBD Exact Newsletter / VIP Dispatch Box */}
        <div style={{
          background: '#121212',
          border: '1px solid #262626',
          padding: '48px var(--edge)',
          marginBottom: '64px',
          position: 'relative',
          borderRadius: 'var(--radius-sm)'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px'
          }}>
            <div style={{ maxWidth: '580px' }}>
              <div className="eyebrow" style={{ marginBottom: '10px' }}>
                <span>The Mastery Dispatch · Strategic Briefing</span>
              </div>
              <h3 style={{
                fontFamily: 'var(--font-hero)',
                fontSize: 'clamp(28px, 3.8vw, 44px)',
                lineHeight: '1.05',
                color: '#FFFFFF',
                letterSpacing: '0.02em'
              }}>
                Get The Strategic Playbook Sent Weekly.
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginTop: '10px', lineHeight: '1.65' }}>
                Direct, unfiltered letters on discipline, capital stewardship, purpose, and quarterly execution from Moses Oladoye. No fluff.
              </p>
            </div>

            <div style={{ flex: '1', minWidth: '280px', maxWidth: '440px' }}>
              {subscribed ? (
                <div style={{
                  background: 'rgba(207, 46, 46, 0.15)',
                  border: '1px solid var(--pbd-red)',
                  padding: '18px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px'
                }}>
                  <CheckCircle2 size={22} color="var(--pbd-red)" />
                  <div>
                    <div style={{ fontWeight: 700 }}>You are officially subscribed.</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Watch your inbox for your first strategic briefing.
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleNewsletter}>
                  <div style={{
                    display: 'flex',
                    background: '#0A0A0A',
                    border: '1px solid #333333',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden'
                  }}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        padding: '14px 16px',
                        outline: 'none'
                      }}
                    />
                    <button
                      type="submit"
                      className="c-btn c-btn--red"
                      style={{
                        border: 'none',
                        borderRadius: 0,
                        padding: '0 24px',
                        fontSize: '12px'
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
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    color: 'var(--text-muted)'
                  }}>
                    <ShieldCheck size={13} color="var(--pbd-red)" />
                    <span>Zero spam. Strict confidentiality. Unsubscribe anytime.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* PBD Multi-Column Footer Grid */}
        <div style={{
          display: 'grid',
          gap: '48px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          paddingBottom: '54px',
          borderBottom: '1px solid var(--line-dark)'
        }}>
          {/* Brand Info */}
          <div style={{ maxWidth: '320px' }}>
            <Link href="/" className="wordmark-pbd">
              <span>MOSES</span>
              <span className="red">OLADOYE</span>
            </Link>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '14px',
              marginTop: '16px',
              lineHeight: '1.65'
            }}>
              Personal development platform, Gain Mastery Institute, and strategic advisory dedicated to turning human potential into tested, expressed capacity.
            </p>
            <div style={{ marginTop: '20px' }}>
              <a
                href="https://t.me/masterymasterminds"
                target="_blank"
                rel="noopener noreferrer"
                className="c-btn c-btn--dark"
                style={{ fontSize: '11px', padding: '10px 16px', gap: '8px' }}
              >
                <MessageCircle size={14} color="var(--pbd-red)" />
                <span>Join Telegram Community</span>
              </a>
            </div>
          </div>

          {/* Column 1: Ecosystem */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-hero)',
              fontSize: '18px',
              letterSpacing: '0.04em',
              color: '#FFFFFF',
              marginBottom: '16px'
            }}>
              Ecosystem
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <Link href="/about" style={{ color: 'var(--text-secondary)' }}>About Moses Oladoye</Link>
              <Link href="/institute" style={{ color: 'var(--text-secondary)' }}>Gain Mastery Institute</Link>
              <Link href="/bereans" style={{ color: 'var(--text-secondary)' }}>The Bereans Reading Club</Link>
              <Link href="/speaking" style={{ color: 'var(--text-secondary)' }}>Keynote Engagements</Link>
              <Link href="/mighty-men" style={{ color: 'var(--text-muted)' }}>Mighty Men Fraternity</Link>
            </div>
          </div>

          {/* Column 2: Media & Resources */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-hero)',
              fontSize: '18px',
              letterSpacing: '0.04em',
              color: '#FFFFFF',
              marginBottom: '16px'
            }}>
              Media &amp; Blueprints
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <Link href="/resources" style={{ color: 'var(--text-secondary)' }}>Articles &amp; Field Notes</Link>
              <Link href="/resources" style={{ color: 'var(--text-secondary)' }}>Audio &amp; Video Sessions</Link>
              <Link href="/reviews" style={{ color: 'var(--text-secondary)' }}>What Leaders Say</Link>
              <Link href="/contact" style={{ color: 'var(--text-secondary)' }}>Advisory Inquiry</Link>
            </div>
          </div>

          {/* Column 3: Channels */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-hero)',
              fontSize: '18px',
              letterSpacing: '0.04em',
              color: '#FFFFFF',
              marginBottom: '16px'
            }}>
              Channels
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <a
                href="https://youtube.com/@themasterydr"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>YouTube</span>
                <ArrowUpRight size={13} color="var(--pbd-red)" />
              </a>
              <a
                href="https://instagram.com/themasterydr"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>Instagram</span>
                <ArrowUpRight size={13} color="var(--pbd-red)" />
              </a>
              <a
                href="https://tiktok.com/@themasterydr"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>TikTok</span>
                <ArrowUpRight size={13} color="var(--pbd-red)" />
              </a>
              <a
                href="mailto:moses@gainmastery.org"
                style={{ color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Mail size={13} color="var(--pbd-red)" />
                <span>moses@gainmastery.org</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          paddingTop: '28px',
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          color: 'var(--text-muted)'
        }}>
          <div>
            <span>&copy; {new Date().getFullYear()} Moses Oladoye. All rights reserved.</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span>LAGOS · LONDON · GLOBAL DIASPORA</span>
            <button
              onClick={scrollToTop}
              style={{
                background: '#1A1A1A',
                border: '1px solid #333333',
                color: '#FFFFFF',
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                transition: 'var(--transition)'
              }}
              aria-label="Back to top"
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
