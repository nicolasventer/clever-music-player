import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";

import autoMemo from "./auto-memo";

// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
	plugins: [autoMemo(), react()],
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
