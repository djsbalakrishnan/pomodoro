# Local Development

## Prerequisites

- **Node.js** 18 or later (`node -v` to check)
- **npm** 9 or later (comes with Node)
- No `.env` file needed — this app has no environment variables

## Setup

```bash
# 1. Clone
git clone https://github.com/<your-username>/pomodoro.git
cd pomodoro

# 2. Install dependencies
npm install

# 3. Add sound files
# Place your three MP3 loops into public/sounds/:
#   public/sounds/rainfall.mp3
#   public/sounds/ocean.mp3
#   public/sounds/ambient.mp3
# The app will load them as static assets. Any format the browser
# supports works (mp3, ogg, wav).

# 4. Start dev server
npm start
```

The app opens automatically at **http://localhost:3000**.

Hot reload is enabled — saving any source file updates the browser instantly.

## Verify it's working

1. The timer displays `25:00` on load.
2. Clicking a duration pill updates the display immediately.
3. Selecting a sound and clicking Play should start audio (allow browser autoplay if prompted).
4. Starting the timer counts down in real time.
5. Completing a session (or setting duration to 1 min to test quickly) plays a 3-note chime and the Stats tab increments by 1.

## Common issues

| Symptom | Fix |
|---|---|
| Audio doesn't play | Browser blocks autoplay until the user interacts with the page — click anywhere first, then try Play |
| Sound file not found (404) | Check the file is named exactly `rainfall.mp3` / `ocean.mp3` / `ambient.mp3` in `public/sounds/` |
| `npm install` fails | Make sure you're on Node 18+. Run `node -v` to check |
| Stats show wrong counts | Stats use the system clock. If your machine's date/time is wrong the 24 h / 7 day windows will be off |
| Double chime on completion | Only occurs in React StrictMode in development — the production build is unaffected |
