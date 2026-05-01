import { PomodoroRecord, AppSettings } from './types';

const RECORDS_KEY = 'pomodoro_records';
const SETTINGS_KEY = 'pomodoro_settings';

export function getRecords(): PomodoroRecord[] {
  try {
    const raw = localStorage.getItem(RECORDS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecord(record: PomodoroRecord): void {
  const records = getRecords();
  records.push(record);
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
}

export function getSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? JSON.parse(raw) : { workDuration: 25, defaultReason: '' };
  } catch {
    return { workDuration: 25, defaultReason: '' };
  }
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
