// Practice block command handler
// Syntax: ## PRACTICE
// Content: English text\nChinese text\n---\n...

import React from 'react';

export const practiceCommand = {
  name: 'PRACTICE',

  // Block pattern matching
  blockPattern: /^## PRACTICE$/,

  // Parse the entire block
  parseBlock: (lines, modifier) => {
    const practices = [];
    let currentPair = [];

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed === '---') {
        // Separator between practice items - reset for next pair
        currentPair = [];
      } else if (trimmed) {
        currentPair.push(trimmed);

        // If we have two lines (English + Chinese), save the pair
        if (currentPair.length === 2) {
          practices.push({
            en: currentPair[0],
            zh: currentPair[1]
          });
          currentPair = [];
        }
      }
    }

    // Handle any remaining unpaired line
    if (currentPair.length === 1) {
      practices.push({
        en: currentPair[0],
        zh: ''
      });
    }

    return {
      type: 'practice',
      practices
    };
  },

  // Render block
  render: (data, props) => {
    const { practices } = data;

    return React.createElement(
      'div',
      {
        className: 'practice-block-wrapper',
        key: props?.key
      },
      practices.map((practice, index) =>
        React.createElement(
          'div',
          {
            className: 'practice-line',
            key: index,
            'data-animation-element': true
          },
          [
            React.createElement(
              'p',
              { className: 'practice-line-en font-serif', key: 'en' },
              practice.en
            ),
            practice.zh && React.createElement(
              'p',
              { className: 'practice-line-zh mt-1', key: 'zh' },
              practice.zh
            )
          ]
        )
      )
    );
  },

  getAnimation: (data) => ({
    duration: 1000,
    stagger: 1500
  })
};
