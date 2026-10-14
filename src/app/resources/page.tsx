import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';
import { getAllContent } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Field Notes & Resources — The Mastery Dr',
  description: 'Curated articles, masterclass recordings, frameworks, and teachings on purpose, strategy, and personal mastery.',
};

export const revalidate = 60;

export default async function ResourcesPage() {
  const articles = await getAllContent();

  return (
    <div className="resources-page-root">
      <section className="resources-hero-section">
        <div className="wrap">
          <div className="resources-hero-copy">
            <span className="pill-badge cyan">
              <Sparkles size={12} /> Curated Publications &bull; Intellectual Depth
            </span>
            <h1 className="hero-title">
              Field Notes &amp; <span className="gradient-amber">Resources</span>
            </h1>
            <p className="hero-subtitle">
              Essays, frameworks, and teachings on purpose discovery, economic intelligence, disciplined habit systems, and leadership integrity.
            </p>
          </div>
        </div>
      </section>

      <section className="site-section articles-section">
        <div className="wrap">
          <div className="resources-bento-grid">
            {articles.map(item => (
              <div key={item.id} className="bento-card resource-card">
                <div className="resource-media">
                  <img 
                    src={item.featured_image_url || '/images/founder/founder_photo_5.jpg'} 
                    alt={item.title} 
                    className="resource-img"
                  />
                  <span className="resource-category-pill">{item.category}</span>
                </div>
                <div className="resource-body">
                  <h3 className="resource-headline">
                    <Link href={`/resources/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p className="resource-summary">{item.summary}</p>
                  <div className="resource-meta-footer">
                    <span className="read-time">
                      <Clock size={12} /> {item.read_time_minutes} min read
                    </span>
                    <Link href={`/resources/${item.slug}`} className="read-action">
                      <span>Read Note</span> <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
