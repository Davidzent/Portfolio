// Latin only. The default entry points also pull latin-ext, Vietnamese, Greek
// and Cyrillic — twelve extra files in dist/ that this site's English and
// Spanish copy never reaches for. JetBrains Mono ships no per-subset entry
// point, so it stays whole.
import "@fontsource/space-grotesk/latin-400.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/space-grotesk/latin-700.css";
import "@fontsource-variable/jetbrains-mono/index.css";
import "./styles/globals.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
