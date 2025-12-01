import { useState, useEffect, useRef, useCallback } from 'react';

// Simple ambient drone generator using Web Audio API
function createAmbientDrone(audioContext) {
  const masterGain = audioContext.createGain();
  masterGain.gain.value = 0.08; // Very low volume

  // Create multiple oscillators for a rich drone
  const oscillators = [];
  const frequencies = [110, 165, 220, 330]; // A2, E3, A3, E4 (A major chord, very peaceful)

  frequencies.forEach((freq, index) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = 'sine';
    osc.frequency.value = freq;

    // Slightly detune for warmth
    osc.detune.value = (index - 1.5) * 3;

    // Individual gains for balance
    gain.gain.value = 0.25 / (index + 1);

    osc.connect(gain);
    gain.connect(masterGain);

    oscillators.push(osc);
  });

  masterGain.connect(audioContext.destination);

  return {
    start: () => oscillators.forEach(osc => osc.start()),
    stop: () => oscillators.forEach(osc => {
      try {
        osc.stop();
      } catch {
        // Already stopped
      }
    }),
    setVolume: (value) => {
      masterGain.gain.setTargetAtTime(value * 0.08, audioContext.currentTime, 0.5);
    },
    masterGain
  };
}

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  // isLoaded is true by default since Web Audio API is available in modern browsers
  const [isLoaded] = useState(true);
  const [volume, setVolumeState] = useState(0.5);

  const audioContextRef = useRef(null);
  const droneRef = useRef(null);

  // Initialize audio context on first interaction
  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  }, []);

  const toggle = useCallback(() => {
    const context = initAudio();

    if (isPlaying) {
      // Stop
      if (droneRef.current) {
        droneRef.current.stop();
        droneRef.current = null;
      }
      setIsPlaying(false);
    } else {
      // Start
      if (context.state === 'suspended') {
        context.resume();
      }
      droneRef.current = createAmbientDrone(context);
      droneRef.current.start();
      setIsPlaying(true);
    }
  }, [isPlaying, initAudio]);

  const setVolume = useCallback((value) => {
    setVolumeState(value);
    if (droneRef.current) {
      droneRef.current.setVolume(value);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (droneRef.current) {
        droneRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    isPlaying,
    isLoaded,
    volume,
    toggle,
    setVolume
  };
}
