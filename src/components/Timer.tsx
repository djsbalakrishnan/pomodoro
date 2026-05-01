import React from 'react';
import { TimerState } from '../types';
import { ProgressRing } from './ProgressRing';

interface Props {
  timeLeft: number; // seconds
  state: TimerState;
  progress: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export const Timer: React.FC<Props> = ({ timeLeft, state, progress, onStart, onPause, onReset }) => {
  const ringColor = state === 'completed' ? '#4caf50' : state === 'running' ? '#e85d50' : '#7c7c8a';

  return (
    <div className="timer-container">
      <ProgressRing progress={progress} size={260} strokeWidth={5} color={ringColor}>
        <div className="timer-display">
          <span className={`timer-time ${state === 'running' ? 'timer-running' : ''}`}>
            {formatTime(timeLeft)}
          </span>
          {state === 'completed' && <span className="timer-done-label">Complete!</span>}
          {state !== 'completed' && (
            <span className="timer-state-label">
              {state === 'idle' ? 'Ready' : state === 'running' ? 'Focus' : 'Paused'}
            </span>
          )}
        </div>
      </ProgressRing>

      <div className="timer-controls">
        {state === 'idle' && (
          <button className="btn btn-primary" onClick={onStart}>Start</button>
        )}
        {state === 'running' && (
          <button className="btn btn-secondary" onClick={onPause}>Pause</button>
        )}
        {state === 'paused' && (
          <>
            <button className="btn btn-primary" onClick={onStart}>Resume</button>
            <button className="btn btn-ghost" onClick={onReset}>Reset</button>
          </>
        )}
        {state === 'completed' && (
          <button className="btn btn-primary" onClick={onReset}>New Session</button>
        )}
        {(state === 'running') && (
          <button className="btn btn-ghost" onClick={onReset}>Reset</button>
        )}
      </div>
    </div>
  );
};
