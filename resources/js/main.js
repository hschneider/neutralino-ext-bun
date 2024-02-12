
function onWindowClose() {
    Neutralino.app.exit();
}

async function onPingResult(e) {
    console.log("DBG RECEIVED: " + e.detail );

    let msg = document.getElementById("msg");
    msg.innerHTML += e.detail + '<br>';
}

document.getElementById('link-long-run')
    .addEventListener('click', () => {
        BUN.run('longRun');
    });

// Init Neutralino
//
Neutralino.init();
Neutralino.events.on("windowClose", onWindowClose);
Neutralino.events.on("pingResult", onPingResult);

// Set title
//
(async () => {
    await Neutralino.window.setTitle(`Neutralino BunExtension ${NL_APPVERSION}`);
})();


// Init Bun Extension
const BUN = new BunExtension(true)

