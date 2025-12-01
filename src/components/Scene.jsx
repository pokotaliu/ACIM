import { useState, useEffect, useRef, useMemo } from 'react';
import TextElement from './TextElement';
import QuoteBlock from './QuoteBlock';
import PracticeLine from './PracticeLine';
import { styles } from '../data/lesson1';

export default function Scene({
  scene,
  isActive,
  isPastScene,
  onPracticeMode,
  onNextLesson
}) {
  // Calculate initial visible elements based on isPastScene
  const getInitialVisibleElements = () => {
    if (isPastScene) {
      return scene.elements
        .map((_, index) => index)
        .filter(index => {
          const el = scene.elements[index];
          return el.type !== 'pause' && el.type !== 'fade-out-all';
        });
    }
    return [];
  };

  const [visibleElements, setVisibleElements] = useState(getInitialVisibleElements);
  const [animationComplete, setAnimationComplete] = useState(isPastScene);
  const elementIndexRef = useRef(0);
  const timeoutRef = useRef(null);

  // Calculate all visible indices for past scenes
  const allVisibleIndices = useMemo(() => {
    return scene.elements
      .map((_, index) => index)
      .filter(index => {
        const el = scene.elements[index];
        return el.type !== 'pause' && el.type !== 'fade-out-all';
      });
  }, [scene.elements]);

  // Animate elements sequentially when scene becomes active
  useEffect(() => {
    if (!isActive || animationComplete) return;

    const animateNextElement = () => {
      if (elementIndexRef.current >= scene.elements.length) {
        // All elements shown, wait for pauseAfter if specified
        if (scene.pauseAfter) {
          timeoutRef.current = setTimeout(() => {
            setAnimationComplete(true);
          }, scene.pauseAfter);
        } else {
          setAnimationComplete(true);
        }
        return;
      }

      const element = scene.elements[elementIndexRef.current];
      const delay = element.delay || 0;

      if (element.type === 'pause') {
        // For pause elements, just wait and then continue
        timeoutRef.current = setTimeout(() => {
          elementIndexRef.current++;
          animateNextElement();
        }, element.duration);
      } else if (element.type === 'fade-out-all') {
        // Special handling for fade-out-all
        timeoutRef.current = setTimeout(() => {
          elementIndexRef.current++;
          animateNextElement();
        }, element.duration);
      } else {
        // For regular elements, add to visible list after delay
        timeoutRef.current = setTimeout(() => {
          setVisibleElements(prev => [...prev, elementIndexRef.current]);
          elementIndexRef.current++;
          // Continue to next element after animation settles
          timeoutRef.current = setTimeout(animateNextElement, 800);
        }, delay);
      }
    };

    // Start animation sequence
    animateNextElement();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isActive, scene, animationComplete]);

  // Handle becoming past scene after initial render
  useEffect(() => {
    if (isPastScene && !animationComplete) {
      // Clear any pending animations
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setVisibleElements(allVisibleIndices);
      setAnimationComplete(true);
    }
  }, [isPastScene, animationComplete, allVisibleIndices]);

  const renderElement = (element, index) => {
    const isVisible = visibleElements.includes(index);
    const styleClass = element.style ? styles[element.style] || element.style : '';

    switch (element.type) {
      case 'text':
      case 'word':
        return (
          <TextElement
            key={index}
            content={element.content}
            isVisible={isVisible}
            className={styleClass}
            isWord={element.type === 'word'}
          />
        );

      case 'quote-block':
        return (
          <QuoteBlock
            key={index}
            en={element.en}
            zh={element.zh}
            isVisible={isVisible}
            isEmphasis={element.style === 'emphasis'}
          />
        );

      case 'practice-line':
        return (
          <PracticeLine
            key={index}
            en={element.en}
            zh={element.zh}
            isVisible={isVisible}
          />
        );

      case 'button':
        return (
          <button
            key={index}
            onClick={() => {
              if (element.action === 'practice-mode') {
                onPracticeMode?.();
              } else if (element.action === 'next-lesson') {
                onNextLesson?.();
              }
            }}
            className={`btn-scene ${isVisible ? 'visible' : ''}`}
          >
            {element.label}
          </button>
        );

      case 'pause':
      case 'fade-out-all':
        return null;

      default:
        return null;
    }
  };

  // Determine scene container classes based on type
  const getSceneClasses = () => {
    const baseClasses = 'scene-container min-h-[60vh] flex flex-col justify-center items-center px-6 py-20';

    switch (scene.type) {
      case 'title':
        return `${baseClasses} min-h-screen`;
      case 'nav':
        return `${baseClasses} min-h-[40vh] flex-row gap-6`;
      case 'climax':
        return `${baseClasses} min-h-[80vh]`;
      case 'closing':
        return `${baseClasses} min-h-screen`;
      default:
        return baseClasses;
    }
  };

  // Apply dimming effect for past scenes
  const opacityStyle = isPastScene && !isActive
    ? { opacity: 0.4, transition: 'opacity 0.8s ease-out' }
    : { opacity: 1, transition: 'opacity 0.8s ease-out' };

  return (
    <section
      id={`scene-${scene.id}`}
      className={getSceneClasses()}
      style={opacityStyle}
      data-scene-type={scene.type}
    >
      <div className="max-w-3xl w-full space-y-6 text-center">
        {scene.elements.map((element, index) => renderElement(element, index))}
      </div>
    </section>
  );
}
