#!/bin/bash
export BUN_INSTALL="$(pwd)/_runtime/"
export PATH=${BUN_INSTALL}/bin:$PATH
echo "-----------------------------"
echo "Running relocated Bun runtime"
echo "-----------------------------"
bun "$@"
