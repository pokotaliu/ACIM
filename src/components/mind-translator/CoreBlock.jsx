/**
 * CoreBlock component - Displays the core declaration (核心宣告)
 * This is the main lesson statement that can be clicked to translate
 *
 * @param {object} props
 * @param {number} props.lesson - Lesson number
 * @param {object} props.core - Core block data { en, zh, note, minds }
 * @param {boolean} props.isSelected - Whether this block is selected
 * @param {function} props.onSelect - Callback when block is selected
 */
export function CoreBlock({ lesson, core, isSelected, onSelect }) {
  if (!core) return null;

  const handleClick = () => {
    onSelect({
      id: 'core',
      en: core.en,
      zh: core.zh,
      minds: core.minds,
      isCore: true,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const classNames = ['mt-core-block', isSelected && 'selected']
    .filter(Boolean)
    .join(' ');

  return (
    <section className="mt-core-section">
      <div className="mt-lesson-num">LESSON {lesson}</div>
      <div
        className={classNames}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-pressed={isSelected}
        aria-label={`Core declaration: ${core.en}`}
      >
        <div className="mt-core-label">核心宣告</div>
        <div className="en">{core.en}</div>
        <div className="zh">{core.zh}</div>
        {core.note && <div className="note">「{core.note}」</div>}
      </div>
    </section>
  );
}

export default CoreBlock;
