import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

/** Remove static “how to run” banner once React mounts (dev / preview / dist). */
document.getElementById("boot-hint")?.remove();
