# Deployment Guide

This is a purely static frontend app built with Create React App. The production build is a folder of HTML, CSS, and JS files that can be served from any static host.

## Build

```bash
npm run build
```

This creates a `build/` directory containing the optimised production bundle.

---

## Option 1 — GitHub Pages

### One-time setup

1. Push your repo to GitHub.
2. Install the helper package:
   ```bash
   npm install --save-dev gh-pages
   ```
3. Add the following to `package.json`:
   ```json
   "homepage": "https://<YOUR_GITHUB_USERNAME>.github.io/<REPO_NAME>",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

### Deploy

```bash
npm run deploy
```

The app will be live at the `homepage` URL after ~60 seconds.

---

## Option 2 — Netlify

### Via Netlify CLI

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=build
```

Follow the prompts to create or link a Netlify site. Netlify will provide a live URL.

### Via Netlify UI (drag-and-drop)

1. Run `npm run build`.
2. Go to [app.netlify.com](https://app.netlify.com) → **Sites** → **Add new site** → **Deploy manually**.
3. Drag the `build/` folder into the upload area.

### Automatic deploys from Git

1. Push the repo to GitHub/GitLab/Bitbucket.
2. In Netlify → **New site from Git** → select your repo.
3. Set:
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
4. Click **Deploy**. Every push to `main` will trigger a new deploy.

---

## Option 3 — Vercel

### Via Vercel CLI

```bash
npm install -g vercel
npm run build
vercel --prod
```

Vercel auto-detects Create React App and sets the build config for you.

### Via Vercel UI

1. Push the repo to GitHub/GitLab/Bitbucket.
2. Go to [vercel.com/new](https://vercel.com/new) and import your repo.
3. Vercel detects CRA automatically — click **Deploy**.

Every push to `main` triggers a new production deployment.

---

## SPA routing note

If you add client-side routing (e.g. React Router) in the future, you may need to configure your host to redirect all requests to `index.html`:

- **Netlify:** add a `public/_redirects` file with `/* /index.html 200`
- **Vercel:** add a `vercel.json` with `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
- **GitHub Pages:** no built-in support; use the hash router (`#`) strategy instead.
