import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

/**
 * - Local dev / preview: defaults to "./" (relative paths).
 * - GitHub Pages CI: set VITE_BASE="/<repo>/" so the live site works at
 *   https://<user>.github.io/<repo>/
 * - file:// double-click: set SINGLEFILE=1 (npm run build:local) to inline JS/CSS
 *   so browsers can open dist/index.html or offline.html without a server.
 */
const base = process.env.VITE_BASE?.trim() || "./";
const normalizedBase = base === "/" ? "/" : base.endsWith("/") ? base : `${base}/`;

const useSingleFile = process.env.SINGLEFILE === "1";

export default defineConfig({
  plugins: [react(), ...(useSingleFile ? [viteSingleFile()] : [])],
  base: normalizedBase,
});
