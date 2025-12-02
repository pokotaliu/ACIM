import MindSwitch from './MindSwitch';

/**
 * TranslatorHeader component - Header with title and mind switch
 *
 * @param {object} props
 * @param {string} props.currentMind - Currently selected mind type
 * @param {array} props.availableMinds - Array of available mind type IDs
 * @param {function} props.onSwitchMind - Callback when mind is switched
 */
export function TranslatorHeader({ currentMind, availableMinds, onSwitchMind }) {
  return (
    <div className="mt-translator-header">
      <h2 className="mt-translator-title">
        心智翻譯器 <span>Mind Translator</span>
      </h2>
      <MindSwitch
        currentMind={currentMind}
        availableMinds={availableMinds}
        onSwitch={onSwitchMind}
      />
    </div>
  );
}

export default TranslatorHeader;
