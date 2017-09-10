FROM nginx:alpine

RUN echo "http://dl-3.alpinelinux.org/alpine/v3.6/community" >> /etc/apk/repository \
    echo "http://dl-3.alpinelinux.org/alpine/v3.6/community" >> /etc/apk/repository \
    echo "http://dl-3.alpinelinux.org/alpine/v3.6/community" >> /etc/apk/repository
RUN apk update && \
    apk upgrade && \
    apk add --no-cache bash git wget vim certbot

COPY config/nginx.conf /etc/nginx/nginx.conf

COPY config/node-core-app.conf /etc/nginx/conf.d/node-core-app.conf

RUN mkdir /etc/nginx/ssl-certs

VOLUME ["/etc/nginx/ssl-certs"]

#CMD ["nginx", "-g 'daemon off;'"]
CMD nginx -g 'daemon off;'
