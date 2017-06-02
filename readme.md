# Node Core App #

## Docker Compose Orchestration For Multi-container Service ## 

Learning how to deploy a multi-container Docker app onto Heroku.

This app has the following named containers:
- webapp, a node.js frontend app
- [redis](https://hub.docker.com/_/redis/), a local data structure server
- [mongo](https://hub.docker.com/_/mongo/), a persistent backing store (percona server version)
- [mongo-express](https://hub.docker.com/_/mongo-express/), lightweight web frontend to mongodb

The whole thing is currently orchestrated by a docker-compose.yml file for local development.

```console

docker-compose up -d
```

```yaml

version: '3'
services:
  mongodb:
		#https://hub.docker.com/r/library/mongo/
		container_name: mongodb
		image: mongo
		ports:
			- "27017:27017"
		volumes:
		- $PWD/mongodb/data/db:/data/db

  redis:
		container_name: redis
		image: redis:alpine
		ports: 
			- "6379:6379"
		volumes:
			- $PWD/redis/data:/data

	web:
		container_name: node_core
		build: webapp/
		env_file: webapp/variables.env
		depends_on:
			- redis 
			- mongodb
		links:
			- mongodb:mongodb
			- redis
		ports:
			- "5000:5000"
		volumes:
			- $PWD/webapp:/opt/webapp

	mongo-express:
		container_name: mongo-express
		image: mongo-express
		environment:
			- ME_CONFIG_BASICAUTH_USERNAME=admin
			- ME_CONFIG_BASICAUTH_PASSWORD=pass
			- ME_CONFIG_MONGODB_SERVER=mongodb
		depends_on:
			- redis
			- mongodb
		links:
			- mongodb:mongo
			- redis
		ports:
			- "8081:8081"
```
