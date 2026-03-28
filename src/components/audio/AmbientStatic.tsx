"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface AmbientStaticProps {
  /** Volume level 0-1 */
  volume?: number;
  /** Whether to play */
  enabled?: boolean;
}

/**
 * Ambient static hiss using the Web Audio API.
 *
 * How it works:
 * - Creates a white noise buffer (random samples)
 * - Filters it to sound like TV static (band-pass filter)
 * - Adds a subtle low-frequency crackle
 * - Volume is controllable (maps to the bottom TV knob)
 * - Requires user interaction to start (browser policy)
 */
export default function AmbientStatic({
  volume = 0.08,
  enabled = true,
}: AmbientStaticProps) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userActivated, setUserActivated] = useState(false);

  // Create the audio context and noise on first user click
  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    // Create white noise buffer (2 seconds, looped)
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const channelData = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Slightly colored noise — not pure white
      channelData[i] = (Math.random() * 2 - 1) * 0.8;
    }

    // Noise source
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Band-pass filter to shape it like TV static
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 4000;
    bandpass.Q.value = 0.5;

    // Gentle high-shelf rolloff
    const highShelf = ctx.createBiquadFilter();
    highShelf.type = "highshelf";
    highShelf.frequency.value = 8000;
    highShelf.gain.value = -6;

    // Gain node for volume control
    const gain = ctx.createGain();
    gain.gain.value = volume;

    // Connect: source -> bandpass -> highShelf -> gain -> output
    source.connect(bandpass);
    bandpass.connect(highShelf);
    highShelf.connect(gain);
    gain.connect(ctx.destination);

    source.start();

    sourceRef.current = source;
    gainRef.current = gain;
    setIsPlaying(true);
  }, [volume]);

  // Update volume when prop changes
  useEffect(() => {
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.linearRampToValueAtTime(
        enabled ? volume : 0,
        audioCtxRef.current.currentTime + 0.1
      );
    }
  }, [volume, enabled]);

  // Listen for first user interaction to enable audio
  useEffect(() => {
    const handleInteraction = () => {
      if (!userActivated) {
        setUserActivated(true);
        initAudio();
      }
    };

    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [userActivated, initAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      sourceRef.current?.stop();
      audioCtxRef.current?.close();
    };
  }, []);

  // Play a burst of louder static (for channel changes)
  const burst = useCallback(() => {
    if (!gainRef.current || !audioCtxRef.current) return;
    const g = gainRef.current;
    const t = audioCtxRef.current.currentTime;
    g.gain.cancelScheduledValues(t);
    g.gain.setValueAtTime(Math.min(volume * 5, 0.4), t);
    g.gain.linearRampToValueAtTime(volume, t + 0.4);
  }, [volume]);

  // Expose burst function via a global for other components to call
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__staticBurst = burst;
    return () => {
      delete (window as unknown as Record<string, unknown>).__staticBurst;
    };
  }, [burst]);

  // No visible UI — this is purely audio
  return null;
}
