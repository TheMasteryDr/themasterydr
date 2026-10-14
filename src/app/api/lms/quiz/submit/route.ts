import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { dbStore } from '@/lib/db';
import { QuizAttempt } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { quiz_id, answers } = await req.json();
    if (!quiz_id || !answers) {
      return NextResponse.json({ error: 'Quiz ID and answers are required.' }, { status: 400 });
    }

    // Locate quiz in course modules
    let targetQuiz = null;
    for (const course of dbStore.courses) {
      for (const mod of course.modules || []) {
        for (const lsn of mod.lessons) {
          if (lsn.quiz && lsn.quiz.id === quiz_id) {
            targetQuiz = lsn.quiz;
            break;
          }
        }
      }
    }

    if (!targetQuiz) {
      return NextResponse.json({ error: 'Quiz not found.' }, { status: 404 });
    }

    // Evaluate answers
    let correctCount = 0;
    const totalQuestions = targetQuiz.questions.length;

    for (const q of targetQuiz.questions) {
      const selectedOptionId = answers[q.id];
      const correctOption = q.options.find(opt => opt.is_correct);
      if (correctOption && correctOption.id === selectedOptionId) {
        correctCount++;
      }
    }

    const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const isPassed = scorePercentage >= targetQuiz.passing_score_percentage;

    const attempt: QuizAttempt = {
      id: `atm-${Date.now()}`,
      quiz_id,
      user_id: user.id,
      score_percentage: scorePercentage,
      is_passed: isPassed,
      answers_data: answers,
      attempt_number: (dbStore.quiz_attempts.filter(a => a.user_id === user.id && a.quiz_id === quiz_id).length || 0) + 1,
      attempted_at: new Date().toISOString(),
    };

    dbStore.quiz_attempts.push(attempt);

    return NextResponse.json({
      success: true,
      score_percentage: scorePercentage,
      is_passed: isPassed,
      correct_count: correctCount,
      total_questions: totalQuestions,
      attempt,
    });
  } catch (error) {
    console.error('Quiz submission error:', error);
    return NextResponse.json({ error: 'Failed to score quiz attempt.' }, { status: 500 });
  }
}
