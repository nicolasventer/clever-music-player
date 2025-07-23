import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import autoMemo from "./auto-memo";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		autoMemo(),
		react(),
		VitePWA({
			registerType: "autoUpdate",
			injectRegister: false,

			pwaAssets: {
				disabled: false,
				config: true,
			},

			manifest: {
				name: "clever-music-player",
				short_name: "clever-music-player",
				description: "Music player that consider skip in the choice of random music",
				theme_color: "#27282C",
			},

			workbox: {
				globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
				cleanupOutdatedCaches: true,
				clientsClaim: true,
			},

			devOptions: {
				enabled: false,
				navigateFallback: "index.html",
				suppressWarnings: true,
				type: "module",
			},
		}),
	],
	resolve: { alias: { "@": path.resolve(__dirname, "src") } },
	build: {
		rollupOptions: {
			output: {
				dir: path.resolve(__dirname, "dist"),
				entryFileNames: "[name].js",
				assetFileNames: "asset/[name].[ext]",
				chunkFileNames: "[name].chunk.js",
				manualChunks: undefined,
			},
			onLog(level, log, handler) {
				if (log.code === "MODULE_LEVEL_DIRECTIVE") return;
				handler(level, log);
			},
		},
	},
});
