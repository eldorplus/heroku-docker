# Heroku / Docker Container App #

## MongoDB ##

Configuration notes on running [MongoDB](https://hub.docker.com/r/library/mongo/).

Heroku has designed this container to require that an environmental variable, PORT, is passed to the container at runtime.  This can be done either by specifying, on the command line, a variables file `--env_file variables.env` or by including individual variable assignement `-e "PORT=27017".


To run this container on its own, without Docker Compose, do something like this:


```console

docker stop mongo 

docker build --tag mongo .

docker run \
	-d \
	--env-file variables.env \
	--name mongo \
	-p 27017:27017\
	--rm \
	--volume $PWD:/data/db \
	mongo
```
