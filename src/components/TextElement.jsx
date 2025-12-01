export default function TextElement({
  content,
  isVisible,
  className = '',
  isWord = false
}) {
  const baseClasses = isWord
    ? 'text-element-word font-serif'
    : 'text-element';

  return (
    <p
      className={`
        ${baseClasses}
        ${className}
        ${isVisible ? 'visible' : ''}
        leading-relaxed
      `}
    >
      {content}
    </p>
  );
}
