#!/bin/bash

# echo on
set -x

export UID=$(id -u)
export GID=$(id -g)

echo "Preparing Postgres data folder..."
mkdir -p postgres_data
chown -R ${UID}:${GID} postgres_data

echo "Cleaning Express and React node_modules to make docker build faster..."
sudo rm -rf ./express/node_modules
sudo rm -rf ./react/node_modules

echo "Starting containers..."
UID=${UID} GID=${GID} docker-compose up
