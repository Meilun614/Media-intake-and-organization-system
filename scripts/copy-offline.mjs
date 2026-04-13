import { copyFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
copyFileSync(resolve(root, "dist/index.html"), resolve(root, "offline.html"));
console.log("Created offline.html — double-click it (or dist/index.html) to open the site without localhost.");
