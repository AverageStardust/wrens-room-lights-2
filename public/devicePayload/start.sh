#!/bin/bash
cd "${0%/*}"
echo "starting bootloader"
rm -f bootloader.log
nohup deno run --allow-all bootloader.ts &> bootloader.log $