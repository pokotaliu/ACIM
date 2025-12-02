/**
 * Mind System Configuration
 *
 * Defines all available mind types and their metadata.
 * This system is extensible - new mind types can be added by:
 * 1. Adding a new key to MIND_SYSTEM
 * 2. Adding corresponding translations in lesson JSON files
 */

export const MIND_TYPES = {
  EGO: 'ego',
  SPIRITUAL_EGO: 'spiritual_ego',
  SPIRIT: 'spirit',
};

export const MIND_SYSTEM = {
  ego: {
    id: 'ego',
    label: '小我',
    label_en: 'Ego',
    icon: '👁',
    description: '恐懼驅動、分裂、攻擊與防衛',
    colorScheme: {
      bg: '#1a1515',
      bgHover: '#2d1f1f',
      text: '#A89890',
      accent: '#C9A090',
      border: 'rgba(180, 100, 100, 0.3)',
      glow: 'rgba(180, 100, 100, 0.2)',
    },
  },
  spiritual_ego: {
    id: 'spiritual_ego',
    label: '靈性小我',
    label_en: 'Spiritual Ego',
    icon: '🎭',
    description: '用靈性語言包裝的小我、靈性驕傲、靈性繞道',
    colorScheme: {
      bg: '#1a1520',
      bgHover: '#2d1f2a',
      text: '#A890A8',
      accent: '#C090C9',
      border: 'rgba(160, 100, 180, 0.3)',
      glow: 'rgba(160, 100, 180, 0.2)',
    },
  },
  spirit: {
    id: 'spirit',
    label: '聖靈',
    label_en: 'Holy Spirit',
    icon: '✦',
    description: '寬恕、合一、平安',
    colorScheme: {
      bg: '#151a20',
      bgHover: '#1f2a35',
      text: '#C8D0D8',
      accent: '#90B0C9',
      border: 'rgba(100, 150, 200, 0.3)',
      glow: 'rgba(100, 150, 200, 0.2)',
    },
  },
};

/**
 * Get mind metadata by ID
 * @param {string} mindId - The mind type ID
 * @returns {object|null} The mind metadata or null if not found
 */
export function getMindMeta(mindId) {
  return MIND_SYSTEM[mindId] || null;
}

/**
 * Get all available mind IDs
 * @returns {string[]} Array of mind type IDs
 */
export function getAllMindIds() {
  return Object.keys(MIND_SYSTEM);
}

/**
 * Check if a mind type is valid
 * @param {string} mindId - The mind type ID to check
 * @returns {boolean} True if valid
 */
export function isValidMindType(mindId) {
  return mindId in MIND_SYSTEM;
}

export default MIND_SYSTEM;
