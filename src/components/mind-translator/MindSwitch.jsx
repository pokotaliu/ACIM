import { MIND_SYSTEM } from './mindSystem';

/**
 * MindSwitch component - Toggle between different mind types
 *
 * @param {object} props
 * @param {string} props.currentMind - Currently selected mind type
 * @param {array} props.availableMinds - Array of available mind type IDs
 * @param {function} props.onSwitch - Callback when mind is switched
 */
export function MindSwitch({ currentMind, availableMinds, onSwitch }) {
  const handleClick = (mindId) => {
    onSwitch(mindId);
  };

  const handleKeyDown = (e, mindId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSwitch(mindId);
    }
  };

  return (
    <div className="mt-mind-switch" role="tablist" aria-label="Mind type selection">
      {availableMinds.map((mindId) => {
        const mind = MIND_SYSTEM[mindId];
        if (!mind) return null;

        const isActive = currentMind === mindId;
        const classNames = [
          'mt-mind-btn',
          mindId,
          isActive && 'active',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={mindId}
            className={classNames}
            onClick={() => handleClick(mindId)}
            onKeyDown={(e) => handleKeyDown(e, mindId)}
            role="tab"
            aria-selected={isActive}
            aria-controls={`output-${mindId}`}
            title={mind.description}
          >
            <span className="mt-mind-icon">{mind.icon}</span>
            <span className="mt-mind-label">{mind.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default MindSwitch;
