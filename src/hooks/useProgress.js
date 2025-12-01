import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'acim-progress';

// Default progress state
const defaultProgress = {
  completedLessons: [],
  currentLesson: 1,
  lastVisited: null
};

// Helper to safely parse JSON from localStorage
function getStoredProgress() {
  if (typeof window === 'undefined') return defaultProgress;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...defaultProgress,
        ...parsed,
        completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : []
      };
    }
  } catch (e) {
    console.warn('Failed to parse stored progress:', e);
  }
  return defaultProgress;
}

// Helper to save progress to localStorage
function saveProgress(progress) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn('Failed to save progress:', e);
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    const stored = getStoredProgress();
    setProgress(stored);
    setIsLoaded(true);
  }, []);

  // Check if a specific lesson is completed
  const isLessonCompleted = useCallback((lessonId) => {
    return progress.completedLessons.includes(lessonId);
  }, [progress.completedLessons]);

  // Mark a lesson as completed
  const markLessonComplete = useCallback((lessonId) => {
    setProgress(prev => {
      if (prev.completedLessons.includes(lessonId)) {
        return prev;
      }

      const newProgress = {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId].sort((a, b) => a - b),
        lastVisited: new Date().toISOString()
      };

      saveProgress(newProgress);
      return newProgress;
    });
  }, []);

  // Mark a lesson as incomplete
  const markLessonIncomplete = useCallback((lessonId) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        completedLessons: prev.completedLessons.filter(id => id !== lessonId),
        lastVisited: new Date().toISOString()
      };

      saveProgress(newProgress);
      return newProgress;
    });
  }, []);

  // Toggle a lesson's completion status
  const toggleLessonComplete = useCallback((lessonId) => {
    if (isLessonCompleted(lessonId)) {
      markLessonIncomplete(lessonId);
    } else {
      markLessonComplete(lessonId);
    }
  }, [isLessonCompleted, markLessonComplete, markLessonIncomplete]);

  // Update current lesson (last visited)
  const setCurrentLesson = useCallback((lessonId) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        currentLesson: lessonId,
        lastVisited: new Date().toISOString()
      };

      saveProgress(newProgress);
      return newProgress;
    });
  }, []);

  // Get the next uncompleted lesson (for "continue" feature)
  const getNextLesson = useCallback(() => {
    // If current lesson is not completed, return it
    if (!progress.completedLessons.includes(progress.currentLesson)) {
      return progress.currentLesson;
    }

    // Otherwise, find the first uncompleted lesson
    for (let i = 1; i <= 365; i++) {
      if (!progress.completedLessons.includes(i)) {
        return i;
      }
    }

    // All lessons completed, return 1
    return 1;
  }, [progress.completedLessons, progress.currentLesson]);

  // Get progress statistics
  const getStats = useCallback(() => {
    const total = 365;
    const completed = progress.completedLessons.length;
    const percentage = Math.round((completed / total) * 100);

    return {
      total,
      completed,
      remaining: total - completed,
      percentage
    };
  }, [progress.completedLessons]);

  // Reset all progress
  const resetProgress = useCallback(() => {
    const newProgress = { ...defaultProgress };
    saveProgress(newProgress);
    setProgress(newProgress);
  }, []);

  return {
    // State
    progress,
    isLoaded,
    completedLessons: progress.completedLessons,
    currentLesson: progress.currentLesson,

    // Methods
    isLessonCompleted,
    markLessonComplete,
    markLessonIncomplete,
    toggleLessonComplete,
    setCurrentLesson,
    getNextLesson,
    getStats,
    resetProgress
  };
}

export default useProgress;
