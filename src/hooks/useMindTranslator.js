import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Custom hook for Mind Translator state management
 * Supports the enhanced data structure with core, keyBlocks, and fullText
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
      setSelectedBlock(null);

      try {
        // Format lesson number with leading zeros (e.g., 1 -> 001)
        const lessonId = String(lessonNumber).padStart(3, '0');
        const response = await fetch(`/ACIM/data/mind-translator/lesson-${lessonId}.json`);

        if (!response.ok) {
          throw new Error(`Failed to load lesson ${lessonNumber}`);
        }

        const data = await response.json();

        // Validate basic structure (support both old and new format)
        if (!data.lesson) {
          throw new Error('Invalid lesson data format');
        }

        // Check for new format (keyBlocks) or old format (blocks)
        const hasNewFormat = data.keyBlocks && Array.isArray(data.keyBlocks);
        const hasOldFormat = data.blocks && Array.isArray(data.blocks);

        if (!hasNewFormat && !hasOldFormat) {
          throw new Error('Invalid lesson data format: missing blocks');
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

  // Get all blocks (supports both old and new format)
  const allBlocks = useMemo(() => {
    if (!lessonData) return [];
    return lessonData.keyBlocks || lessonData.blocks || [];
  }, [lessonData]);

  // Select a block by ID (searches keyBlocks)
  const selectBlock = useCallback(
    (blockId) => {
      if (!lessonData) return;

      // Check if it's the core block
      if (blockId === 'core' && lessonData.core) {
        setSelectedBlock({
          id: 'core',
          en: lessonData.core.en,
          zh: lessonData.core.zh,
          minds: lessonData.core.minds,
          isCore: true,
        });
        return;
      }

      // Search in keyBlocks or blocks
      const blocks = lessonData.keyBlocks || lessonData.blocks || [];
      const block = blocks.find((b) => b.id === blockId);
      setSelectedBlock(block || null);
    },
    [lessonData]
  );

  // Select a block directly (block object passed in)
  const selectBlockDirect = useCallback((block) => {
    setSelectedBlock(block);
  }, []);

  // Select the core block
  const selectCore = useCallback(() => {
    if (!lessonData?.core) return;

    setSelectedBlock({
      id: 'core',
      en: lessonData.core.en,
      zh: lessonData.core.zh,
      minds: lessonData.core.minds,
      isCore: true,
    });
  }, [lessonData]);

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

    const translation = selectedBlock.minds?.[currentMind];
    if (!translation) return null;

    // Normalize field names (support both innerVoice/voice and outputWorld/world)
    return {
      filters: translation.filters || [],
      main: translation.main || '',
      quote: translation.quote,
      voice: translation.voice || translation.innerVoice || [],
      world: translation.world || translation.outputWorld || [],
    };
  }, [selectedBlock, currentMind]);

  // Get available minds for the current lesson
  const getAvailableMinds = useCallback(() => {
    return lessonData?.availableMinds || ['ego', 'spirit'];
  }, [lessonData]);

  // Check if core block is selected
  const isCoreSelected = useMemo(() => {
    return selectedBlock?.id === 'core' || selectedBlock?.isCore === true;
  }, [selectedBlock]);

  return {
    // State
    lessonData,
    currentMind,
    selectedBlock,
    isLoading,
    error,

    // Computed data
    allBlocks,
    isCoreSelected,

    // Actions
    selectBlock,
    selectBlockDirect,
    selectCore,
    clearBlock,
    switchMind,

    // Computed functions
    getCurrentTranslation,
    getAvailableMinds,
  };
}

export default useMindTranslator;
