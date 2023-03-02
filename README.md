⚠️ don't be reckless!
This app is in early development and most likely buggy. It does handle real sats though, so be sure to use only amounts that are small enough to lose.

# Cashu Wallet

A web based Cashu Wallet that supports multiple mints

## Roadmap

* [x] Adding, removing Mints
* [x] Mobile, web friendly
* [x] Minting tokens through Lightning
* [x] Melting tokens through Lightning
* [x] Sending tokens
* [x] receiving tokens
* [x] history for melt/mint
* [x] history for send/receive
* [x] support multiple keysets
* [x] support multiple mints
* [x] backup tokens
* [x] Inter-mint swapping
* [x] Send/receive over Nostr
* [x] reclaim pending tokens
* [x] PWA installable app
* [x] Scan to pay
* [ ] scan to send
* [ ] Merged Payment (use multiple mints to pay Invoice)




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