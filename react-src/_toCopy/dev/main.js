nw.Window.open("http://localhost:5173", {}, (win) => {
	const fs = require("fs");
	win.window.fs = fs;
	win.window.__dirname = __dirname.replace(/\\/g, "/");
});
