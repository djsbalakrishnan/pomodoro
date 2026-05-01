import { useState, useEffect, useRef, useCallback } from 'react';
import { SoundOption } from '../types';

export const SOUND_OPTIONS = [
  { id: 'none'     as SoundOption, label: 'None',           file: '' },
  { id: 'rainfall' as SoundOption, label: 'Rainfall',       file: '/sounds/rainfall.mp3' },
  { id: 'ocean'    as SoundOption, label: 'Ocean Waves',    file: '/sounds/ocean.mp3' },
  { id: 'ambient'  as SoundOption, label: 'Ambient / Lo-fi', file: '/sounds/ambient.mp3' },
];

interface UseAudioReturn {
  selectedSound: SoundOption;
  isPlaying: boolean;
  volume: number;
  setSelectedSound: (s: SoundOption) => void;
  togglePlay: () => void;
  stop: () => void;
  setVolume: (v: number) => void;
}

export function useAudio(): UseAudioReturn {
  const [selectedSound, setSelectedSoundState] = useState<SoundOption>('none');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Swap audio element when track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);

    const opt = SOUND_OPTIONS.find(s => s.id === selectedSound);
    if (opt?.file) {
      const audio = new Audio(opt.file);
      audio.loop = true;
      audio.volume = volume;
      audioRef.current = audio;
    }
  // volume intentionally excluded — handled by its own effect
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSound]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => console.warn('Audio play failed:', err));
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  const setSelectedSound = useCallback((s: SoundOption) => setSelectedSoundState(s), []);
  const setVolume = useCallback((v: number) => setVolumeState(v), []);

  return { selectedSound, isPlaying, volume, setSelectedSound, togglePlay, stop, setVolume };
}
