import FadeInSection from './FadeInSection';

export default function Commentary({ sections }) {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      {/* Section divider */}
      <FadeInSection className="flex items-center justify-center mb-16">
        <div className="w-8 h-px bg-[var(--color-border)]" />
        <span className="mx-4 text-[var(--color-text-muted)] text-sm tracking-widest">
          肯恩·乏乏力克 解說
        </span>
        <div className="w-8 h-px bg-[var(--color-border)]" />
      </FadeInSection>

      {/* Commentary sections */}
      <div className="space-y-20">
        {sections.map((section, sectionIndex) => (
          <FadeInSection
            key={section.id}
            delay={sectionIndex * 150}
            slow={true}
            className="space-y-6"
          >
            {/* Opening stage direction */}
            {section.stageDirection && (
              <p className="stage-direction text-center mb-8">
                {section.stageDirection}
              </p>
            )}

            {/* Main content paragraphs */}
            {section.content.map((para, paraIndex) => (
              <p
                key={paraIndex}
                className="text-chinese leading-relaxed"
              >
                {para}
              </p>
            ))}

            {/* Mid-section stage direction (like [輕笑]) */}
            {section.stageDirectionMid && (
              <p className="stage-direction text-center my-6">
                {section.stageDirectionMid}
              </p>
            )}

            {/* Content after mid stage direction */}
            {section.afterStage && (
              <p className="text-chinese leading-relaxed">
                {section.afterStage}
              </p>
            )}

            {/* Pause indicator */}
            {section.pause && (
              <div className="flex items-center justify-center py-6">
                <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] opacity-50" />
              </div>
            )}

            {/* Content after pause */}
            {section.afterPause && (
              <p className="text-chinese leading-relaxed">
                {section.afterPause}
              </p>
            )}

            {/* Section divider (except for last section) */}
            {sectionIndex < sections.length - 1 && (
              <div className="flex justify-center pt-8">
                <div className="w-12 h-px bg-[var(--color-border)]" />
              </div>
            )}
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}
