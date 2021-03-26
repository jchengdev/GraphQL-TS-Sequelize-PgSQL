FROM node:14.16.0-alpine as base 
ARG CREATED_DATE=not-set 
ARG SOURCE_COMMIT=not-set 
LABEL org.opencontainers.image.authors=jcheng.deveng@gmail.com
LABEL org.opencontainers.image.created=$CREATED_DATE 
LABEL org.opencontainers.image.revision=$SOURCE_COMMIT 
LABEL org.opencontainers.image.title="GraphQL API - Node+Express sample" 
LABEL org.opencontainers.image.licenses=MIT 
EXPOSE 8080
ENV NODE_VERSION=14.16.0
ENV NODE_ENV=production
ENV DEBUG=*,-request:*
ENV DATABASE_URL=postgres://user:pass@host:5432/db
ENV JWT_SECRET=some-key-to-use
ENV PORT=8080
RUN mkdir /node && chown -R node:node /node
USER node
WORKDIR /node
COPY package*.json ./ 
RUN npm config list \ 
  && npm ci \ 
  && npm cache clean --force

FROM base as dev 
ENV NODE_ENV=docker-dev 
ENV PATH=/node/node_modules/.bin:$PATH 
WORKDIR /node 
RUN npm install --only=development 
WORKDIR /node/app 
CMD ["nodemon", "--delay", "5", "./dist/index.js"]

FROM base as prod
RUN mkdir /node/app && chown -R node:node /node/app
WORKDIR /node/app
COPY --chown=node:node ./dist ./dist
RUN sed -i "s/%%COMMIT_SHA%%/$SOURCE_COMMIT/g" ./dist/about.html
CMD [ "node", "./dist/index.js" ]