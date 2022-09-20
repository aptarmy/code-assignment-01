#!/bin/bash

# echo on
set -x

export UID=$(id -u)
export GID=$(id -g)

mkdir -p postgres_data
chown -R ${UID}:${UID} postgres_data

UID=${UID} GID=${GID} docker-compose up
