import Block from './Block';

/**
 * BlocksSection component - Container for all lesson blocks
 *
 * @param {object} props
 * @param {array} props.blocks - Array of block data
 * @param {object|null} props.selectedBlock - Currently selected block
 * @param {function} props.onSelectBlock - Callback when a block is selected
 */
export function BlocksSection({ blocks, selectedBlock, onSelectBlock }) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <section className="mt-blocks-section">
      <p className="mt-section-label">
        課文區塊 — 拖入或點擊下方翻譯器
      </p>
      <div className="mt-blocks-container">
        {blocks.map((block) => (
          <Block
            key={block.id}
            block={block}
            isSelected={selectedBlock?.id === block.id}
            onSelect={onSelectBlock}
          />
        ))}
      </div>
    </section>
  );
}

export default BlocksSection;
