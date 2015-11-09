#!/bin/sh

set -e

docker -D -d 2>&1 > /var/log/docker.log &
cd /webterm
npm start

