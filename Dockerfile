FROM node:alpine as build
WORKDIR /nutstash
COPY . .
COPY ./http/app.html ./src/app.html
COPY ./http/svelte.config.js ./svelte.config.js
COPY ./http/webcrypto-liner.shim.js ./static/webcrypto-liner.shim.js

RUN npm i
RUN npm run build

FROM node:alpine as prod
COPY ./package*.json ./
RUN npm ci --production --silent --ignore-scripts
COPY --from=build /nutstash/build ./build
COPY --from=build /nutstash/docker-startup.sh ./build

EXPOSE 3000/tcp
USER node
CMD [ "/bin/sh", "build/docker-startup.sh" ]