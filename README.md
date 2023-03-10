# Developer Notes

This project is quite outdated (2018), just some (not-so-)minor fixes to make it work with Gulp and Docker. Updating Sequelize v4 -> v6 messed up `index.ts` (now `db.ts`) and models definitions, may still find bad workarounds.

Original deployment in Heroku deactivated (no more free Dynos): https://graphql-postgres-app.herokuapp.com

## Ignore List

- `npm run clusters` and `npm run prod-start` (PM2 removed)
- `npm run test` (no output, but `npm run coverage` works)
- `npm run pipelines` (not tested, should also have issues)
- production image without PM2, without automatic TS build (via `gulp-typescript`)
- iGraphQL interface broken
- `/graphql?{params}` routes are processing, but data layer corrupted (need more investigation)
