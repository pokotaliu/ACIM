/**
 * ClosingSection - Practice guide and closing quote
 * @param {Object} props
 * @param {import('../../types/lesson.js').PracticeGuide} props.practiceGuide
 * @param {import('../../types/lesson.js').ClosingQuote} props.closingQuote
 */
export function ClosingSection({ practiceGuide, closingQuote }) {
  return (
    <section className="lp-closing-section">
      {/* Practice Guide */}
      {practiceGuide && (
        <div className="lp-practice-guide">
          <h3 className="lp-practice-guide-title">練習指引</h3>
          <div className="lp-practice-guide-list">
            <div className="lp-practice-guide-item">
              <span className="lp-practice-guide-icon">🕐</span>
              <span className="lp-practice-guide-text">
                {practiceGuide.frequency}，{practiceGuide.timing}
              </span>
            </div>
            <div className="lp-practice-guide-item">
              <span className="lp-practice-guide-icon">⏱</span>
              <span className="lp-practice-guide-text">
                {practiceGuide.duration}
              </span>
            </div>
            <div className="lp-practice-guide-item">
              <span className="lp-practice-guide-icon">🌿</span>
              <span className="lp-practice-guide-text">
                {practiceGuide.attitude}
              </span>
            </div>
            {practiceGuide.informal && (
              <div className="lp-practice-guide-item">
                <span className="lp-practice-guide-icon">✨</span>
                <span className="lp-practice-guide-text">
                  {practiceGuide.informal}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Closing Quote */}
      {closingQuote && (
        <blockquote className="lp-closing-quote">
          <p className="lp-closing-quote-text">{closingQuote.text}</p>
          <footer className="lp-closing-quote-source">
            — {closingQuote.source}
          </footer>
        </blockquote>
      )}
    </section>
  );
}

export default ClosingSection;
