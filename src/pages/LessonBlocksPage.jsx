import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LessonProvider, useLessonActions } from '../context/LessonContext';
import { useLessonPageLoader } from '../hooks/useLessonPageLoader';
import {
  TitleSection,
  BlockSlider,
  MindSection,
  ClosingSection,
} from '../components/lesson-page';
import '../styles/lesson-page.css';

/**
 * LessonBlocksPageContent - Inner content (requires LessonProvider)
 */
function LessonBlocksPageContent({ lessonNumber }) {
  const { lesson, loading, error } = useLessonPageLoader(lessonNumber);
  const { setBlocks } = useLessonActions();

  // Initialize blocks when lesson data loads
  useEffect(() => {
    if (lesson?.blocks) {
      setBlocks(lesson.blocks);
    }
  }, [lesson, setBlocks]);

  // Loading state
  if (loading) {
    return (
      <div className="lesson-page-container">
        <Link to="/" className="lp-back-btn">
          ← 返回
        </Link>
        <div className="lp-loading">
          <div className="lp-loading-spinner" />
          <p>載入課程中...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="lesson-page-container">
        <Link to="/" className="lp-back-btn">
          ← 返回課程列表
        </Link>
        <div className="lp-error">
          <div className="lp-error-icon">⚠</div>
          <p>無法載入課程 {lessonNumber}</p>
          <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>{error}</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!lesson) {
    return (
      <div className="lesson-page-container">
        <Link to="/" className="lp-back-btn">
          ← 返回課程列表
        </Link>
        <div className="lp-error">
          <div className="lp-error-icon">📭</div>
          <p>課程 {lessonNumber} 尚未建立</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-page-container">
      {/* Back Button */}
      <Link to="/" className="lp-back-btn">
        ← 返回
      </Link>

      {/* Title Section */}
      <TitleSection lesson={lesson.lesson} title={lesson.title} />

      {/* Block Slider - Horizontal swipe */}
      <BlockSlider />

      {/* Mind Section - Tabs + Content */}
      <MindSection />

      {/* Closing Section - Practice Guide + Quote */}
      <ClosingSection
        practiceGuide={lesson.practiceGuide}
        closingQuote={lesson.closingQuote}
      />

      {/* Footer */}
      <footer className="lp-footer">
        <p className="lp-footer-text">
          Lesson {lesson.lesson} · A Course in Miracles
        </p>
      </footer>
    </div>
  );
}

/**
 * LessonBlocksPage - Main page component
 * Route: /lesson-blocks/:id
 */
export function LessonBlocksPage() {
  const { id } = useParams();
  const lessonNumber = parseInt(id, 10) || 1;

  return (
    <LessonProvider>
      <LessonBlocksPageContent lessonNumber={lessonNumber} />
    </LessonProvider>
  );
}

export default LessonBlocksPage;
