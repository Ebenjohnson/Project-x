#!/bin/sh
rm -rf ../cookfu/public/web/*
ng build --prod --base-href=/web/
cp -r dist/cookfu-web/* ../cookfu/public/web