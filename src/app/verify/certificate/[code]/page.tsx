import React from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, CheckCircle2, Calendar, User, BookOpen, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ code: string }>;
}

export const metadata: Metadata = {
  title: 'Verify Certificate Authenticity — Gain Mastery Institute',
  description: 'Official public certificate verification portal for Gain Mastery Institute credentials.',
};

export default async function CertificateVerifyPage({ params }: PageProps) {
  const { code } = await params;

  // In production, queries the database `certificates` table
  const sampleCertificate = {
    certificateCode: code.toUpperCase(),
    studentFullName: 'Emmanuel O. Adeleke',
    courseTitle: 'The Architecture of Intentional Growth',
    issuedDate: 'September 14, 2026',
    instructorName: 'Moses Oladoye',
    instructorTitle: 'Head Growth Coach, Gain Mastery Institute',
    grade: 'Passed with Distinction (94%)',
    isValid: true,
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', padding: '60px 0 100px' }}>
      <div className="wrap" style={{ maxWidth: '760px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Official Verification Registry</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '14px 0 12px' }}>
            Credential Authenticity Verification
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            Gain Mastery Institute Cryptographic Verification System
          </p>
        </div>

        {/* Certificate Display Certificate Card */}
        <div className="luxury-card" style={{
          padding: '48px 40px',
          border: '2px solid var(--gold-primary)',
          backgroundColor: 'var(--bg-secondary)',
          position: 'relative'
        }}>
          {/* Top Verification Status Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: 'rgba(45, 106, 79, 0.25)',
            border: '1px solid #74C69D',
            color: '#74C69D',
            padding: '8px 18px',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            width: 'fit-content',
            margin: '0 auto 32px'
          }}>
            <ShieldCheck size={18} />
            <span>Official Valid Credential</span>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--gold-dim)', textTransform: 'uppercase' }}>
              GAIN MASTERY INSTITUTE
            </span>
            <h2 style={{ fontSize: '26px', margin: '8px 0 6px', color: 'var(--text-primary)' }}>
              Certificate of Completion
            </h2>
            <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '14.5px' }}>
              This certifies that
            </p>
          </div>

          <div style={{
            textAlign: 'center',
            padding: '16px 0',
            borderBottom: '1px solid var(--gold-border)',
            borderTop: '1px solid var(--gold-border)',
            marginBottom: '28px'
          }}>
            <h3 style={{
              fontSize: '32px',
              fontFamily: 'var(--font-display)',
              color: 'var(--gold-bright)',
              fontWeight: 600
            }}>
              {sampleCertificate.studentFullName}
            </h3>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginBottom: '8px' }}>
              has successfully fulfilled all curriculum requirements, submitted required assessments, and achieved mastery in
            </p>
            <h4 style={{ fontSize: '22px', color: 'var(--text-primary)' }}>
              {sampleCertificate.courseTitle}
            </h4>
          </div>

          {/* Certificate Metadata Table */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            background: 'var(--bg-card)',
            border: '1px solid var(--line-dark)',
            padding: '20px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '13px',
            marginBottom: '36px'
          }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--text-muted)', display: 'block' }}>
                CERTIFICATE CODE
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--gold-bright)' }}>
                {sampleCertificate.certificateCode}
              </span>
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--text-muted)', display: 'block' }}>
                ISSUED DATE
              </span>
              <span style={{ color: 'var(--text-primary)' }}>
                {sampleCertificate.issuedDate}
              </span>
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--text-muted)', display: 'block' }}>
                ISSUING INSTRUCTOR
              </span>
              <span style={{ color: 'var(--text-primary)' }}>
                {sampleCertificate.instructorName}
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/institute" className="btn btn-outline btn-sm">
              <span>Explore Gain Mastery Institute Programs</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
