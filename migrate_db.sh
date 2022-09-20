#!/bin/bash

# echo on
set -x

export UID=$(id -u)
export GID=$(id -g)

UID=${UID} GID=${GID} docker-compose exec backend npx sequelize db:migrate
UID=${UID} GID=${GID} docker-compose exec backend npx sequelize db:seed:all

echo "Created required tables and initial data"