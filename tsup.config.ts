import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/main.ts"],
	outDir: "dist",
	format: "esm",
	sourcemap: true,
	clean: true,
	minify: true,
	splitting: false,
	dts: false,
});
