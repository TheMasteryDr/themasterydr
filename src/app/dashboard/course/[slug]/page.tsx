'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  PlayCircle,
  CheckCircle2,
  HelpCircle,
  FileText,
  ArrowLeft,
  ArrowRight,
  Award,
  ChevronRight,
  Download,
  Send
} from 'lucide-react';
import { SEED_COURSES } from '@/lib/data/seed-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CourseClassroomPage({ params }: PageProps) {
  const { slug } = use(params);
  const course = SEED_COURSES.find(c => c.slug === slug);

  if (!course) {
    notFound();
  }

  // Active lesson state
  const firstLesson = course.modules[0]?.lessons[0];
  const [activeLessonId, setActiveLessonId] = useState(firstLesson?.id || '');
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(['les-1']);

  // Quiz interactive state
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});

  // Assignment state
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  // Find current lesson object
  let currentLesson = firstLesson;
  for (const mod of course.modules) {
    const found = mod.lessons.find(l => l.id === activeLessonId);
    if (found) {
      currentLesson = found;
      break;
    }
  }

  const handleMarkComplete = () => {
    if (currentLesson && !completedLessonIds.includes(currentLesson.id)) {
      setCompletedLessonIds(prev => [...prev, currentLesson.id]);
    }
  };

  const sampleQuizQuestions = [
    {
      question: 'According to The Mastery Dr framework, what is the primary distinction between "motion" and "true growth"?',
      options: [
        'Speed of daily task execution',
        'Direction, structured strategy, and measurable purpose',
        'The amount of motivation felt in the morning',
        'Financial balance sheet size alone',
      ],
      correct: 1,
    },
    {
      question: 'Which of the following is NOT one of the Six Dimensions of Mastery?',
      options: [
        'Spiritual Growth',
        'Financial Intelligence',
        'Passive Speculation',
        'Personal Discipline & Habits',
      ],
      correct: 2,
    },
  ];

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let score = 0;
    sampleQuizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) score += 50;
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    handleMarkComplete();
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', padding: '30px 0 80px' }}>
      <div className="wrap">
        {/* Top Classroom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--line-dark)',
          marginBottom: '28px'
        }}>
          <div>
            <Link href="/dashboard" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--text-muted)'
            }}>
              <ArrowLeft size={13} />
              <span>Back to Dashboard</span>
            </Link>
            <h1 style={{ fontSize: '22px', marginTop: '6px' }}>{course.title}</h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--gold-bright)' }}>
              Completed: {completedLessonIds.length}/{course.lessonsCount}
            </span>
            <button onClick={handleMarkComplete} className="btn btn-outline btn-sm">
              <CheckCircle2 size={14} color="var(--gold-primary)" />
              <span>Mark Complete</span>
            </button>
          </div>
        </div>

        {/* Classroom Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          alignItems: 'start'
        }}>
          {/* Main Lesson Player / Content Area */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {currentLesson?.lessonType === 'video' && (
              <div style={{ marginBottom: '28px' }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  backgroundColor: '#000',
                  border: '1px solid var(--gold-border)',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden'
                }}>
                  <iframe
                    src={currentLesson.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
                    title={currentLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: '100%', height: '100%', border: 'none' }}
                  />
                </div>
              </div>
            )}

            {/* Lesson Title & Notes */}
            <div className="luxury-card" style={{ padding: '32px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <span className="badge badge-gold" style={{ textTransform: 'uppercase' }}>
                  {currentLesson?.lessonType}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                  {currentLesson?.durationMinutes} Minutes
                </span>
              </div>

              <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>{currentLesson?.title}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15.5px', lineHeight: '1.7', marginBottom: '20px' }}>
                {currentLesson?.content || 'In this session, we dissect the foundational principles of personal stewardship, breaking down everyday bottlenecks and establishing measurable milestones.'}
              </p>

              {/* Interactive Quiz Mode */}
              {currentLesson?.lessonType === 'quiz' && (
                <div style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--line-dark)',
                  padding: '24px',
                  borderRadius: 'var(--radius-sm)',
                  marginTop: '20px'
                }}>
                  <h3 style={{ fontSize: '18px', color: 'var(--gold-bright)', marginBottom: '16px' }}>
                    Module Assessment Quiz
                  </h3>

                  {quizSubmitted ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                      <CheckCircle2 size={40} color="#74C69D" style={{ margin: '0 auto 12px' }} />
                      <h4 style={{ fontSize: '20px', marginBottom: '6px' }}>Assessment Complete</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
                        Your Score: <strong style={{ color: 'var(--gold-bright)' }}>{quizScore}%</strong> (Passing score: 70%)
                      </p>
                      <button
                        onClick={() => setQuizSubmitted(false)}
                        className="btn btn-outline btn-sm"
                        style={{ marginTop: '16px' }}
                      >
                        Retake Assessment
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleQuizSubmit}>
                      {sampleQuizQuestions.map((q, qIdx) => (
                        <div key={qIdx} style={{ marginBottom: '20px' }}>
                          <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
                            {qIdx + 1}. {q.question}
                          </p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {q.options.map((opt, oIdx) => (
                              <label
                                key={oIdx}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                  padding: '8px 12px',
                                  background: 'var(--bg-card)',
                                  border: '1px solid var(--line-dark)',
                                  borderRadius: 'var(--radius-sm)',
                                  cursor: 'pointer',
                                  fontSize: '13.5px'
                                }}
                              >
                                <input
                                  type="radio"
                                  name={`quiz-q-${qIdx}`}
                                  checked={selectedAnswers[qIdx] === oIdx}
                                  onChange={() => setSelectedAnswers(prev => ({ ...prev, [qIdx]: oIdx }))}
                                  required
                                  style={{ accentColor: 'var(--gold-primary)' }}
                                />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                      <button type="submit" className="btn btn-gold btn-sm" style={{ marginTop: '10px' }}>
                        Submit Answers
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Interactive Assignment Submission */}
              {currentLesson?.lessonType === 'assignment' && (
                <div style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--line-dark)',
                  padding: '24px',
                  borderRadius: 'var(--radius-sm)',
                  marginTop: '20px'
                }}>
                  <h3 style={{ fontSize: '18px', color: 'var(--gold-bright)', marginBottom: '12px' }}>
                    Assignment Submission Portal
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    {currentLesson.assignmentPrompt || 'Submit your 6-pillar reflection blueprint for instructor evaluation.'}
                  </p>

                  {assignmentSubmitted ? (
                    <div style={{
                      background: 'rgba(45, 106, 79, 0.2)',
                      border: '1px solid #74C69D',
                      padding: '16px',
                      borderRadius: 'var(--radius-sm)',
                      color: '#74C69D',
                      fontSize: '14px'
                    }}>
                      <CheckCircle2 size={16} style={{ display: 'inline', marginRight: '6px' }} />
                      Your assignment has been submitted to Moses Oladoye for review. Evaluation will appear in your dashboard.
                    </div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); setAssignmentSubmitted(true); handleMarkComplete(); }}>
                      <textarea
                        required
                        rows={5}
                        value={assignmentText}
                        onChange={(e) => setAssignmentText(e.target.value)}
                        placeholder="Write your detailed assignment response or paste your Google Docs / Notion share link..."
                        className="form-textarea"
                        style={{ marginBottom: '16px' }}
                      />
                      <button type="submit" className="btn btn-gold btn-sm">
                        <Send size={13} />
                        <span>Submit Assignment for Review</span>
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Modules & Lessons Tracker */}
          <div style={{ minWidth: '300px', maxWidth: '380px' }}>
            <div className="luxury-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '17px', color: 'var(--text-primary)', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid var(--line-dark)' }}>
                Course Content
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {course.modules.map((mod, modIdx) => (
                  <div key={mod.id}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--gold-dim)', textTransform: 'uppercase', marginBottom: '8px' }}>
                      {mod.title}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {mod.lessons.map(les => {
                        const isCurrent = les.id === activeLessonId;
                        const isCompleted = completedLessonIds.includes(les.id);
                        return (
                          <button
                            key={les.id}
                            onClick={() => setActiveLessonId(les.id)}
                            style={{
                              background: isCurrent ? 'var(--bg-secondary)' : 'transparent',
                              border: isCurrent ? '1px solid var(--gold-border)' : '1px solid transparent',
                              padding: '10px 12px',
                              borderRadius: 'var(--radius-sm)',
                              textAlign: 'left',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              color: isCurrent ? 'var(--gold-bright)' : 'var(--text-secondary)',
                              fontSize: '13px',
                              transition: 'var(--transition)'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                              {isCompleted ? (
                                <CheckCircle2 size={14} color="#74C69D" style={{ flexShrink: 0 }} />
                              ) : (
                                <PlayCircle size={14} color={isCurrent ? 'var(--gold-primary)' : 'var(--text-muted)'} style={{ flexShrink: 0 }} />
                              )}
                              <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                {les.title}
                              </span>
                            </div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                              {les.durationMinutes}m
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
