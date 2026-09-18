'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, ArrowUpRight, CheckCircle2, MessageCircle } from 'lucide-react';

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

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--line-dark)',
      padding: '80px 0 36px',
      position: 'relative'
    }}>
      <div className="wrap">
        {/* Newsletter Callout */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--gold-border)',
          padding: '44px var(--edge)',
          marginBottom: '64px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '28px'
        }}>
          <div style={{ maxWidth: '520px' }}>
            <span className="eyebrow">The Mastery Dispatch</span>
            <h3 style={{ fontSize: '26px', marginTop: '12px' }}>
              One honest letter on growth, discipline, and purpose.
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginTop: '8px' }}>
              Sent periodically to determined minds worldwide. No spam or commercial flooding.
            </p>
          </div>

          <div style={{ flex: '1', minWidth: '280px', maxWidth: '440px' }}>
            {subscribed ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: 'var(--gold-bright)',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px'
              }}>
                <CheckCircle2 size={20} color="var(--gold-primary)" />
                <span>You are subscribed. Watch your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} style={{
                display: 'flex',
                borderBottom: '1.5px solid var(--gold-primary)',
                paddingBottom: '4px'
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
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14.5px',
                    padding: '8px 4px',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--gold-bright)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                  }}
                >
                  <span>Join</span>
                  <Send size={13} />
                </button>
              </form>
            )}
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
          {/* Brand Identity */}
          <div style={{ maxWidth: '340px' }}>
            <Link href="/" className="wordmark">
              The Mastery Dr
              <span className="sub">MOSES OLADOYE</span>
            </Link>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '14px',
              marginTop: '16px',
              lineHeight: '1.6'
            }}>
              A comprehensive personal brand and educational ecosystem committed to moving individuals from ignorance and stagnation to clarity, consistent growth, and purposeful impact.
            </p>
            <div style={{ marginTop: '20px' }}>
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

          {/* Navigation Column 1 */}
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

          {/* Navigation Column 2 */}
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

          {/* Navigation Column 3 */}
          <div>
            <h5 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--gold-primary)',
              marginBottom: '18px'
            }}>
              Official Presence
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
                style={{ color: 'var(--gold-bright)' }}
              >
                moses@gainmastery.org
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Copyright */}
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
            <span>© {new Date().getFullYear()} THE MASTERY DR. ALL RIGHTS RESERVED.</span>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>LAGOS, NIGERIA</span>
            <span>GAIN MASTERY INSTITUTE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
