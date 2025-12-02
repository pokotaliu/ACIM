import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { getLessonById, hasLessonContent, lessonGroups } from '../data/lessons';

export default function Home() {
  const { completedLessons, currentLesson, isLoaded, getStats, getNextLesson } = useProgress();

  const hasProgress = completedLessons.length > 0 || currentLesson > 1;
  const stats = getStats();
  const nextLessonId = getNextLesson();
  const nextLesson = getLessonById(nextLessonId);
  const nextLessonHasContent = hasLessonContent(nextLessonId);

  // For continue button, if next lesson doesn't have content, default to lesson 1
  const continueLesson = nextLessonHasContent ? nextLesson : getLessonById(1);
  const continueLessonId = nextLessonHasContent ? nextLessonId : 1;

  return (
    <div className="min-h-screen" style={{ opacity: 1 }}>
      {/* Hero / Welcome Section */}
      <header className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-20">
        {/* Decorative line */}
        <div className="w-16 h-px bg-[var(--color-accent)] mb-12" />

        {/* Main title */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-center font-medium leading-tight mb-4">
          A Course in Miracles
        </h1>

        <p className="font-serif text-xl md:text-2xl text-[var(--color-text-muted)] text-center mb-12">
          Workbook Lessons
        </p>

        {/* Inspirational quote */}
        <div className="max-w-xl text-center mb-16">
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed mb-2">
            「這是一個心靈訓練的旅程」
          </p>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            「每一課都在鬆動你以為知道的」
          </p>
        </div>

        {/* Progress or Start section */}
        <div>
          {isLoaded && hasProgress ? (
            // Returning user with progress
            <div className="text-center">
              <p className="text-[var(--color-text-muted)] text-sm mb-3">
                繼續你的學習
              </p>
              <p className="font-serif text-lg md:text-xl mb-6">
                Lesson {continueLessonId}: {continueLesson?.title}
              </p>

              {/* Progress stats */}
              <div className="flex items-center justify-center gap-6 mb-8 text-sm text-[var(--color-text-muted)]">
                <span>已完成 {stats.completed} / {stats.total} 課</span>
                <span className="w-px h-4 bg-[var(--color-border)]" />
                <span>{stats.percentage}%</span>
              </div>

              <Link
                to={`/lesson/${continueLessonId}`}
                className="btn-primary inline-flex items-center gap-2"
              >
                <span>繼續學習</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <p className="mt-6 text-sm text-[var(--color-text-muted)]">
                或從下方選擇其他課程
              </p>
            </div>
          ) : (
            // New user
            <div className="text-center">
              <Link
                to="/lesson/1"
                className="btn-primary inline-flex items-center gap-2"
              >
                <span>開始旅程</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <p className="mt-4 text-sm text-[var(--color-text-muted)]">
                Lesson 1: Nothing I see means anything.
              </p>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 text-[var(--color-text-muted)]">
          <span className="text-xs tracking-wider">瀏覽所有課程</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </header>

      {/* Course Navigation / Lesson List - Simple version */}
      <div className="py-12">
        <div className="flex items-center justify-center mb-12">
          <div className="w-8 h-px bg-[var(--color-border)]" />
          <span className="mx-4 text-[var(--color-text-muted)] text-sm tracking-widest uppercase">
            Course Overview
          </span>
          <div className="w-8 h-px bg-[var(--color-border)]" />
        </div>

        {/* Simple Lesson Groups */}
        <div className="max-w-4xl mx-auto px-6">
          {lessonGroups.map((part) => (
            <div key={part.part} className="mb-12">
              <h2 className="font-serif text-2xl mb-2">{part.title}</h2>
              <p className="text-[var(--color-text-muted)] mb-6">{part.description}</p>

              <div className="grid gap-4 md:grid-cols-2">
                {part.sections.map((section) => (
                  <div
                    key={section.range}
                    className="p-4 border border-[var(--color-border)] rounded-lg hover:border-[var(--color-accent)] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{section.title}</h3>
                      <span className="text-sm text-[var(--color-text-muted)]">
                        Lessons {section.range}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] mb-3">
                      {section.description.substring(0, 80)}...
                    </p>
                    {section.start === 1 && (
                      <Link
                        to="/lesson/1"
                        className="text-sm text-[var(--color-accent)] hover:underline"
                      >
                        開始第一課 →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-16 text-center border-t border-[var(--color-border)]">
        <div className="max-w-2xl mx-auto px-6">
          <p className="font-serif text-lg text-[var(--color-text-muted)] italic mb-4">
            "A comfortable sense of leisure is essential."
          </p>
          <p className="text-sm text-[var(--color-text-muted)] mb-8">
            從容不迫的感覺是必要的。
          </p>

          {/* Attribution */}
          <p className="text-xs text-[var(--color-text-muted)] opacity-60">
            Commentary inspired by Kenneth Wapnick
          </p>
        </div>
      </footer>
    </div>
  );
}
