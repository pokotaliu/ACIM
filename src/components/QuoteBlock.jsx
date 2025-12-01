export default function QuoteBlock({
  en,
  zh,
  isVisible,
  isEmphasis = false
}) {
  return (
    <blockquote
      className={`
        quote-block
        ${isVisible ? 'visible' : ''}
        ${isEmphasis ? 'quote-emphasis' : ''}
      `}
    >
      <p className="quote-en font-serif">
        {en}
      </p>
      <p className="quote-zh mt-4">
        {zh}
      </p>
    </blockquote>
  );
}
