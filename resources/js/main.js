
function onWindowClose() {
    Neutralino.app.exit();
}

async function onPingResult(e) {
    console.log("DBG RECEIVED: " + e.detail );

    let msg = document.getElementById("msg");
    msg.innerHTML += e.detail + '<br>';
}

function test() {
    let msg = document.getElementById("msg");
    msg.innerHTML += "Test from Xojo ...." + '<br>';
}

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

(async () => {
    await Neutralino.os.spawnProcess(`kill {pid}`);
})();

// Init Bun Extension
const BUN = new BunExtension(true)

