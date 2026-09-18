'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, AlertCircle, ArrowRight, Loader2, BookOpen } from 'lucide-react';

function VerifyContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const slug = searchParams.get('slug');

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [courseTitle, setCourseTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reference) {
      setError('Missing transaction reference.');
      setLoading(false);
      return;
    }

    const verifyTransaction = async () => {
      try {
        const res = await fetch(`/api/v1/payments/verify?reference=${reference}&slug=${slug || ''}`);
        const data = await res.json();

        if (res.ok && data.success) {
          setVerified(true);
          setCourseTitle(data.courseTitle);
        } else {
          setError(data.error || 'Payment verification could not be completed.');
        }
      } catch (err: any) {
        setError(err.message || 'Verification network error.');
      } finally {
        setLoading(false);
      }
    };

    verifyTransaction();
  }, [reference, slug]);

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', padding: '70px 0 100px' }}>
      <div className="wrap" style={{ maxWidth: '640px' }}>
        <div className="luxury-card" style={{ padding: '48px 36px', textAlign: 'center' }}>
          {loading && (
            <div>
              <Loader2 size={44} color="var(--gold-primary)" className="animate-spin" style={{ margin: '0 auto 20px' }} />
              <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Verifying Transaction with Paystack...</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
                Please do not close this window. We are confirming your payment and generating your enrollment record.
              </p>
            </div>
          )}

          {!loading && verified && (
            <div>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--gold-surface)',
                border: '2px solid var(--gold-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                color: 'var(--gold-bright)'
              }}>
                <CheckCircle2 size={36} />
              </div>

              <span className="badge badge-gold" style={{ marginBottom: '14px' }}>Payment Confirmed</span>
              <h1 style={{ fontSize: '28px', marginBottom: '14px' }}>Enrollment Complete!</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15.5px', lineHeight: '1.7', marginBottom: '24px' }}>
                Your enrollment in <strong>{courseTitle || 'your masterclass'}</strong> has been successfully registered. You now have full lifetime access.
              </p>

              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--line-dark)',
                padding: '16px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '32px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-muted)'
              }}>
                TRANSACTION REF: <span style={{ color: 'var(--gold-bright)' }}>{reference}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <Link href={`/dashboard/course/${slug || 'architecture-of-intentional-growth'}`} className="btn btn-gold">
                  <BookOpen size={16} />
                  <span>Enter Course Classroom</span>
                </Link>
                <Link href="/dashboard" className="btn btn-outline">
                  <span>Student Dashboard</span>
                </Link>
              </div>
            </div>
          )}

          {!loading && error && (
            <div>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(155, 34, 38, 0.2)',
                border: '2px solid var(--status-error)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                color: '#FFB4A2'
              }}>
                <AlertCircle size={36} />
              </div>

              <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Verification Unsuccessful</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '28px' }}>
                {error}
              </p>

              <Link href="/institute" className="btn btn-outline">
                <ArrowRight size={14} />
                <span>Return to Course Catalog</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutVerifyPage() {
  return (
    <Suspense fallback={
      <div style={{ padding: '100px 0', textAlign: 'center', color: 'var(--gold-primary)' }}>
        Loading payment verification...
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
