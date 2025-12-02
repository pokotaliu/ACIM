// AnimationController.js - Controls animation timing and sequence
// Manages the display timing of elements within scenes

export class AnimationController {
  constructor() {
    this.queue = [];
    this.currentIndex = 0;
    this.isPlaying = false;
    this.isPaused = false;
    this.onElementShow = null;
    this.abortController = null;
  }

  /**
   * Load a scene's animation sequence
   * @param {array} elements - Array of elements to animate
   */
  loadScene(elements) {
    this.queue = this.buildAnimationQueue(elements);
    this.currentIndex = 0;
    this.isPlaying = false;
    this.isPaused = false;
  }

  /**
   * Build animation queue from elements
   * @param {array} elements - Scene elements
   * @returns {array} - Animation queue items
   */
  buildAnimationQueue(elements) {
    const queue = [];
    let accumulatedDelay = 0;

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      if (element.type === 'pause') {
        // Pause adds delay to next elements
        accumulatedDelay += element.duration;
        continue;
      }

      // Calculate element timing
      const item = {
        elementIndex: i,
        element: element,
        delay: accumulatedDelay,
        duration: this.calculateDuration(element)
      };

      queue.push(item);

      // Reset accumulated delay after using it
      accumulatedDelay = this.getDefaultDelay(element);
    }

    return queue;
  }

  /**
   * Calculate display duration based on element type
   * @param {object} element - Element data
   * @returns {number} - Duration in milliseconds
   */
  calculateDuration(element) {
    switch (element.type) {
      case 'title':
        return 1500;
      case 'quote':
        return 1200;
      case 'practice':
        return 1000;
      case 'word':
        return 1500;
      case 'text':
        // Estimate based on content length
        const textLength = this.getTextLength(element);
        return Math.max(800, Math.min(textLength * 50, 2000));
      default:
        return 1000;
    }
  }

  /**
   * Get default delay between elements based on type
   * @param {object} element - Element data
   * @returns {number} - Delay in milliseconds
   */
  getDefaultDelay(element) {
    switch (element.type) {
      case 'title':
        return 1500;
      case 'quote':
        return 800;
      case 'practice':
        return 500;
      default:
        return 500;
    }
  }

  /**
   * Get text length for timing calculation
   * @param {object} element - Element data
   * @returns {number} - Approximate character count
   */
  getTextLength(element) {
    if (element.content) {
      if (Array.isArray(element.content)) {
        return element.content.reduce((sum, seg) => {
          return sum + (seg.text || seg.content || '').length;
        }, 0);
      }
      return String(element.content).length;
    }
    return 20;
  }

  /**
   * Play animation sequence
   * @param {function} onElementShow - Callback when element should be shown
   * @returns {Promise} - Resolves when animation completes
   */
  async play(onElementShow) {
    this.isPlaying = true;
    this.isPaused = false;
    this.onElementShow = onElementShow;
    this.abortController = new AbortController();

    try {
      for (let i = this.currentIndex; i < this.queue.length; i++) {
        if (!this.isPlaying) break;

        while (this.isPaused) {
          await this.wait(100);
          if (!this.isPlaying) break;
        }

        const item = this.queue[i];

        // Wait for delay
        if (item.delay > 0) {
          await this.wait(item.delay);
        }

        if (!this.isPlaying) break;

        // Show element
        if (this.onElementShow) {
          this.onElementShow(item.elementIndex, item.element);
        }

        this.currentIndex = i + 1;
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('[AnimationController] Error:', error);
      }
    }

    this.isPlaying = false;
  }

  /**
   * Pause animation
   */
  pause() {
    this.isPaused = true;
  }

  /**
   * Resume animation
   */
  resume() {
    this.isPaused = false;
  }

  /**
   * Stop animation completely
   */
  stop() {
    this.isPlaying = false;
    this.isPaused = false;
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  /**
   * Skip to show all elements immediately
   * @param {function} onElementShow - Callback for each element
   */
  skipToEnd(onElementShow) {
    this.stop();
    for (let i = 0; i < this.queue.length; i++) {
      const item = this.queue[i];
      onElementShow(item.elementIndex, item.element);
    }
    this.currentIndex = this.queue.length;
  }

  /**
   * Wait for specified milliseconds
   * @param {number} ms - Milliseconds to wait
   * @returns {Promise}
   */
  wait(ms) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(resolve, ms);

      // Handle abort
      if (this.abortController) {
        this.abortController.signal.addEventListener('abort', () => {
          clearTimeout(timeoutId);
          reject(new DOMException('Aborted', 'AbortError'));
        });
      }
    });
  }

  /**
   * Get current progress (0-1)
   * @returns {number}
   */
  getProgress() {
    if (this.queue.length === 0) return 1;
    return this.currentIndex / this.queue.length;
  }

  /**
   * Reset to beginning
   */
  reset() {
    this.stop();
    this.currentIndex = 0;
  }
}

// Export singleton instance
export const animationController = new AnimationController();
