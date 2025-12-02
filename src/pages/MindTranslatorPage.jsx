import { useParams, Link } from 'react-router-dom';
import { useMindTranslator } from '../hooks/useMindTranslator';
import {
  CoreBlock,
  FullTextSection,
  KeyBlocksSection,
  TranslatorHeader,
  DropZone,
  OutputZone,
  LessonIntro,
  CommonDifficulties,
  PracticeGuide,
  GentleInvitation,
} from '../components/mind-translator';

import '../styles/mind-translator.css';

/**
 * MindTranslatorPage - Main page component for the Mind Translator feature
 *
 * Route: /mind-translator/:lessonId
 *
 * Features:
 * - Core Block (核心宣告): Main lesson statement, clickable
 * - Lesson Intro (課程簡介): What this lesson does and undoes
 * - Full Text Section (課文原文): Full lesson text with inline highlights
 * - Key Blocks Section (關鍵區塊): Blocks organized by category
 * - Translator: Mind switching and output display
 * - Common Difficulties (常見困難): FAQ-style expandable questions
 * - Practice Guide (練習指引): How to practice
 * - Gentle Invitation (溫柔邀請): Closing quote
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
    isCoreSelected,
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

  // Determine if we have the new format (core, keyBlocks, fullText)
  const hasNewFormat = lessonData.core && lessonData.keyBlocks;

  return (
    <div className="mind-translator-page">
      {/* Back Button */}
      <Link to="/" className="mt-back-btn">
        ← 返回課程列表
      </Link>

      {/* 1. Core Block (核心宣告) */}
      {hasNewFormat && (
        <CoreBlock
          lesson={lessonData.lesson}
          core={lessonData.core}
          isSelected={isCoreSelected}
          onSelect={selectBlockDirect}
        />
      )}

      {/* 2. Lesson Intro (課程簡介) */}
      {lessonData.intro && (
        <LessonIntro intro={lessonData.intro} />
      )}

      {/* 3. Full Text Section (課文原文) */}
      {hasNewFormat && lessonData.fullText && (
        <FullTextSection
          fullText={lessonData.fullText}
          keyBlocks={lessonData.keyBlocks}
          selectedBlock={selectedBlock}
          onSelectBlock={selectBlockDirect}
        />
      )}

      {/* 4. Key Blocks Section (關鍵區塊) */}
      {hasNewFormat && (
        <KeyBlocksSection
          keyBlocks={lessonData.keyBlocks}
          selectedBlock={selectedBlock}
          onSelectBlock={selectBlockDirect}
        />
      )}

      {/* 5. Mind Translator Section */}
      <section className="mt-translator">
        <TranslatorHeader
          currentMind={currentMind}
          availableMinds={availableMinds}
          onSwitchMind={switchMind}
        />

        <DropZone
          selectedBlock={selectedBlock}
          onClear={clearBlock}
        />

        <OutputZone
          currentMind={currentMind}
          translation={translation}
          hasBlock={!!selectedBlock}
        />
      </section>

      {/* 6. Common Difficulties (常見困難) */}
      {lessonData.difficulties && (
        <CommonDifficulties difficulties={lessonData.difficulties} />
      )}

      {/* 7. Practice Guide (練習指引) */}
      {lessonData.practice && (
        <PracticeGuide practice={lessonData.practice} />
      )}

      {/* 8. Gentle Invitation (溫柔邀請) */}
      {lessonData.closingQuote && (
        <GentleInvitation closingQuote={lessonData.closingQuote} />
      )}

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
