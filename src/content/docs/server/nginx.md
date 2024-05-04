---
title: Nginx
description: A popular web server and reverse proxy
---

[Nginx](https://nginx.com) is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache.

## Docker setup

Add the container

```yaml
# docker-compose.yml
services:
  nginx:
    image: nginx:latest
    restart: unless-stopped
    container_name: nginx
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./nginx/html:/usr/share/nginx/html
      - ./nginx/ssl:/etc/nginx/ssl # Only needed for SSL
    ports:
      - '80:80'
      - '443:443' # Only needed for SSL
```

## Configuration

In your nginx config directory create a `nginx.conf` file:

```nginx
# nginx.conf
worker_processes 1;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    sendfile on;
    keepalive_timeout 65;

    include /etc/nginx/conf.d/*.conf;
}
```

Now you can create multiple configurations in a new `conf.d` directory like this:

```nginx
# your-comain.com.conf
server {
    listen 80;
    server_name your-comain.com;

    location /portainer/ {
        proxy_pass http://portainer:9000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### SSL

:::caution
SSL requires a valid certificate. You can read how you can get one [here](/server/acmesh).
:::

Edit your `your-comain.com.conf` like this:

```nginx
# your-comain.com.conf
server {
listen 80;
server_name your-comain.com.conf;

    location /.well-known/acme-challenge/ {
        alias /usr/share/nginx/html/.well-known/acme-challenge/;
        try_files $uri =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }

}

server {
listen 443 ssl;
server_name your-comain.com.conf;

    ssl_certificate /etc/nginx/ssl/your-comain.com.conf.fullchain.crt;
    ssl_certificate_key /etc/nginx/ssl/your-comain.com.conf.key;

    location /portainer/ {
        proxy_pass http://portainer:9000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

```

:::note
When using multiple subdomains you can just create multiple `.conf` files.
:::
