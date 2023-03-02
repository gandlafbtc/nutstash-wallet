FROM node:current-alpine

COPY --chown=1000:1000 .  /app 

RUN cd /app \
    && npm install \
    && npm run build

LABEL org.opencontainers.image.source https://github.com/gandlafbtc/nutstash-wallet

WORKDIR /app

EXPOSE 4173/tcp

CMD [ "npm", "run", "preview", "--", "--host" ]