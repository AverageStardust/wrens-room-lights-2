#!/bin/bash
cd "${0%/*}"
echo "starting main"
rm -f main.log
nohup deno run --allow-all main.ts &> main.log $