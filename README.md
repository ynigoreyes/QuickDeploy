### Deployment server

## Requirements
##### DISCLAIMER: This is a very specific CI/CD pipeline and has been designed for my personal work flow
  1) Cloud Provider
  2) Knowledge with docker-compose / Docker
  3) Node
  4) An app that depends on dotenv and a Dockfile with ARGS

## How to use
  1) Clone repo into root of server and install dependencies
  ```
  $ git clone https://github.com/ynigoreyes/QuickDeploy.git
  $ cd QuickDeploy
  $ npm install
  ```

  2) Install foreverjs globally
  ```
  $ npm install -g forever
  ```

  3) Run script as a process
  ```
  $ npm run start-proc
  ```

  4) Create a .env file that will be injected into container
  ```
  $ touch .env

  // .env

  msg="In Production!"
  ```

  5) Navigate out of repo and create a docker-compose file
  ```
  $ cd && touch docker-compose.yml

  ```
  ```
  // Inside the docker-compose.yml

  version: '2'
  services:

    app:
      env_file:
        - .env // Whatever environment variables to be used in container

      image: <repository>

      restart:
        - always

      ports:
        - 80:80 // Ports to open
  ```
  ```
  // The Docker image the docker-composer.yml pulls

  FROM node:10-alpine

  WORKDIR /app

  COPY . /app

  RUN npm install --prod --silent

  ARG msg='Hello World!' // this is where the env variables get injected

  EXPOSE 80

  CMD [ "npm", "start" ]
  ```

## Trigger
The trigger for this deployment is a simple http request to a port on the server. It defaults to port 8080.
I use a curl script within the deploy stage of travis-ci
```
curl <endpoint>:8080/
```
to signal my EC2 instance to rebuild the images. This is not very secure as there is no way (yet) of authenticating who is hitting the endpoint to restart the server.

## Commands
  ```
  $ npm run start-proc
  // Runs the server as a proccess
  ```
  ```
  $ npm run start
  // Runs the server normally
  ```
  ```
  $ npm run kill
  // Kills the proccess and the port it runs on
  ```