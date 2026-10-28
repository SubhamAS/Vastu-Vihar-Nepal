import { createRoot } from "react-dom/client";
import { BrowserRouter} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

const chunkReloadKey = "vv-vite-preload-reload-at";

window.addEventListener("vite:preloadError", (event) => {
  const now = Date.now();
  const lastReload = Number(sessionStorage.getItem(chunkReloadKey) || 0);

  // A fresh app shell can repair stale chunk references after a deployment.
  // If the same route still fails shortly afterward, let the error boundary
  // show a retry option instead of reloading forever.
  if (now - lastReload < 30_000) return;

  event.preventDefault();
  sessionStorage.setItem(chunkReloadKey, String(now));
  window.location.reload();
});

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
