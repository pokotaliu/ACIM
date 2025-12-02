import { useRef, useCallback } from 'react';
import { useBlocks, useCurrentBlockIndex, useLessonActions } from '../../context/LessonContext';
import { useBlockTrigger } from '../../hooks/useBlockTrigger';
import BlockCard from './BlockCard';
import BlockIndicator from './BlockIndicator';

/**
 * BlockSlider - Horizontal sliding block container with center-line trigger
 * Uses CSS scroll-snap for smooth swiping
 * Triggers block change when block's right edge crosses the center line
 */
export function BlockSlider() {
  const blocks = useBlocks();
  const currentIndex = useCurrentBlockIndex();
  const { setBlockIndex } = useLessonActions();
  const sliderRef = useRef(null);
  const isScrollingRef = useRef(false);

  // Handle block change from trigger logic
  const handleBlockChange = useCallback((newIndex) => {
    if (!isScrollingRef.current) {
      setBlockIndex(newIndex);
    }
  }, [setBlockIndex]);

  // Use the center-line trigger logic
  useBlockTrigger({
    containerRef: sliderRef,
    blockCount: blocks.length,
    onBlockChange: handleBlockChange,
  });

  // Scroll to block when indicator is clicked
  const scrollToBlock = useCallback((index) => {
    if (!sliderRef.current) return;

    isScrollingRef.current = true;
    const slider = sliderRef.current;
    const blockElements = slider.querySelectorAll('[data-block-index]');

    if (blockElements[index]) {
      blockElements[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }

    setBlockIndex(index);

    // Reset scrolling flag after animation
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 500);
  }, [setBlockIndex]);

  if (!blocks.length) return null;

  return (
    <div className="lp-block-area">
      <div className="lp-section-label">課文區塊</div>

      <div className="lp-block-slider" ref={sliderRef}>
        {blocks.map((block, index) => (
          <BlockCard
            key={block.id}
            block={block}
            index={index}
            isActive={index === currentIndex}
          />
        ))}
      </div>

      <BlockIndicator
        total={blocks.length}
        current={currentIndex}
        onSelect={scrollToBlock}
      />
    </div>
  );
}

export default BlockSlider;
