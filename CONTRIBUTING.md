# BookTrade

## Requirements

This project uses [Docker](https://docker.com) for development,
test and deployment.

Install Docker by following the instructions in one of the following links,
depending on your OS:
- Mac: https://docs.docker.com/docker-for-mac/install/
- Windows: https://docs.docker.com/docker-for-windows/install/
- Ubuntu: https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/
- Debian: https://docs.docker.com/engine/installation/linux/docker-ce/debian/
- Arch Linux: https://wiki.archlinux.org/index.php/Docker

To make the development easier, the project also uses [Docker Compose][3]
to orchestrate multiple containers together.

Install Docker Compose by following the instructions in
https://docs.docker.com/compose/install/.

## Setup

- To set up the API server for development, run:
  ```
  docker-compose build
  docker-compose run --rm api rails db:setup
  docker-compose up
  ```
  **NOTE:** These commands will **create a Docker image for the API**,
  **set up the database with the latest schema** and **load the server**.
  By default, the API will be available at `localhost:3000`.

## Observations

- The `build` operation may take a while depending on your internet connetion.
  It will download all dependencies specified at `Gemfile` and `Gemfile.lock`
  whenever these files are changed.

- The API uses two databases:
  - [PostgreSQL](https://www.postgresql.org/), an open source relational
    database management system (RDBMS). It is used by Rails to persist objects
    of a given class as tuples in a corresponding table.
  - [Redis](https://redis.io/), an open source in-memory data structure store.
    It is used by Rails to create a cache to speed up HTTP responses.

- The application and the databases are configured with environment variables,
  accordingly to [The Twelve-Factor App](https://12factor.net/). Development
  settings are available in the file `.env`. **These settings must be overriden
  for non-development environments**.