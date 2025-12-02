import { useRef, useEffect, useCallback } from 'react';
import { useBlocks, useCurrentBlockIndex, useLessonActions } from '../../context/LessonContext';
import BlockCard from './BlockCard';
import BlockIndicator from './BlockIndicator';

/**
 * BlockSlider - Horizontal sliding block container
 * Uses CSS scroll-snap for smooth swiping
 */
export function BlockSlider() {
  const blocks = useBlocks();
  const currentIndex = useCurrentBlockIndex();
  const { setBlockIndex } = useLessonActions();
  const sliderRef = useRef(null);
  const isScrollingRef = useRef(false);

  // Handle scroll to detect which block is visible
  const handleScroll = useCallback(() => {
    if (!sliderRef.current || isScrollingRef.current) return;

    const slider = sliderRef.current;
    const scrollLeft = slider.scrollLeft;
    const cardWidth = slider.offsetWidth;

    // Calculate which card is most visible
    const newIndex = Math.round(scrollLeft / cardWidth);

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < blocks.length) {
      setBlockIndex(newIndex);
    }
  }, [currentIndex, blocks.length, setBlockIndex]);

  // Set up scroll event listener
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollTimeout;
    const handleScrollDebounced = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 50);
    };

    slider.addEventListener('scroll', handleScrollDebounced, { passive: true });

    return () => {
      slider.removeEventListener('scroll', handleScrollDebounced);
      clearTimeout(scrollTimeout);
    };
  }, [handleScroll]);

  // Scroll to block when indicator is clicked
  const scrollToBlock = useCallback((index) => {
    if (!sliderRef.current) return;

    isScrollingRef.current = true;
    const slider = sliderRef.current;
    const cardWidth = slider.offsetWidth;

    slider.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });

    setBlockIndex(index);

    // Reset scrolling flag after animation
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 500);
  }, [setBlockIndex]);

  if (!blocks.length) return null;

  return (
    <section className="lp-block-section">
      <div className="lp-section-label">課文區塊</div>

      <div className="lp-block-slider" ref={sliderRef}>
        {blocks.map((block, index) => (
          <BlockCard
            key={block.id}
            block={block}
            isActive={index === currentIndex}
          />
        ))}
      </div>

      <BlockIndicator
        total={blocks.length}
        current={currentIndex}
        onSelect={scrollToBlock}
      />
    </section>
  );
}

export default BlockSlider;
