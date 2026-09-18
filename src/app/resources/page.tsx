'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ArrowRight, BookOpen, Video, Headphones, FileText, Calendar, Clock } from 'lucide-react';
import { SEED_CONTENT_ITEMS } from '@/lib/data/seed-data';

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeType, setActiveType] = useState('all');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Personal Growth', 'Leadership', 'Finance', 'Purpose', 'Strategy'];

  const filteredItems = SEED_CONTENT_ITEMS.filter(item => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesType = activeType === 'all' || item.contentType === activeType;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                          item.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesType && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', padding: '50px 0 100px' }}>
      <div className="wrap">
        <div style={{ marginBottom: '48px' }}>
          <span className="eyebrow">Field Notes &amp; Educational Repository</span>
          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 54px)', margin: '14px 0 16px' }}>
            Curated <em>Insights.</em>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16.5px', maxWidth: '640px', lineHeight: '1.7' }}>
            Intellectual frameworks, video masterclasses, podcast reflections, and downloadable blueprints curated by The Mastery Dr across the Six Dimensions of Mastery.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
          paddingBottom: '24px',
          borderBottom: '1px solid var(--line-dark)'
        }}>
          {/* Categories */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? 'var(--gold-primary)' : 'var(--bg-card)',
                  color: activeCategory === cat ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  border: `1px solid ${activeCategory === cat ? 'var(--gold-primary)' : 'var(--line-dark)'}`,
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontWeight: activeCategory === cat ? 700 : 500
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div style={{ minWidth: '260px', maxWidth: '340px', flex: 1 }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search field notes & topics..."
              className="form-input"
              style={{ fontSize: '13px', padding: '9px 14px' }}
            />
          </div>
        </div>

        {/* Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px'
        }}>
          {filteredItems.map(item => (
            <div key={item.id} className="luxury-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '220px', width: '100%' }}>
                <Image
                  src={item.featuredImage}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 2 }}>
                  <span className="badge badge-gold">{item.category}</span>
                </div>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                  <span>{item.date}</span>
                  <span>·</span>
                  <span>{item.readTime}</span>
                </div>

                <h3 style={{ fontSize: '20px', lineHeight: '1.3', marginBottom: '12px' }}>
                  <Link href={`/resources/${item.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/${item.slug}`}>
                    {item.title}
                  </Link>
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: '1.6', marginBottom: '22px' }}>
                  {item.excerpt}
                </p>

                <Link
                  href={`/resources/${item.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/${item.slug}`}
                  className="btn btn-outline btn-sm"
                  style={{ marginTop: 'auto', alignSelf: 'flex-start' }}
                >
                  <span>Read Article</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
