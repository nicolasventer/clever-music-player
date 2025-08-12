// this file should not be used

const startServer = (): number => {
	const port = Math.floor(Math.random() * 10000) + 10000;

	try {
		const server = Bun.serve({
			port,
			async fetch(req) {
				const url = new URL(req.url);
				let path = url.pathname;
				if (path === "/") path = "/index.html";
				const filePath = `./dist${path}`;
				console.log("filePath:", filePath);

				try {
					const file = Bun.file(filePath);
					if (await file.exists()) return new Response(file);
				} catch {
					// fallthrough to 404
				}
				return new Response("Not Found", { status: 404 });
			},
		});

		console.log(`Server running at http://localhost:${server.port}`);

		return server.port ?? 0;
	} catch {
		// if port is already in use, try again with another random port
		return startServer();
	}
};

export const port = startServer();
