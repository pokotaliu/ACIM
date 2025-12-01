import { useState, useEffect } from 'react';

export default function LessonHeader({ number, title, titleChinese }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initial delay to create a moment of silence
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      {/* Decorative line */}
      <div
        className={`w-16 h-px bg-[var(--color-accent)] mb-12 transition-all duration-1000 ${
          isReady ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`}
      />

      {/* Lesson number */}
      <p
        className={`text-[var(--color-text-muted)] text-sm tracking-[0.3em] uppercase mb-6 transition-all duration-1000 ${
          isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '300ms' }}
      >
        Lesson {number}
      </p>

      {/* English title */}
      <h1
        className={`text-english text-3xl md:text-4xl lg:text-5xl text-center font-medium leading-tight mb-6 max-w-3xl transition-all duration-1000 ${
          isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '600ms' }}
      >
        {title}
      </h1>

      {/* Chinese title */}
      <h2
        className={`text-chinese text-xl md:text-2xl text-[var(--color-text-muted)] text-center mb-16 transition-all duration-1000 ${
          isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '900ms' }}
      >
        {titleChinese}
      </h2>

      {/* Scroll indicator */}
      <div
        className={`flex flex-col items-center gap-2 text-[var(--color-text-muted)] transition-all duration-1000 ${
          isReady ? 'opacity-60 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '1500ms' }}
      >
        <span className="text-xs tracking-wider">往下閱讀</span>
        <svg
          className="w-5 h-5 animate-bounce"
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
  );
}
