import React from 'react';
import { format } from 'date-fns';
import { PomodoroRecord } from '../types';

interface Props {
  today: number;
  week: number;
  month: number;
  year: number;
  recentRecords: PomodoroRecord[];
}

export const Stats: React.FC<Props> = ({ today, week, month, year, recentRecords }) => {
  return (
    <div className="stats-panel">
      <div className="panel-title">Statistics</div>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-value">{today}</span>
          <span className="stat-label">Today</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{week}</span>
          <span className="stat-label">This Week</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{month}</span>
          <span className="stat-label">This Month</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{year}</span>
          <span className="stat-label">This Year</span>
        </div>
      </div>

      {recentRecords.length > 0 && (
        <div className="recent-list">
          <div className="recent-title">Recent Sessions</div>
          {recentRecords.map(r => (
            <div key={r.id} className="recent-item">
              <span className="recent-time">{format(new Date(r.completedAt), 'MMM d, HH:mm')}</span>
              <span className="recent-reason">{r.reason || <em>No task</em>}</span>
              <span className="recent-duration">{r.durationMinutes}m</span>
            </div>
          ))}
        </div>
      )}

      {recentRecords.length === 0 && (
        <p className="empty-state">No sessions yet. Start your first Pomodoro!</p>
      )}
    </div>
  );
};
