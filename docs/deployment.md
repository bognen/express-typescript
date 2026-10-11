# Deployment

## Build and run
- `npm run build` compiles TypeScript to `dist/` (`tsc -p tsconfig.json`).
- `npm run start` runs `node dist`. `npm run dev` watches and restarts with nodemon.
- The production image (`Dockerfile`) builds on `node:10.5.0`, runs `npm run build`, exposes
  ports 4040 and 5550, and starts with `npm run start`.

## Local development with Docker
`docker-compose.yaml` builds `local.Dockerfile`, mounts the working tree and runs `npm run dev`.
It expects a Redis host (`REDIS_QUEUE_HOST`) and a MongoDB URL (`MONGOOSE_URL`); the Google and
Twitter OAuth variables are optional and empty by default.

## Configuration
All settings come from environment variables read in `src/providers/Locals.ts` (for example
`PORT`, `APP_URL`, `APP_SECRET`, `MONGOOSE_URL`). Set the database URL, the application secret and
any OAuth keys in the environment of the deployment, never in the image. `APP_SECRET` has a
built-in fallback value, so it must always be set explicitly outside local development.

## Checks before a release
Run `npm run lint` and `npm test` (compiles, then runs mocha on `dist/**/*.spec.js`).
