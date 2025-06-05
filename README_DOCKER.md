# Running with Docker

## Build and run (production)
```sh
docker build -t swstarter .
docker run -p 3000:3000 swstarter
```

## Development (hot reload)
```sh
docker-compose up
```

## Notes
- The SQLite database (`prisma/dev.db`) is not persisted between container rebuilds.
- To use environment variables, edit the `.env` file.
