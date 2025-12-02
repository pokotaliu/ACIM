import { useParams, Link } from 'react-router-dom';
import { useMindTranslator } from '../hooks/useMindTranslator';
import {
  PageHeader,
  BlocksSection,
  TranslatorHeader,
  DropZone,
  OutputZone,
} from '../components/mind-translator';

import '../styles/mind-translator.css';

/**
 * MindTranslatorPage - Main page component for the Mind Translator feature
 *
 * Route: /mind-translator/:lessonId
 */
export function MindTranslatorPage() {
  const { lessonId } = useParams();
  const lessonNumber = parseInt(lessonId, 10) || 1;

  const {
    lessonData,
    currentMind,
    selectedBlock,
    isLoading,
    error,
    selectBlock,
    selectBlockDirect,
    clearBlock,
    switchMind,
    getCurrentTranslation,
    getAvailableMinds,
  } = useMindTranslator(lessonNumber);

  // Loading state
  if (isLoading) {
    return (
      <div className="mind-translator-page">
        <div className="mt-loading">
          <div className="mt-loading-spinner" />
          <p>載入課程資料中...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mind-translator-page">
        <Link to="/" className="mt-back-btn">
          ← 返回課程列表
        </Link>
        <div className="mt-error">
          <div className="mt-error-icon">⚠</div>
          <p>無法載入課程 {lessonNumber}</p>
          <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>{error}</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!lessonData) {
    return (
      <div className="mind-translator-page">
        <Link to="/" className="mt-back-btn">
          ← 返回課程列表
        </Link>
        <div className="mt-error">
          <div className="mt-error-icon">📭</div>
          <p>課程 {lessonNumber} 的心智翻譯器資料尚未建立</p>
        </div>
      </div>
    );
  }

  const translation = getCurrentTranslation();
  const availableMinds = getAvailableMinds();

  return (
    <div className="mind-translator-page">
      {/* Back Button */}
      <Link to="/" className="mt-back-btn">
        ← 返回課程列表
      </Link>

      {/* Page Header */}
      <PageHeader
        lesson={lessonData.lesson}
        titleEn={lessonData.title_en}
        titleZh={lessonData.title_zh}
        keyword={lessonData.keyword}
        keywordEn={lessonData.keyword_en}
      />

      {/* Blocks Section */}
      <BlocksSection
        blocks={lessonData.blocks}
        selectedBlock={selectedBlock}
        onSelectBlock={selectBlockDirect}
      />

      {/* Translator Section */}
      <section className="mt-translator">
        <TranslatorHeader
          currentMind={currentMind}
          availableMinds={availableMinds}
          onSwitchMind={switchMind}
        />

        <DropZone
          selectedBlock={selectedBlock}
          onDrop={selectBlock}
          onClear={clearBlock}
        />

        <OutputZone
          currentMind={currentMind}
          translation={translation}
          hasBlock={!!selectedBlock}
        />
      </section>

      {/* Hint Section */}
      <section className="mt-hint-section">
        <p className="mt-hint-text">
          提示：選擇同一個區塊，切換不同心智，觀察同一句話如何被不同的心智「解碼」成完全不同的世界。
        </p>
      </section>
    </div>
  );
}

export default MindTranslatorPage;
