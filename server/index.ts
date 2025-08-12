import { argv } from "bun";
import { SizeHint, Webview } from "webview-bun";
import { B_PROD } from "./env";

let port = Math.floor(Math.random() * 10000) + 10000;

let bUsage = false;
let bDebug = false;

if (argv.includes("--debug") || argv.includes("-d")) {
	bDebug = true;
}

let portIndex = argv.indexOf("--port");
if (portIndex === -1) portIndex = argv.indexOf("-p");
if (portIndex !== -1) {
	if (portIndex === argv.length - 1) {
		console.error("No port provided");
		bUsage = true;
	} else {
		const portArg = argv[portIndex + 1] ?? "";
		const portNumber = parseInt(portArg);
		if (isNaN(portNumber)) {
			console.error("Invalid port provided");
			bUsage = true;
		} else {
			port = portNumber;
		}
	}
}

if (bUsage) {
	console.error(`Usage:
--help, -h: Show this help message
--debug, -d: Enable dev tools (default: false)
--port, -p <port>: Set the port to use (default: random port)
`);
	process.exit(1);
}

const proc = Bun.spawn(["bun", "--port", port.toString(), "dist/index.html"], {
	stdout: "ignore", //"inherit",
	stderr: "ignore", //"inherit",
});

console.log(`Server running at http://localhost:${port}`);

const webview = new Webview(!B_PROD || bDebug);

webview.title = "Clever Music Player";
webview.size = { width: 1280, height: 720, hint: SizeHint.NONE };

// call: window["send-message"]("Hello from client").then(console.log);
webview.bind("send-message", (message) => {
	console.log(message);
	return `Server received: ${message}`;
});

webview.navigate(B_PROD ? `http://localhost:${port}/` : "http://localhost:5173/clever-music-player");

webview.run();

proc.kill("SIGKILL");
