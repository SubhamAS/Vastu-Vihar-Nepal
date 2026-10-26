import "dotenv/config";
import express from "express";
import helmet from "helmet";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import adminRoutes from "./routes/admin.js";
import adminPriceListRoutes from "./routes/adminPriceLists.js";
import enquiryRoutes from "./routes/enquiries.js";
import priceListRoutes from "./routes/priceLists.js";

const app = express();
const port = Number(process.env.PORT) || 5000;
const currentDirectory = dirname(fileURLToPath(import.meta.url));
const frontendDirectory = resolve(currentDirectory, "../../frontend/dist");
const frontendEntry = join(frontendDirectory, "index.html");

app.disable("x-powered-by");
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "16kb" }));
app.use("/api", enquiryRoutes);
app.use("/api/price-lists", priceListRoutes);
app.use("/api/admin/price-lists", adminPriceListRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", (_request, response) => {
  response.status(404).json({ error: "API route not found." });
});

app.use(express.static(frontendDirectory, { index: false }));
app.get(/.*/, (request, response, next) => {
  if (request.method !== "GET") return next();
  if (!existsSync(frontendEntry)) {
    return response.status(404).send("Frontend build not found. Run npm run build first.");
  }
  return response.sendFile(frontendEntry);
});

app.use((error, _request, response, _next) => {
  if (error instanceof SyntaxError && "body" in error) {
    return response.status(400).json({ error: "The request body must be valid JSON." });
  }
  console.error("Backend request failed:", error.message);
  return response.status(500).json({ error: "Something went wrong. Please try again." });
});

app.listen(port, () => {
  console.log(`Vastu Vihar Nepal server listening on http://localhost:${port}`);
});

