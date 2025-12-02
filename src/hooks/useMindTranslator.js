import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for Mind Translator state management
 *
 * @param {number} lessonNumber - The lesson number to load
 * @returns {object} State and actions for the Mind Translator
 */
export function useMindTranslator(lessonNumber) {
  const [lessonData, setLessonData] = useState(null);
  const [currentMind, setCurrentMind] = useState('ego');
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load lesson data
  useEffect(() => {
    async function loadLesson() {
      setIsLoading(true);
      setError(null);

      try {
        // Format lesson number with leading zeros (e.g., 1 -> 001)
        const lessonId = String(lessonNumber).padStart(3, '0');
        const response = await fetch(`/ACIM/data/mind-translator/lesson-${lessonId}.json`);

        if (!response.ok) {
          throw new Error(`Failed to load lesson ${lessonNumber}`);
        }

        const data = await response.json();

        // Validate basic structure
        if (!data.lesson || !data.blocks || !Array.isArray(data.blocks)) {
          throw new Error('Invalid lesson data format');
        }

        setLessonData(data);

        // Set default mind based on available minds
        if (data.availableMinds && data.availableMinds.length > 0) {
          setCurrentMind(data.availableMinds[0]);
        }
      } catch (err) {
        console.error('Error loading lesson:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (lessonNumber) {
      loadLesson();
    }
  }, [lessonNumber]);

  // Select a block by ID
  const selectBlock = useCallback(
    (blockId) => {
      if (!lessonData) return;

      const block = lessonData.blocks.find((b) => b.id === blockId);
      setSelectedBlock(block || null);
    },
    [lessonData]
  );

  // Select a block directly
  const selectBlockDirect = useCallback((block) => {
    setSelectedBlock(block);
  }, []);

  // Clear selected block
  const clearBlock = useCallback(() => {
    setSelectedBlock(null);
  }, []);

  // Switch mind type
  const switchMind = useCallback((mind) => {
    setCurrentMind(mind);
  }, []);

  // Get current translation for selected block
  const getCurrentTranslation = useCallback(() => {
    if (!selectedBlock || !currentMind) return null;

    return selectedBlock.minds?.[currentMind] || null;
  }, [selectedBlock, currentMind]);

  // Get available minds for the current lesson
  const getAvailableMinds = useCallback(() => {
    return lessonData?.availableMinds || ['ego', 'spirit'];
  }, [lessonData]);

  return {
    // State
    lessonData,
    currentMind,
    selectedBlock,
    isLoading,
    error,

    // Actions
    selectBlock,
    selectBlockDirect,
    clearBlock,
    switchMind,

    // Computed
    getCurrentTranslation,
    getAvailableMinds,
  };
}

export default useMindTranslator;
