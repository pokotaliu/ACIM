import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LessonProvider, useLessonActions } from '../context/LessonContext';
import { useLessonPageLoader } from '../hooks/useLessonPageLoader';
import { BlockSlider, MindSection } from '../components/lesson-page';
import '../styles/lesson-page.css';

/**
 * Header component with back button and title
 */
function Header({ lesson, title }) {
  return (
    <header className="lp-header">
      <Link to="/" className="lp-back-btn">
        ← 返回
      </Link>
      <div className="lp-header-title">
        <div className="lp-lesson-number">Lesson {lesson}</div>
        <h1 className="lp-title-text">{title?.zh || title?.en}</h1>
      </div>
    </header>
  );
}

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
        <Header lesson={lessonNumber} title={null} />
        <div className="lp-main">
          <div className="lp-loading">
            <div className="lp-loading-spinner" />
            <p>載入課程中...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="lesson-page-container">
        <Header lesson={lessonNumber} title={null} />
        <div className="lp-main">
          <div className="lp-error">
            <div className="lp-error-icon">⚠</div>
            <p>無法載入課程 {lessonNumber}</p>
            <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!lesson) {
    return (
      <div className="lesson-page-container">
        <Header lesson={lessonNumber} title={null} />
        <div className="lp-main">
          <div className="lp-error">
            <div className="lp-error-icon">📭</div>
            <p>課程 {lessonNumber} 尚未建立</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-page-container">
      {/* Header with back button and title */}
      <Header lesson={lesson.lesson} title={lesson.title} />

      {/* Main content area */}
      <main className="lp-main">
        {/* Block Slider - Horizontal swipe with center-line trigger */}
        <BlockSlider />

        {/* Mind Section - Tabs + Content */}
        <MindSection />
      </main>
    </div>
  );
}

/**
 * LessonBlocksPage - Main page component
 * Route: /lesson-blocks/:id
 *
 * Features:
 * - Fixed viewport layout (no vertical scrolling)
 * - Course text blocks with horizontal scrolling
 * - Mind interpretation that syncs with block trigger
 * - Mobile-first design with desktop support
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
