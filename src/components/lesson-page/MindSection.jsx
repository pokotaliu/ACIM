import MindTabs from './MindTabs';
import MindContent from './MindContent';

/**
 * MindSection - Contains mind tabs and content
 * Uses fixed height layout with scrollable content
 */
export function MindSection() {
  return (
    <div className="lp-mind-area">
      <MindTabs />
      <MindContent />
    </div>
  );
}

export default MindSection;
