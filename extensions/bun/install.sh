#!/bin/bash
echo "Check if Bun runtime exist on the machine..."
if [ -n "$BUN_INSTALL" ]; then
    if [ -d "extensions" ]; then
      cd ./extensions/bun
    fi

    echo "Copy Bun binary to the extension folder..."
    mkdir -p _runtime/bin
    cp $BUN_INSTALL/bin/bun _runtime/bin

    if [[ $(uname) == "Darwin" ]]; then
      echo "Remember to sign the extensions/_runtime/bin/bun binary before building your app bundle."
    fi

    echo "✔️ DONE 😊"
else
    echo "❌ ERROR: Bun installation not found 🫤"
fi
