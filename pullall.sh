#!/bin/bash

printf "\n-------------------------------\nPulling repos\n-------------------------------\n"

cd ../simon-html && git pull
cd ../simon-css && git pull
cd ../simon-service && git pull
cd ../simon-db && git pull
cd ../simon-websocket && git pull
cd ../simon-react && git pull
cd ../simon-pwa && git pull

echo cd ../webprogramming260
