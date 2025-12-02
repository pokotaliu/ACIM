// Word focus block command handler
// Syntax: ## WORD: text
// Used for word-by-word analysis sections

import React from 'react';

export const wordCommand = {
  name: 'WORD',

  // Block pattern matching
  blockPattern: /^## WORD:\s*(.+)$/,

  // Parse the entire block
  parseBlock: (lines, word) => {
    return {
      type: 'word',
      focusWord: word,
      content: lines // Pass lines for further processing by parser
    };
  },

  // Render the focus word header
  renderHeader: (data, props) => {
    return React.createElement(
      'div',
      {
        className: 'word-focus-header text-center my-8',
        key: props?.key,
        'data-animation-element': true
      },
      React.createElement(
        'span',
        {
          className: 'word-highlight text-3xl md:text-4xl font-serif'
        },
        `"${data.focusWord}"`
      )
    );
  },

  getAnimation: (data) => ({
    duration: 1500
  })
};
