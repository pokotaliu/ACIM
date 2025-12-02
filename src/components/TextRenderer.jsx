// TextRenderer.jsx - Renders text with inline commands
// Handles parsed content from the engine

import React from 'react';
import { getCommand } from '../engine/commands';

/**
 * Render parsed content segments
 * @param {array} content - Array of content segments from parser
 * @returns {React.ReactNode}
 */
export function renderContent(content) {
  if (!content || !Array.isArray(content)) {
    return String(content || '');
  }

  return content.map((segment, index) => {
    if (segment.type === 'raw') {
      return <span key={index}>{segment.text}</span>;
    }

    if (segment.type === 'pause') {
      // Pauses don't render anything visible
      return null;
    }

    // Look up command handler
    const command = getCommand(segment.type);
    if (command && command.render) {
      return command.render(segment, { key: index });
    }

    // Fallback: render as text if we have a text property
    if (segment.text) {
      return <span key={index}>{segment.text}</span>;
    }

    return null;
  });
}

/**
 * TextRenderer component - renders a line of text with inline commands
 */
export default function TextRenderer({
  content,
  className = '',
  isVisible = true,
  isWord = false
}) {
  const baseClasses = isWord
    ? 'text-element-word font-serif'
    : 'text-element';

  return (
    <p
      className={`
        ${baseClasses}
        ${className}
        ${isVisible ? 'visible' : ''}
        leading-relaxed
      `}
    >
      {renderContent(content)}
    </p>
  );
}
