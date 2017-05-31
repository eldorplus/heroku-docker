#Heroku / Docker Container App#

##Node.js App Instance##

This is me learning how to create an app to deploy on Heroku with containers.

Heroku has designed this container to require that an environmental variable, PORT, is passed to the container at runtime.  This can be done either by specifying, on the command line, a variables file `--env_file variables.env` or by including individual variable assignement `-e "PORT=5000".


* This container extends heroku/nodejs
* This container runs as non-root user node (uid=999(node) gid=999(node) groups=999(node))
* app root is mounted to /opt/webapp
* app code is mounted into the named volume at /opt/webapp into local directory $PWD 
* app is run with nodemon in container to reload app on code changes (even works from host mounted volume!)
* app launcher can be switched (from nodemon) in Dockerfile  to use node foreman to more closely mimic Heroku, but haven't really gotten used to that yet.


To run this container on its own, without Docker Compose, do something like this:


```bash
	docker stop nodie

	docker build --tag nodie .

	docker run \
		--env-file variables.env \
		--name nodie \
		--rm \
		--volume $PWD:/opt/webapp \
		-p 5000:5000 \
		-d \
		nodie
```
