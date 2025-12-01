import { useState, useEffect } from 'react';

export default function ProgressButton({ lessonId, isCompleted, onToggle }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onToggle(lessonId);
  };

  // Reset animation state after animation completes
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <button
      onClick={handleClick}
      className={`
        group flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300
        ${isCompleted
          ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white hover:bg-[#7a6548]'
          : 'bg-transparent border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
        }
        ${isAnimating ? 'scale-95' : 'scale-100'}
      `}
    >
      {/* Checkbox icon */}
      <span className={`
        w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300
        ${isCompleted
          ? 'border-white bg-white'
          : 'border-current bg-transparent group-hover:border-[var(--color-accent)]'
        }
      `}>
        {isCompleted && (
          <svg
            className="w-3 h-3 text-[var(--color-accent)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </span>

      {/* Text */}
      <span className="text-sm font-medium">
        {isCompleted ? '已完成' : '標記為已完成'}
      </span>
    </button>
  );
}
