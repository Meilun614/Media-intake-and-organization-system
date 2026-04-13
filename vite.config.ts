import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * - Local dev / preview: defaults to "./" (relative assets).
 * - GitHub Pages CI: set VITE_BASE="/<repo>/" so the live site works at
 *   https://<user>.github.io/<repo>/
 */
const base = process.env.VITE_BASE?.trim() || "./";
const normalizedBase = base === "/" ? "/" : base.endsWith("/") ? base : `${base}/`;

export default defineConfig({
  plugins: [react()],
  base: normalizedBase,
});
