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

- To set up the App for development, run:
  ```
  docker-compose build
  docker-compose up
  ```
  **NOTE:** These commands will **create a Docker image for the React App**,
  By default, the API will be available at `localhost:8080`.