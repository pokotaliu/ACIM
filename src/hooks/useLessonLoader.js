// useLessonLoader.js - Custom hook for loading lessons with the engine
// Handles async lesson loading and caching

import { useState, useEffect, useCallback } from 'react';
import { loadLesson, lessonExists, initEngine } from '../engine/LessonLoader';

// Simple cache for loaded lessons
const lessonCache = new Map();

/**
 * Custom hook to load lesson data using the engine
 * @param {number|string} lessonId - Lesson ID to load
 * @returns {object} - { lesson, loading, error, reload }
 */
export function useLessonLoader(lessonId) {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadLessonData = useCallback(async () => {
    console.log('[useLessonLoader] loadLessonData called with lessonId:', lessonId);

    if (!lessonId || isNaN(lessonId)) {
      console.error('[useLessonLoader] Invalid lessonId:', lessonId);
      setError(new Error(`Invalid lesson ID: ${lessonId}`));
      setLoading(false);
      return;
    }

    // Check cache first
    const cacheKey = String(lessonId);
    if (lessonCache.has(cacheKey)) {
      console.log('[useLessonLoader] Found lesson in cache:', cacheKey);
      setLesson(lessonCache.get(cacheKey));
      setLoading(false);
      return;
    }

    console.log('[useLessonLoader] Starting to load lesson:', lessonId);
    setLoading(true);
    setError(null);

    try {
      // Initialize engine if needed
      console.log('[useLessonLoader] Initializing engine...');
      initEngine();

      // Check if lesson exists
      console.log('[useLessonLoader] Checking if lesson exists...');
      const exists = await lessonExists(lessonId);
      if (!exists) {
        throw new Error(`Lesson ${lessonId} not found`);
      }

      // Load the lesson
      console.log('[useLessonLoader] Loading lesson data...');
      const data = await loadLesson(lessonId);
      console.log('[useLessonLoader] Lesson loaded successfully:', data);

      // Cache the result
      lessonCache.set(cacheKey, data);

      setLesson(data);
      console.log('[useLessonLoader] State updated with lesson data');
    } catch (err) {
      console.error('[useLessonLoader] Error loading lesson:', err);
      setError(err);
    } finally {
      setLoading(false);
      console.log('[useLessonLoader] Loading complete, loading state set to false');
    }
  }, [lessonId]);

  useEffect(() => {
    loadLessonData();
  }, [loadLessonData]);

  // Reload function for manual refresh
  const reload = useCallback(() => {
    const cacheKey = String(lessonId);
    lessonCache.delete(cacheKey);
    loadLessonData();
  }, [lessonId, loadLessonData]);

  return {
    lesson,
    loading,
    error,
    reload
  };
}

/**
 * Clear the lesson cache
 */
export function clearLessonCache() {
  lessonCache.clear();
}
