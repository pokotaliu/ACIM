// LessonLoader.js - Loads and manages lesson content
// Handles fetching markdown files and parsing them

import { parser } from './Parser';
import { registerAllCommands } from './commands/register';

// Track if commands have been registered
let commandsRegistered = false;

// Eagerly import all lesson files as raw text
const lessonModules = import.meta.glob('/src/lessons/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

/**
 * Initialize the lesson loader engine
 * Must be called once before loading any lessons
 */
export function initEngine() {
  if (!commandsRegistered) {
    registerAllCommands();
    parser.init();
    commandsRegistered = true;
    console.log('[LessonLoader] Engine initialized');
  }
}

/**
 * Load lesson content from markdown file
 * @param {number|string} lessonId - Lesson ID (e.g., 1 for lesson001.md)
 * @returns {Promise<object>} - Parsed lesson data
 */
export async function loadLesson(lessonId) {
  // Ensure engine is initialized
  initEngine();

  // Format lesson ID with leading zeros
  const paddedId = String(lessonId).padStart(3, '0');
  const fileName = `lesson${paddedId}.md`;
  const modulePath = `/src/lessons/${fileName}`;

  try {
    const markdown = lessonModules[modulePath];

    if (!markdown) {
      throw new Error(`Lesson file not found: ${fileName}`);
    }

    // Parse the markdown
    const lessonData = parser.parse(markdown);

    // Add lesson ID to metadata
    lessonData.metadata.id = lessonId;

    console.log(`[LessonLoader] Loaded lesson ${lessonId}:`, lessonData);

    return lessonData;
  } catch (error) {
    console.error(`[LessonLoader] Error loading lesson ${lessonId}:`, error);
    throw error;
  }
}

/**
 * Get list of available lessons
 * @returns {Promise<array>} - Array of lesson IDs
 */
export async function getAvailableLessons() {
  const lessonIds = [];

  for (const path of Object.keys(lessonModules)) {
    const match = path.match(/lesson(\d+)\.md$/);
    if (match) {
      lessonIds.push(parseInt(match[1], 10));
    }
  }

  return lessonIds.sort((a, b) => a - b);
}

/**
 * Check if a lesson exists
 * @param {number|string} lessonId - Lesson ID
 * @returns {Promise<boolean>}
 */
export async function lessonExists(lessonId) {
  const paddedId = String(lessonId).padStart(3, '0');
  const fileName = `lesson${paddedId}.md`;
  const modulePath = `/src/lessons/${fileName}`;

  return modulePath in lessonModules;
}

/**
 * Preload multiple lessons for faster navigation
 * @param {array} lessonIds - Array of lesson IDs to preload
 * @returns {Promise<Map>} - Map of lesson ID to lesson data
 */
export async function preloadLessons(lessonIds) {
  const cache = new Map();

  await Promise.all(
    lessonIds.map(async (id) => {
      try {
        const data = await loadLesson(id);
        cache.set(id, data);
      } catch (error) {
        console.warn(`[LessonLoader] Could not preload lesson ${id}`);
      }
    })
  );

  return cache;
}

// Export the parser for direct access if needed
export { parser };
