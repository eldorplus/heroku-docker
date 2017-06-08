# Heroku / Docker Container App #

## Nginx ##

Configuration notes on running [Nginx](https://hub.docker.com/_/nginx/).

Heroku has designed this container to require that an environmental variable, PORT, is passed to the container at runtime.  This can be done either by specifying, on the command line, a variables file `--env_file variables.env` or by including individual variable assignement `-e "PORT=27017".


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
