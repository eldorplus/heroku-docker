# Node Core App #

## Docker Compose Orchestration For Multi-container Service ## 

Learning how to deploy a multi-container Docker app onto Heroku.

This app has the following named containers:
- [nginx-node-core](https://hub.docker.com/_/nginx/), the reverse proxy server
- node-core-app, the Node.js backend app
- [mongo-express](https://hub.docker.com/_/mongo-express/), lightweight web frontend to mongodb
- [mongodb](https://hub.docker.com/_/mongo/), a persistent backing store (percona server version)
- [redis](https://hub.docker.com/_/redis/), a local data structure server

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

  node-core-app:
    build: webapp/
    container_name: node-core-app
    depends_on:
      - redis 
      - mongodb
    env_file: webapp/variables.env
    links:
      - mongodb:mongodb
      - redis:redis
    ports:
      - "5000:5000"
    volumes:
      - $PWD/webapp:/opt/webapp

  mongo-express:
    container_name: mongo-express
    depends_on:
      - mongodb
    environment:
      - ME_CONFIG_BASICAUTH_USERNAME=admin
      - ME_CONFIG_BASICAUTH_PASSWORD=pass
      - ME_CONFIG_MONGODB_SERVER=mongodb
    image: mongo-express
    links:
      - mongodb:mongo
      - redis:redis
    ports:
      - "8081:8081"

  nginx:
    build: nginx/
    container_name: nginx-node-core
    links:
      - node-core-app:web
      - mongo-express:mongo-express
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - $PWD/letsencrypt:/etc/letsencrypt
      - $PWD/nginx/ssl-certs:/etc/nginx/ssl-certs:ro
```
