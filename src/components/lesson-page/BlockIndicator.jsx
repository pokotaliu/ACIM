/**
 * BlockIndicator - Shows current block position with dots
 * @param {Object} props
 * @param {number} props.total - Total number of blocks
 * @param {number} props.current - Current block index (0-based)
 * @param {function} props.onSelect - Callback when a dot is clicked
 */
export function BlockIndicator({ total, current, onSelect }) {
  return (
    <div className="lp-block-indicator">
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          className={`lp-indicator-dot ${index === current ? 'active' : ''}`}
          onClick={() => onSelect(index)}
          aria-label={`Go to block ${index + 1}`}
          aria-current={index === current ? 'true' : undefined}
        />
      ))}
    </div>
  );
}

export default BlockIndicator;
