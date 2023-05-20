⚠️ don't be reckless!
This app is in early development and most likely buggy. It does handle real sats though, so be sure to use only amounts that are small enough to lose.

# Cashu Wallet

A web based Cashu Wallet that supports multiple mints

Implemented [NUTs](https://github.com/cashubtc/nuts/):

- [x] NUT-00
- [x] NUT-01
- [x] NUT-02
- [x] NUT-03
- [x] NUT-04
- [x] NUT-05
- [x] NUT-06
- [x] NUT-07
- [x] NUT-08

## Roadmap

- [x] Adding, removing Mints
- [x] Mobile, web friendly
- [x] Minting tokens through Lightning
- [x] Melting tokens through Lightning
- [x] Sending tokens
- [x] receiving tokens
- [x] history for melt/mint
- [x] history for send/receive
- [x] support multiple keysets
- [x] support multiple mints
- [x] backup tokens
- [x] Inter-mint swapping
- [x] Send/receive over Nostr
- [x] reclaim pending tokens
- [x] PWA installable app
- [x] Scan to pay
- [ ] scan to send
- [ ] Merged Payment (use multiple mints to pay Invoice)

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Run with docker

As an alternative to node/npm one can use [docker](docs/docker.md) to build and run the application.

### Selfhosted backup

If you want to run your private instance of nutstash where tokens are synced with the server, you can use the docker compose file. Note that you will have to configure a folder (volume) on your host system, where nutstashs docker user has read/write permissions.

1. change `/tmp/nutstash/nutstash-data` in `docker-compose.yml` to your preferred location.
1. change the owner of the directory to `1000` ===> `sudo chown -R 1000:1000 [directory-path]`
1. start nutstash with: `docker-compose up --build -d`
1. activate the options to sync to server in nutstash settings 
## Contributing

Read [this guide](/docs/contribute.md) on how to contribute.

## Support the project

https://gandlaf.com/donate
