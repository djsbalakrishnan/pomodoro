import React from 'react';
import { SoundOption } from '../types';
import { SOUND_OPTIONS } from '../hooks/useAudio';

interface Props {
  selected: SoundOption;
  isPlaying: boolean;
  volume: number;
  onSelect: (s: SoundOption) => void;
  onTogglePlay: () => void;
  onStop: () => void;
  onVolumeChange: (v: number) => void;
}

export const SoundPanel: React.FC<Props> = ({
  selected, isPlaying, volume, onSelect, onTogglePlay, onStop, onVolumeChange,
}) => {
  return (
    <div className="sound-panel">
      <div className="panel-title">Background Sound</div>
      <div className="sound-options">
        {SOUND_OPTIONS.map(s => (
          <button
            key={s.id}
            className={`pill ${selected === s.id ? 'pill-active' : ''}`}
            onClick={() => onSelect(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {selected !== 'none' && (
        <div className="sound-controls">
          <button className="btn btn-sm btn-secondary" onClick={onTogglePlay}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button className="btn btn-sm btn-ghost" onClick={onStop}>Stop</button>
          <div className="volume-row">
            <span className="volume-icon">🔈</span>
            <input
              type="range"
              className="volume-slider"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={e => onVolumeChange(parseFloat(e.target.value))}
            />
            <span className="volume-icon">🔊</span>
          </div>
        </div>
      )}
    </div>
  );
};
