/**
 * LessonIntro component - Displays the lesson introduction section (課程簡介區)
 * Shows what this lesson does and what ego beliefs it undoes
 *
 * @param {object} props
 * @param {object} props.intro - Intro data { whatItDoes, whatItUndoes }
 */
export function LessonIntro({ intro }) {
  if (!intro) return null;

  return (
    <section className="mt-intro-section">
      <div className="mt-section-header">
        <span className="mt-section-title">課程簡介</span>
      </div>

      <div className="mt-intro-content">
        {/* What this lesson does */}
        <div className="mt-intro-block">
          <h3 className="mt-intro-label">這一課在做什麼</h3>
          <p className="mt-intro-text">{intro.whatItDoes}</p>
        </div>

        {/* What it undoes */}
        {intro.whatItUndoes && intro.whatItUndoes.length > 0 && (
          <div className="mt-intro-block">
            <h3 className="mt-intro-label">拆解小我的什麼</h3>
            <ul className="mt-intro-list">
              {intro.whatItUndoes.map((item, index) => (
                <li key={index} className="mt-intro-list-item">
                  <span className="mt-intro-bullet">●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default LessonIntro;
