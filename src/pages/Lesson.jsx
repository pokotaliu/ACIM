import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { getLessonById, hasLessonContent } from '../data/lessons';
import { lesson1 } from '../data/lesson1';
import LessonHeader from '../components/LessonHeader';
import OriginalText from '../components/OriginalText';
import Commentary from '../components/Commentary';
import PracticeMode from '../components/PracticeMode';
import FadeInSection from '../components/FadeInSection';
import LessonNavigation from '../components/LessonNavigation';
import ProgressButton from '../components/ProgressButton';

// Map lesson IDs to their content data
const lessonData = {
  1: lesson1
};

export default function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lessonId = parseInt(id, 10);

  const [showPractice, setShowPractice] = useState(false);
  const { isLessonCompleted, toggleLessonComplete, setCurrentLesson, isLoaded } = useProgress();

  // Get lesson info
  const lessonInfo = getLessonById(lessonId);
  const lessonContent = lessonData[lessonId];
  const hasContent = hasLessonContent(lessonId);

  // Update current lesson when visiting
  useEffect(() => {
    if (lessonId && isLoaded) {
      setCurrentLesson(lessonId);
    }
  }, [lessonId, setCurrentLesson, isLoaded]);

  // Redirect to home if lesson doesn't exist or has no content
  useEffect(() => {
    if (!lessonInfo) {
      navigate('/');
    } else if (!hasContent) {
      // Lesson exists but no content yet - could show a "coming soon" message
      // For now, redirect to home
      navigate('/');
    }
  }, [lessonInfo, hasContent, navigate]);

  // Show loading or redirect while checking
  if (!lessonInfo || !hasContent || !lessonContent) {
    return null;
  }

  const isCompleted = isLessonCompleted(lessonId);

  return (
    <div className="min-h-screen pt-16">
      {/* Lesson Header */}
      <LessonHeader
        number={lessonContent.number}
        title={lessonContent.title}
        titleChinese={lessonContent.titleChinese}
      />

      {/* Original Course Text */}
      <OriginalText paragraphs={lessonContent.originalText} />

      {/* Kenneth Wapnick's Commentary */}
      <Commentary sections={lessonContent.commentary} />

      {/* Practice Mode Trigger */}
      <FadeInSection className="py-20 flex flex-col items-center">
        <div className="w-16 h-px bg-[var(--color-border)] mb-12" />
        <p className="text-[var(--color-text-muted)] text-center mb-8 max-w-md px-6">
          準備好了嗎？讓我們花一分鐘的時間，<br />
          實際做一次這個練習。
        </p>
        <button
          onClick={() => setShowPractice(true)}
          className="btn-practice"
        >
          進入練習模式
        </button>
      </FadeInSection>

      {/* Closing Quote */}
      <FadeInSection className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-english text-lg md:text-xl text-[var(--color-text-muted)] italic mb-8">
            "A comfortable sense of leisure is essential."
          </p>
          <p className="text-chinese text-base text-[var(--color-text-muted)]">
            從容不迫的感覺是必要的。
          </p>
        </div>
      </FadeInSection>

      {/* Progress Button */}
      <FadeInSection className="py-12 flex justify-center">
        <ProgressButton
          lessonId={lessonId}
          isCompleted={isCompleted}
          onToggle={toggleLessonComplete}
        />
      </FadeInSection>

      {/* Lesson Navigation */}
      <LessonNavigation currentLessonId={lessonId} />

      {/* Footer */}
      <footer className="py-12 text-center border-t border-[var(--color-border)]">
        <div className="w-8 h-px bg-[var(--color-border)] mx-auto mb-6" />
        <p className="text-[var(--color-text-muted)] text-sm">
          A Course in Miracles · Workbook Lesson {lessonId}
        </p>
        <p className="text-[var(--color-text-muted)] text-xs mt-2 opacity-60">
          Commentary inspired by Kenneth Wapnick
        </p>
      </footer>

      {/* Practice Mode Overlay */}
      {showPractice && (
        <PracticeMode
          prompts={lessonContent.practicePrompts}
          onClose={() => setShowPractice(false)}
        />
      )}
    </div>
  );
}
