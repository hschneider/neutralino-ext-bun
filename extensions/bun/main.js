const NeutralinoExtension = require('./neutralino-extension');

function ping(d) {
    ext.sendMessage('pingResult', `Bun says PONG, in reply to "${d}"`);
}

function processAppEvent(d) {
    if(d.event === 'runBun') {
        if(d.data.function === 'ping') {
            ping(d.data.parameter);
        }
    }
}

const ext = new NeutralinoExtension(true);
ext.run(processAppEvent);
