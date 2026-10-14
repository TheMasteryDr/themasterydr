'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Users, Star, ArrowRight, BookOpen } from 'lucide-react';
import { Course } from '@/lib/types';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const priceDisplay = course.is_free 
    ? 'Free Access' 
    : `₦${(course.price_kobo / 100).toLocaleString('en-NG')}`;

  return (
    <div className="course-card">
      {/* Thumbnail Container */}
      <div className="course-thumbnail-wrap">
        <img 
          src={course.thumbnail_url || '/images/founder/founder_photo_2.jpg'} 
          alt={course.title}
          className="course-thumbnail"
        />
        <div className="thumbnail-glaze" />
        
        {/* Floating Badges */}
        <div className="thumbnail-badges">
          <span className="level-badge">{course.level || 'All Levels'}</span>
          <span className={`price-badge ${course.is_free ? 'free' : ''}`}>
            {priceDisplay}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="course-body">
        <div className="course-meta-row">
          <span className="category-tag">{course.category_name || 'Gain Mastery Institute'}</span>
          {course.rating_avg && (
            <div className="rating-pill">
              <Star size={12} fill="#F59E0B" color="#F59E0B" />
              <span>{course.rating_avg.toFixed(1)}</span>
              {course.review_count && <span className="reviews-num">({course.review_count})</span>}
            </div>
          )}
        </div>

        <h3 className="course-title">
          <Link href={`/courses/${course.slug}`}>{course.title}</Link>
        </h3>
        
        <p className="course-tagline">{course.tagline}</p>

        {/* Instructor Block */}
        <div className="instructor-row">
          <img 
            src={course.instructor_avatar || '/images/founder/founder_photo_1.jpg'} 
            alt={course.instructor_name || 'Moses Oladoye'} 
            className="instructor-avatar" 
          />
          <div className="instructor-info">
            <span className="instructor-name">{course.instructor_name || 'Moses Oladoye'}</span>
            <span className="instructor-role">Head Growth Coach</span>
          </div>
        </div>

        {/* Bottom Metrics & Action */}
        <div className="course-footer">
          <div className="course-stats">
            {course.student_count !== undefined && (
              <span className="stat-item">
                <Users size={13} className="stat-icon" /> {course.student_count.toLocaleString()} students
              </span>
            )}
            <span className="stat-item">
              <Clock size={13} className="stat-icon" /> {course.access_duration_days === 0 ? 'Lifetime' : `${course.access_duration_days}d access`}
            </span>
          </div>
          
          <Link href={`/courses/${course.slug}`} className="btn btn-secondary btn-sm btn-pill">
            <span>Syllabus</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .course-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all var(--transition-smooth);
        }
        .course-card:hover {
          border-color: var(--border-glass-hover);
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4), 0 0 20px rgba(99, 102, 241, 0.08);
        }
        .course-thumbnail-wrap {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
          background: var(--bg-subtle);
        }
        .course-thumbnail {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .course-card:hover .course-thumbnail {
          transform: scale(1.04);
        }
        .thumbnail-glaze {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(19, 27, 46, 0.95) 100%);
        }
        .thumbnail-badges {
          position: absolute;
          top: 14px;
          left: 14px;
          right: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 2;
        }
        .level-badge {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          background: rgba(7, 9, 14, 0.8);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-glass);
          color: var(--text-secondary);
        }
        .price-badge {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: var(--radius-full);
          background: rgba(245, 158, 11, 0.9);
          color: #07090E;
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);
        }
        .price-badge.free {
          background: rgba(16, 185, 129, 0.9);
          color: #FFF;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
        }

        .course-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .course-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .category-tag {
          font-family: var(--font-mono);
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent-amber-light);
        }
        .rating-pill {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .reviews-num {
          color: var(--text-muted);
          font-size: 11px;
        }
        .course-title {
          font-size: 18px;
          line-height: 1.35;
          margin-bottom: 8px;
        }
        .course-title a:hover {
          color: var(--accent-amber-light);
        }
        .course-tagline {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .instructor-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 20px;
        }
        .instructor-avatar {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-accent);
          object-fit: cover;
        }
        .instructor-info {
          display: flex;
          flex-direction: column;
        }
        .instructor-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .instructor-role {
          font-size: 11px;
          color: var(--text-muted);
        }

        .course-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          gap: 12px;
        }
        .course-stats {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .stat-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-secondary);
        }
        .stat-icon {
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
