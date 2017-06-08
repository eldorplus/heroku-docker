FROM nginx:alpine
RUN apk add --no-cache bash git

COPY config/nginx.conf /etc/nginx/nginx.conf

COPY config/node-core.conf /etc/nginx/conf.d/node-core.conf

#CMD ["nginx", "-g 'daemon off;'"]
CMD nginx -g 'daemon off;'
