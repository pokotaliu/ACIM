// Title command handler
// Syntax: # TITLE
// Displays lesson title (English + Chinese from frontmatter)

import React from 'react';

export const titleCommand = {
  name: 'TITLE',

  // Block pattern matching
  blockPattern: /^# TITLE$/,

  // Parse - title data comes from frontmatter
  parseBlock: (lines, modifier) => {
    return {
      type: 'title'
      // title_en and title_zh come from metadata, injected during parsing
    };
  },

  // Render the title display
  render: (data, props) => {
    const { title_en, title_zh } = data;

    return React.createElement(
      'div',
      {
        className: 'title-display text-center py-16 min-h-[60vh] flex flex-col justify-center',
        key: props?.key
      },
      [
        React.createElement(
          'h1',
          {
            className: 'title-en text-4xl md:text-5xl lg:text-6xl font-serif leading-relaxed',
            key: 'en',
            'data-animation-element': true
          },
          title_en
        ),
        React.createElement(
          'h2',
          {
            className: 'title-zh text-2xl md:text-3xl mt-6 text-[var(--color-text-muted)]',
            key: 'zh',
            'data-animation-element': true,
            'data-animation-delay': '2000'
          },
          title_zh
        )
      ]
    );
  },

  getAnimation: (data) => ({
    duration: 1500,
    stagger: 2000
  })
};
