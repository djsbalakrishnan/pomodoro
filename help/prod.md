# Production Deployment

## Target environment

Static site hosted on **Vercel** (free Hobby plan), served at `pomodoro.dhirajbalakrishnan.dev`.  
DNS is managed via **Cloudflare** — subdomain CNAME points to Vercel, proxy OFF (grey cloud).

## Prerequisites

- A [Vercel account](https://vercel.com) (free Hobby plan is sufficient)
- The repo pushed to GitHub
- Vercel CLI (optional but useful): `npm install -g vercel`

## First-time setup

### 1. Push to GitHub

```bash
git remote add origin https://github.com/<your-username>/pomodoro.git
git push -u origin main
```

### 2. Import into Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import** next to your `pomodoro` repo
3. Vercel detects Create React App automatically — leave all settings as default
4. Click **Deploy**
5. Note the assigned domain: `pomodoro-<hash>.vercel.app`

### 3. Add the custom subdomain in Vercel

1. In your Vercel project → **Settings → Domains**
2. Add `pomodoro.dhirajbalakrishnan.dev`
3. Vercel shows you a CNAME value — copy it (looks like `cname.vercel-dns.com`)

### 4. Add DNS record in Cloudflare

1. Cloudflare dashboard → your domain → **DNS → Add record**
2. Type: `CNAME`  
   Name: `pomodoro`  
   Target: `cname.vercel-dns.com` (use whatever Vercel gave you)  
   Proxy: **OFF** (grey cloud) — Vercel needs to handle TLS itself
3. Save — propagation is usually under 60 seconds with Cloudflare

Vercel automatically provisions an SSL certificate. The site will be live at `https://pomodoro.dhirajbalakrishnan.dev`.

## Deploy / update

Every push to `main` triggers an automatic Vercel deployment (zero config).

```bash
# Make your changes, then:
git add <files>
git commit -m "feat: your change"
git push
# Vercel deploys automatically — takes ~30 seconds for a static build
```

To deploy manually from the CLI:

```bash
npm run build      # optional — Vercel builds from source
vercel --prod
```

## Verify the deployment

1. Visit `https://pomodoro.dhirajbalakrishnan.dev`
2. Timer shows `25:00` and responds to button clicks
3. Sound files load (select Rainfall → Play)
4. Complete a session — Stats tab shows count = 1

In the Vercel dashboard under **Deployments**, a green dot and "Ready" status confirm success. Build logs are available if anything fails.

## Roll back

In the Vercel dashboard → **Deployments** → find the previous deployment → click the `···` menu → **Promote to Production**. Takes effect immediately.

## Notes

- Sound files (`public/sounds/*.mp3`) are committed to the repo and deployed as static assets. If you replace them, commit and push — Vercel re-deploys automatically.
- No environment variables, no database, no server — nothing to configure on the hosting side beyond the domain.
- Vercel's free plan does not expire for static sites. There is no time limit or user cap that affects this app.
