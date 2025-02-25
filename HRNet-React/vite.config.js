import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

export default defineConfig({
	plugins: [
		react(),
		compression({
			verbose: true,
			algorithm: "gzip", // 'brotli' for Brotli compression
			threshold: 10240, // The minimum file size (in bytes) for compression to kick in
			deleteOriginFile: false // Keep original files
		})
	]
});
