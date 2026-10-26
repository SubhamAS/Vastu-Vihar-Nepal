import { Router } from "express";
import rateLimit from "express-rate-limit";
import { getEnquiriesCollection } from "../database.js";

const router = Router();
const allowedProperties = new Set([
  "Pashupati Bungalow",
  "Kanchanjunga Bungalow",
  "Sagarmatha Bungalow",
  "Suryodaya Bungalow",
  "Simplex Bungalow",
  "Small Suryodaya Bungalow",
  "Bagmati Bungalow",
]);
const phonePattern = /^[0-9+\-\s()]{7,20}$/;
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many enquiries. Please wait a little and try again." },
});

router.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

router.post("/enquiries", enquiryLimiter, async (request, response) => {
  const body = request.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return response
      .status(400)
      .json({ error: "Enter your enquiry details and try again." });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const property =
    typeof body.property === "string" ? body.property.trim() : "";

  if (name.length < 2 || name.length > 100) {
    return response
      .status(400)
      .json({ error: "Enter a name between 2 and 100 characters." });
  }
  if (!phonePattern.test(phone)) {
    return response.status(400).json({ error: "Enter a valid phone number." });
  }
  if (
    email &&
    (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  ) {
    return response
      .status(400)
      .json({ error: "Enter a valid email address or leave it blank." });
  }
  if (property && !allowedProperties.has(property)) {
    return response
      .status(400)
      .json({ error: "Choose a property from the list." });
  }
  try {
    const enquiries = await getEnquiriesCollection();
    await enquiries.insertOne({
      name,
      phone,
      email: email || null,
      property: property || "Not specified",
      status: "new",
      createdAt: new Date(),
    });

    return response.status(201).json({ success: true });
  } catch (error) {
    console.error("Unable to save an enquiry:", error.message);
    return response.status(503).json({
      error:
        "We could not save your enquiry right now. Please try again shortly.",
    });
  }
});

export default router;
