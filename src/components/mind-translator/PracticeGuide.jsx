/**
 * PracticeGuide component - Displays practice instructions (練習指引區)
 * Shows frequency, duration, attitude, and informal practice guidance
 *
 * @param {object} props
 * @param {object} props.practice - Practice data { frequency, duration, attitude, informal }
 */
export function PracticeGuide({ practice }) {
  if (!practice) return null;

  const guideItems = [
    { label: '頻率', value: practice.frequency, icon: '⏱' },
    { label: '時長', value: practice.duration, icon: '⌛' },
    { label: '態度', value: practice.attitude, icon: '♡' },
    { label: '日常整合', value: practice.informal, icon: '☀' },
  ].filter(item => item.value);

  return (
    <section className="mt-practice-section">
      <div className="mt-section-header">
        <span className="mt-section-title">練習指引</span>
      </div>

      <div className="mt-practice-content">
        {guideItems.map((item, index) => (
          <div key={index} className="mt-practice-item">
            <div className="mt-practice-header">
              <span className="mt-practice-icon">{item.icon}</span>
              <span className="mt-practice-label">{item.label}</span>
            </div>
            <p className="mt-practice-text">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PracticeGuide;
