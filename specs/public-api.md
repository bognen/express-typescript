# Public API - PRD

## Goals
The JSON API namespace (`/api/*`, defined in `src/routes/Api.ts`) lets clients register,
log in and refresh a token without a browser session.

## Requirements
- `POST /api/auth/register` and `POST /api/auth/login` MUST validate `email` (required,
  valid format) and `password` (required, at least 8 characters) before touching the database.
- Responses MUST NOT include the password or password hash of any user.
- `POST /api/auth/refresh-token` MUST be protected by `express-jwt`; a request without a valid
  token MUST be rejected.
- A login for an unknown e-mail MUST return the same error shape as a wrong password so that
  accounts cannot be enumerated.
- New API routes MUST be registered in `src/routes/Api.ts` and implemented as a controller under
  `src/controllers/Api/`; route files MUST NOT contain business logic.

## Non-goals
- Social login (Google, Twitter) over the API. It exists only on the web routes.
- Rate limiting and API versioning (deferred).
