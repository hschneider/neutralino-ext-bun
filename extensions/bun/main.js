
// main.js 1.0.2
//
// Neutralino BunExtension.
//
// (c)2024 Harald Schneider - marketmix.com

const NeutralinoExtension = require('./neutralino-extension');
const DEBUG = true;     // Print incoming event messages to the console

// This simulates a long-running task, reporting its progress to the frontend.
//
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function longRun(d) {
    for(let i=0; i <= 5; i++) {
        ext.sendMessage('pingResult', `Long-running task ${i}/5`);
        await delay(1000);
    }
}

function ping(d) {
    //
    // Send some data to the Neutralino app

    ext.sendMessage('pingResult', `Bun says PONG, in reply to "${d}"`);
}

function processAppEvent(d) {
    // Handle Neutralino app events.
    // :param d: data package as JSON dict.
    // :return: ---

    if(ext.isEvent(d, 'runBun')) {
        if(d.data.function === 'ping') {
            ping(d.data.parameter);
        }
        if(d.data.function === 'longRun') {
            longRun(d.data.parameter);
        }
    }
}

// Activate Extension
//
const ext = await new NeutralinoExtension(DEBUG);
ext.run(processAppEvent);
