import React, { useState, useCallback, useRef } from 'react';
import './App.css';
import { Timer } from './components/Timer';
import { SessionConfig } from './components/SessionConfig';
import { SoundPanel } from './components/SoundPanel';
import { Stats } from './components/Stats';
import { useTimer } from './hooks/useTimer';
import { useAudio } from './hooks/useAudio';
import { useStats } from './hooks/useStats';
import { addRecord } from './storage';
import { PomodoroRecord } from './types';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function playChime() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const frequencies = [523, 659, 784];
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.3);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + i * 0.3 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.3 + 0.8);
      osc.start(ctx.currentTime + i * 0.3);
      osc.stop(ctx.currentTime + i * 0.3 + 0.8);
    });
  } catch {}
}

export default function App() {
  const [duration, setDuration] = useState(25);
  const [reason, setReason] = useState('');
  const [statsRefresh, setStatsRefresh] = useState(0);
  const [activeTab, setActiveTab] = useState<'timer' | 'stats'>('timer');
  const reasonRef = useRef(reason);
  reasonRef.current = reason;
  const durationRef = useRef(duration);
  durationRef.current = duration;

  const handleComplete = useCallback(() => {
    playChime();
    const record: PomodoroRecord = {
      id: generateId(),
      completedAt: Date.now(),
      reason: reasonRef.current,
      durationMinutes: durationRef.current,
    };
    addRecord(record);
    setStatsRefresh(n => n + 1);
  }, []);

  const { timeLeft, state, progress, start, pause, reset } = useTimer(duration, handleComplete);
  const audio = useAudio();
  const stats = useStats(statsRefresh);

  const isActive = state === 'running' || state === 'paused';

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-logo">
          <span className="logo-dot" />
          <h1 className="app-title">Pomodoro</h1>
        </div>
        <nav className="app-nav">
          <button
            className={`nav-btn ${activeTab === 'timer' ? 'nav-active' : ''}`}
            onClick={() => setActiveTab('timer')}
          >
            Timer
          </button>
          <button
            className={`nav-btn ${activeTab === 'stats' ? 'nav-active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            Stats {stats.today > 0 && <span className="nav-badge">{stats.today}</span>}
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeTab === 'timer' && (
          <div className="timer-page">
            <SessionConfig
              duration={duration}
              reason={reason}
              disabled={isActive}
              onDurationChange={v => { setDuration(v); }}
              onReasonChange={setReason}
            />

            <Timer
              timeLeft={timeLeft}
              state={state}
              progress={progress}
              onStart={start}
              onPause={pause}
              onReset={reset}
            />

            <SoundPanel
              selected={audio.selectedSound}
              isPlaying={audio.isPlaying}
              volume={audio.volume}
              onSelect={audio.setSelectedSound}
              onTogglePlay={audio.togglePlay}
              onStop={audio.stop}
              onVolumeChange={audio.setVolume}
            />
          </div>
        )}

        {activeTab === 'stats' && (
          <Stats
            today={stats.today}
            week={stats.week}
            month={stats.month}
            year={stats.year}
            recentRecords={stats.recentRecords}
          />
        )}
      </main>

      <footer className="app-footer">
        <span>Stay focused. One Pomodoro at a time.</span>
      </footer>
    </div>
  );
}
