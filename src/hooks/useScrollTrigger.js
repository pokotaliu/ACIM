import { useState, useEffect, useRef, useCallback } from 'react';

export function useScrollTrigger(sceneCount, options = {}) {
  const {
    threshold = 0.3,
    rootMargin = '0px 0px -20% 0px'
  } = options;

  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [pastScenes, setPastScenes] = useState(new Set());
  const observerRef = useRef(null);
  const sceneRefs = useRef([]);

  // Create refs for all scenes
  const setSceneRef = useCallback((index) => (element) => {
    sceneRefs.current[index] = element;
  }, []);

  // Setup intersection observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.sceneIndex, 10);

          if (entry.isIntersecting) {
            setActiveSceneIndex(index);

            // Mark all previous scenes as past
            setPastScenes((prev) => {
              const newSet = new Set(prev);
              for (let i = 0; i < index; i++) {
                newSet.add(i);
              }
              return newSet;
            });
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    // Observe all scene elements
    sceneRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.sceneIndex = index;
        observerRef.current.observe(ref);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sceneCount, threshold, rootMargin]);

  // Re-observe when refs change
  const observeScene = useCallback((element, index) => {
    if (element && observerRef.current) {
      element.dataset.sceneIndex = index;
      observerRef.current.observe(element);
    }
  }, []);

  return {
    activeSceneIndex,
    pastScenes,
    setSceneRef,
    observeScene,
    isSceneActive: (index) => index === activeSceneIndex,
    isScenePast: (index) => pastScenes.has(index)
  };
}
