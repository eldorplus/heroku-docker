FROM nginx:alpine
RUN apk add --no-cache bash git wget certbot

COPY config/nginx.conf /etc/nginx/nginx.conf

COPY config/node-core-app.conf /etc/nginx/conf.d/node-core-app.conf

RUN mkdir /etc/nginx/ssl-certs

VOLUME ["/etc/nginx/ssl-certs"]

#CMD ["nginx", "-g 'daemon off;'"]
CMD nginx -g 'daemon off;'
