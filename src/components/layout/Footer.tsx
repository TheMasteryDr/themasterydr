'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle2, Instagram, Facebook, Disc as TikTok, MessageSquare, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail('');
      }
    } catch {
      setSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="site-footer">
      <div className="wrap">
        {/* Top Newsletter & Dispatch Banner */}
        <div className="footer-newsletter-banner">
          <div className="newsletter-copy">
            <span className="pill-badge amber">
              <span className="indicator-dot" /> The Mastery Dispatch
            </span>
            <h3>Strategic thinking, purpose, and financial intelligence in your inbox.</h3>
            <p>Join over 3,000+ builders receiving rigorous bi-weekly insights from Moses Oladoye.</p>
          </div>
          <div className="newsletter-form-wrap">
            {subscribed ? (
              <div className="subscribe-success">
                <CheckCircle2 size={18} className="icon-emerald" />
                <span>You are subscribed to the Mastery Dispatch. Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="subscribe-form">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your executive or personal email"
                  required
                  className="subscribe-input"
                />
                <button type="submit" disabled={loading} className="btn btn-primary btn-sm">
                  {loading ? 'Subscribing...' : 'Subscribe'} <Send size={13} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Columns Grid */}
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <Link href="/" className="brand-logo">
              <div className="brand-symbol">
                <span>M</span>
              </div>
              <div className="brand-identity">
                <span className="brand-name">The Mastery Dr</span>
                <span className="brand-tag">EXECUTIVE ACADEMY</span>
              </div>
            </Link>

            <p className="brand-creed">
              &ldquo;No one is empty, everyman is designed for something great, that greatness just needs to find expression.&rdquo;
            </p>
            <div className="brand-author">— Moses Oladoye, Head Growth Coach</div>

            <div className="social-pills-row">
              <a href="https://instagram.com/themasterydr" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="Instagram">
                <Instagram size={15} />
              </a>
              <a href="https://tiktok.com/@themasterydr" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="TikTok">
                <TikTok size={15} />
              </a>
              <a href="https://facebook.com/themasterydr" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="Facebook">
                <Facebook size={15} />
              </a>
              <a href="https://t.me/masterymasterminds" target="_blank" rel="noopener noreferrer" className="social-pill telegram" aria-label="Telegram Community">
                <MessageSquare size={15} />
              </a>
            </div>
          </div>

          {/* Ecosystem Column */}
          <div className="footer-col">
            <h5 className="col-heading">Ecosystem</h5>
            <ul className="footer-links">
              <li><Link href="/about">About Moses Oladoye</Link></li>
              <li><Link href="/speaking">Speaking &amp; Teaching</Link></li>
              <li><Link href="/courses">Gain Mastery Institute</Link></li>
              <li><Link href="/bereans">The Bereans Community</Link></li>
              <li><Link href="/reviews">Reviews &amp; Proof</Link></li>
              <li><Link href="/resources">Field Notes</Link></li>
              <li><Link href="/contact">Inquiries &amp; Booking</Link></li>
            </ul>
          </div>

          {/* Programs Column */}
          <div className="footer-col">
            <h5 className="col-heading">Curriculum Tracks</h5>
            <ul className="footer-links">
              <li><Link href="/courses/foundations-of-personal-mastery">Personal Mastery (Free)</Link></li>
              <li><Link href="/courses/six-dimensions-strategic-growth">Six Dimensions Executive</Link></li>
              <li><Link href="/courses/financial-intelligence-market-mastery">Financial Intelligence</Link></li>
              <li><Link href="/verify">Verify Certificate</Link></li>
              <li><Link href="/initiatives/mighty-men-of-mastery">Mighty Men of Mastery</Link></li>
              <li>
                <a href="https://t.me/masterymasterminds" target="_blank" rel="noopener noreferrer" className="external-link">
                  <span>Telegram Mastermind</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Dimensions Framework Column */}
          <div className="footer-col">
            <h5 className="col-heading">Six Dimensions</h5>
            <ul className="footer-links">
              <li><Link href="/#framework">I. Purpose &amp; Mandate</Link></li>
              <li><Link href="/#framework">II. Personal Growth Systems</Link></li>
              <li><Link href="/#framework">III. Financial Intelligence</Link></li>
              <li><Link href="/#framework">IV. Moral Leadership</Link></li>
              <li><Link href="/#framework">V. Spiritual Grounding</Link></li>
              <li><Link href="/#framework">VI. Strategy &amp; Execution</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="operational-status">
            <span className="status-dot" />
            <span>Digital Learning Infrastructure Operational</span>
          </div>

          <div className="copyright-text">
            &copy; {new Date().getFullYear()} The Mastery Dr &bull; Gain Mastery Institute. All rights reserved.
          </div>

          <div className="legal-links">
            <Link href="/privacy">Privacy Policy</Link>
            <span className="dot-sep">&bull;</span>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          background: var(--bg-subtle);
          border-top: 1px solid var(--border-subtle);
          padding: 80px 0 36px;
          margin-top: auto;
          position: relative;
        }

        /* Newsletter Banner */
        .footer-newsletter-banner {
          background: var(--bg-card);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-xl);
          padding: 40px 48px;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          align-items: center;
          margin-bottom: 64px;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
        }
        .newsletter-copy h3 {
          font-size: clamp(20px, 2.2vw, 28px);
          margin-top: 12px;
          margin-bottom: 8px;
          line-height: 1.3;
        }
        .newsletter-copy p {
          color: var(--text-secondary);
          font-size: 14.5px;
          line-height: 1.6;
        }
        .subscribe-form {
          display: flex;
          gap: 10px;
        }
        .subscribe-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-sm);
          padding: 12px 18px;
          font-family: var(--font-sans);
          font-size: 14px;
          color: var(--text-primary);
          outline: none;
          transition: border-color var(--transition-fast);
        }
        .subscribe-input:focus {
          border-color: var(--accent-amber);
        }
        .subscribe-success {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: var(--accent-emerald);
          padding: 14px 20px;
          border-radius: var(--radius-sm);
          font-size: 14px;
          font-weight: 500;
        }
        .icon-emerald {
          color: var(--accent-emerald);
        }

        /* Grid */
        .footer-grid {
          display: grid;
          grid-template-columns: 1.3fr 0.9fr 0.9fr 0.9fr;
          gap: 48px;
          margin-bottom: 60px;
        }

        /* Brand Logo in Footer */
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .brand-symbol {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.18) 0%, rgba(99, 102, 241, 0.18) 100%);
          border: 1px solid var(--border-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 18px;
          color: var(--accent-amber-light);
        }
        .brand-identity {
          display: flex;
          flex-direction: column;
        }
        .brand-name {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .brand-tag {
          font-family: var(--font-mono);
          font-size: 8.5px;
          letter-spacing: 0.14em;
          color: var(--accent-amber);
          font-weight: 600;
        }

        .brand-creed {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 10px;
          font-style: italic;
        }
        .brand-author {
          font-size: 12px;
          font-family: var(--font-mono);
          color: var(--accent-amber);
          margin-bottom: 24px;
        }

        .social-pills-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .social-pill {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }
        .social-pill:hover {
          color: var(--accent-amber-light);
          border-color: var(--accent-amber);
          background: rgba(245, 158, 11, 0.1);
          transform: translateY(-2px);
        }
        .social-pill.telegram:hover {
          color: var(--accent-cyan);
          border-color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.1);
        }

        .col-heading {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 20px;
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-links a {
          font-size: 14px;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }
        .footer-links a:hover {
          color: var(--text-primary);
          padding-left: 2px;
        }
        .external-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        /* Bottom Strip */
        .footer-bottom {
          padding-top: 32px;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          color: var(--text-muted);
          flex-wrap: wrap;
          gap: 16px;
        }
        .operational-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-secondary);
        }
        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-emerald);
          box-shadow: 0 0 8px var(--accent-emerald);
        }
        .legal-links {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .legal-links a:hover {
          color: var(--text-primary);
        }
        .dot-sep {
          color: var(--text-muted);
        }

        @media (max-width: 992px) {
          .footer-newsletter-banner {
            grid-template-columns: 1fr;
            padding: 32px 24px;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .subscribe-form {
            flex-direction: column;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
