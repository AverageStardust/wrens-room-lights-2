#!/bin/bash
cd "${0%/*}"
echo "starting main"
nohup deno run --allow-all main.ts &> main.log $