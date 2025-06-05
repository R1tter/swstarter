# SwStarter Movie Stats App

This project is a web application built with Next.js, Prisma, and Tailwind CSS. It allows users to search for movies and people, view detailed statistics, and visualize data with interactive charts. The backend uses a SQLite database managed by Prisma ORM.

## Features
- Search for movies and people
- View detailed statistics and charts
- Fast, modern UI with Tailwind CSS
- Data stored in SQLite and managed with Prisma ORM
- API endpoints for search and stats
- Ready for local development or Dockerized deployment

## Project Structure
- `src/` — Main application code (pages, components, hooks, jobs, lib)
- `prisma/` — Prisma schema, migrations, and SQLite database
- `Dockerfile`, `docker-compose.yml` — For containerized development and deployment
- `README_DOCKER.md` — Docker-specific instructions

## How to run locally

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd swstarter
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up the database**
   - Run migrations and generate Prisma client:
     ```bash
     npx prisma migrate dev
     ```
   - (Optional) Seed the database if a seed script is available.

4. **Environment variables**
   - Copy `.env.example` to `.env` and adjust the values as needed.

5. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

6. **Running tests**
   ```bash
   npm test
   ```

## How to run with Docker
See [`README_DOCKER.md`](./README_DOCKER.md) for full Docker instructions.
- For development with hot reload: `docker-compose up`
- For production: `docker build -t swstarter .` then `docker run -p 3000:3000 swstarter`

## API Endpoints

The backend exposes the following endpoints for stats:

- `GET /api/stats` — Returns the current statistics data.
- `POST /api/stats/refresh` — Recomputes and refreshes the statistics data. Use this to trigger a stats update.

You can test these endpoints using Postman, Insomnia, or similar tools.