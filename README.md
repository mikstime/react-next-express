# Tripple Input

A simple project for practicing React + Next.js + Redux + TypeScript stack on 
Frontend and Express + Yup + JavaScript on Backend.

## Run

```shell script
docker build -t my-best-creation . && docker run -i -p 3000:3000 my-best-creation
```

## Frontend

Three fields are expectedd:

- Price

- Amount

- Total

Each time new value inserted the oldest edited field should compute new value based on
two other fields.

These values are stored on backend after clicking a button. Each time page reloads
these values should be fetched from the server using ajax. 

## Backend

The data must be shaped using Yup

## Polishing

All servers should be hosted inside docker containers and be combined using 
docker-compose