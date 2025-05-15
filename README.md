# Zenniz Backend Project

## Description
This project is a simple backend API built using Express.js. The application is used to store players and matches to a PostgreSQL database. The application is containerized using Docker.

## Features
- RESTful API endpoints
- Dockerized application
- Database integration

## Prerequisites
- Docker and Docker Compose

## API endpoints

### Players:
```bash
GET     /players                    Returns a list of all registered players
GET     /players/:playerId          Returns a player by playerId
GET     /players/:playerId/matches  Returns all matches the player has participated
PUT     /players/:playerId          Update player details by playerId
POST    /players                    Create a new player
```


### Matches:
```bash
GET     /matches                    Returns a list of all registered matches
POST    /matches                    Creates a new match
```

Further API documentation at [http://localhost:8080](http://localhost:8080) when running the Docker container.

## Usage
- Build and run the Docker container:
   ```bash
   docker compose up --build
   ```
- Use tools like Postman or cURL to test the API endpoints.

