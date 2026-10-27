
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || ""
).replace(/\/+$/, "");

const ADMIN_KEY_STORAGE = "vvnepal-admin-key";

export function getAdminKey() {
  return sessionStorage.getItem(ADMIN_KEY_STORAGE) || "";
} 

export function setAdminKey(key) {
  sessionStorage.setItem(ADMIN_KEY_STORAGE, key);
}

export function clearAdminKey() {
  sessionStorage.removeItem(ADMIN_KEY_STORAGE);
}

export async function adminRequest(path, options = {}) {
  const key = getAdminKey();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${key}`,
    },
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) clearAdminKey();
    throw new Error(payload.error || "Could not load admin data.");
  }

  return payload;
}

export function fetchEnquiries({
  page = 1,
  limit = 20,
  search = "",
  status = "",
  dateFrom = "",
  dateTo = "",
  property = "",
} = {}) {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search) query.set("search", search);
  if (status) query.set("status", status);
  if (dateFrom) query.set("dateFrom", dateFrom);
  if (dateTo) query.set("dateTo", dateTo);
  if (property) query.set("property", property);

  return adminRequest(`/api/admin/enquiries?${query.toString()}`);
}

export function updateEnquiryStatus(id, status) {
  return adminRequest(
    `/api/admin/enquiries/${encodeURIComponent(id)}/status`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }
  );
}

export async function fetchPriceLists() {
  return adminRequest("/api/admin/price-lists");
}

export async function createPriceList(values) {
  return adminRequest("/api/admin/price-lists", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
}

export async function updatePriceList(id, values) {
  return adminRequest(
    `/api/admin/price-lists/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
  );
}

export async function uploadPriceListFile(id, file) {
  return adminRequest(
    `/api/admin/price-lists/${encodeURIComponent(id)}/file`,
    {
      method: "PUT",
      headers: {
        "Content-Type": file.type || "application/octet-stream",
        "X-File-Name": encodeURIComponent(file.name),
      },
      body: file,
    }
  );
}

export async function deletePriceList(id) {
  return adminRequest(`/api/admin/price-lists/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
