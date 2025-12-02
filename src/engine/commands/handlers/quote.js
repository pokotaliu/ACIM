// Quote block command handler
// Syntax: ## QUOTE or ## QUOTE:emphasis
// Content: > English text / > Chinese text

import React from 'react';

export const quoteCommand = {
  name: 'QUOTE',

  // Block pattern matching
  blockPattern: /^## QUOTE(?::(\w+))?$/,

  // Parse the entire block
  parseBlock: (lines, modifier) => {
    const quotes = [];
    let currentQuote = { en: '', zh: '' };

    for (const line of lines) {
      if (line.startsWith('> ')) {
        const text = line.slice(2);
        // Determine English or Chinese (simple check: contains Chinese characters)
        if (/[\u4e00-\u9fff]/.test(text)) {
          currentQuote.zh = text;
          quotes.push({ ...currentQuote });
          currentQuote = { en: '', zh: '' };
        } else {
          currentQuote.en = text;
        }
      }
    }

    // Handle case where there's an unpaired quote
    if (currentQuote.en || currentQuote.zh) {
      quotes.push({ ...currentQuote });
    }

    return {
      type: 'quote',
      emphasis: modifier === 'emphasis',
      quotes
    };
  },

  // Render block
  render: (data, props) => {
    const { quotes, emphasis } = data;

    return React.createElement(
      'div',
      {
        className: `quote-block-wrapper ${emphasis ? 'emphasis' : ''}`,
        key: props?.key
      },
      quotes.map((quote, index) =>
        React.createElement(
          'div',
          {
            className: `quote-block ${emphasis ? 'quote-emphasis' : ''}`,
            key: index,
            'data-animation-element': true
          },
          [
            quote.en && React.createElement(
              'p',
              { className: 'quote-en font-serif', key: 'en' },
              quote.en
            ),
            quote.zh && React.createElement(
              'p',
              { className: 'quote-zh mt-2', key: 'zh' },
              quote.zh
            )
          ]
        )
      )
    );
  },

  getAnimation: (data) => ({
    duration: 1200,
    stagger: 800
  })
};
