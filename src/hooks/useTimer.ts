import { useState, useEffect, useRef, useCallback } from 'react';
import { TimerState } from '../types';

interface UseTimerReturn {
  timeLeft: number;
  state: TimerState;
  progress: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export function useTimer(durationMinutes: number, onComplete: () => void): UseTimerReturn {
  const totalSeconds = durationMinutes * 60;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [state, setState] = useState<TimerState>('idle');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    setState('idle');
    setTimeLeft(durationMinutes * 60);
  }, [durationMinutes]);

  useEffect(() => {
    if (state === 'running') {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state]);

  // Completion fires once when timeLeft hits 0 while running — no side effects in updaters
  useEffect(() => {
    if (timeLeft === 0 && state === 'running') {
      setState('completed');
      onCompleteRef.current();
    }
  }, [timeLeft, state]);

  const start = useCallback(() => setState('running'), []);
  const pause = useCallback(() => setState('paused'), []);
  const reset = useCallback(() => {
    setState('idle');
    setTimeLeft(durationMinutes * 60);
  }, [durationMinutes]);

  const progress = (totalSeconds - timeLeft) / totalSeconds;

  return { timeLeft, state, progress, start, pause, reset };
}
