import { createHash, timingSafeEqual } from "node:crypto";
import { Router } from "express";
import { ObjectId } from "mongodb";
import { getEnquiriesCollection } from "../database.js";

const router = Router();
const adminApiKey = process.env.ADMIN_API_KEY?.trim();
const pageSizeLimit = 100;
const validStatuses = new Set([
  "new",
  "contacted",
  "interested",
  "closed",
  "not interested",
]);
const validProperties = new Set([
  "Pashupati Bungalow",
  "Kanchanjunga Bungalow",
  "Sagarmatha Bungalow",
  "Suryodaya Bungalow",
  "Simplex Bungalow",
  "Small Suryodaya Bungalow",
  "Bagmati Bungalow",
  "Not specified",
]);

export function requireAdminApiKey(request, response, next) {
  if (!adminApiKey) {
    return response.status(503).json({
      error: "Admin API is not configured on the server.",
    });
  }

  const authorization = request.get("authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    return response.status(401).json({ error: "Admin authorization is required." });
  }

  const expected = createHash("sha256").update(adminApiKey).digest();
  const supplied = createHash("sha256").update(match[1].trim()).digest();
  if (!timingSafeEqual(expected, supplied)) {
    return response.status(401).json({ error: "Admin authorization is invalid." });
  }

  return next();
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseNepalDate(value, endOfDay = false) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const calendarDate = new Date(Date.UTC(year, month - 1, day));
  if (calendarDate.toISOString().slice(0, 10) !== value) return null;
  const time = endOfDay ? "23:59:59.999" : "00:00:00.000";
  return new Date(`${value}T${time}+05:45`);
}

router.get("/enquiries", requireAdminApiKey, async (request, response, next) => {
  const requestedPage = Number.parseInt(request.query.page, 10);
  const requestedLimit = Number.parseInt(request.query.limit, 10);
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const limit = Number.isSafeInteger(requestedLimit) && requestedLimit > 0
    ? Math.min(requestedLimit, pageSizeLimit)
    : 20;
  const search = typeof request.query.search === "string"
    ? request.query.search.trim().slice(0, 100)
    : "";
  const status = typeof request.query.status === "string"
    ? request.query.status.trim().toLowerCase()
    : "";
  const property = typeof request.query.property === "string"
    ? request.query.property.trim()
    : "";
  const dateFromValue = typeof request.query.dateFrom === "string" ? request.query.dateFrom : "";
  const dateToValue = typeof request.query.dateTo === "string" ? request.query.dateTo : "";

  if (status && !validStatuses.has(status)) {
    return response.status(400).json({ error: "The requested enquiry status is invalid." });
  }
  if (property && !validProperties.has(property)) {
    return response.status(400).json({ error: "The requested property filter is invalid." });
  }
  const dateFrom = dateFromValue ? parseNepalDate(dateFromValue) : null;
  const dateTo = dateToValue ? parseNepalDate(dateToValue, true) : null;
  if ((dateFromValue && !dateFrom) || (dateToValue && !dateTo)) {
    return response.status(400).json({ error: "Enter a valid date range." });
  }
  if (dateFrom && dateTo && dateFrom > dateTo) {
    return response.status(400).json({ error: "The start date must be on or before the end date." });
  }

  const filter = {};
  if (status) filter.status = status;
  if (property) filter.property = property;
  if (dateFrom || dateTo) {
    filter.createdAt = {};
    if (dateFrom) filter.createdAt.$gte = dateFrom;
    if (dateTo) filter.createdAt.$lte = dateTo;
  }
  if (search) {
    const searchPattern = new RegExp(escapeRegex(search), "i");
    filter.$or = [
      { name: searchPattern },
      { email: searchPattern },
      { phone: searchPattern },
      { property: searchPattern },
    ];
  }

  try {
    const enquiries = await getEnquiriesCollection();
    const skip = (page - 1) * limit;
    const [records, total] = await Promise.all([
      enquiries
        .find(filter, {
          projection: { name: 1, phone: 1, email: 1, property: 1, status: 1, createdAt: 1 },
        })
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      enquiries.countDocuments(filter),
    ]);

    return response.json({
      items: records.map(({ _id, ...record }) => ({ id: _id.toString(), ...record })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.patch("/enquiries/:id/status", requireAdminApiKey, async (request, response, next) => {
  const { id } = request.params;
  const status = typeof request.body?.status === "string"
    ? request.body.status.trim().toLowerCase()
    : "";

  if (!/^[a-f\d]{24}$/i.test(id)) {
    return response.status(400).json({ error: "The enquiry ID is invalid." });
  }
  if (!validStatuses.has(status)) {
    return response.status(400).json({ error: "The requested enquiry status is invalid." });
  }

  try {
    const enquiries = await getEnquiriesCollection();
    const result = await enquiries.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } },
    );
    if (result.matchedCount === 0) {
      return response.status(404).json({ error: "That enquiry could not be found." });
    }
    return response.json({ success: true, id, status });
  } catch (error) {
    return next(error);
  }
});

export default router;
