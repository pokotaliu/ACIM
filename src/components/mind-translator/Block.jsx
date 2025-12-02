import { useState } from 'react';

/**
 * Block component - A draggable/clickable lesson block
 *
 * @param {object} props
 * @param {object} props.block - Block data { id, text_en, text_zh }
 * @param {boolean} props.isSelected - Whether this block is selected
 * @param {function} props.onSelect - Callback when block is selected
 */
export function Block({ block, isSelected, onSelect }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('blockId', block.id.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    onSelect(block);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(block);
    }
  };

  const classNames = [
    'mt-block',
    isSelected && 'selected',
    isDragging && 'dragging',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Block ${block.id}: ${block.text_en}`}
    >
      <span className="mt-block-id">{block.id}</span>
      <span className="mt-block-text">{block.text_en}</span>
    </div>
  );
}

export default Block;
