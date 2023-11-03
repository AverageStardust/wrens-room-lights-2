#!/bin/bash
curl https://wrens-room-lights-2.web.app/devicePayload.zip -o devicePayload.zip
unzip devicePayload.zip -d roomDeivce
rm -f devicePayload.zip
chmod 777 -R roomDeivce