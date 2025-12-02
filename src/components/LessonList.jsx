import { useState } from 'react';
import { Link } from 'react-router-dom';
import { lessons, lessonGroups, hasLessonContent } from '../data/lessons';
import FadeInSection from './FadeInSection';

export default function LessonList({ completedLessons = [], isLoaded = true }) {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const isLessonCompleted = (lessonId) => {
    return completedLessons.includes(lessonId);
  };

  const getSectionProgress = (start, end) => {
    let completed = 0;
    for (let i = start; i <= end; i++) {
      if (completedLessons.includes(i)) {
        completed++;
      }
    }
    return {
      completed,
      total: end - start + 1,
      percentage: Math.round((completed / (end - start + 1)) * 100)
    };
  };

  const getLessonsInRange = (start, end) => {
    return lessons.filter(lesson => lesson.id >= start && lesson.id <= end);
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      {lessonGroups.map((part, partIndex) => (
        <FadeInSection key={part.part} delay={partIndex * 100}>
          {/* Part title */}
          <div className="mb-8">
            <h2 className="text-english text-2xl md:text-3xl font-medium mb-2">
              {part.title}
            </h2>
            <p className="text-[var(--color-text-muted)] text-base">
              {part.description}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6 mb-16">
            {part.sections.map((section) => {
              const sectionKey = `${part.part}-${section.range}`;
              const isExpanded = expandedSections[sectionKey];
              const progress = getSectionProgress(section.start, section.end);
              const lessonsInSection = getLessonsInRange(section.start, section.end);

              return (
                <div
                  key={sectionKey}
                  className="border border-[var(--color-border)] rounded-lg overflow-hidden bg-[var(--color-bg)]/50"
                >
                  {/* Section header */}
                  <button
                    onClick={() => toggleSection(sectionKey)}
                    className="w-full px-6 py-5 text-left hover:bg-[var(--color-bg-dark)]/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium mb-1">
                          Lessons {section.range}
                          <span className="ml-2 text-[var(--color-text-muted)] font-normal text-base">
                            {section.title}
                          </span>
                        </h3>
                        <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                          {section.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 flex-shrink-0">
                        {/* Progress indicator */}
                        {isLoaded && progress.completed > 0 && (
                          <span className="text-xs text-[var(--color-text-muted)]">
                            {progress.completed}/{progress.total}
                          </span>
                        )}

                        {/* Expand/collapse icon */}
                        <svg
                          className={`w-5 h-5 text-[var(--color-text-muted)] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Expanded lesson list */}
                  {isExpanded && (
                    <div className="border-t border-[var(--color-border)] px-6 py-4">
                      <div className="grid grid-cols-1 gap-1">
                        {lessonsInSection.map((lesson) => {
                          const isCompleted = isLessonCompleted(lesson.id);
                          const hasContent = hasLessonContent(lesson.id);

                          return hasContent ? (
                            <div
                              key={lesson.id}
                              className="py-3 px-3 -mx-3 rounded-md hover:bg-[var(--color-bg-dark)]/30 transition-colors"
                            >
                              <div className="flex items-center gap-3 mb-2">
                                {/* Lesson number */}
                                <span className="w-8 text-right text-[var(--color-text-muted)] text-sm font-mono">
                                  {lesson.id}
                                </span>

                                {/* Lesson title */}
                                <span className="flex-1 text-sm text-english">
                                  {lesson.title}
                                </span>

                                {/* Completion indicator */}
                                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isCompleted ? 'bg-[var(--color-accent)]' : 'border border-[var(--color-border)]'}`} />
                              </div>

                              {/* Two buttons for lessons with content */}
                              <div className="flex gap-2 ml-11">
                                <Link
                                  to={`/lesson/${lesson.id}`}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full bg-[var(--color-accent)] text-white hover:bg-[#7a6548] transition-colors"
                                >
                                  <span>🎬</span>
                                  <span>沉浸體驗</span>
                                </Link>
                                <Link
                                  to={`/study/${lesson.id}`}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-bg-dark)] transition-colors"
                                >
                                  <span>📖</span>
                                  <span>靜態研讀</span>
                                </Link>
                              </div>
                            </div>
                          ) : (
                            <div
                              key={lesson.id}
                              className="flex items-center gap-3 py-2 px-3 -mx-3 opacity-50 cursor-not-allowed"
                            >
                              {/* Lesson number */}
                              <span className="w-8 text-right text-[var(--color-text-muted)] text-sm font-mono">
                                {lesson.id}
                              </span>

                              {/* Lesson title */}
                              <span className="flex-1 text-sm text-english">
                                {lesson.title}
                              </span>

                              {/* Coming soon indicator */}
                              <span className="text-xs text-[var(--color-text-muted)]">
                                即將推出
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </FadeInSection>
      ))}
    </section>
  );
}
