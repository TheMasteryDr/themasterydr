'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, User, ChevronRight } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change & prevent background body scrolling
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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
    <>
      <header className="site-header" style={{
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.85)' : 'none',
        borderBottomColor: scrolled ? '#2E2E2E' : 'var(--line-dark)'
      }}>
        <div className="nav-wrap">
          {/* PBD Wordmark Header */}
          <Link href="/" className="wordmark-pbd">
            <span>MOSES</span>
            <span className="red">OLADOYE</span>
            <span className="sub-tag" style={{ marginLeft: '6px' }}>/ THE MASTERY DR</span>
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
                    color: isActive ? 'var(--pbd-red)' : undefined
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div style={{ display: 'none', alignItems: 'center', gap: '12px' }} className="desktop-actions">
            <Link
              href="/dashboard"
              className="c-btn c-btn--dark"
              style={{ padding: '9px 16px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <User size={13} />
              <span>Portal</span>
            </Link>
            <Link
              href="/institute"
              className="c-btn c-btn--red"
              style={{ padding: '9px 20px', fontSize: '11px' }}
            >
              <span>Explore Institute</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            style={{
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className="mobile-toggle"
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* Bulletproof Full-Screen Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100dvh',
            backgroundColor: '#0A0A0A',
            zIndex: 999999,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* Top Bar inside Overlay */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px var(--edge)',
            borderBottom: '1px solid #1E1E1E',
            flexShrink: 0,
            background: '#0A0A0A'
          }}>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="wordmark-pbd"
            >
              <span>MOSES</span>
              <span className="red">OLADOYE</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              style={{
                background: '#1A1A1A',
                border: '1px solid #333333',
                color: '#FFFFFF',
                width: '40px',
                height: '40px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={22} color="var(--pbd-red)" />
            </button>
          </div>

          {/* Nav List */}
          <div style={{
            padding: '24px var(--edge)',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            flex: 1
          }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: '24px',
                    fontFamily: 'var(--font-hero)',
                    letterSpacing: '0.04em',
                    color: isActive ? 'var(--pbd-red)' : '#FFFFFF',
                    padding: '14px 0',
                    borderBottom: '1px solid #161616',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textTransform: 'uppercase'
                  }}
                >
                  <span>{link.label}</span>
                  {isActive ? (
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--pbd-red)' }}></span>
                  ) : (
                    <ChevronRight size={18} color="#444444" />
                  )}
                </Link>
              );
            })}

            {/* Mobile Actions in Drawer */}
            <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '36px' }}>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="c-btn c-btn--dark"
                style={{ width: '100%', padding: '14px', fontSize: '12px' }}
              >
                <User size={16} />
                <span>Student / Member Portal</span>
              </Link>
              <Link
                href="/institute"
                onClick={() => setMobileMenuOpen(false)}
                className="c-btn c-btn--red"
                style={{ width: '100%', padding: '14px', fontSize: '12px' }}
              >
                <span>Explore Gain Mastery Institute</span>
              </Link>
            </div>
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
    </>
  );
};
