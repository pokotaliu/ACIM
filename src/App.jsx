import { useState } from 'react';
import LessonHeader from './components/LessonHeader';
import OriginalText from './components/OriginalText';
import Commentary from './components/Commentary';
import PracticeMode from './components/PracticeMode';
import FadeInSection from './components/FadeInSection';
import { lesson1 } from './data/lesson1';

function App() {
  const [showPractice, setShowPractice] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Main content */}
      <main>
        {/* Opening section with lesson title */}
        <LessonHeader
          number={lesson1.number}
          title={lesson1.title}
          titleChinese={lesson1.titleChinese}
        />

        {/* Original course text */}
        <OriginalText paragraphs={lesson1.originalText} />

        {/* Kenneth Wapnick's commentary */}
        <Commentary sections={lesson1.commentary} />

        {/* Practice mode trigger */}
        <FadeInSection className="py-20 flex flex-col items-center">
          <div className="w-16 h-px bg-[var(--color-border)] mb-12" />
          <p className="text-[var(--color-text-muted)] text-center mb-8 max-w-md px-6">
            準備好了嗎？讓我們花一分鐘的時間，<br />
            實際做一次這個練習。
          </p>
          <button
            onClick={() => setShowPractice(true)}
            className="btn-practice"
          >
            進入練習模式
          </button>
        </FadeInSection>

        {/* Closing section */}
        <FadeInSection className="py-32 text-center">
          <div className="max-w-2xl mx-auto px-6">
            <p className="text-english text-lg md:text-xl text-[var(--color-text-muted)] italic mb-8">
              "A comfortable sense of leisure is essential."
            </p>
            <p className="text-chinese text-base text-[var(--color-text-muted)]">
              從容不迫的感覺是必要的。
            </p>
          </div>
        </FadeInSection>

        {/* Footer */}
        <footer className="py-12 text-center">
          <div className="w-8 h-px bg-[var(--color-border)] mx-auto mb-6" />
          <p className="text-[var(--color-text-muted)] text-sm">
            A Course in Miracles · Workbook Lesson 1
          </p>
          <p className="text-[var(--color-text-muted)] text-xs mt-2 opacity-60">
            Commentary inspired by Kenneth Wapnick
          </p>
        </footer>
      </main>

      {/* Practice mode overlay */}
      {showPractice && (
        <PracticeMode
          prompts={lesson1.practicePrompts}
          onClose={() => setShowPractice(false)}
        />
      )}
    </div>
  );
}

export default App;
