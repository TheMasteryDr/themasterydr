'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, User, Phone, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'signin' | 'register'>('signin');

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Status
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Authentication failed. Please verify credentials.');
      } else {
        setSuccessMsg('Authentication successful. Redirecting...');
        setTimeout(() => {
          if (data.user?.roles?.includes('super_admin')) {
            window.location.href = '/admin';
          } else {
            window.location.href = '/dashboard';
          }
        }, 800);
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
          phone_number: phoneNumber,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Registration failed.');
      } else {
        setSuccessMsg('Account created successfully. Redirecting to Student Portal...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 800);
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAdmin = () => {
    setMode('signin');
    setEmail('moses@themasterydr.com');
    setPassword('MasteryAdmin2026!');
    setErrorMsg('');
  };

  const fillDemoStudent = () => {
    setMode('signin');
    setEmail('student@example.com');
    setPassword('MasteryAdmin2026!');
    setErrorMsg('');
  };

  return (
    <div className="auth-page-root">
      <div className="wrap">
        <div className="auth-container">
          {/* Logo & Header */}
          <div className="auth-header">
            <Link href="/" className="brand-logo" style={{ justifyContent: 'center' }}>


            </Link>

            <h2>{mode === 'signin' ? 'Access Your Account' : 'Begin Your Mastery Track'}</h2>
            <p>
              {mode === 'signin'
                ? 'Sign in to access Gain Mastery Institute courses, curriculum tracking, and community deliberations.'
                : 'Create your student account to enroll in masterclasses and join our global network.'}
            </p>
          </div>
          {/* Mode Switcher Tabs */}
          <div className="auth-tabs">
            <button
              type="button"
              onClick={() => { setMode('signin'); setErrorMsg(''); }}
              className={`auth-tab-btn ${mode === 'signin' ? 'active' : ''}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMsg(''); }}
              className={`auth-tab-btn ${mode === 'register' ? 'active' : ''}`}
            >
              Create Account
            </button>
          </div>

          {/* Error / Success Notifications */}
          {errorMsg && (
            <div className="auth-alert error">
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="auth-alert success">
              <CheckCircle2 size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form Card */}
          <div className="bento-card auth-card">
            {mode === 'signin' ? (
              <form onSubmit={handleSignIn} className="auth-form">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="input-icon-wrap">
                    <Mail size={16} className="input-icon" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="form-input has-icon"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="label-row">
                    <label className="form-label">Password</label>
                    <span className="forgot-hint">Standard security: 6+ characters</span>
                  </div>
                  <div className="input-icon-wrap">
                    <Lock size={16} className="input-icon" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="form-input has-icon"
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '8px' }}>
                  {loading ? 'Authenticating...' : 'Sign In to Portal'} <ArrowRight size={15} />
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="auth-form">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <div className="input-icon-wrap">
                    <User size={16} className="input-icon" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="e.g. David Adeyemi"
                      className="form-input has-icon"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <div className="input-icon-wrap">
                    <Mail size={16} className="input-icon" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="form-input has-icon"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number (Optional)</label>
                  <div className="input-icon-wrap">
                    <Phone size={16} className="input-icon" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      placeholder="+234 800 000 0000"
                      className="form-input has-icon"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Create Password *</label>
                  <div className="input-icon-wrap">
                    <Lock size={16} className="input-icon" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="form-input has-icon"
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '8px' }}>
                  {loading ? 'Creating Account...' : 'Complete Registration'} <ArrowRight size={15} />
                </button>
              </form>
            )}

            {/* Quick-Fill Demo Credentials Helper */}
            <div className="demo-accounts-box">
              <span className="demo-title">
                <Sparkles size={12} className="icon-amber" /> Quick-Fill Demo Accounts:
              </span>
              <div className="demo-buttons">
                <button type="button" onClick={fillDemoAdmin} className="demo-pill-btn">
                  <span>Admin: moses@themasterydr.com</span>
                </button>
                <button type="button" onClick={fillDemoStudent} className="demo-pill-btn">
                  <span>Student: student@example.com</span>
                </button>
              </div>
            </div>
          </div>

          {/* Security Subnote */}
          <div className="auth-security-subnote">
            <ShieldCheck size={14} className="icon-emerald" />
            <span>256-bit encrypted HTTP-only session tokens &bull; Gain Mastery Institute</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .auth-page-root {
          padding: 60px 0 100px;
          min-height: calc(100vh - 120px);
          display: flex;
          align-items: center;
        }
        .auth-container {
          max-width: 480px;
          margin: 0 auto;
        }
        .auth-header {
          text-align: center;
          margin-bottom: 28px;
        }
        .auth-header h2 {
          font-size: clamp(26px, 3vw, 34px);
          margin-top: 20px;
          margin-bottom: 8px;
        }
        .auth-header p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Tabs */
        .auth-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 4px;
          margin-bottom: 20px;
        }
        .auth-tab-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-size: 13.5px;
          font-weight: 600;
          padding: 10px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .auth-tab-btn.active {
          background: var(--bg-card);
          color: var(--text-primary);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        /* Card */
        .auth-card {
          padding: 36px;
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .forgot-hint {
          font-size: 11px;
          color: var(--text-muted);
        }
        .form-label {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
        }
        .input-icon-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 14px;
          color: var(--text-muted);
          pointer-events: none;
        }
        .form-input.has-icon {
          padding-left: 42px;
        }
        .form-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          font-family: var(--font-sans);
          font-size: 14.5px;
          color: var(--text-primary);
          outline: none;
          transition: border-color var(--transition-fast);
        }
        .form-input:focus {
          border-color: var(--accent-amber);
        }

        /* Alerts */
        .auth-alert {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          font-size: 13.5px;
          margin-bottom: 16px;
        }
        .auth-alert.error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: #F87171;
        }
        .auth-alert.success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          color: var(--accent-emerald);
        }

        /* Demo Accounts Box */
        .demo-accounts-box {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .demo-title {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-amber-light);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .demo-buttons {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .demo-pill-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          color: var(--text-secondary);
          cursor: pointer;
          text-align: left;
          transition: all var(--transition-fast);
        }
        .demo-pill-btn:hover {
          background: rgba(245, 158, 11, 0.08);
          border-color: var(--accent-amber);
          color: var(--text-primary);
        }

        /* Subnote */
        .auth-security-subnote {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 20px;
        }

        @media (max-width: 600px) {
          .auth-card {
            padding: 24px 20px;
          }
        }
      `}</style>
    </div>
  );
}
