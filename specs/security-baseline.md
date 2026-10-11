# Security baseline

Rules every change to this service MUST follow.

## Secrets and configuration
- The application secret, database URL and OAuth keys MUST be read through `Locals.config()`
  (`src/providers/Locals.ts`) from the environment. They MUST NOT be hard-coded in source files.
- `.env` files MUST NOT be committed with real values.
- There MUST be no usable default for `APP_SECRET`. Known gap: `Locals.config()` falls back to a
  fixed string when the variable is unset.

## Authentication
- Passwords MUST be stored hashed (see `src/models/User.ts`); plain-text passwords MUST NOT be
  logged or returned.
- JWTs for the API MUST be signed with the application secret and verified with `express-jwt`.
- Web routes that need a signed-in user MUST use `Passport.isAuthenticated`
  (`src/providers/Passport.ts`).

## Input and output
- Every controller that reads `req.body` MUST validate it with `express-validator` before use.
- Error responses MUST NOT expose stack traces or raw database errors in production.
  Known gap: `src/exception/Handler.ts` currently passes `err.stack` to the `pages/error` view.
- Web forms MUST keep CSRF protection enabled (`src/middlewares/CsrfToken.ts`).
