/**
 * KeyBlocksSection component - Displays key blocks organized by category
 *
 * @param {object} props
 * @param {array} props.keyBlocks - Array of key block data
 * @param {object|null} props.selectedBlock - Currently selected block
 * @param {function} props.onSelectBlock - Callback when a block is selected
 */

// Category metadata
const CATEGORIES = {
  practice: {
    name: '操作指引',
    desc: '如何做這個練習',
  },
  application: {
    name: '關鍵應用',
    desc: '特別挑戰小我的句子',
  },
  warning: {
    name: '防止劫持',
    desc: '小我會如何抗拒',
  },
  reminder: {
    name: '溫柔提醒',
    desc: '這不是考試',
  },
};

// Category order for display
const CATEGORY_ORDER = ['practice', 'application', 'warning', 'reminder'];

function BlockItem({ block, isSelected, onSelect }) {
  const handleClick = () => {
    onSelect(block);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const classNames = [
    'mt-block-item',
    block.category,
    isSelected && 'selected',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Block: ${block.en}`}
    >
      <div className="en">{block.en}</div>
      <div className="zh">{block.zh}</div>
      {block.why && <div className="why">瓦解：{block.why}</div>}
    </div>
  );
}

function CategoryGroup({ category, blocks, selectedBlock, onSelectBlock }) {
  const categoryMeta = CATEGORIES[category];
  if (!categoryMeta || !blocks || blocks.length === 0) return null;

  return (
    <div className="mt-category">
      <div className="mt-category-header">
        <div className={`mt-category-dot ${category}`} />
        <div className={`mt-category-name ${category}`}>{categoryMeta.name}</div>
        <div className="mt-category-desc">{categoryMeta.desc}</div>
      </div>
      <div className="mt-blocks-grid">
        {blocks.map((block) => (
          <BlockItem
            key={block.id}
            block={block}
            isSelected={selectedBlock?.id === block.id}
            onSelect={onSelectBlock}
          />
        ))}
      </div>
    </div>
  );
}

export function KeyBlocksSection({ keyBlocks, selectedBlock, onSelectBlock }) {
  if (!keyBlocks || keyBlocks.length === 0) return null;

  // Group blocks by category
  const blocksByCategory = {};
  keyBlocks.forEach((block) => {
    const cat = block.category || 'application';
    if (!blocksByCategory[cat]) {
      blocksByCategory[cat] = [];
    }
    blocksByCategory[cat].push(block);
  });

  return (
    <section className="mt-keyblocks-section">
      <div className="mt-section-header">
        <span className="mt-section-title">關 鍵 區 塊</span>
      </div>

      {CATEGORY_ORDER.map((category) => (
        <CategoryGroup
          key={category}
          category={category}
          blocks={blocksByCategory[category]}
          selectedBlock={selectedBlock}
          onSelectBlock={onSelectBlock}
        />
      ))}

      {/* Legend */}
      <div className="mt-legend">
        <div className="mt-legend-item">
          <div className="mt-legend-dot practice" />
          <span>操作指引</span>
        </div>
        <div className="mt-legend-item">
          <div className="mt-legend-dot application" />
          <span>關鍵應用</span>
        </div>
        <div className="mt-legend-item">
          <div className="mt-legend-dot warning" />
          <span>防止劫持</span>
        </div>
        <div className="mt-legend-item">
          <div className="mt-legend-dot reminder" />
          <span>溫柔提醒</span>
        </div>
      </div>
    </section>
  );
}

export default KeyBlocksSection;
