import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Share2, ArrowRight } from 'lucide-react';
import { SEED_CONTENT_ITEMS } from '@/lib/data/seed-data';

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export function generateStaticParams() {
  return SEED_CONTENT_ITEMS.map((item) => ({
    category: item.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    slug: item.slug,
  }));
}

export default async function SingleArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = SEED_CONTENT_ITEMS.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', padding: '50px 0 100px' }}>
      <div className="wrap" style={{ maxWidth: '820px' }}>
        <div style={{ marginBottom: '28px' }}>
          <Link href="/resources" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-muted)',
            fontSize: '13px',
            fontFamily: 'var(--font-mono)'
          }}>
            <ArrowLeft size={14} />
            <span>Return to Resources</span>
          </Link>
        </div>

        <span className="badge badge-gold" style={{ marginBottom: '16px' }}>{article.category}</span>
        <h1 style={{ fontSize: 'clamp(30px, 4.5vw, 48px)', lineHeight: '1.15', marginBottom: '20px' }}>
          {article.title}
        </h1>

        <div style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: 'var(--text-muted)',
          paddingBottom: '24px',
          borderBottom: '1px solid var(--line-dark)',
          marginBottom: '36px'
        }}>
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.readTime}</span>
          <span>·</span>
          <span style={{ color: 'var(--gold-bright)' }}>By Moses Oladoye</span>
        </div>

        {/* Featured Image */}
        <div className="photo-frame" style={{ width: '100%', height: '400px', marginBottom: '44px' }}>
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 820px"
            style={{ objectFit: 'cover' }}
          />
          <div className="glaze"></div>
        </div>

        {/* Article Body */}
        <article style={{
          color: 'var(--text-secondary)',
          fontSize: '17px',
          lineHeight: '1.8',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          {article.body.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </article>

        {/* Institute CTA Box */}
        <div style={{
          marginTop: '60px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--gold-border)',
          padding: '36px',
          borderRadius: 'var(--radius-sm)'
        }}>
          <span className="eyebrow">Gain Mastery Institute</span>
          <h3 style={{ fontSize: '22px', margin: '12px 0 10px' }}>
            Ready to apply these frameworks systematically?
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>
            Explore our curriculum of rigorous masterclasses and join thousands of students learning to build intentional, purpose-driven lives.
          </p>
          <Link href="/institute" className="btn btn-gold btn-sm">
            <span>Explore Course Catalog</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
