import { useState } from 'react';

/**
 * CommonDifficulties component - FAQ-style expandable section (常見困難區)
 * Shows common questions and concerns with expandable answers
 *
 * @param {object} props
 * @param {Array} props.difficulties - Array of { question, answer }
 */
export function CommonDifficulties({ difficulties }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!difficulties || difficulties.length === 0) return null;

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle(index);
    }
  };

  return (
    <section className="mt-difficulties-section">
      <div className="mt-section-header">
        <span className="mt-section-title">常見困難</span>
      </div>

      <div className="mt-difficulties-list">
        {difficulties.map((item, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <div
              key={index}
              className={`mt-difficulty-item ${isExpanded ? 'expanded' : ''}`}
            >
              <div
                className="mt-difficulty-question"
                onClick={() => handleToggle(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
              >
                <span className="mt-difficulty-icon">
                  {isExpanded ? '−' : '+'}
                </span>
                <span className="mt-difficulty-q-text">{item.question}</span>
              </div>

              {isExpanded && (
                <div className="mt-difficulty-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CommonDifficulties;
