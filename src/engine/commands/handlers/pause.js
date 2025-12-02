// Pause command handler
// Syntax: [pause], [pause:short], [pause:long], [pause:2000]

export const pauseCommand = {
  // Command name (used for matching)
  name: 'pause',

  // Match pattern (regex)
  pattern: /\[pause(?::(\w+|\d+))?\]/g,

  // Parse function: convert match result to structured data
  parse: (match) => {
    const modifier = match[1];
    let duration = 1500; // Default

    if (modifier === 'short') {
      duration = 800;
    } else if (modifier === 'long') {
      duration = 3000;
    } else if (/^\d+$/.test(modifier)) {
      duration = parseInt(modifier, 10);
    }

    return {
      type: 'pause',
      duration
    };
  },

  // Render function: return React component (if visual rendering is needed)
  render: (data, props) => {
    // Pause doesn't need visual rendering, only affects timing
    return null;
  },

  // Animation function: return animation control parameters
  getAnimation: (data) => {
    return {
      delay: data.duration
    };
  }
};
