// Scene command handler
// Syntax: # SCENE: name
// Defines a new scene/section

export const sceneCommand = {
  name: 'SCENE',

  // Block pattern matching
  blockPattern: /^# SCENE:\s*(.+)$/,

  // Parse scene header
  parseBlock: (lines, sceneName) => {
    return {
      type: 'scene',
      id: sceneName.toLowerCase().replace(/\s+/g, '-'),
      name: sceneName,
      content: lines // Scene content will be parsed separately
    };
  },

  // Scene is a structural element, rendering is handled by the Scene component
  render: null,

  getAnimation: () => ({})
};
