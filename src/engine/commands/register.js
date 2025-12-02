// Command Registration Module
// This file imports all command handlers and registers them

import { registerCommand } from './index';
import { pauseCommand } from './handlers/pause';
import { egoCommand } from './handlers/ego';
import { boldCommand } from './handlers/bold';
import { quoteCommand } from './handlers/quote';
import { practiceCommand } from './handlers/practice';
import { wordCommand } from './handlers/word';
import { closingCommand } from './handlers/closing';
import { sceneCommand } from './handlers/scene';
import { titleCommand } from './handlers/title';

/**
 * Register all built-in commands
 * Call this once during app initialization
 */
export function registerAllCommands() {
  // Inline commands (use pattern property)
  registerCommand('pause', pauseCommand);
  registerCommand('ego', egoCommand);
  registerCommand('bold', boldCommand);

  // Block commands (use blockPattern property)
  registerCommand('QUOTE', quoteCommand);
  registerCommand('PRACTICE', practiceCommand);
  registerCommand('WORD', wordCommand);
  registerCommand('CLOSING', closingCommand);
  registerCommand('SCENE', sceneCommand);
  registerCommand('TITLE', titleCommand);

  console.log('[Engine] All commands registered');
}

/**
 * HOW TO ADD NEW COMMANDS:
 *
 * 1. Create a new handler file in src/engine/commands/handlers/
 *    For example: src/engine/commands/handlers/highlight.js
 *
 * 2. Export a command object with the following structure:
 *
 *    For INLINE commands (like [pause], [ego]...[/ego]):
 *    {
 *      name: 'commandName',
 *      pattern: /\[commandName\](.*?)\[\/commandName\]/g,  // regex with global flag
 *      parse: (match) => ({ type: 'commandName', ...data }),
 *      render: (data, props) => React.createElement(...),  // or null if no visual
 *      getAnimation: (data) => ({ delay: 0, duration: 0 })
 *    }
 *
 *    For BLOCK commands (like ## QUOTE, ## PRACTICE):
 *    {
 *      name: 'COMMANDNAME',
 *      blockPattern: /^## COMMANDNAME(?::(\w+))?$/,  // regex to match the header
 *      parseBlock: (lines, modifier) => ({ type: 'commandName', ...data }),
 *      render: (data, props) => React.createElement(...),
 *      getAnimation: (data) => ({ delay: 0, duration: 0 })
 *    }
 *
 * 3. Import and register the command in this file:
 *    import { myCommand } from './handlers/myCommand';
 *    registerCommand('myCommand', myCommand);
 *
 * That's it! The parser will automatically pick up your new command.
 */
