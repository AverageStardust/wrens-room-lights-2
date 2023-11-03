#!/bin/bash
cd ..
sudo unzip newDevicePayload.zip -d newDevicePayload
sudo chmod 777 newDevicePayload
rm -f newDevicePayload.zip
rm -r -f $1
mv newDevicePayload $1
bash $1/start.sh