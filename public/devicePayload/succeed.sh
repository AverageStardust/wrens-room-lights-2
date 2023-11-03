#!/bin/bash
cd ..
sudo  unzip newDevicePayload.zip -d newDevicePayload
sudo rm -f newDevicePayload.zip
sudo rm -r -f $1
sudo mv newDevicePayload $1
sudo chmod -R 777 $1
bash $1/start.sh