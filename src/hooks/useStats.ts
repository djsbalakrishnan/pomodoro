import { useState, useEffect } from 'react';
import { subHours, subDays } from 'date-fns';
import { getRecords } from '../storage';
import { PomodoroRecord } from '../types';

interface Stats {
  today: number;
  week: number;
  month: number;
  year: number;
  recentRecords: PomodoroRecord[];
}

export function useStats(refreshTrigger: number): Stats {
  const [stats, setStats] = useState<Stats>({ today: 0, week: 0, month: 0, year: 0, recentRecords: [] });

  useEffect(() => {
    const records = getRecords();
    const now = new Date();

    const count = (from: Date) => records.filter(r => r.completedAt >= from.getTime()).length;

    setStats({
      today: count(subHours(now, 24)),
      week: count(subDays(now, 7)),
      month: count(subDays(now, 30)),
      year: count(subDays(now, 365)),
      recentRecords: [...records].sort((a, b) => b.completedAt - a.completedAt).slice(0, 10),
    });
  }, [refreshTrigger]);

  return stats;
}
