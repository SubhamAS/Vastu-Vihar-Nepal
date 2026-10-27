import express from "express";
import helmet from "helmet";
import adminRoutes from "./routes/admin.js";
import adminPriceListRoutes from "./routes/adminPriceLists.js";
import enquiryRoutes from "./routes/enquiries.js";
import priceListRoutes from "./routes/priceLists.js";

const app = express();

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

app.use((error, _request, response, _next) => {
  if (error instanceof SyntaxError && "body" in error) {
    return response.status(400).json({ error: "The request body must be valid JSON." });
  }
  console.error("Backend request failed:", error.message);
  return response.status(500).json({ error: "Something went wrong. Please try again." });
});

export default app;
