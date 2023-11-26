#!/bin/bash
echo "Copying Bun binary to the extension folder ..."
if [ -n "$BUN_INSTALL" ]; then
    mkdir -p _runtime/bin
    cp $BUN_INSTALL/bin/bun _runtime/bin

    if [[ $(uname) == "Darwin" ]]; then
      echo "Remember to sign the _runtime/bin/bun binary before building your app bundle."
    fi

    echo "DONE :)"
else
    echo "ERROR: No Bun installation found :-/"
fi
