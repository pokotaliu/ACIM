/**
 * Type definitions for Lesson Page
 * Using JSDoc for type documentation
 */

/**
 * @typedef {'ego' | 'spiritualEgo' | 'spirit'} MindType
 */

/**
 * @typedef {Object} MindContent
 * @property {string} main - Main translation (the quoted thought)
 * @property {string} [quote] - Original quote (Spirit often uses this)
 * @property {string[]} filters - Filter tags (2-4 items)
 * @property {string[]} innerVoice - Inner dialogue lines
 * @property {string[]} world - The world this creates
 */

/**
 * @typedef {Object} BlockMinds
 * @property {MindContent} ego
 * @property {MindContent} spiritualEgo
 * @property {MindContent} spirit
 */

/**
 * @typedef {Object} LessonBlock
 * @property {string} id - Unique identifier
 * @property {string} name - Block name (e.g., "毫無意義")
 * @property {string} subtitle - Block subtitle (e.g., "拆解的起點")
 * @property {{ quote: string, zh: string }} text - English quote and Chinese translation
 * @property {string} explanation - Key explanation (supports \n for line breaks)
 * @property {string} practice - Practice instructions (supports \n for line breaks)
 * @property {BlockMinds} minds - Three mind interpretations
 */

/**
 * @typedef {Object} PracticeGuide
 * @property {string} frequency - How often to practice
 * @property {string} timing - When to practice
 * @property {string} duration - How long each session
 * @property {string} attitude - The required attitude
 * @property {string} informal - Informal practice notes
 */

/**
 * @typedef {Object} ClosingQuote
 * @property {string} text - The quote text
 * @property {string} source - The source attribution
 */

/**
 * @typedef {Object} LessonData
 * @property {number} lesson - Lesson number
 * @property {{ en: string, zh: string }} title - English and Chinese titles
 * @property {LessonBlock[]} blocks - Array of lesson blocks
 * @property {PracticeGuide} practiceGuide - Practice guidelines
 * @property {ClosingQuote} closingQuote - Closing quote
 */

/**
 * Mind system configuration
 */
export const MIND_CONFIG = {
  ego: {
    id: 'ego',
    label: '小我',
    labelEn: 'Ego',
    icon: '👁',
    description: '恐懼、分裂、攻擊、受害者、製造例外',
  },
  spiritualEgo: {
    id: 'spiritualEgo',
    label: '靈性小我',
    labelEn: 'Spiritual Ego',
    icon: '🎭',
    description: '用靈性語言包裝的小我、假懂、靈性優越、繞道',
  },
  spirit: {
    id: 'spirit',
    label: '聖靈',
    labelEn: 'Spirit',
    icon: '✦',
    description: '寬恕、合一、溫柔、平安、沒有例外',
  },
};

/**
 * Get mind configuration by type
 * @param {MindType} mindType
 * @returns {typeof MIND_CONFIG.ego}
 */
export function getMindConfig(mindType) {
  return MIND_CONFIG[mindType] || MIND_CONFIG.ego;
}

export default MIND_CONFIG;
