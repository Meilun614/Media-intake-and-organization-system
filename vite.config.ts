import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  /** Lets `dist/index.html` work when opened via file:// or deployed under a subpath. */
  base: "./",
});
