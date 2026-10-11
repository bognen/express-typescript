# Insights: auth and cache gotchas

- **The in-memory cache is per worker.** `src/providers/Cache.ts` uses `memory-cache`, and
  `src/index.ts` forks one worker per CPU. Cached pages are therefore not shared between workers,
  so a page can be fresh on one request and stale on the next.
- **Login and signup pages are cached for 10 seconds.** In `src/routes/Web.ts`, `GET /login` and
  `GET /signup` go through `cache(10)`. Any per-user content added to those pages would be served
  to other users within the window; do not put user-specific data there.
- **The refresh-token route depends on the JWT middleware order.** In `src/routes/Api.ts`,
  `expressJwt` runs before `RefreshTokenController`. Moving the controller above it would make the
  endpoint unauthenticated.
- **`APP_SECRET` silently falls back to a fixed string.** `Locals.config()` uses
  `process.env.APP_SECRET || '...'`, so a deployment that forgets the variable signs and verifies
  JWTs with a publicly known secret instead of failing to start.
- **API errors are returned as 200 JSON.** Controllers under `controllers/Api/Auth/` answer
  validation and lookup failures with `res.json({ errors })`, not an error status code, so clients
  must inspect the body.
