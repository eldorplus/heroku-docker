#Node Core App#

##Docker Compose Orchestration For Multi-container Service## 

Learning how to deploy a multi-container Docker app onto Heroku.

This app has the following named containers:
- webapp, a node.js frontend app
- redis, a local data structure server
- mongodb, a persistent backing store (percona server version)

The whole thing is currently orchestrated by a docker-compose.yml file for local development.

```bash
docker-compose up -d
```

```yaml
version: '3'
services:
	web:
		build: webapp/
		ports:
			- "5000:5000"
		env_file: webapp/variables.env
		depends_on:
			- redis 
		volumes:
			- ./webapp:/opt/webapp

	mongodb:
		image: percona/percona-server-mongodb
		command: --storageEngine=rocksdb
		ports:
			- "27017:27017"
		volumes:
			- ./mongodb/data/db:/data/db
		
	redis:
		image: redis:alpine
		ports: 
			- "6379:6379"
		volumes:
			- ./redis/data:/data
```
