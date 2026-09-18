'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, User, Sparkles, ChevronRight } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/institute', label: 'Institute' },
    { href: '/bereans', label: 'The Bereans' },
    { href: '/speaking', label: 'Speaking' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/resources', label: 'Resources' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="site-header" style={{
      boxShadow: scrolled ? '0 12px 36px rgba(0,0,0,0.6)' : 'none',
      borderBottomColor: scrolled ? 'var(--gold-border-bright)' : 'var(--line-dark)'
    }}>
      {/* 1. Tony Robbins & PBD Style Urgent Announcement Bar */}
      {showAnnouncement && (
        <div style={{
          background: 'linear-gradient(90deg, #1A1308 0%, #3D2B10 50%, #1A1308 100%)',
          borderBottom: '1px solid rgba(199, 162, 75, 0.35)',
          padding: '7px var(--edge)',
          fontSize: '11px',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          letterSpacing: '0.04em'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{
              background: 'var(--gold-primary)',
              color: '#070605',
              padding: '1px 6px',
              borderRadius: '2px',
              fontWeight: 700,
              fontSize: '9.5px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Sparkles size={10} />
              Live
            </span>
            <span>2026 Gain Mastery Institute Cohort Admissions Open</span>
            <span style={{ color: 'var(--gold-border)' }}>|</span>
            <Link
              href="/institute"
              style={{
                color: 'var(--gold-bright)',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                textDecoration: 'underline',
                textUnderlineOffset: '3px'
              }}
            >
              <span>Explore Programs &amp; Enroll</span>
              <ChevronRight size={12} />
            </Link>
          </div>

          <button
            onClick={() => setShowAnnouncement(false)}
            aria-label="Dismiss announcement"
            style={{
              position: 'absolute',
              right: '16px',
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* 2. Main Navigation Bar */}
      <div className="nav-wrap">
        {/* Brand Wordmark with Luxury Gold Monogram Badge */}
        <Link href="/" className="wordmark" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            border: '1.5px solid var(--gold-primary)',
            background: 'linear-gradient(145deg, rgba(199, 162, 75, 0.15), rgba(7, 6, 5, 0.9))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '15px',
            color: 'var(--gold-bright)',
            boxShadow: '0 0 14px var(--gold-glow)'
          }}>
            MD
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              The Mastery Dr
            </div>
            <span className="sub" style={{ display: 'block', fontSize: '8.5px', letterSpacing: '0.2em' }}>
              MOSES OLADOYE
            </span>
          </div>
        </Link>

        {/* Desktop Primary Navigation */}
        <nav className="main-nav" style={{ display: 'none' }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{
                  color: isActive ? 'var(--gold-bright)' : undefined,
                  fontWeight: isActive ? 700 : 500
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right CTA Group */}
        <div style={{ display: 'none', alignItems: 'center', gap: '14px' }} className="desktop-actions">
          <Link
            href="/dashboard"
            className="btn btn-ghost btn-sm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.06em'
            }}
          >
            <User size={13} color="var(--gold-primary)" />
            <span>Portal</span>
          </Link>
          <Link href="/institute" className="btn btn-gold btn-sm">
            <span>Explore LMS</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '8px',
            display: 'block'
          }}
          className="mobile-toggle"
        >
          {mobileMenuOpen ? <X size={24} color="var(--gold-bright)" /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: showAnnouncement ? '112px' : '73px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(7, 6, 5, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '24px var(--edge)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            overflowY: 'auto',
            borderTop: '1px solid var(--line-dark)',
            zIndex: 99
          }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '18px',
                  fontFamily: 'var(--font-display)',
                  color: isActive ? 'var(--gold-bright)' : 'var(--text-primary)',
                  padding: '10px 0',
                  borderBottom: '1px solid var(--line-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{link.label}</span>
                {isActive && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold-primary)' }}></span>}
              </Link>
            );
          })}
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/dashboard" className="btn btn-outline" style={{ width: '100%' }}>
              <User size={16} color="var(--gold-primary)" />
              <span>Student / Member Portal</span>
            </Link>
            <Link href="/institute" className="btn btn-gold" style={{ width: '100%' }}>
              <span>Explore Gain Mastery Institute</span>
            </Link>
          </div>
        </div>
      )}

      {/* Responsive Breakpoint CSS */}
      <style jsx>{`
        @media (min-width: 1024px) {
          nav.main-nav {
            display: flex !important;
          }
          .desktop-actions {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
