# Docker

Using docker you don't need to install, configure, and manage a node environment.

## Building the app with docker

```shell
docker build --tag nutstash .
```
or
```shell
docker-compose --build
```

## Running the app using docker
Make sure to have build the app first. If you build the app using `docker-compose`, you should run the app using `docker-compose`. Alternatively if one builds and tags the image using `docker build`, one should run the app using `docker run`.

```shell
docker run --publish 4173:4173 nutstash
```
or
```shell
docker-compose up
```

## Open the app
After building and running the app, one can go to `http://localhost:4173` to use the app in a browser.
