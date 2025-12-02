import { MIND_CONFIG } from '../../types/lesson';
import { useCurrentMind, useLessonActions } from '../../context/LessonContext';

/**
 * MindTabs - Mind type switching tabs
 */
export function MindTabs() {
  const currentMind = useCurrentMind();
  const { setMind } = useLessonActions();

  const minds = ['ego', 'spiritualEgo', 'spirit'];

  return (
    <div className="lp-mind-tabs">
      {minds.map((mind) => {
        const config = MIND_CONFIG[mind];
        const isActive = currentMind === mind;

        return (
          <button
            key={mind}
            className={`lp-mind-tab ${mind} ${isActive ? 'active' : ''}`}
            onClick={() => setMind(mind)}
            aria-pressed={isActive}
          >
            <span className="lp-mind-tab-icon">{config.icon}</span>
            <span className="lp-mind-tab-label">{config.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default MindTabs;
