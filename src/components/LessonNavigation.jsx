import { Link } from 'react-router-dom';
import { getLessonById, hasLessonContent } from '../data/lessons';

export default function LessonNavigation({ currentLessonId }) {
  const prevLessonId = currentLessonId > 1 ? currentLessonId - 1 : null;
  const nextLessonId = currentLessonId < 365 ? currentLessonId + 1 : null;

  const prevLesson = prevLessonId ? getLessonById(prevLessonId) : null;
  const nextLesson = nextLessonId ? getLessonById(nextLessonId) : null;

  const prevHasContent = prevLessonId && hasLessonContent(prevLessonId);
  const nextHasContent = nextLessonId && hasLessonContent(nextLessonId);

  return (
    <nav className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between gap-4">
        {/* Previous lesson */}
        <div className="flex-1">
          {prevLesson && (
            prevHasContent ? (
              <Link
                to={`/lesson/${prevLessonId}`}
                className="group inline-flex flex-col items-start text-left hover:opacity-80 transition-opacity"
              >
                <span className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>上一課</span>
                </span>
                <span className="text-english text-sm text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-1">
                  {prevLessonId}. {prevLesson.title}
                </span>
              </Link>
            ) : (
              <div className="inline-flex flex-col items-start text-left opacity-40 cursor-not-allowed">
                <span className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>上一課</span>
                </span>
                <span className="text-english text-sm text-[var(--color-text)] line-clamp-1">
                  {prevLessonId}. {prevLesson.title}
                </span>
              </div>
            )
          )}
        </div>

        {/* Home link */}
        <Link
          to="/"
          className="flex-shrink-0 w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--color-bg-dark)] hover:text-[var(--color-text)] transition-all"
          title="返回首頁"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>

        {/* Next lesson */}
        <div className="flex-1 text-right">
          {nextLesson && (
            nextHasContent ? (
              <Link
                to={`/lesson/${nextLessonId}`}
                className="group inline-flex flex-col items-end text-right hover:opacity-80 transition-opacity"
              >
                <span className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm mb-1">
                  <span>下一課</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <span className="text-english text-sm text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-1">
                  {nextLessonId}. {nextLesson.title}
                </span>
              </Link>
            ) : (
              <div className="inline-flex flex-col items-end text-right opacity-40 cursor-not-allowed">
                <span className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm mb-1">
                  <span>下一課</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <span className="text-english text-sm text-[var(--color-text)] line-clamp-1">
                  {nextLessonId}. {nextLesson.title}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
