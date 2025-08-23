import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
	appId: "com.example.app",
	appName: "clever-music-player",
	webDir: "dist",
	loggingBehavior: "debug",
	server: {
		// url: "http://192.168.56.1:5173/",
		cleartext: true,
	},
};

export default config;
