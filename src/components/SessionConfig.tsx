import React from 'react';

interface Props {
  duration: number;
  reason: string;
  disabled: boolean;
  onDurationChange: (v: number) => void;
  onReasonChange: (v: string) => void;
}

const DURATIONS = [15, 20, 25, 30, 45, 60];

export const SessionConfig: React.FC<Props> = ({
  duration, reason, disabled, onDurationChange, onReasonChange,
}) => {
  return (
    <div className="session-config">
      <div className="config-row">
        <label className="config-label">Duration</label>
        <div className="duration-pills">
          {DURATIONS.map(d => (
            <button
              key={d}
              className={`pill ${duration === d ? 'pill-active' : ''}`}
              onClick={() => onDurationChange(d)}
              disabled={disabled}
            >
              {d}m
            </button>
          ))}
          <input
            type="number"
            className="duration-custom"
            value={duration}
            min={1}
            max={120}
            disabled={disabled}
            onChange={e => {
              const v = parseInt(e.target.value, 10);
              if (v > 0 && v <= 120) onDurationChange(v);
            }}
            title="Custom duration"
          />
        </div>
      </div>

      <div className="config-row">
        <label className="config-label">Task</label>
        <input
          type="text"
          className="task-input"
          placeholder="What are you working on? (optional)"
          value={reason}
          disabled={disabled}
          onChange={e => onReasonChange(e.target.value)}
          maxLength={120}
        />
      </div>
    </div>
  );
};
