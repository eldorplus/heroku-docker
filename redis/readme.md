# Heroku / Docker Container App #

## Redis ##

Configuration notes on running [redis:alpine](https://hub.docker.com/_/redis/).

This container probably shouldn't need to be run as a standalone service in this context since it is run by docker-compose.  But it should be portable enough, with the host mounted volume that it can be if necessary.  And the data directory should be portable between hosts.

```console

docker run \
	-d \
	--env-file variables.env \
	--name redis \
	-p 6379:6379 \
	--rm \
	--volume $PWD/data:/data \
	redis:alipine	
```
