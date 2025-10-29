# MongoDB on Dokploy — Starter (Simple)

This is a minimal Compose setup to run MongoDB on Dokploy, reachable both from other containers (via Docker network) and externally on port 27017.

## Quick start

1) On the server (only once), create a shared network so other apps can connect:
```bash
docker network create shared-net || true
```

2) In Dokploy, create a **Compose App** and upload these files. Put them at the root of the app.

3) In app settings → Env/Secrets, add (or just upload `.env`):
```
MONGO_ROOT_USER=root
MONGO_ROOT_PASS=<very-strong-password>
APP_DB_USER=appuser
APP_DB_PASS=<strong-password>
```

4) Deploy.

## Connect (internal, from other containers on `shared-net`)
Connection string:
```
mongodb://appuser:APP_DB_PASS@mongodb:27017/appdb?authSource=appdb
```

## Connect (external, from your laptop)
If your server IP is `203.0.113.10` and DNS `db.example.com` → A record to that IP.

Connection string:
```
mongodb://appuser:APP_DB_PASS@db.example.com:27017/appdb?authSource=appdb
```

> **Security tip:** Prefer restricting port 27017 to known IPs using UFW or use VPN. This starter publishes 27017 for simplicity.

## Test ping
On the server:
```bash
docker exec -it mongodb mongosh -u "$MONGO_ROOT_USER" -p "$MONGO_ROOT_PASS" --authenticationDatabase admin --eval 'db.runCommand({ping:1})'
```

From local (replace host and pass):
```bash
mongosh "mongodb://appuser:APP_DB_PASS@db.example.com:27017/appdb?authSource=appdb"
```

## Files
- `docker-compose.yml` — service definition
- `mongod.conf` — Mongo config (auth enabled)
- `init/001-create-app-user.js` — creates the app user on first boot
- `.env.example` — template for env vars
```bash
# If you want internal-only access, remove the 'ports' section in docker-compose.yml.
# For TLS/replica set, extend later as needed.
```
