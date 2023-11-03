#!/bin/bash
cd ..
sudo unzip devicePayload.zip -d devicePayload
rm -f devicePayload.zip
rm -r -f $1
mv devicePayload $1
bash $1/start.sh