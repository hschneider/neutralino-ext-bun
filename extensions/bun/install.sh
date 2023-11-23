#!/bin/bash
echo "Copying Bun binary to the extension folder ..."
if [ -n "$BUN_INSTALL" ]; then
    mkdir -p _runtime/bin
    cp $BUN_INSTALL/bin/bun _runtime/bin
    echo "DONE :)"
else
    echo "ERROR: No Bun installation found :-/"
fi
