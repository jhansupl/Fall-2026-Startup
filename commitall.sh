#!/bin/bash

while getopts m: flag
do
    case "${flag}" in
        m) msg=${OPTARG};;
    esac
done

if [ -z "$msg"]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployall.sh -m <commit message>\n\n"
    exit 1
fi

printf "\n-------------------------------\nCommitting repos\n-------------------------------\n"

cd ../simon-html && git commit -am "$msg" && git push
cd ../simon-css && git commit -am "$msg" && git push
cd ../simon-service && git commit -am "$msg" && git push
cd ../simon-db && git commit -am "$msg" && git push
cd ../simon-websocket && git commit -am "$msg" && git push
cd ../simon-react && git commit -am "$msg" && git push
cd ../simon-pwa && git commit -am "$msg" && git push

echo cd ../webprogramming260
