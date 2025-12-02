import { useCurrentMind, useCurrentMindContent } from '../../context/LessonContext';

/**
 * MindContent - Displays the mind translation for current block
 */
export function MindContent() {
  const currentMind = useCurrentMind();
  const content = useCurrentMindContent();

  if (!content) {
    return (
      <div className={`lp-mind-content ${currentMind}`}>
        <p className="lp-mind-main">請選擇一個區塊查看心智解讀</p>
      </div>
    );
  }

  return (
    <div className={`lp-mind-content ${currentMind}`} key={`${currentMind}-${content.main}`}>
      {/* Main Translation */}
      <p className="lp-mind-main">{content.main}</p>

      {/* Original Quote (Spirit often has this) */}
      {content.quote && (
        <p className="lp-mind-quote">"{content.quote}"</p>
      )}

      {/* Filter Tags */}
      {content.filters && content.filters.length > 0 && (
        <div className="lp-mind-filters">
          {content.filters.map((filter, index) => (
            <span key={index} className="lp-filter-tag">
              {filter}
            </span>
          ))}
        </div>
      )}

      {/* Inner Voice */}
      {content.innerVoice && content.innerVoice.length > 0 && (
        <div className="lp-inner-voice">
          <div className="lp-inner-voice-label">內在對話</div>
          <ul className="lp-inner-voice-list">
            {content.innerVoice.map((line, index) => (
              <li key={index} className="lp-inner-voice-item">
                {line}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* World Created */}
      {content.world && content.world.length > 0 && (
        <div className="lp-world-section">
          <span className="lp-world-label">創造的世界：</span>
          <div className="lp-world-tags">
            {content.world.map((tag, index) => (
              <span key={index} className="lp-world-tag">
                {tag}
                {index < content.world.length - 1 ? '・' : ''}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MindContent;
