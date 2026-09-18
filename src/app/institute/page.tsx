'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Search, Clock, Users, Star, BookOpen, Filter, CheckCircle2 } from 'lucide-react';
import { SEED_COURSES } from '@/lib/data/seed-data';

export default function InstituteCatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Personal Development', 'Finance & Strategy', 'Leadership & Purpose'];

  const filteredCourses = SEED_COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', padding: '50px 0 100px' }}>
      <div className="wrap">
        {/* Catalog Header */}
        <div style={{ marginBottom: '50px' }}>
          <span className="eyebrow">Gain Mastery Institute</span>
          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', margin: '14px 0 16px', lineHeight: '1.1' }}>
            Learn. Grow. <em>Master.</em>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '17px', maxWidth: '640px', lineHeight: '1.7' }}>
            Rigorous, principle-driven curriculum engineered to transition you from passive drift to sustained personal authority, financial intelligence, and purposeful impact.
          </p>
        </div>

        {/* Search & Filters Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '44px',
          paddingBottom: '28px',
          borderBottom: '1px solid var(--line-dark)'
        }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? 'var(--gold-primary)' : 'var(--bg-card)',
                  color: selectedCategory === cat ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  border: `1px solid ${selectedCategory === cat ? 'var(--gold-primary)' : 'var(--line-dark)'}`,
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  transition: 'var(--transition)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div style={{
            position: 'relative',
            minWidth: '260px',
            maxWidth: '360px',
            flex: 1
          }}>
            <Search size={16} color="var(--gold-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses & topics..."
              style={{
                width: '100%',
                background: 'var(--bg-card)',
                border: '1px solid var(--line-dark)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '13.5px',
                padding: '9px 14px 9px 36px',
                borderRadius: 'var(--radius-sm)',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length === 0 ? (
          <div className="luxury-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>No courses match your search criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="btn btn-outline btn-sm"
              style={{ marginTop: '16px' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '32px'
          }}>
            {filteredCourses.map((course) => (
              <div key={course.id} className="luxury-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: '220px', width: '100%' }}>
                  <Image
                    src={course.thumbnailUrl}
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 2 }}>
                    <span className="badge badge-gold">{course.category}</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '14px', right: '14px', zIndex: 2 }}>
                    <span style={{
                      backgroundColor: 'rgba(7, 6, 5, 0.9)',
                      color: 'var(--gold-bright)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      padding: '4px 8px',
                      border: '1px solid var(--gold-border)'
                    }}>
                      {course.level}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} color="var(--gold-primary)" />
                      {course.durationHours} Hours
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <BookOpen size={13} color="var(--gold-primary)" />
                      {course.lessonsCount} Lessons
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginLeft: 'auto', color: 'var(--gold-bright)' }}>
                      <Star size={13} fill="var(--gold-primary)" color="var(--gold-primary)" />
                      {course.rating} ({course.reviewCount})
                    </span>
                  </div>

                  <h3 style={{ fontSize: '20px', lineHeight: '1.25', marginBottom: '12px' }}>
                    <Link href={`/institute/course/${course.slug}`}>{course.title}</Link>
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: '1.6', marginBottom: '22px' }}>
                    {course.subtitle}
                  </p>

                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '18px',
                    borderTop: '1px solid var(--line-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '18px',
                        fontWeight: 700,
                        color: course.isFree ? '#74C69D' : 'var(--gold-bright)'
                      }}>
                        {course.isFree ? 'FREE' : `₦${course.price.toLocaleString()}`}
                      </span>
                    </div>
                    <Link href={`/institute/course/${course.slug}`} className="btn btn-gold btn-sm">
                      <span>View Course</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
