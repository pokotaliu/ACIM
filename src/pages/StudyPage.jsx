import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/study.css';

// Static content loader (similar to LessonLoader, but for static versions)
const staticModules = import.meta.glob('../lessons/static/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

console.log('[StudyPage] Available static modules:', Object.keys(staticModules));

export default function StudyPage() {
  const { lessonId } = useParams();
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const paddedId = String(lessonId).padStart(3, '0');
    const fileName = `lesson${paddedId}-static.md`;

    let markdown = null;
    for (const [path, data] of Object.entries(staticModules)) {
      if (path.endsWith(fileName)) {
        markdown = data;
        break;
      }
    }

    if (markdown) {
      setContent(parseStaticContent(markdown));
      setError(null);
    } else {
      setError(`Lesson ${lessonId} static content not found`);
      setContent(null);
    }
  }, [lessonId]);

  if (error) {
    return (
      <div className="study-page error">
        <p>{error}</p>
        <Link to="/">返回首頁</Link>
      </div>
    );
  }

  if (!content) {
    return <div className="study-page loading">載入中...</div>;
  }

  return (
    <div className="study-page">
      <header className="study-header">
        <Link to="/" className="back-link">← 返回首頁</Link>
        <h1>{content.titleEn}</h1>
        <h2>{content.titleZh}</h2>
      </header>

      {content.originalText && (
        <section className="original-text">
          <h3>課文原文</h3>
          <blockquote>{content.originalText}</blockquote>
        </section>
      )}

      <div className="comparison-container">
        <section className="ego-teaching">
          <div className="section-header ego">
            <span className="icon">🔴</span>
            <h3>小我的教導</h3>
            <span className="subtitle">The Ego's Teaching</span>
          </div>
          <div className="section-content"
               dangerouslySetInnerHTML={{ __html: content.egoHtml }} />
        </section>

        <div className="divider"></div>

        <section className="spirit-teaching">
          <div className="section-header spirit">
            <span className="icon">🔵</span>
            <h3>聖靈的教導</h3>
            <span className="subtitle">The Holy Spirit's Teaching</span>
          </div>
          <div className="section-content"
               dangerouslySetInnerHTML={{ __html: content.spiritHtml }} />
        </section>
      </div>

      {content.practiceHtml && (
        <section className="practice-section">
          <h3>練習的態度</h3>
          <div dangerouslySetInnerHTML={{ __html: content.practiceHtml }} />
        </section>
      )}

      {content.positionHtml && (
        <section className="position-section">
          <h3>這一課在整體課程中的位置</h3>
          <div dangerouslySetInnerHTML={{ __html: content.positionHtml }} />
        </section>
      )}

      <nav className="lesson-nav">
        {parseInt(lessonId) > 1 && (
          <Link to={`/study/${parseInt(lessonId) - 1}`} className="prev">
            ← 上一課
          </Link>
        )}
        <Link to={`/lesson/${lessonId}`} className="immersive">
          🎬 切換到沉浸體驗
        </Link>
        <Link to={`/study/${parseInt(lessonId) + 1}`} className="next">
          下一課 →
        </Link>
      </nav>
    </div>
  );
}

// Parse static content markdown
function parseStaticContent(markdown) {
  // Use regex to parse each section
  const titleMatch = markdown.match(/^# (.+)\n# (.+)/m);
  const originalMatch = markdown.match(/## 課文原文\n\n(.+?)(?=\n\n---|\n\n##)/s);
  const egoMatch = markdown.match(/## 🔴 小我的教導.+?\n\n([\s\S]+?)(?=\n---\n\n## 🔵)/);
  const spiritMatch = markdown.match(/## 🔵 聖靈的教導.+?\n\n([\s\S]+?)(?=\n---\n\n## 練習|$)/);
  const practiceMatch = markdown.match(/## 練習的態度\n\n([\s\S]+?)(?=\n---\n\n## 這一課|$)/);
  const positionMatch = markdown.match(/## 這一課在整體課程中的位置\n\n([\s\S]+?)$/);

  return {
    titleEn: titleMatch ? titleMatch[1] : '',
    titleZh: titleMatch ? titleMatch[2] : '',
    originalText: originalMatch ? originalMatch[1].trim() : '',
    egoHtml: egoMatch ? simpleMarkdownToHtml(egoMatch[1]) : '',
    spiritHtml: spiritMatch ? simpleMarkdownToHtml(spiritMatch[1]) : '',
    practiceHtml: practiceMatch ? simpleMarkdownToHtml(practiceMatch[1]) : '',
    positionHtml: positionMatch ? simpleMarkdownToHtml(positionMatch[1]) : ''
  };
}

// Simple markdown to HTML converter
function simpleMarkdownToHtml(md) {
  return md
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^#### (.+)$/gm, '<h5>$1</h5>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.+<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>')
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<h[45]>)/g, '$1')
    .replace(/(<\/h[45]>)<\/p>/g, '$1')
    .replace(/<p>(<ul>)/g, '$1')
    .replace(/(<\/ul>)<\/p>/g, '$1')
    .replace(/<p>(<blockquote>)/g, '$1')
    .replace(/(<\/blockquote>)<\/p>/g, '$1');
}
