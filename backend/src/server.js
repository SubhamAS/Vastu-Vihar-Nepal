import "dotenv/config";
import express from "express";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import app from "./app.js";

const port = Number(process.env.PORT) || 5000;
const currentDirectory = dirname(fileURLToPath(import.meta.url));
const frontendDirectory = resolve(currentDirectory, "../../frontend/dist");
const frontendEntry = join(frontendDirectory, "index.html");

app.use(express.static(frontendDirectory, { index: false }));
app.get(/.*/, (request, response, next) => {
  if (request.method !== "GET") return next();
  if (!existsSync(frontendEntry)) {
    return response.status(404).send("Frontend build not found. Run npm run build first.");
  }
  return response.sendFile(frontendEntry);
});

app.listen(port, () => {
  console.log(`Vastu Vihar Nepal server listening on http://localhost:${port}`);
});

