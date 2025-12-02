// Closing block command handler
// Syntax: ## CLOSING
// Used for the closing section of a lesson

import React from 'react';

export const closingCommand = {
  name: 'CLOSING',

  // Block pattern matching
  blockPattern: /^## CLOSING$/,

  // Parse the entire block
  parseBlock: (lines, modifier) => {
    return {
      type: 'closing',
      content: lines // Pass lines for further processing by parser
    };
  },

  // Closing renders its content with special styling
  render: (data, props) => {
    return React.createElement(
      'div',
      {
        className: 'closing-block text-center',
        key: props?.key
      },
      props?.children
    );
  },

  getAnimation: (data) => ({
    duration: 1200
  })
};
