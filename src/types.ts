export interface PomodoroRecord {
  id: string;
  completedAt: number; // Unix timestamp in ms
  reason: string;
  durationMinutes: number;
}

export interface AppSettings {
  workDuration: number; // minutes
  defaultReason: string;
}

export type TimerState = 'idle' | 'running' | 'paused' | 'completed';

export type SoundOption = 'none' | 'rainfall' | 'ocean' | 'ambient';
