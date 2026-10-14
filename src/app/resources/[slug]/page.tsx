import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Clock, Calendar, ArrowLeft, ArrowRight, Share2, Sparkles, BookOpen } from 'lucide-react';
import { getContentBySlug } from '@/lib/db';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getContentBySlug(slug);
  if (!article) {
    return { title: 'Field Note Not Found — The Mastery Dr' };
  }
  return {
    title: `${article.title} — Field Notes | The Mastery Dr`,
    description: article.summary,
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getContentBySlug(slug);

  if (!article) {
    notFound();
  }

  const publishedDate = new Date(article.published_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="article-page-root">
      {/* Header Banner */}
      <section className="article-hero-section">
        <div className="wrap">
          <div className="art-breadcrumb">
            <Link href="/resources" className="art-back-link">
              <ArrowLeft size={14} /> Back to Field Notes
            </Link>
            <span className="art-sep">/</span>
            <span className="art-cat-badge">{article.category}</span>
          </div>

          <div className="art-header-copy">
            <h1 className="art-title">{article.title}</h1>
            <p className="art-summary">{article.summary}</p>

            <div className="art-meta-bar">
              <div className="art-author-info">
                <img 
                  src="/images/founder/founder_photo_1.jpg" 
                  alt={article.author_name} 
                  className="art-author-avatar"
                />
                <div>
                  <span className="art-author-name">{article.author_name}</span>
                  <span className="art-author-role">Founder, The Mastery Dr</span>
                </div>
              </div>

              <div className="art-meta-tags">
                <span className="art-meta-tag">
                  <Calendar size={13} /> {publishedDate}
                </span>
                <span className="art-meta-tag">
                  <Clock size={13} /> {article.read_time_minutes} min read
                </span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {article.featured_image_url && (
            <div className="art-featured-media">
              <img 
                src={article.featured_image_url} 
                alt={article.title} 
                className="art-featured-img"
              />
            </div>
          )}
        </div>
      </section>

      {/* Main Body */}
      <section className="site-section art-body-section">
        <div className="wrap art-content-wrap">
          <div className="art-body-text">
            {article.markdown_body.split('\n\n').map((block, idx) => {
              const trimmed = block.trim();
              if (trimmed.startsWith('## ')) {
                return <h2 key={idx} className="art-h2">{trimmed.replace('## ', '')}</h2>;
              }
              if (trimmed.startsWith('### ')) {
                return <h3 key={idx} className="art-h3">{trimmed.replace('### ', '')}</h3>;
              }
              if (trimmed.startsWith('> ')) {
                return (
                  <blockquote key={idx} className="art-quote">
                    {trimmed.replace('> ', '')}
                  </blockquote>
                );
              }
              if (trimmed.startsWith('1. ') || trimmed.startsWith('- ')) {
                const items = trimmed.split('\n');
                return (
                  <ul key={idx} className="art-list">
                    {items.map((it, iIdx) => (
                      <li key={iIdx}>{it.replace(/^(\d+\. |- )/, '')}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={idx} className="art-p">{trimmed}</p>;
            })}
          </div>

          {/* Post Footer & Next Steps */}
          <div className="art-footer-box bento-card">
            <div className="af-copy">
              <span className="pill-badge amber">
                <Sparkles size={12} /> Deepen Your Mastery
              </span>
              <h3>Ready to translate insights into daily execution?</h3>
              <p>Explore our flagship courses at Gain Mastery Institute or join The Bereans reading fellowship.</p>
            </div>
            <div className="af-actions">
              <Link href="/courses" className="btn btn-primary btn-pill">
                <span>View Courses</span>
                <ArrowRight size={14} />
              </Link>
              <Link href="/bereans" className="btn btn-secondary btn-pill">
                <span>Join The Bereans</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
