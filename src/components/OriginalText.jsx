import FadeInSection from './FadeInSection';

export default function OriginalText({ paragraphs }) {
  // Helper to determine if a paragraph is an instruction vs content
  const isInstruction = (id) => id.includes('instruction');
  const isExample = (id) => id.includes('examples');

  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      {/* Section divider */}
      <FadeInSection className="flex items-center justify-center mb-16">
        <div className="w-8 h-px bg-[var(--color-border)]" />
        <span className="mx-4 text-[var(--color-text-muted)] text-sm tracking-widest uppercase">
          Original Text
        </span>
        <div className="w-8 h-px bg-[var(--color-border)]" />
      </FadeInSection>

      {/* Paragraphs */}
      <div className="space-y-12">
        {paragraphs.map((para, index) => (
          <FadeInSection
            key={para.id}
            delay={index * 100}
            slow={true}
          >
            <p
              className={`text-english ${
                isInstruction(para.id)
                  ? 'text-[var(--color-text-muted)] text-base italic'
                  : isExample(para.id)
                  ? 'text-lg md:text-xl pl-4 md:pl-8 border-l-2 border-[var(--color-accent)]'
                  : para.id === 'intro'
                  ? 'text-xl md:text-2xl font-medium text-center'
                  : 'text-base md:text-lg'
              }`}
            >
              {para.text}
            </p>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}
