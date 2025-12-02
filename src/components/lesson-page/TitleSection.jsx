/**
 * TitleSection - Displays lesson number and title
 */
export function TitleSection({ lesson, title }) {
  if (!title) return null;

  return (
    <section className="lp-title-section">
      <div className="lp-lesson-number">
        Lesson {lesson}
      </div>
      <h1 className="lp-title-en">{title.en}</h1>
      <p className="lp-title-zh">{title.zh}</p>
    </section>
  );
}

export default TitleSection;
