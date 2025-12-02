/**
 * BlockCard - Single block card in the slider
 * @param {Object} props
 * @param {import('../../types/lesson.js').LessonBlock} props.block
 * @param {boolean} props.isActive
 */
export function BlockCard({ block, isActive }) {
  if (!block) return null;

  return (
    <article className={`lp-block-card ${isActive ? 'active' : ''}`}>
      {/* Header */}
      <header className="lp-block-header">
        <h3 className="lp-block-name">{block.name}</h3>
        <span className="lp-block-subtitle">{block.subtitle}</span>
      </header>

      {/* Quote */}
      <div className="lp-block-quote">
        <p className="lp-block-quote-en">"{block.text.quote}"</p>
        <p className="lp-block-quote-zh">{block.text.zh}</p>
      </div>

      <div className="lp-block-divider" />

      {/* Explanation */}
      <p className="lp-block-explanation">{block.explanation}</p>

      <div className="lp-block-divider" />

      {/* Practice */}
      <div className="lp-block-practice-label">練習</div>
      <p className="lp-block-practice">{block.practice}</p>
    </article>
  );
}

export default BlockCard;
