// /docker-entrypoint-initdb.d/001-create-app-user.js
// Creates a basic app user with readWrite role on 'appdb'.
// Uses APP_DB_USER / APP_DB_PASS envs, falls back to defaults if not provided.
db = db.getSiblingDB('appdb');

db.createUser({
  user: (process.env.APP_DB_USER || "appuser"),
  pwd:  (process.env.APP_DB_PASS || "appsecret"),
  roles: [{ role: "readWrite", db: "appdb" }]
});

db.sample.insertOne({ ok: true, createdAt: new Date() });
