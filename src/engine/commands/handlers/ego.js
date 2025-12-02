// Ego command handler
// Syntax: [ego]...[/ego]
// Renders text in italic, muted style representing the ego's voice

import React from 'react';

export const egoCommand = {
  name: 'ego',

  // Match pattern for [ego]...[/ego]
  pattern: /\[ego\](.*?)\[\/ego\]/gs,

  // Parse function
  parse: (match) => {
    return {
      type: 'ego',
      text: match[1]
    };
  },

  // Render function
  render: (data, props) => {
    return React.createElement(
      'span',
      {
        className: 'ego-voice italic text-[var(--color-text-muted)]',
        key: props?.key
      },
      data.text
    );
  },

  // No special animation needed
  getAnimation: () => ({})
};
