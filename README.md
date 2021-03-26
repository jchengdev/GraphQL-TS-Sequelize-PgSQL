# Developer Notes

This project is quite outdated (2018), just some minor fixes to make it work with Gulp and Docker
Updating Sequelize v4 -> v6 messed up the index.ts and models definitions (may still have bad workarounds)

## Ignore List

- npm run test (no output, but 'npm run coverage' works)
- npm run pipelines
- production image without PM2
- iGraphQL interface broken
- /graphql?{params} routes are processing, but data layer corrupted (need more investigation)
