export default function PracticeLine({ en, zh, isVisible }) {
  return (
    <div
      className={`
        practice-line
        ${isVisible ? 'visible' : ''}
      `}
    >
      <p className="practice-line-en font-serif">
        {en}
      </p>
      <p className="practice-line-zh mt-2">
        {zh}
      </p>
    </div>
  );
}
