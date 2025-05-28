#!/bin/bash

sudo docker-compose down --volumes --remove-orphans
sudo docker volume prune -f
sudo docker system prune -a -f
sudo docker network prune -f
sudo docker-compose build --no-cache
sudo docker-compose up -d