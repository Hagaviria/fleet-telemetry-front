#!/bin/sh
set -e
UP="${API_UPSTREAM:-host.docker.internal:8080}"
sed "s|__API_UPSTREAM__|${UP}|g" /etc/nginx/templates/default.conf > /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;'
