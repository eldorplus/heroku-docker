FROM heroku/heroku:16

RUN apt-get update && \
	apt-get install -y nodejs npm

RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN groupadd node && \
	useradd -g node node 

RUN mkdir /opt/webapp && chmod o+w /opt/webapp

#RUN npm install -g foreman 
RUN npm install -g nodemon foreman

USER node

ENV HOME /opt/webapp
ENV DEBUG="NC:*,express:*"

#ADD . /opt/webapp
VOLUME ["/opt/webapp"]

WORKDIR /opt/webapp
RUN npm install

#CMD ["nf", "run"]
CMD ["nodemon", "server.js"]
