#Heroku / Docker Container App#

##Mongo Express Web GUI##

This is a neat little web frontend container app that connects, by default, to the local development MongoDB database.
[Mongo-express][https://hub.docker.com/_/mongo-express/]

To run this container on its own, without Docker Compose, do something like this:

```console

	docker run \
		-e ME_CONFIG_BASICAUTH_USERNAME="admin" \
		-e ME_CONFIG_BASICAUTH_PASSWORD="pass" \
		-e ME_CONFIG_MONGODB_SERVER="mongodb" \
		-it \
		-p 8081:8081 \
		--link mongodb \
		--name mongo-express \
		--net herokudocker_default \
		--rm \
		mongo-express

```
