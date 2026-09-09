#!/bin/bash

while getopts k:h: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployall.sh -k <pem key file> -h <hostname>\n\n"
    exit 1
fi

printf "\n-------------------------------\nDeploying all services to with $key\n-------------------------------\n"

# Deploy each of the individual services
cd ../simon-html && ./deployFiles.sh -k ${key} -h ${hostname} -s simon-html
cd ../simon-css && ./deployFiles.sh -k ${key} -h ${hostname} -s simon-css
cd ../simon-service && npm install && ./deployService.sh -k ${key} -h ${hostname} -s simon-service
cd ../simon-db && npm install && ./deployService.sh -k ${key} -h ${hostname} -s simon-db
cd ../simon-websocket && npm install && ./deployService.sh -k ${key} -h ${hostname} -s simon-websocket
cd ../simon-react && npm install && ./deployReact.sh -k ${key} -h ${hostname} -s simon-react
cd ../simon-pwa && npm install && ./deployReact.sh -k ${key} -h ${hostname} -s simon-pwa

# Deploy the lastest to simon.{hostname} on port 3000
cd ../simon-pwa && ./deployReact.sh -k ${key} -h ${hostname} -s simon

cd ../webprogramming260
