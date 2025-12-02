// Command Registry - Core of the extensible command system
// This module manages registration and retrieval of command handlers

// Command registry storage
const commands = {};

/**
 * Register a command handler
 * @param {string} name - Command name (e.g., 'pause', 'QUOTE')
 * @param {object} handler - Command handler object
 */
export function registerCommand(name, handler) {
  if (commands[name]) {
    console.warn(`Command "${name}" is already registered. Overwriting.`);
  }
  commands[name] = handler;
}

/**
 * Get a command handler by name
 * @param {string} name - Command name
 * @returns {object|null} - Command handler or null if not found
 */
export function getCommand(name) {
  return commands[name] || null;
}

/**
 * List all registered command names (useful for debugging)
 * @returns {string[]} - Array of command names
 */
export function listCommands() {
  return Object.keys(commands);
}

/**
 * Get all inline commands (commands with pattern property)
 * @returns {object[]} - Array of inline command handlers
 */
export function getInlineCommands() {
  return Object.values(commands).filter(cmd => cmd.pattern);
}

/**
 * Get all block commands (commands with blockPattern property)
 * @returns {object[]} - Array of block command handlers
 */
export function getBlockCommands() {
  return Object.values(commands).filter(cmd => cmd.blockPattern);
}

/**
 * Clear all commands (useful for testing)
 */
export function clearCommands() {
  Object.keys(commands).forEach(key => delete commands[key]);
}
