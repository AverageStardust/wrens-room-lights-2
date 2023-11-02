#!/bin/bash
cd "${0%/*}"
echo "starting bootloader"
nohup deno run --allow-all bootloader.ts &> bootloader.log $