import { useEffect, useCallback, useRef } from 'react';

/**
 * @typedef {Object} UseBlockTriggerProps
 * @property {React.RefObject<HTMLDivElement>} containerRef - Reference to the scroll container
 * @property {number} blockCount - Total number of blocks
 * @property {function(number): void} onBlockChange - Callback when block index changes
 */

/**
 * Hook to handle center-line trigger logic for block scrolling
 *
 * Trigger condition: When the current block's right edge crosses the container's center line,
 * switch to the next block.
 *
 * @param {UseBlockTriggerProps} props
 */
export function useBlockTrigger({ containerRef, blockCount, onBlockChange }) {
  const currentIndexRef = useRef(0);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || blockCount === 0) return;

    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;

    // Find all block elements
    const blockElements = container.querySelectorAll('[data-block-index]');
    if (blockElements.length === 0) return;

    // Find the first block whose right edge is still to the right of center
    // This is the current active block
    let newIndex = blockCount - 1; // Default to last block

    for (let i = 0; i < blockElements.length; i++) {
      const el = blockElements[i];
      const rect = el.getBoundingClientRect();
      const rightEdge = rect.right;

      // If this block's right edge is to the right of center, it's the current block
      if (rightEdge > centerX) {
        newIndex = i;
        break;
      }
    }

    // Clamp index to valid range
    newIndex = Math.max(0, Math.min(newIndex, blockCount - 1));

    // Only trigger callback if index changed
    if (newIndex !== currentIndexRef.current) {
      currentIndexRef.current = newIndex;
      onBlockChange(newIndex);
    }
  }, [containerRef, blockCount, onBlockChange]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use passive listener for better scroll performance
    container.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, handleScroll]);
}

export default useBlockTrigger;
