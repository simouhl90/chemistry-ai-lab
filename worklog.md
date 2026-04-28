---
Task ID: 1
Agent: Main Agent
Task: Fix blank page on Vercel deployment + fix AI verification API

Work Log:
- Diagnosed blank page issue: Vercel config was missing SPA rewrites, API route was using ESM instead of CommonJS
- Updated vercel.json: added SPA rewrites rule, explicit function runtime config for api/verify.js
- Rewrote api/verify.js: converted from ESM to CommonJS (module.exports) for Vercel compatibility
- Added DuckDuckGo Instant Answer API as fallback web search (no API key needed)
- Added CORS OPTIONS preflight handler
- Increased PubChem timeout from 8s to 10s for reliability
- Committed and pushed to GitHub (caea8ba) to trigger Vercel auto-deploy

Stage Summary:
- Vercel deployment should now serve the app correctly (blank page fix)
- AI verification uses PubChem (primary) + DuckDuckGo (fallback) for compound verification
- No API keys required — both services are free and public
- Build passes locally, preview server starts correctly
