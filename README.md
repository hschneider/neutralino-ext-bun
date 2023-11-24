<p align="center">
<img src="https://marketmix.com/git-assets/star-me-green-2.png" style="max-width:225px;margin-bottom:40px">
</p>

<p align="center">
<img src="https://marketmix.com/git-assets/neutralino-ext-bun/neutralino-bun-header.png" style="margin-left:auto;margin-right:auto">
</p>

# neutralino-ext-bun
**A Bun Extension for Neutralino**

### Why Bun?

Bun is an all-in-one JavaScript Runtime designed for speed:
- It is extremely fast, in many cases 4 times faster than NodeJS.
- Most NodeJS packages are compatible with Bun.
- You can code in JS, TypeScript, NodeJS, JSX
- It's powerful API comes with the fastest SQlite driver for JS.
- It's all contained in a single file, which can be embedded without dependencies.

### Bun: The perfect NodeJS-compatible extension for Neutralino

This extension adds a Bun backend to Neutralino with the following features:
- Requires only a few lines of code on both ends.
- Read all events from the Neutralino app in your Bun code.
- Run Bun functions from Neutralino.
- Run Neutralino functions from Bun.
- All communication between Neutralino and Bun runs asynchronously.
- All events are queued, so none will be missed during processing.
- Track the data flow between Neutralino and Bun in realtime.
- Use Bun's integrated, browser-based debugger.
- Works in Window- and headless Cloud-Mode.
- Terminates the Bun Runtime when the Neutralino app quits.

![Neutralino Bun / NodeJS Extension](https://marketmix.com/git-assets/neutralino-ext-bun/bun-nodejs-neutralino.gif)

>Keep in mind that Bun's Windows support is still marked as 'highly experimental'.
So don't expect this extension to work under Windows.
However, subscribe to this repo and stay tuned.

## Run the demo
The demo opens a Neutralino app. Clicking on the blue link sends a Ping to Bun, which replies with Pong.
This illustrates the data-flow in both directions. 

Before running the demo, the Bun runtime needs to be installed into the extension folder:
```bash
cd ext-bun/extensions/bun
./install.sh
```

If you need to install further Packages, use the **bun.sh script** instead of bun. This starts the relocated runtime
instead of your standard Bun installation, e.g.:
```bash
cd ext-bun/extensions/bun
./bun.sh install PACKAGE
```

When including the extension in your own project, make sure that **neutralino.config.json** contains this whitelist:
```json
  "nativeAllowList": [
    "app.*",
    "os.*",
    "window.*",
    "events.*",
    "extensions.*",
    "debug.log"
  ],
```

After this, run these commands in the ext-bun folder:
```commandline
neu update
neu run
```

## Integrate into your own project
Just follow these steps:
- Modify **neutralino.config.json**, like mentioned in **"Run the demo"**.
- Copy the **extensions** folder to your project.
- Adapt the JS code in **extensions/bun/main.js** to your needs.
- Copy **resources/js/bun-extension.js** to **resources/js**.
- Add `<script src="js/bun-extension.js"></script>` to your **index.html**
- Add `const BUN = new BunExtension(true)` to your **main.js**
- Add **BUN.run(function_name, data) to main.js** to run Bun functions from Neutralino.
- Add **event listeners to main.js**, to fetch result data from Bun.

## main.js explained

```JS
const NeutralinoExtension = require('./neutralino-extension');
const DEBUG = true;     // Print incoming event messages to the console

function ping(d) {
    //
    // Send some data to the Neutralino app

    ext.sendMessage('pingResult', `Bun says PONG, in reply to "${d}"`);
}

function processAppEvent(d) {
    // Handle Neutralino app events.
    // :param data: data package as JSON dict.
    // :return: ---

    if(d.event === 'runBun') {
        if(d.data.function === 'ping') {
            ping(d.data.parameter);
        }
    }
}

// Activate Extension
//
const ext = new NeutralinoExtension(DEBUG);
ext.run(processAppEvent);
```

The extension is activated with the last 2 lines. 
**processAppEvent** is a callback function, which is triggered with each event coming from the Neutralino app.

In the callback function, you can process the incoming events by their name. In this case we react to the **"runBun"** event.
d**ata.function** holds the requested Bun function and **data.parameter** its data payload as string or JSON.

if the requested function is named ping, we call the ping-function which sends a message back to Neutralino. 

**sendMessage()** requires the following parameters:
- An event name, here "pingResult"
- The data package to send, which can be of type string or JSON.

The **DEBUG** variable tells the NeutralinoExtension to report each event to the console. Incoming events, incoming 
function calls and outgoing messages are printed in different colors.
This makes debugging easier, since you can track the data flow between Neutralino and Bun:

![Debug Bun / NodeJS](https://marketmix.com/git-assets/neutralino-ext-bun/bun-nodejs-console-3.jpg) 

Each debug run starts with a link to Bun's integrated, browser-based debugger: 

![Debug Bun / NodeJS](https://marketmix.com/git-assets/neutralino-ext-bun/bun-nodejs-neutralino-debug-link.jpg)

Copy & paste the link into Google Chrome and start your live debug session:

![Debug session in Bun / NodeJS](https://marketmix.com/git-assets/neutralino-ext-bun/bun-nodejs-neutralino-debug.jpg)

## main.js explained
```JS

async function onPingResult(e) {
 ...
}

// Init Neutralino
//
Neutralino.init();
...
Neutralino.events.on("pingResult", onPingResult);
...
// Init Bun Extension
const BUN = new BunExtension(true)
```

The last line initializes the JavaScript part of the Bun extension. It's important to place this after Neutralino.init() and after all event handlers have been installed. Put it in the last line of your code and you are good to go. The const **BUN** is accessible globally.

The **BunExtension class** takes only 1 argument which instructs it to run in debug mode (here true). In this mode, all data from the Bun extension is printed to the dev-console:

![Debug Meutralino](https://marketmix.com/git-assets/neutralino-ext-bun/bun-nodejs-neutralino-console.jpg)

The **pingResult event handler** listens to messages with the same name, sent by sendMessage() on Bun's side. 

In **index.html**, you can see how to send data from Neutralino to Bun, which is dead simple:
```html
<a href="#" onclick="BUN.run('ping', 'Neutralino says PING!');">Send PING to Bun</a><br>
```

**BUN.run()** takes 2 arguments:
- The Bun function to call, here "ping"
- The data package to submit, either as string or JSON.

Below this link, you see
```html
<a id="link-quit" href="#" onclick="BUN.stop();" style="display:none">Quit</a>
```
**BUN.stop()** is only required, when running Neutralino in cloud-mode. This will unload the BUN runtime gracefully.

## Classes overview

### neutralino-extension.js

| Method                           | Description                                                                                                                    |
|----------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| NeutralinoExtension(debug=false) | Extension class. debug: Print data flow to the terminal.                                                                       |
| debugLog(msg, tag="info")        | Write a message to the terminal. msg: Message, tag: The message type, "in" for incoming, "out" for outgoing, "info" for others. |
| run(onReceiveMessage)            | Starts the sockethandler main loop. onReceiveMessage: Callback function for incoming messages.                                 |
| sendMessage(event, data=null)    | Send a message to Neutralino. event: Event-name, data: Data package as string or JSON.                                     |

### bun-extension.js

| Method                    | Description                                                                                    |
|---------------------------|------------------------------------------------------------------------------------------------|
| BunExtension(debug=false) | Extension class. debug: Print data flow to the dev-console.                                    |
| async run(f, p=null)      | Call a Bun function. f: Function-name, p: Parameter data package as string or JSON.            |
| async stop()              | Stop and quit the Bun extension and its parent app. Use this if Neutralino runs in Cloud-Mode. |

## More about Neutralino
[Bun Home](https://bun.sh)

[NeutralinoJS Home](https://neutralino.js.org) 

[Neutralino related blog posts at marketmix.com](https://marketmix.com/de/tag/neutralinojs/)

