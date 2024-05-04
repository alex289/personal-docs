---
title: Traefik
description: A modern HTTP reverse proxy and load balancer
---

[Traefik](https://traefik.io/) is a modern HTTP reverse proxy and load balancer that makes deploying microservices easy. Traefik integrates with your existing infrastructure components (Docker, Swarm mode, Kubernetes, Marathon, Consul, Etcd, Rancher, Amazon ECS, ...) and configures itself automatically and dynamically.

## Setup

:::note
This setup uses the ionos DNS challenge to get SSL certificates from Let's Encrypt.
:::

1. Run `docker network create proxy`
2. Run `sudo apt install apache2-utils`
3. Run `echo $(htpasswd -nB user) | sed -e s/\\$/\\$\\$/g`
4. Create a file `touch traefik/acme.json` and run `chmod -v 600 traefik/acme.json`
5. Create a .env file
6. Fill the .env variable TRAEFIK_DASHBOARD_CREDENTIALS=user:{Password from step 3}
7. Fill the .env variable for the ionos credentials (IONOS_API_KEY: prefix.secret)

## Docker setup

Add traefik configuration

```yaml
api:
  dashboard: true
  debug: true
log:
  level: INFO
accessLog: {}
entryPoints:
  http:
    address: ':80'
    http:
      redirections:
        entryPoint:
          to: https
          scheme: https
  https:
    address: ':443'
serversTransport:
  insecureSkipVerify: true
providers:
  docker:
    endpoint: 'unix:///var/run/docker.sock'
    exposedByDefault: false
certificatesResolvers:
  ionos:
    acme:
      email: me@example.com
      storage: acme.json
      caServer: https://acme-v02.api.letsencrypt.org/directory
      dnsChallenge:
        provider: ionos
        resolvers:
          - '1.1.1.1:53'
          - '1.0.0.1:53'
```

Add the container

```yaml
services:
  traefik:
    image: traefik:latest
    container_name: traefik
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    networks:
      - proxy
    ports:
      - 80:80
      - 443:443/tcp
    environment:
      IONOS_API_KEY: ${IONOS_DNS_API_TOKEN}
      TRAEFIK_DASHBOARD_CREDENTIALS: ${TRAEFIK_DASHBOARD_CREDENTIALS}
    env_file:
      - .env
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik/traefik.yml:/traefik.yml:ro
      - ./traefik/acme.json:/acme.json
    labels:
      - 'traefik.enable=true'
      - 'traefik.http.routers.traefik.entrypoints=http'
      - 'traefik.http.routers.traefik.rule=Host(`traefik.example.com`)'
      - 'traefik.http.middlewares.traefik-auth.basicauth.users=${TRAEFIK_DASHBOARD_CREDENTIALS}'
      - 'traefik.http.middlewares.traefik-https-redirect.redirectscheme.scheme=https'
      - 'traefik.http.middlewares.sslheader.headers.customrequestheaders.X-Forwarded-Proto=https'
      - 'traefik.http.routers.traefik.middlewares=traefik-https-redirect'
      - 'traefik.http.routers.traefik-secure.entrypoints=https'
      - 'traefik.http.routers.traefik-secure.rule=Host(`traefik.example.com`)'
      - 'traefik.http.routers.traefik-secure.middlewares=traefik-auth'
      - 'traefik.http.routers.traefik-secure.tls=true'
      - 'traefik.http.routers.traefik-secure.tls.certresolver=ionos'
      - 'traefik.http.routers.traefik-secure.tls.domains[0].main=example.com'
      - 'traefik.http.routers.traefik-secure.tls.domains[0].sans=*.example.com'
      - 'traefik.http.routers.traefik-secure.service=api@internal'

networks:
  proxy:
    external: true
```

## Add a service

- Service must be in the same network as traefik
- Service must have traefik labels

```yaml
services:
  portainer:
    image: portainer/portainer-ce:latest
    container_name: portainer
    restart: unless-stopped
    labels:
      - 'traefik.enable=true'
      - 'traefik.http.routers.portainer.rule=Host(`vps.alexanderkonietzko.com`)'
      - 'traefik.http.routers.portainer.entrypoints=https'
      - 'traefik.http.routers.portainer.tls=true'
      - 'traefik.http.services.portainer.loadbalancer.server.port=9000'
    networks:
      - proxy
    ports:
      - '9000:9000'
    volumes:
      - ./portainer-data:/data
      - /var/run/docker.sock:/var/run/docker.sock

networks:
  proxy:
    external: true
```
