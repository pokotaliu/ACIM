/**
 * PageHeader component - Displays lesson title and metadata
 *
 * @param {object} props
 * @param {number} props.lesson - Lesson number
 * @param {string} props.titleEn - English title
 * @param {string} props.titleZh - Chinese title
 * @param {string} props.keyword - Keyword in Chinese
 * @param {string} props.keywordEn - Keyword in English
 */
export function PageHeader({ lesson, titleEn, titleZh, keyword, keywordEn }) {
  return (
    <header className="mt-page-header">
      <p className="mt-lesson-number">Lesson {lesson}</p>
      <h1 className="mt-title-en">{titleEn}</h1>
      <p className="mt-title-zh">{titleZh}</p>
      {(keyword || keywordEn) && (
        <div className="mt-keyword-badge">
          <span>關鍵字</span>
          <span>
            {keyword}
            {keywordEn && ` / ${keywordEn}`}
          </span>
        </div>
      )}
    </header>
  );
}

export default PageHeader;
