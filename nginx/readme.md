# Heroku / Docker Container App #

## Nginx ##

Configuration notes on running [Nginx](https://hub.docker.com/_/nginx/).

As configured, this container won't start as a standalone service because the proxy_pass directive requires the hostname of the node.js container.  The hostname for that container is set in the docker compose file, as web, but the nginx container does not know that ahead of time.  In the docker compose file, the nginx service needs to be started after (depends_on) the web service.

To run a standalone nginx container, use the ```docker run nginx:alpine``` version.

To run this container on its own, without Docker Compose, do something like this:


```console

docker stop nginx-node-core

docker build --tag nginx-node-core.

docker run \
	-d \
	--name nginx-node-core \
	-p "80:80" \
	-p "443:443" \
	--rm \
	nginx-node-core
```
