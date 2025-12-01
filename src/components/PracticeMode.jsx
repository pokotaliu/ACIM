import { useState, useEffect, useCallback } from 'react';

export default function PracticeMode({ prompts, onClose }) {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const TOTAL_TIME = 60; // 1 minute
  const PROMPT_INTERVAL = 8000; // Change prompt every 8 seconds

  // Start the practice
  const startPractice = useCallback(() => {
    setIsActive(true);
    setTimeLeft(TOTAL_TIME);
    setCurrentPromptIndex(0);
    setIsComplete(false);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!isActive || isComplete) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsComplete(true);
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, isComplete]);

  // Cycle through prompts
  useEffect(() => {
    if (!isActive || isComplete) return;

    const promptTimer = setInterval(() => {
      setCurrentPromptIndex((prev) => (prev + 1) % prompts.length);
    }, PROMPT_INTERVAL);

    return () => clearInterval(promptTimer);
  }, [isActive, isComplete, prompts.length]);

  // Calculate circle progress
  const circumference = 2 * Math.PI * 45;
  const progress = ((TOTAL_TIME - timeLeft) / TOTAL_TIME) * circumference;

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle close with fade out
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center practice-overlay bg-black/80">
      <div className="relative w-full max-w-lg mx-6 text-center">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
          aria-label="關閉練習模式"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Not started state */}
        {!isActive && !isComplete && (
          <div className="space-y-8 animate-fade-in-up">
            <h2 className="text-white text-2xl font-light tracking-wide">
              練習模式
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              接下來的一分鐘，<br />
              讓我們一起做這個練習。
            </p>
            <p className="text-white/50 text-sm">
              緩緩環顧四周，對你看到的事物說：<br />
              「這個東西沒有任何意義。」
            </p>
            <button
              onClick={startPractice}
              className="btn-practice mt-4"
            >
              開始練習
            </button>
          </div>
        )}

        {/* Active state */}
        {isActive && !isComplete && (
          <div className="space-y-12">
            {/* Timer circle */}
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-32 h-32 -rotate-90">
                {/* Background circle */}
                <circle
                  cx="64"
                  cy="64"
                  r="45"
                  className="fill-none stroke-white/10"
                  strokeWidth="2"
                />
                {/* Progress circle */}
                <circle
                  cx="64"
                  cy="64"
                  r="45"
                  className="fill-none stroke-white/60"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - progress}
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              {/* Time display */}
              <span className="absolute text-white text-2xl font-light tracking-wider">
                {formatTime(timeLeft)}
              </span>
            </div>

            {/* Current prompt */}
            <p
              key={currentPromptIndex}
              className="text-white/90 text-xl md:text-2xl font-light leading-relaxed animate-pulse-soft"
            >
              {prompts[currentPromptIndex]}
            </p>
          </div>
        )}

        {/* Complete state */}
        {isComplete && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Completion sound indicator */}
            <div className="w-16 h-16 mx-auto rounded-full border border-white/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <p className="text-white text-xl font-light">
              練習完成
            </p>

            <p className="text-white/60 text-base leading-relaxed">
              記得：從容不迫的感覺是必要的。<br />
              這不是一種強迫的練習，而是輕輕地質疑。
            </p>

            <button
              onClick={handleClose}
              className="btn-practice mt-4"
            >
              返回
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
