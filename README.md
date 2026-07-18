# Polynus

Polynus is a privacy-minded AI activity dashboard for OpenAI Build Week. It groups imported AI work into Professional, Academic, and Personal modes, extracts actionable tasks, visualizes time by tool, and generates a focused recommendation.

## Important platform constraint

Neither the public OpenAI API nor Google Gemini API currently lets a third-party app authenticate a consumer ChatGPT/Gemini account and read its chat history. This POC therefore uses supported Google sign-in through Supabase and an explicit import API for user-approved exports. It never claims to access consumer chat data that the providers do not expose. The connector records are designed to securely store encrypted OAuth tokens should provider-authorized scopes become available.

## Run locally

1. Create a Supabase project and run [`supabase/schema.sql`](supabase/schema.sql) in its SQL editor.
2. In Supabase Auth, enable Google and add `http://localhost:3000/auth/callback` as a redirect URL.
3. Copy `.env.example` to `.env.local` and fill all `NEXT_PUBLIC_SUPABASE_*` values. Generate `TOKEN_ENCRYPTION_KEY` with `openssl rand -base64 32`.
4. Install and run: `pnpm install && pnpm dev`.

`OPENAI_API_KEY` enables task extraction for imported data and tailored recommendations. Without it, the dashboard still runs with its demo sync.

## Import API

POST `/api/import` while authenticated:

```json
{"provider":"openai","conversations":[{"id":"export-1","title":"Q3 planning","content":"I need to finish the report by Friday.","startedAt":"2026-07-18T08:00:00Z","endedAt":"2026-07-18T08:30:00Z"}]}
```

## Deploy to Vercel

Import this repository into Vercel, add every variable in `.env.example`, and set `NEXT_PUBLIC_SITE_URL` to the Vercel URL. Add `https://YOUR-APP.vercel.app/auth/callback` to Supabase Auth redirect URLs. Never expose `OPENAI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, or `TOKEN_ENCRYPTION_KEY` to the browser.

## Data and security

All app tables use Supabase Row Level Security scoped to `auth.uid()`. Any future provider tokens are AES-256-GCM encrypted server-side before persistence. Conversation imports are limited to 100 records per request; production deployments should also add rate limiting and a retention/deletion screen.
