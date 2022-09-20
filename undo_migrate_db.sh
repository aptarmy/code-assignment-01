#!/bin/bash

# echo on
set -x

export UID=$(id -u)
export GID=$(id -g)

UID=${UID} GID=${GID} docker-compose exec backend npx sequelize db:migrate:undo:all

echo "Removed all tables"