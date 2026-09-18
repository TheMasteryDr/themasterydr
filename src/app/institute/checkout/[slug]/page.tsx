'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { ShieldCheck, Lock, CheckCircle2, ArrowLeft, Tag, AlertCircle } from 'lucide-react';
import { SEED_COURSES } from '@/lib/data/seed-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CheckoutPage({ params }: PageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const course = SEED_COURSES.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    couponCode: '',
  });

  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const originalPrice = course.price;
  const discountedPrice = appliedDiscount
    ? originalPrice * (1 - appliedDiscount.percent / 100)
    : originalPrice;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = formData.couponCode.trim().toUpperCase();

    if (code === 'MASTERY20') {
      setAppliedDiscount({ code: 'MASTERY20', percent: 20 });
    } else if (code === 'GROWTH50') {
      setAppliedDiscount({ code: 'GROWTH50', percent: 50 });
    } else {
      setCouponError('Invalid or expired coupon code. Try MASTERY20.');
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/v1/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseSlug: course.slug,
          email: formData.email,
          fullName: formData.fullName,
          couponCode: appliedDiscount?.code,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Payment initialization failed');
      }

      if (data.isFree) {
        router.push(data.redirectUrl);
      } else if (data.authorizationUrl) {
        // Live Paystack redirect
        window.location.href = data.authorizationUrl;
      } else if (data.isSandbox && data.callbackUrl) {
        // Development sandbox simulation
        router.push(data.callbackUrl);
      }
    } catch (err: any) {
      setError(err.message || 'Payment initiation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', padding: '50px 0 90px' }}>
      <div className="wrap" style={{ maxWidth: '960px' }}>
        <div style={{ marginBottom: '32px' }}>
          <Link href={`/institute/course/${course.slug}`} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-muted)',
            fontSize: '13px',
            fontFamily: 'var(--font-mono)'
          }}>
            <ArrowLeft size={14} />
            <span>Return to Course Overview</span>
          </Link>
        </div>

        <h1 style={{ fontSize: 'clamp(28px, 3.8vw, 42px)', marginBottom: '36px' }}>
          Complete Your Enrollment
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'start'
        }}>
          {/* Left Form: Student Account & Payment details */}
          <form onSubmit={handlePayment} className="luxury-card" style={{ padding: '36px' }}>
            <h2 style={{ fontSize: '20px', color: 'var(--gold-bright)', marginBottom: '22px' }}>
              1. Student Details
            </h2>

            {error && (
              <div style={{
                backgroundColor: 'rgba(155, 34, 38, 0.2)',
                border: '1px solid var(--status-error)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#FFB4A2',
                fontSize: '13.5px'
              }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. John Emmanuel"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address (for course access &amp; certificate) *</label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@gmail.com"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+234 800 000 0000"
                className="form-input"
              />
            </div>

            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--line-dark)',
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              margin: '24px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '13px',
              color: 'var(--text-secondary)'
            }}>
              <ShieldCheck size={20} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
              <span>Payments are processed securely via Paystack with 256-bit bank-grade encryption.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-gold"
              style={{ width: '100%', padding: '16px' }}
            >
              <Lock size={15} />
              <span>{loading ? 'Initiating Gateway...' : course.isFree ? 'Confirm Free Enrollment' : `Pay ₦${discountedPrice.toLocaleString()} via Paystack`}</span>
            </button>
          </form>

          {/* Right Column: Order Summary & Coupon */}
          <div>
            <div className="luxury-card" style={{ padding: '32px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '19px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--line-dark)' }}>
                Order Summary
              </h3>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontWeight: 600, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {course.title}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                  {course.category} · {course.level}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: '14px', borderTop: '1px solid var(--line-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Masterclass Access</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>₦{originalPrice.toLocaleString()}</span>
              </div>

              {appliedDiscount && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: '14px', color: '#74C69D' }}>
                  <span>Coupon ({appliedDiscount.code} - {appliedDiscount.percent}%)</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>-₦{(originalPrice * appliedDiscount.percent / 100).toLocaleString()}</span>
                </div>
              )}

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '16px 0',
                borderTop: '1px solid var(--line-dark)',
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--gold-bright)'
              }}>
                <span>Total Due:</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>
                  {course.isFree || discountedPrice <= 0 ? 'FREE' : `₦${discountedPrice.toLocaleString()}`}
                </span>
              </div>

              {/* Coupon Form */}
              {!course.isFree && (
                <form onSubmit={handleApplyCoupon} style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--line-dark)' }}>
                  <label className="form-label" htmlFor="coupon">Have a Coupon Code?</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      id="coupon"
                      placeholder="e.g. MASTERY20"
                      value={formData.couponCode}
                      onChange={(e) => setFormData({ ...formData, couponCode: e.target.value })}
                      className="form-input"
                      style={{ textTransform: 'uppercase', fontSize: '13px', padding: '8px 12px' }}
                    />
                    <button type="submit" className="btn btn-outline btn-sm">
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <div style={{ fontSize: '12px', color: '#FFB4A2', marginTop: '6px' }}>{couponError}</div>
                  )}
                  {appliedDiscount && (
                    <div style={{ fontSize: '12px', color: '#74C69D', marginTop: '6px' }}>
                      Coupon applied successfully!
                    </div>
                  )}
                </form>
              )}
            </div>

            <div style={{ padding: '0 10px', fontSize: '13px', color: 'var(--text-muted)' }}>
              Need institutional invoice or corporate bank transfer? Email <span style={{ color: 'var(--gold-bright)' }}>moses@gainmastery.org</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
