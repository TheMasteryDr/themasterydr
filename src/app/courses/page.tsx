import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Sparkles, BookOpen, Search, ArrowRight } from 'lucide-react';
import CourseCard from '@/components/courses/CourseCard';
import { getAllCourses } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Gain Mastery Institute — Courses & Masterclasses',
  description: 'Rigorous digital courses and masterclasses on purpose, personal mastery, financial intelligence, leadership, and strategy.',
};

export const revalidate = 60;

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <div className="courses-page-root">
      <section className="courses-hero-section">
        <div className="wrap">
          <div className="courses-hero-copy">
            <span className="pill-badge indigo">
              <Sparkles size={12} /> Digital Learning Infrastructure
            </span>
            <h1 className="hero-title">
              Gain Mastery <span className="gradient-amber">Institute</span>
            </h1>
            <p className="hero-subtitle">
              Learn. Grow. Master. Serious, self-paced curriculum designed to dismantle ignorance and build operational competence across the Six Dimensions of Mastery.
            </p>
          </div>
        </div>
      </section>

      <section className="site-section catalog-section">
        <div className="wrap">
          <div className="catalog-head-row">
            <div className="catalog-count-pill">
              <span>{courses.length} Programs Available</span>
            </div>
          </div>

          <div className="courses-catalog-grid">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
