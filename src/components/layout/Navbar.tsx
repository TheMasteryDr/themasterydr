'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, User, Shield, LogOut, BookOpen, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ fullName: string; email: string; roles: string[] } | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.user) {
          setUser({
            fullName: data.user.profile?.full_name || 'Member',
            email: data.user.email,
            roles: data.user.roles || [],
          });
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Invite', href: '/speaking' },
    { name: 'The Bereans', href: '/bereans' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    window.location.href = '/';
  };

  const isSuperAdmin = user?.roles?.includes('super_admin');

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Modern Brand Logo */}
        <Link href="/" className="brand-logo">
          <div className="brand-symbol">
            <span>M</span>
          </div>
          <div className="brand-identity">
            <span className="brand-name">The Mastery Dr</span>
            <span className="brand-tag">EXECUTIVE ACADEMY</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {link.name}
                {isActive && <span className="active-dot" />}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="header-actions">
          {user ? (
            <div className="user-nav-group">
              {isSuperAdmin ? (
                <Link href="/admin" className="btn btn-secondary btn-sm">
                  <Shield size={14} className="icon-gold" /> Admin Console
                </Link>
              ) : (
                <Link href="/dashboard" className="btn btn-secondary btn-sm">
                  <BookOpen size={14} className="icon-gold" /> Student Portal
                </Link>
              )}
              <button onClick={handleLogout} className="btn-logout" title="Sign Out">
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <div className="guest-nav-group">
              <Link href="/login" className="login-link">
                Sign In
              </Link>
              <Link href="/courses" className="btn btn-primary btn-sm btn-pill">
                Explore Programs <ArrowRight size={13} />
              </Link>
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="mobile-drawer">
          <div className="mobile-links">
            {navLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`mobile-nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                <span>{link.name}</span>
                {pathname === link.href && <span className="active-pill">Current</span>}
              </Link>
            ))}
            <div className="mobile-divider" />
            {user ? (
              <div className="mobile-auth-actions">
                {isSuperAdmin ? (
                  <Link href="/admin" onClick={() => setIsOpen(false)} className="btn btn-secondary" style={{ width: '100%' }}>
                    <Shield size={16} /> Super Admin Console
                  </Link>
                ) : (
                  <Link href="/dashboard" onClick={() => setIsOpen(false)} className="btn btn-secondary" style={{ width: '100%' }}>
                    <BookOpen size={16} /> Student Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="btn-logout-mobile" style={{ width: '100%', marginTop: '10px' }}>
                  <LogOut size={16} /> Sign Out ({user.fullName})
                </button>
              </div>
            ) : (
              <div className="mobile-auth-actions">
                <Link href="/login" onClick={() => setIsOpen(false)} className="btn btn-secondary" style={{ width: '100%' }}>
                  Sign In to Account
                </Link>
                <Link href="/courses" onClick={() => setIsOpen(false)} className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                  Explore All Programs
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(7, 9, 14, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-subtle);
          transition: all var(--transition-smooth);
        }
        .site-header.scrolled {
          background: rgba(7, 9, 14, 0.92);
          border-bottom-color: var(--border-glass);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .nav-container {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 14px var(--edge);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Modern Logo */
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .brand-symbol {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.18) 0%, rgba(99, 102, 241, 0.18) 100%);
          border: 1px solid var(--border-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 19px;
          color: var(--accent-amber-light);
          box-shadow: 0 0 16px rgba(245, 158, 11, 0.15);
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
          letter-spacing: -0.01em;
        }
        .brand-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.14em;
          color: var(--accent-amber);
          font-weight: 600;
        }

        /* Desktop Nav */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          padding: 4px 6px;
          border-radius: var(--radius-full);
        }
        .nav-link {
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-secondary);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all var(--transition-fast);
        }
        .nav-link:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }
        .nav-link.active {
          color: #FFF;
          background: rgba(255, 255, 255, 0.09);
          font-weight: 600;
        }
        .active-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent-amber);
          box-shadow: 0 0 6px var(--accent-amber);
        }

        /* Header Actions */
        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .guest-nav-group, .user-nav-group {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .login-link {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--text-secondary);
          padding: 6px 12px;
          transition: color var(--transition-fast);
        }
        .login-link:hover {
          color: var(--text-primary);
        }
        .btn-logout {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          width: 34px;
          height: 34px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .btn-logout:hover {
          color: var(--accent-rose);
          border-color: rgba(244, 63, 94, 0.3);
        }
        .icon-gold {
          color: var(--accent-amber);
        }

        /* Mobile Controls */
        .mobile-toggle {
          display: none;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          padding: 8px;
          border-radius: var(--radius-sm);
          cursor: pointer;
        }
        .mobile-drawer {
          display: none;
        }

        @media (max-width: 1024px) {
          .desktop-nav {
            display: none;
          }
          .mobile-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .mobile-drawer {
            display: block;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(11, 15, 25, 0.98);
            backdrop-filter: blur(24px);
            border-bottom: 1px solid var(--border-glass);
            padding: 24px var(--edge) 32px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
          }
          .mobile-links {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .mobile-nav-link {
            font-size: 16px;
            font-weight: 500;
            color: var(--text-secondary);
            padding: 12px 16px;
            border-radius: var(--radius-sm);
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: all var(--transition-fast);
          }
          .mobile-nav-link:hover, .mobile-nav-link.active {
            color: var(--text-primary);
            background: rgba(255, 255, 255, 0.06);
          }
          .active-pill {
            font-size: 11px;
            font-family: var(--font-mono);
            color: var(--accent-amber);
            background: rgba(245, 158, 11, 0.12);
            padding: 3px 8px;
            border-radius: var(--radius-full);
          }
          .mobile-divider {
            height: 1px;
            background: var(--border-subtle);
            margin: 12px 0;
          }
          .btn-logout-mobile {
            background: rgba(244, 63, 94, 0.1);
            border: 1px solid rgba(244, 63, 94, 0.2);
            color: var(--accent-rose);
            padding: 12px;
            border-radius: var(--radius-sm);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            cursor: pointer;
            font-weight: 600;
          }
        }
      `}</style>
    </header>
  );
}
