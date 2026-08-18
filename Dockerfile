FROM debian:stable-slim

RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

COPY ./index.html /var/www/html/
COPY ./style.css /var/www/html/
COPY ./fonts /var/www/html/fonts/
COPY ./scripts /var/www/html/scripts/
COPY ./styles /var/www/html/styles/

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]