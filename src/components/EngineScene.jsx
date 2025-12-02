// EngineScene.jsx - Scene component for engine-parsed data
// Renders scenes from the lesson loader engine

import { useState, useEffect, useRef, useMemo } from 'react';
import TextRenderer from './TextRenderer';
import { getCommand } from '../engine/commands';

export default function EngineScene({
  scene,
  metadata,
  isActive,
  isPastScene,
  onPracticeMode,
  onNextLesson
}) {
  // Get all renderable elements (excluding pauses)
  const renderableIndices = useMemo(() => {
    return scene.elements
      .map((_, index) => index)
      .filter(index => scene.elements[index].type !== 'pause');
  }, [scene.elements]);

  // Calculate initial visible elements based on isPastScene
  const getInitialVisibleElements = () => {
    if (isPastScene) {
      return new Set(renderableIndices);
    }
    return new Set();
  };

  const [visibleElements, setVisibleElements] = useState(getInitialVisibleElements);
  const [animationComplete, setAnimationComplete] = useState(isPastScene);
  const elementIndexRef = useRef(0);
  const timeoutRef = useRef(null);

  // Animate elements sequentially when scene becomes active
  useEffect(() => {
    if (!isActive || animationComplete) {
      return;
    }

    const animateNextElement = () => {
      if (elementIndexRef.current >= scene.elements.length) {
        setAnimationComplete(true);
        return;
      }

      const element = scene.elements[elementIndexRef.current];

      if (element.type === 'pause') {
        // Wait for pause duration, then continue
        timeoutRef.current = setTimeout(() => {
          elementIndexRef.current++;
          animateNextElement();
        }, element.duration);
      } else {
        // Calculate delay based on previous content
        const delay = getElementDelay(element);

        timeoutRef.current = setTimeout(() => {
          setVisibleElements(prev => new Set([...prev, elementIndexRef.current]));
          elementIndexRef.current++;
          // Continue to next element
          timeoutRef.current = setTimeout(animateNextElement, 800);
        }, delay);
      }
    };

    // Start animation sequence with initial delay
    timeoutRef.current = setTimeout(animateNextElement, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isActive, scene.elements, animationComplete]);

  // Handle becoming past scene after initial render
  useEffect(() => {
    if (isPastScene && !animationComplete) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setVisibleElements(new Set(renderableIndices));
      setAnimationComplete(true);
    }
  }, [isPastScene, animationComplete, renderableIndices]);

  // Calculate element delay based on type and inline pauses
  const getElementDelay = (element) => {
    if (!element.content || !Array.isArray(element.content)) {
      return 0;
    }

    // Check for inline pause at start
    const firstSegment = element.content[0];
    if (firstSegment?.type === 'pause') {
      return firstSegment.duration;
    }

    return 0;
  };

  // Render a single element
  const renderElement = (element, index) => {
    const isVisible = visibleElements.has(index);

    switch (element.type) {
      case 'title':
        return renderTitle(element, index, isVisible);

      case 'text':
        return (
          <TextRenderer
            key={index}
            content={element.content}
            isVisible={isVisible}
          />
        );

      case 'quote':
        return renderQuote(element, index, isVisible);

      case 'practice':
        return renderPractice(element, index, isVisible);

      case 'word':
        return renderWord(element, index, isVisible);

      case 'closing':
        return renderClosing(element, index, isVisible);

      case 'pause':
        return null;

      default:
        // Try to use command handler render
        const command = getCommand(element.type);
        if (command && command.render) {
          return command.render(element, { key: index, isVisible });
        }
        return null;
    }
  };

  // Render title element
  const renderTitle = (element, index, isVisible) => {
    return (
      <div
        key={index}
        className="title-display text-center py-8"
      >
        <h1
          className={`
            text-element text-4xl md:text-5xl lg:text-6xl font-serif leading-relaxed
            ${isVisible ? 'visible' : ''}
          `}
        >
          {element.title_en}
        </h1>
        <h2
          className={`
            text-element text-2xl md:text-3xl mt-6 text-[var(--color-text-muted)]
            ${isVisible ? 'visible' : ''}
          `}
          style={{ transitionDelay: '0.5s' }}
        >
          {element.title_zh}
        </h2>
      </div>
    );
  };

  // Render quote block
  const renderQuote = (element, index, isVisible) => {
    const { quotes, emphasis } = element;

    return (
      <div key={index} className="quote-block-wrapper">
        {quotes.map((quote, qIndex) => (
          <div
            key={qIndex}
            className={`
              quote-block
              ${emphasis ? 'quote-emphasis' : ''}
              ${isVisible ? 'visible' : ''}
            `}
            style={{ transitionDelay: `${qIndex * 0.3}s` }}
          >
            {quote.en && (
              <p className="quote-en font-serif">{quote.en}</p>
            )}
            {quote.zh && (
              <p className="quote-zh mt-2">{quote.zh}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Render practice block
  const renderPractice = (element, index, isVisible) => {
    const { practices } = element;

    return (
      <div key={index} className="practice-block-wrapper">
        {practices.map((practice, pIndex) => (
          <div
            key={pIndex}
            className={`
              practice-line
              ${isVisible ? 'visible' : ''}
            `}
            style={{ transitionDelay: `${pIndex * 0.4}s` }}
          >
            <p className="practice-line-en font-serif">{practice.en}</p>
            {practice.zh && (
              <p className="practice-line-zh mt-1">{practice.zh}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Render word focus section
  const renderWord = (element, index, isVisible) => {
    return (
      <div key={index} className="word-focus-section">
        <div
          className={`
            text-element-word font-serif text-center my-8
            ${isVisible ? 'visible' : ''}
          `}
        >
          "{element.focusWord}"
        </div>
        {element.elements?.map((el, elIndex) => (
          <TextRenderer
            key={`${index}-${elIndex}`}
            content={el.content}
            isVisible={isVisible}
            className={el.type === 'text' ? '' : ''}
          />
        ))}
      </div>
    );
  };

  // Render closing section
  const renderClosing = (element, index, isVisible) => {
    return (
      <div key={index} className="closing-section text-center">
        {element.elements?.map((el, elIndex) => {
          if (el.type === 'text') {
            return (
              <TextRenderer
                key={`${index}-${elIndex}`}
                content={el.content}
                isVisible={isVisible}
              />
            );
          }
          return null;
        })}
      </div>
    );
  };

  // Determine scene container classes based on type
  const getSceneClasses = () => {
    const baseClasses = 'scene-container min-h-[60vh] flex flex-col justify-center items-center px-6 py-20';

    switch (scene.id) {
      case 'title':
        return `${baseClasses} min-h-screen`;
      case 'closing':
        return `${baseClasses} min-h-screen`;
      default:
        if (scene.elements.some(el => el.type === 'word')) {
          return `${baseClasses} min-h-[80vh]`;
        }
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
