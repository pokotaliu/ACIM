/**
 * GentleInvitation component - Closing section with gentle reminder (溫柔邀請區)
 * Shows the closing quote from the workbook introduction
 *
 * @param {object} props
 * @param {object} props.closingQuote - Quote data { text, source }
 */
export function GentleInvitation({ closingQuote }) {
  if (!closingQuote) return null;

  return (
    <section className="mt-invitation-section">
      <div className="mt-section-header">
        <span className="mt-section-title">溫柔邀請</span>
      </div>

      <div className="mt-invitation-content">
        <blockquote className="mt-invitation-quote">
          <p className="mt-invitation-text">{closingQuote.text}</p>
          {closingQuote.source && (
            <footer className="mt-invitation-source">
              — {closingQuote.source}
            </footer>
          )}
        </blockquote>
      </div>
    </section>
  );
}

export default GentleInvitation;
