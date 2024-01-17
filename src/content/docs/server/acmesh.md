---
title: acme.sh
description: A pure Unix shell script implementing ACME client protocol
---

[acme.sh](https://github.com/acmesh-official/acme.sh) is a pure Unix shell script implementing ACME client protocol.

## Install acme.sh

```bash
curl https://get.acme.sh | sh -s email=my@example.com
# or
wget -O -  https://get.acme.sh | sh -s email=my@example.com
```

Add an alias for acme:

```bash
echo 'alias acme.sh=~/.acme.sh/acme.sh' >> ~/.bashrc
```

## Usage with nginx

:::note
Learn more about how the nginx config must be [here](/server/nginx)
:::

### Obtaining SSL Certificates

```bash
acme.sh --issue --dns dns_ionos -d "your-domain.com" \
    --webroot nginx/html \
    --cert-file "../nginx/ssl/your-domain.com.crt" \
    --key-file "../nginx/ssl/your-domain.com.key" \
    --fullchain-file "../nginx/ssl/your-domain.com.fullchain.crt" \
    --reloadcmd "docker restart nginx"
```

:::note
If you are using multiple subdomains you can just execute the commands multiple times with every sudomain.
:::

### Deploying Certificates to Nginx

```bash
acme.sh --install-cert -d "your-domain.com" \
    --key-file "../nginx/ssl/$DOMAIN.key" \
    --fullchain-file "../nginx/ssl/your-domain.com.fullchain.crt" \
    --reloadcmd "docker restart nginx"
```

### Renew Certificates

```bash
acme.sh --renew --dns dns_ionos -d your-domain.com \
    --cert-file nginx/ssl/your-domain.com.crt \
    --key-file nginx/ssl/your-domain.com.key \
    --fullchain-file nginx/ssl/your-domain.com.fullchain.crt \
    --reloadcmd "docker restart nginx"
```

## Usage with Ionos domains

Get a prefix and a secret from the ...

Export these as variables

```bash
export IONOS_PREFIX="..."
export IONOS_SECRET="..."
```

Now execute the commands before with the `--dns dns_ionos` flag.
