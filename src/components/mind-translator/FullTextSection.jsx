/**
 * FullTextSection component - Displays the full lesson text with inline highlights
 *
 * @param {object} props
 * @param {array} props.fullText - Array of paragraphs, each containing text segments
 * @param {object} props.keyBlocks - Key blocks data keyed by id for quick lookup
 * @param {object|null} props.selectedBlock - Currently selected block
 * @param {function} props.onSelectBlock - Callback when a block is selected
 */
export function FullTextSection({
  fullText,
  keyBlocks,
  selectedBlock,
  onSelectBlock,
}) {
  if (!fullText || fullText.length === 0) return null;

  // Create a lookup map for key blocks
  const blockMap = {};
  if (keyBlocks && Array.isArray(keyBlocks)) {
    keyBlocks.forEach((block) => {
      blockMap[block.id] = block;
    });
  }

  const handleKeyClick = (blockId) => {
    const block = blockMap[blockId];
    if (block) {
      onSelectBlock(block);
    }
  };

  const handleKeyDown = (e, blockId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleKeyClick(blockId);
    }
  };

  const renderSegment = (segment, index) => {
    if (segment.blockId) {
      const block = blockMap[segment.blockId];
      const category = block?.category || 'application';
      const isSelected = selectedBlock?.id === segment.blockId;

      const classNames = [
        'mt-key-inline',
        category,
        isSelected && 'selected',
      ]
        .filter(Boolean)
        .join(' ');

      return (
        <span
          key={index}
          className={classNames}
          data-zh={block?.zh || ''}
          onClick={() => handleKeyClick(segment.blockId)}
          onKeyDown={(e) => handleKeyDown(e, segment.blockId)}
          role="button"
          tabIndex={0}
          aria-pressed={isSelected}
        >
          {segment.text}
        </span>
      );
    }

    return <span key={index}>{segment.text}</span>;
  };

  const renderParagraph = (paragraph, pIndex) => {
    // Handle divider markers
    if (paragraph.length === 1 && paragraph[0].divider) {
      return (
        <div key={pIndex} className="mt-text-divider">
          · · ·
        </div>
      );
    }

    return <p key={pIndex}>{paragraph.map(renderSegment)}</p>;
  };

  return (
    <section className="mt-text-section">
      <div className="mt-section-header">
        <span className="mt-section-title">課 文 原 文</span>
      </div>
      <div className="mt-text-content">{fullText.map(renderParagraph)}</div>
    </section>
  );
}

export default FullTextSection;
