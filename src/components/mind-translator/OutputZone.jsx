import { MIND_SYSTEM } from './mindSystem';

/**
 * OutputZone component - Displays the translation output
 *
 * @param {object} props
 * @param {string} props.currentMind - Currently selected mind type
 * @param {object|null} props.translation - Translation data for current mind
 * @param {boolean} props.hasBlock - Whether a block is selected
 */
export function OutputZone({ currentMind, translation, hasBlock }) {
  const mindMeta = MIND_SYSTEM[currentMind];

  const classNames = ['mt-output-zone', currentMind].filter(Boolean).join(' ');

  // Empty state - no block selected
  if (!hasBlock) {
    return (
      <div className={classNames}>
        <div className="mt-output-empty">
          選擇一個區塊，看看不同心智如何處理這句話
        </div>
      </div>
    );
  }

  // No translation available for this mind
  if (!translation) {
    return (
      <div className={classNames}>
        <div className="mt-output-empty">
          此區塊沒有 {mindMeta?.label || currentMind} 的翻譯內容
        </div>
      </div>
    );
  }

  // Support both old (innerVoice/outputWorld) and new (voice/world) field names
  const filters = translation.filters || [];
  const main = translation.main || '';
  const quote = translation.quote;
  const voice = translation.voice || translation.innerVoice || [];
  const world = translation.world || translation.outputWorld || [];

  return (
    <div className={classNames} role="tabpanel" id={`output-${currentMind}`}>
      <div className="mt-output-content">
        {/* Header */}
        <div className="mt-output-header">
          <span className="mt-output-icon">{mindMeta?.icon}</span>
          <h3 className="mt-output-label">
            {mindMeta?.label} 心智解碼
          </h3>
        </div>

        {/* Filter Tags */}
        {filters && filters.length > 0 && (
          <div className="mt-filter-tags">
            {filters.map((filter, index) => (
              <span key={index} className="mt-filter-tag">
                {filter}
              </span>
            ))}
          </div>
        )}

        {/* Translation Box */}
        <div className="mt-translation-box">
          {/* Quote (optional) */}
          {quote && <p className="mt-quote">"{quote}"</p>}

          {/* Main Translation */}
          <p className="mt-main-translation">{main}</p>

          {/* Inner Voice */}
          {voice && voice.length > 0 && (
            <div className="mt-inner-voice">
              <p className="mt-inner-voice-label">內在對話</p>
              {voice.map((line, index) => (
                <p key={index} className="mt-inner-voice-line">
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* World Tags */}
        {world && world.length > 0 && (
          <div className="mt-world-tags">
            <span className="mt-world-label">創造的世界：</span>
            {world.map((tag, index) => (
              <span key={index} className="mt-world-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OutputZone;
