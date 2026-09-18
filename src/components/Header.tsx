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
    { href: '/speaking', label: 'Speaking' },
    { href: '/institute', label: 'Gain Mastery Institute' },
    { href: '/bereans', label: 'The Bereans' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/resources', label: 'Resources' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="site-header" style={{
      boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.5)' : 'none',
      borderBottomColor: scrolled ? 'var(--gold-border)' : 'var(--line-dark)'
    }}>
      <div className="nav-wrap">
        <Link href="/" className="wordmark">
          The Mastery Dr
          <span className="sub">MOSES OLADOYE</span>
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
                style={{ color: isActive ? 'var(--gold-bright)' : undefined }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right CTA */}
        <div style={{ display: 'none', alignItems: 'center', gap: '16px' }} className="desktop-actions">
          <Link href="/dashboard" className="btn btn-ghost btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <User size={14} />
            <span>Portal</span>
          </Link>
          <Link href="/institute" className="btn btn-gold btn-sm">
            <span>Explore LMS</span>
            <ArrowRight size={13} />
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
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '73px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(7, 6, 5, 0.98)',
            backdropFilter: 'blur(16px)',
            padding: '30px var(--edge)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
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
                  padding: '8px 0',
                  borderBottom: '1px solid var(--line-subtle)'
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/dashboard" className="btn btn-outline" style={{ width: '100%' }}>
              <User size={16} />
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
