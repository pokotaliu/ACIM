// Parser.js - Markdown Parser for Lesson Content
// Parses lesson markdown files into structured data for rendering

import { getCommand, getInlineCommands, getBlockCommands } from './commands';

export class Parser {
  constructor() {
    this.inlineCommands = [];
    this.blockCommands = [];
    this.initialized = false;
  }

  /**
   * Initialize parser with registered commands
   * Call this after registerAllCommands()
   */
  init() {
    this.inlineCommands = getInlineCommands();
    this.blockCommands = getBlockCommands();
    this.initialized = true;
  }

  /**
   * Parse entire markdown document
   * @param {string} markdown - Raw markdown content
   * @returns {object} - Parsed lesson data
   */
  parse(markdown) {
    if (!this.initialized) {
      this.init();
    }

    const { metadata, content } = this.extractFrontmatter(markdown);
    const scenes = this.parseContent(content, metadata);

    return {
      metadata,
      scenes
    };
  }

  /**
   * Extract YAML frontmatter from markdown
   * @param {string} markdown - Raw markdown content
   * @returns {object} - { metadata, content }
   */
  extractFrontmatter(markdown) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
    const match = markdown.match(frontmatterRegex);

    if (!match) {
      return {
        metadata: {},
        content: markdown
      };
    }

    const yamlContent = match[1];
    const metadata = this.parseYaml(yamlContent);
    const content = markdown.slice(match[0].length);

    return { metadata, content };
  }

  /**
   * Simple YAML parser for frontmatter
   * @param {string} yaml - YAML content
   * @returns {object} - Parsed key-value pairs
   */
  parseYaml(yaml) {
    const result = {};
    const lines = yaml.split('\n');

    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();

        // Handle numeric values
        if (/^\d+$/.test(value)) {
          value = parseInt(value, 10);
        }

        result[key] = value;
      }
    }

    return result;
  }

  /**
   * Parse content into scenes
   * @param {string} content - Content without frontmatter
   * @param {object} metadata - Frontmatter metadata
   * @returns {array} - Array of scene objects
   */
  parseContent(content, metadata) {
    const lines = content.split('\n');
    const scenes = [];
    let currentScene = null;
    let currentBlock = null;
    let currentBlockLines = [];
    let lineBuffer = [];

    const finalizeBlock = () => {
      if (currentBlock && currentBlockLines.length > 0) {
        const handler = getCommand(currentBlock.name);
        if (handler && handler.parseBlock) {
          const blockData = handler.parseBlock(currentBlockLines, currentBlock.modifier);

          // Inject metadata for title
          if (blockData.type === 'title') {
            blockData.title_en = metadata.title_en;
            blockData.title_zh = metadata.title_zh;
          }

          // For WORD and CLOSING, process the content lines
          if (blockData.content) {
            blockData.elements = this.parseLines(blockData.content);
            delete blockData.content;
          }

          if (currentScene) {
            currentScene.elements.push(blockData);
          }
        }
      }
      currentBlock = null;
      currentBlockLines = [];
    };

    const finalizeLineBuffer = () => {
      if (lineBuffer.length > 0) {
        const elements = this.parseLines(lineBuffer);
        if (currentScene) {
          currentScene.elements.push(...elements);
        }
        lineBuffer = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check for # TITLE
      if (/^# TITLE$/.test(line)) {
        finalizeLineBuffer();
        finalizeBlock();

        // Create title scene if no current scene
        if (!currentScene) {
          currentScene = {
            id: 'title',
            type: 'title',
            elements: []
          };
          scenes.push(currentScene);
        }

        currentScene.elements.push({
          type: 'title',
          title_en: metadata.title_en,
          title_zh: metadata.title_zh
        });
        continue;
      }

      // Check for # SCENE: name
      const sceneMatch = line.match(/^# SCENE:\s*(.+)$/);
      if (sceneMatch) {
        finalizeLineBuffer();
        finalizeBlock();

        currentScene = {
          id: sceneMatch[1].toLowerCase().replace(/\s+/g, '-'),
          name: sceneMatch[1],
          type: 'scene',
          elements: []
        };
        scenes.push(currentScene);
        continue;
      }

      // Check for block commands (## COMMAND or ## COMMAND:modifier)
      let blockMatch = null;
      for (const cmd of this.blockCommands) {
        const match = line.match(cmd.blockPattern);
        if (match) {
          blockMatch = { name: cmd.name, modifier: match[1] };
          break;
        }
      }

      if (blockMatch) {
        finalizeLineBuffer();
        finalizeBlock();
        currentBlock = blockMatch;
        continue;
      }

      // If we're in a block, collect lines
      if (currentBlock) {
        currentBlockLines.push(line);
        continue;
      }

      // Regular content line - add to buffer if not empty or has inline commands
      if (line.trim() || lineBuffer.length > 0) {
        lineBuffer.push(line);
      }
    }

    // Finalize remaining content
    finalizeLineBuffer();
    finalizeBlock();

    return scenes;
  }

  /**
   * Parse lines into elements (text with inline commands)
   * @param {string[]} lines - Array of lines
   * @returns {array} - Array of element objects
   */
  parseLines(lines) {
    const elements = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Check if the line is a standalone pause
      if (/^\[pause(?::(\w+|\d+))?\]$/.test(trimmed)) {
        const pauseMatch = trimmed.match(/\[pause(?::(\w+|\d+))?\]/);
        const pauseCmd = getCommand('pause');
        if (pauseCmd) {
          elements.push(pauseCmd.parse(pauseMatch));
        }
        continue;
      }

      // Parse inline commands within text
      const parsedContent = this.parseInlineCommands(trimmed);
      elements.push({
        type: 'text',
        content: parsedContent
      });
    }

    return elements;
  }

  /**
   * Parse inline commands within text
   * @param {string} text - Text to parse
   * @returns {array} - Array of text segments and command data
   */
  parseInlineCommands(text) {
    const segments = [];
    let remaining = text;
    let lastIndex = 0;

    // Collect all matches from all inline commands
    const allMatches = [];

    for (const cmd of this.inlineCommands) {
      // Reset regex lastIndex
      cmd.pattern.lastIndex = 0;
      let match;

      while ((match = cmd.pattern.exec(text)) !== null) {
        allMatches.push({
          command: cmd,
          match: match,
          index: match.index,
          length: match[0].length
        });
      }
    }

    // Sort matches by index
    allMatches.sort((a, b) => a.index - b.index);

    // Process matches and create segments
    let currentIndex = 0;

    for (const { command, match, index, length } of allMatches) {
      // Skip if this match overlaps with previous
      if (index < currentIndex) continue;

      // Add text before this match
      if (index > currentIndex) {
        const textBefore = text.slice(currentIndex, index);
        if (textBefore) {
          segments.push({ type: 'raw', text: textBefore });
        }
      }

      // Add parsed command
      const parsed = command.parse(match);

      // For pause commands in the middle of text, we handle them specially
      if (parsed.type === 'pause') {
        segments.push(parsed);
      } else {
        segments.push(parsed);
      }

      currentIndex = index + length;
    }

    // Add remaining text
    if (currentIndex < text.length) {
      const remainingText = text.slice(currentIndex);
      if (remainingText) {
        segments.push({ type: 'raw', text: remainingText });
      }
    }

    // If no matches, return the original text as a single segment
    if (segments.length === 0) {
      return [{ type: 'raw', text: text }];
    }

    return segments;
  }
}

// Export singleton instance
export const parser = new Parser();
