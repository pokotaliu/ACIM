import { useState, useRef, useEffect } from 'react';
import { useAudio } from '../hooks/useAudio';

export default function MusicControl() {
  const { isPlaying, isLoaded, toggle } = useAudio();

  // Initialize state from localStorage
  const getInitialResponded = () => {
    return localStorage.getItem('acim-music-responded') === 'true';
  };

  const getInitialShouldAutoPlay = () => {
    const responded = localStorage.getItem('acim-music-responded') === 'true';
    if (responded) {
      return localStorage.getItem('acim-music-enabled') === 'true';
    }
    return false;
  };

  const [showPrompt, setShowPrompt] = useState(false);
  const [hasResponded] = useState(getInitialResponded);
  const autoPlayAttemptedRef = useRef(false);
  const shouldAutoPlay = getInitialShouldAutoPlay();

  // Show prompt after delay for new users
  useEffect(() => {
    if (hasResponded) return;

    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [hasResponded]);

  // Handle auto-play for returning users
  useEffect(() => {
    if (shouldAutoPlay && isLoaded && !isPlaying && !autoPlayAttemptedRef.current) {
      autoPlayAttemptedRef.current = true;
      toggle();
    }
  }, [shouldAutoPlay, isLoaded, isPlaying, toggle]);

  const handleResponse = (enableMusic) => {
    setShowPrompt(false);
    localStorage.setItem('acim-music-responded', 'true');
    localStorage.setItem('acim-music-enabled', enableMusic.toString());
    if (enableMusic) {
      toggle();
    }
  };

  // Music prompt overlay
  if (showPrompt && !hasResponded) {
    return (
      <div className="music-prompt-overlay">
        <div className="music-prompt-card">
          <p className="music-prompt-text">
            是否開啟環境音樂？
          </p>
          <p className="music-prompt-subtext">
            輕柔的背景音樂可以幫助你進入沉浸狀態
          </p>
          <div className="music-prompt-buttons">
            <button
              onClick={() => handleResponse(true)}
              className="music-prompt-btn music-prompt-btn-yes"
            >
              開啟
            </button>
            <button
              onClick={() => handleResponse(false)}
              className="music-prompt-btn music-prompt-btn-no"
            >
              不用了
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Floating music control button
  return (
    <button
      onClick={toggle}
      className="music-control-btn"
      aria-label={isPlaying ? '關閉音樂' : '開啟音樂'}
      title={isPlaying ? '關閉音樂' : '開啟音樂'}
    >
      {isPlaying ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      )}
    </button>
  );
}
