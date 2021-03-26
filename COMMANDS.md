# SCRIPTS

## DEV

$ BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ") COMMIT=$(git rev-parse --short HEAD) docker-compose up -d

## PROD (HEROKU CONTAINER)

$ npm run gulp build
$ docker build -t graphql-postgres:latest --target=prod --build-arg CREATED_DATE="$(date -u +"%Y-%m-%dT%H:%M:%SZ")" --build-arg SOURCE_COMMIT="$(git rev-parse --short HEAD)" -f ./Dockerfile .
$ docker tag graphql-postgres:latest registry.heroku.com/graphql-postgres-58572/web
$ docker push registry.heroku.com/graphql-postgres-58572/web
$ heroku container:release web
