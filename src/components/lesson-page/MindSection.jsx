import MindTabs from './MindTabs';
import MindContent from './MindContent';

/**
 * MindSection - Contains mind tabs and content
 */
export function MindSection() {
  return (
    <section className="lp-mind-section">
      <MindTabs />
      <MindContent />
    </section>
  );
}

export default MindSection;
