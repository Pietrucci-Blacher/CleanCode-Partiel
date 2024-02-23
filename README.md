# Clean Code: Card

## Description

This projet can help you to study with Leitner system

## How to lauch back

### Write dotenv

go to `back` and write file `.env` with

```
DB_HOST=database
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=postgres
FRONT_ENDPOINT=http://localhost:8080
```

### Lauch back

in `back` launch this command

```
docker compose up -d
```

### Lauch unit test of back

in `back` launch this command

```
docker compose exec node-back pnpm run test
```

## How to lauch front

### Write dotenv

go to `front` and write file `.env.local` with

```
NEXT_PUBLIC_API_ENDPOINT=http://localhost:3000
```

### Lauch front

in `front` launch this command

```
docker compose up -d
```
