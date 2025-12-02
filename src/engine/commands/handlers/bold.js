// Bold command handler - DEMONSTRATION OF EXTENSIBILITY
// Syntax: [bold]...[/bold]
// Renders text in bold style

import React from 'react';

export const boldCommand = {
  name: 'bold',

  // Match pattern for [bold]...[/bold]
  pattern: /\[bold\](.*?)\[\/bold\]/gs,

  // Parse function
  parse: (match) => {
    return {
      type: 'bold',
      text: match[1]
    };
  },

  // Render function
  render: (data, props) => {
    return React.createElement(
      'strong',
      {
        className: 'font-semibold',
        key: props?.key
      },
      data.text
    );
  },

  // No special animation needed
  getAnimation: () => ({})
};
