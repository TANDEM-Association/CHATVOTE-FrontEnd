# Docker Usage & Testing Guide (Frontend)

This guide shows how to run and test the app using Docker and Docker Compose.
All domain and Firebase project names are anonymized.

## Prerequisites

- Docker and Docker Compose installed
- A reverse proxy network (for example, a Traefik public network)
- Backend API reachable at an anonymized URL (example: `https://api.example.com`)
- Firebase project credentials (anonymized placeholders below)
- Optional: Stripe keys if payments are enabled

## Environment setup

Start from the template and update every placeholder:

```bash
cp .env.example .env
```

### Required Firebase (client)

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### Required Firebase (admin)

```bash
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

### URLs (anonymized)

```bash
# Reverse proxy / router hostname
TRAEFIK_ROUTER_HOST=app.example.com
TRAEFIK_PUBLIC_NETWORK=your-public-proxy-network

# Public site URLs
SITE_URL=https://app.example.com
NEXT_PUBLIC_SITE_URL=https://app.example.com

# Backend API
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Optional Stripe

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_or_live_key
STRIPE_SECRET_KEY=sk_test_or_live_key
```

## Docker Compose: build and run

```bash
# Build the image
docker-compose build

# Start the container
docker-compose up -d

# Follow logs
docker-compose logs -f wahl-chat-frontend
```

Common operations:

```bash
# Rebuild and restart
docker-compose up -d --build --force-recreate

# Stop and remove
docker-compose down

# Container status
docker-compose ps
```

## Docker (without Compose)

Useful for a quick local smoke test:

```bash
# Build (Compose builds the image already, but you can build directly)
docker build -t wahl-chat-frontend:local .

# Run on localhost:3000
docker run --rm -p 3000:3000 --env-file .env wahl-chat-frontend:local
```

Then visit `http://localhost:3000`.

## Testing checklist

### 1) Config sanity

```bash
# Validate compose config and resolved env
docker-compose config
```

### 2) Container health

```bash
# Confirm the service is up
docker-compose ps

# Tail logs for errors
docker-compose logs -f wahl-chat-frontend
```

### 3) Frontend smoke test

From your host (replace with your domain):

```bash
curl -I https://app.example.com
```

From inside the container:

```bash
docker-compose exec wahl-chat-frontend wget -qO- http://localhost:3000 > /dev/null
```

### 4) Backend connectivity (if you have a health endpoint)

```bash
curl -I https://api.example.com/health
```

If your backend does not expose `/health`, use the base URL or a known public endpoint instead.

### 5) Firebase wiring (manual)

- Load the app in the browser
- Verify authentication flows (sign in / sign out)
- Check the browser console for Firebase config errors

## Troubleshooting

- Container does not start: check logs with `docker-compose logs wahl-chat-frontend`
- Proxy network missing: create it with `docker network create your-public-proxy-network`
- Firebase errors: verify all `NEXT_PUBLIC_FIREBASE_*` and admin keys in `.env`
- Backend errors: confirm `NEXT_PUBLIC_API_URL` is reachable from the host and container

## Notes

- The Compose service name is `wahl-chat-frontend`
- The container listens on port `3000`
- Keep secrets out of logs and version control
