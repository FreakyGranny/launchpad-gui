FROM nginx:1.11-alpine

ADD ./nginx_config/nginx.conf /etc/nginx/nginx.conf
ADD ./nginx_config/default.conf /etc/nginx/conf.d/default.conf

ADD ./dist/ /usr/share/nginx/html/
