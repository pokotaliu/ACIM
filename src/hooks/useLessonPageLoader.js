import { useState, useEffect } from 'react';

/**
 * @typedef {Object} UseLessonLoaderResult
 * @property {import('../types/lesson.js').LessonData | null} lesson
 * @property {boolean} loading
 * @property {string | null} error
 */

/**
 * Hook to load lesson data from JSON file
 * @param {number} lessonNumber - The lesson number to load
 * @returns {UseLessonLoaderResult}
 */
export function useLessonPageLoader(lessonNumber) {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLesson = async () => {
      setLoading(true);
      setError(null);

      try {
        // Format lesson number with leading zeros: 1 -> 001
        const paddedNumber = String(lessonNumber).padStart(3, '0');

        // Use base path for GitHub Pages deployment
        const basePath = import.meta.env.BASE_URL || '/ACIM/';
        const url = `${basePath}lessons/lesson-${paddedNumber}.json`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`課程 ${lessonNumber} 載入失敗`);
        }

        const data = await response.json();

        // Validate basic structure
        if (!data.lesson || !data.blocks || !Array.isArray(data.blocks)) {
          throw new Error('課程資料格式錯誤');
        }

        setLesson(data);
      } catch (err) {
        console.error('Error loading lesson:', err);
        setError(err instanceof Error ? err.message : '未知錯誤');
      } finally {
        setLoading(false);
      }
    };

    if (lessonNumber) {
      loadLesson();
    }
  }, [lessonNumber]);

  return { lesson, loading, error };
}

export default useLessonPageLoader;
