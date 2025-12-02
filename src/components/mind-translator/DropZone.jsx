import { useState } from 'react';

/**
 * DropZone component - Area to drop or display selected block
 *
 * @param {object} props
 * @param {object|null} props.selectedBlock - Currently selected block
 * @param {function} props.onDrop - Callback when a block is dropped
 * @param {function} props.onClear - Callback to clear the selection
 */
export function DropZone({ selectedBlock, onDrop, onClear }) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const blockId = parseInt(e.dataTransfer.getData('blockId'), 10);
    if (!isNaN(blockId)) {
      onDrop(blockId);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onClear();
  };

  const classNames = [
    'mt-drop-zone',
    isDragOver && 'drag-over',
    selectedBlock && 'has-block',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="region"
      aria-label="Drop zone for lesson blocks"
    >
      {selectedBlock ? (
        <div className="mt-drop-zone-filled">
          <div className="mt-selected-block">
            {/* Support both old (text_en/text_zh) and new (en/zh) field names */}
            <p className="mt-selected-block-en">
              {selectedBlock.en || selectedBlock.text_en}
            </p>
            {(selectedBlock.zh || selectedBlock.text_zh) && (
              <p className="mt-selected-block-zh">
                {selectedBlock.zh || selectedBlock.text_zh}
              </p>
            )}
          </div>
          <button
            className="mt-clear-btn"
            onClick={handleClear}
            aria-label="Clear selection"
            title="清除選擇"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="mt-drop-zone-empty">
          <div className="mt-drop-zone-icon">↓</div>
          <p className="mt-drop-zone-text">
            將課文區塊拖到這裡，或點擊上方區塊
          </p>
        </div>
      )}
    </div>
  );
}

export default DropZone;
