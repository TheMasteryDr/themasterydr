'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, User } from 'lucide-react';

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
      boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.8)' : 'none',
      borderBottomColor: scrolled ? '#2E2E2E' : 'var(--line-dark)'
    }}>
      <div className="nav-wrap">
        {/* PBD Exact Wordmark Header */}
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

        {/* Desktop Right CTA (PBD Buttons) */}
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
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            background: 'none',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: '8px',
            display: 'block'
          }}
          className="mobile-toggle"
        >
          {mobileMenuOpen ? <X size={26} color="var(--pbd-red)" /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '74px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(10, 10, 10, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '28px var(--edge)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
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
                  fontSize: '22px',
                  fontFamily: 'var(--font-hero)',
                  letterSpacing: '0.04em',
                  color: isActive ? 'var(--pbd-red)' : '#FFFFFF',
                  padding: '10px 0',
                  borderBottom: '1px solid var(--line-dark)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{link.label}</span>
                {isActive && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--pbd-red)' }}></span>}
              </Link>
            );
          })}
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/dashboard" className="c-btn c-btn--dark" style={{ width: '100%' }}>
              <User size={16} />
              <span>Student / Member Portal</span>
            </Link>
            <Link href="/institute" className="c-btn c-btn--red" style={{ width: '100%' }}>
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
