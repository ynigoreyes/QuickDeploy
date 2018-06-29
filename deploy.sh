#!/usr/bin/env bash
echo '\nDeploying new images..\n'
sudo docker stop $(sudo docker ps -a -q)
cd
sudo docker-compose rm -f
sudo docker-compose pull
sudo docker-compose up --force-recreate -d
