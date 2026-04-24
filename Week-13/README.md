# Personal Learning Platform

A mini backend where users solve course problems, track progress, and ensure data consistency via **transactions** and **joins**.

---

## Folder Structure

```
learning-platform/
├── src/
│   ├── config/
│   │   └── db.js              # PostgreSQL connection pool
│   ├── controllers/
│   │   ├── submitController.js  # POST /submit logic
│   │   └── progressController.js# GET /progress logic
│   ├── routes/
│   │   ├── submit.js
│   │   └── progress.js
│   ├── db/
│   │   └── schema.sql         # Table definitions
│   └── app.js                 # Express entry point
├── .env
├── package.json
└── README.md
```

---

## Schema

```sql
-- schema.sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL
);

CREATE TABLE problems (
  id SERIAL PRIMARY KEY,
  course_id INT REFERENCES courses(id),
  description TEXT NOT NULL
);

CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  problem_id INT REFERENCES problems(id),
  submitted_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE progress (
  user_id INT REFERENCES users(id),
  course_id INT REFERENCES courses(id),
  completion_percentage NUMERIC(5,2) DEFAULT 0,
  PRIMARY KEY (user_id, course_id)
);
```

---

## Getting Started

**Prerequisites:** Node.js v24+, [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Step 1 — Scaffold the project

```bash
mkdir learning-platform && cd learning-platform
npm init -y
npm install express pg dotenv
npm install --save-dev nodemon

mkdir -p src/config src/controllers src/routes src/db
touch src/app.js src/config/db.js \
      src/controllers/submitController.js \
      src/controllers/progressController.js \
      src/routes/submit.js src/routes/progress.js \
      src/db/schema.sql .env
```

### Step 2 — Start the database

```bash
docker run --name learning-pg \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=learning_platform \
  -p 5432:5432 -d postgres:16

docker exec -i learning-pg psql -U admin -d learning_platform < src/db/schema.sql
```

### Step 3 — Configure `.env`

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=secret
DB_NAME=learning_platform
PORT=3000
```

### Step 4 — Add scripts to `package.json` and run

```json
"scripts": {
  "start": "node src/app.js",
  "dev": "nodemon src/app.js"
}
```

```bash
npm run dev
```

Server runs at `http://localhost:3000`

> **Prefer the cloud?** Use [NeonDB](https://neon.tech) instead — create a free project, copy the connection string, run the schema in their SQL Editor, and set `DATABASE_URL=<your-connection-string>` in `.env`. In `db.js` use `connectionString: process.env.DATABASE_URL` instead of individual fields.

---

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/submit` | Submit a problem & update progress (transactional) |
| `GET` | `/progress?user_id=1` | Get all course progress for a user (join) |

**POST `/submit`** body:
```json
{ "user_id": 1, "problem_id": 3 }
```

**GET `/progress`** response:
```json
[{ "course": "JavaScript", "completion_percentage": "66.67" }]
```

---

## Key Concepts Demonstrated

- **Relationships** — users → submissions → problems → courses
- **Joins** — progress fetched by joining `users`, `progress`, `courses`
- **Transactions** — `POST /submit` inserts a submission and updates progress atomically; rolls back on failure

---

## Tech Stack

`Node.js` · `Express` · `PostgreSQL` · `pg` (node-postgres) · `Docker` / `NeonDB`