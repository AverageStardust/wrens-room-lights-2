#!/bin/bash
cd ..
unzip devicePayload.zip -q -d ../devicePayload
rm devicePayload.zip
rm -r $1
mv devicePayload $1
bash $1/start.sh