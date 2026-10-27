import { useEffect, useState } from "react";
import { Download, ListFilter, RotateCw, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import AdminEmptyState from "../../Components/admin/AdminEmptyState";
import FuseButton from "../../Components/admin/FuseButton";
import {
  deleteEnquiry,
  fetchEnquiries,
  updateEnquiryStatus,
} from "../../lib/adminApi";

const statuses = ["new", "contacted", "interested", "closed", "not interested"];
const properties = [
  "Pashupati Bungalow",
  "Kanchanjunga Bungalow",
  "Sagarmatha Bungalow",
  "Suryodaya Bungalow",
  "Simplex Bungalow",
  "Small Suryodaya Bungalow",
  "Bagmati Bungalow",
  "Not specified",
];
const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : dateFormatter.format(date);
}

function EnquiryStatusSelect({ item, saving, disabled, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <label className="sr-only" htmlFor={`enquiry-status-${item.id}`}>
        Change status for {item.name || "enquiry"}
      </label>
      <select
        id={`enquiry-status-${item.id}`}
        value={statuses.includes(item.status) ? item.status : "new"}
        onChange={(event) => onChange(item.id, event.target.value)}
        disabled={saving || disabled}
        className={`min-h-8 max-w-full rounded-full border border-transparent px-2.5 text-[10px] font-semibold capitalize outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-wait disabled:opacity-60 ${item.status === "new" ? "bg-blue-50 text-blue-700" : item.status === "closed" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-700"}`}
      >
        {statuses.map((itemStatus) => (
          <option key={itemStatus} value={itemStatus}>
            {itemStatus}
          </option>
        ))}
      </select>
      {saving && <span className="text-[10px] text-slate-500">Saving…</span>}
    </div>
  );
}

function exportCurrentPage(items) {
  const columns = ["Name", "Email", "Phone", "Property", "Status", "Received"];
  const escape = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const rows = items.map((item) =>
    [
      item.name,
      item.email,
      item.phone,
      item.property,
      item.status,
      item.createdAt,
    ]
      .map(escape)
      .join(","),
  );
  const file = new Blob(
    [[columns.map(escape).join(","), ...rows].join("\r\n")],
    { type: "text/csv;charset=utf-8" },
  );
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "enquiries-page.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminEnquiries() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [property, setProperty] = useState("");
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [savingId, setSavingId] = useState("");
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setSearch(searchInput.trim()), 250);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    fetchEnquiries({
      page,
      limit: 10,
      search,
      status,
      dateFrom,
      dateTo,
      property,
    })
      .then((result) => {
        if (!active) return;
        setItems(result.items || []);
        setPagination(
          result.pagination || { page, limit: 20, total: 0, totalPages: 0 },
        );
      })
      .catch((requestError) => {
        if (active)
          setError(requestError.message || "Could not load enquiries.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [page, search, status, dateFrom, dateTo, property, refreshKey]);

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
    setPage(1);
  };
  const handleStatus = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };
  const handleDateFrom = (event) => {
    setDateFrom(event.target.value);
    setPage(1);
  };
  const handleDateTo = (event) => {
    setDateTo(event.target.value);
    setPage(1);
  };
  const handleProperty = (event) => {
    setProperty(event.target.value);
    setPage(1);
  };
  const clearFilters = () => {
    setSearchInput("");
    setSearch("");
    setStatus("");
    setDateFrom("");
    setDateTo("");
    setProperty("");
    setPage(1);
  };
  const handleRowStatusChange = async (id, nextStatus) => {
    setSavingId(id);
    setStatusError("");
    try {
      await updateEnquiryStatus(id, nextStatus);
      setRefreshKey((key) => key + 1);
    } catch (requestError) {
      setStatusError(
        requestError.message || "Could not update the enquiry status.",
      );
    } finally {
      setSavingId("");
    }
  };
  const handleEnquiryDelete = async (item) => {
    if (deletingId) return;
    setDeletingId(item.id);
    setStatusError("");
    try {
      await deleteEnquiry(item.id);
      if (items.length === 1 && page > 1) {
        setPage((currentPage) => currentPage - 1);
      } else {
        setRefreshKey((key) => key + 1);
      }
    } catch (requestError) {
      setStatusError(requestError.message || "Could not delete the enquiry.");
    } finally {
      setDeletingId("");
    }
  };
  const startRecord =
    pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
  const endRecord = Math.min(
    pagination.page * pagination.limit,
    pagination.total,
  );

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Enquiries
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-600">
            Review customer requests and keep each property conversation
            organized.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setRefreshKey((key) => key + 1)}
            disabled={loading || Boolean(deletingId)}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <RotateCw size={14} className={loading ? "animate-spin" : ""} />{" "}
            Refresh
          </button>
          <button
            type="button"
            onClick={() => exportCurrentPage(items)}
            disabled={!items.length}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download size={14} /> Export page CSV
          </button>
        </div>
      </div>

      <section
        className="overflow-hidden rounded-md border border-slate-200 bg-white"
        aria-label="Enquiry list"
      >
        <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:px-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <ListFilter size={15} className="text-slate-500" /> Search and
            filters
          </div>
          <div className="flex w-full min-w-0 flex-col gap-2 sm:grid sm:grid-cols-2 xl:flex xl:flex-row xl:flex-wrap xl:items-center">
            <input
              value={searchInput}
              onChange={handleSearch}
              aria-label="Search enquiries"
              placeholder="Name, email, phone, property"
              className="h-9 w-full min-w-0 rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15 xl:w-52 xl:shrink-0"
            />
            <div className="flex min-w-0 flex-col gap-2 sm:col-span-2 sm:grid sm:grid-cols-2 xl:flex xl:flex-row">
              <select
                value={status}
                onChange={handleStatus}
                aria-label="Filter by status"
                className="h-9 min-w-0 rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15 xl:w-36 xl:shrink-0"
              >
                <option value="">All statuses</option>
                {statuses.map((itemStatus) => (
                  <option key={itemStatus} value={itemStatus}>
                    {itemStatus.replace(/\b\w/g, (character) =>
                      character.toUpperCase(),
                    )}
                  </option>
                ))}
              </select>
              <select
                value={property}
                onChange={handleProperty}
                aria-label="Filter by property type"
                className="h-9 min-w-0 rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15 xl:w-44 xl:shrink-0"
              >
                <option value="">All properties</option>
                {properties.map((itemProperty) => (
                  <option key={itemProperty} value={itemProperty}>
                    {itemProperty}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={dateFrom}
                onChange={handleDateFrom}
                aria-label="Filter enquiries from date"
                className="h-9 w-full min-w-0 rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15 xl:w-36 xl:shrink-0"
              />
              <input
                type="date"
                value={dateTo}
                onChange={handleDateTo}
                aria-label="Filter enquiries to date"
                className="h-9 w-full min-w-0 rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15 xl:w-36 xl:shrink-0"
              />
            </div>
            {(searchInput || status || property || dateFrom || dateTo) && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md px-2 text-xs font-medium text-blue-700 hover:bg-blue-50 xl:ml-auto"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="border-b border-rose-200 bg-rose-50 px-5 py-3 text-xs leading-5 text-rose-800"
          >
            {error}
            {error.toLowerCase().includes("authorization") && (
              <>
                {" "}
                <Link to="/admin" className="font-semibold underline">
                  Sign in again
                </Link>
              </>
            )}
          </div>
        )}
        {statusError && (
          <div
            role="alert"
            className="border-b border-rose-200 bg-rose-50 px-5 py-3 text-xs leading-5 text-rose-800"
          >
            {statusError}
          </div>
        )}
        <div className="hidden overflow-x-auto xl:block">
          <table className="w-full min-w-180 text-left text-xs">
            <thead className="bg-slate-50 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">
              <tr>
                <th scope="col" className="px-5 py-3">
                  Customer
                </th>
                <th scope="col" className="px-4 py-3">
                  Phone
                </th>
                <th scope="col" className="px-4 py-3">
                  Property
                </th>
                <th scope="col" className="px-4 py-3">
                  Received
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-12 text-center text-xs text-slate-500"
                  >
                    Loading enquiries…
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="p-0">
                    <AdminEmptyState
                      title="Enquiries could not be loaded"
                      description="Check the backend connection and admin key, then refresh the list."
                    />
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-0">
                    <AdminEmptyState
                      title="No enquiries found"
                      description={
                        search || status || property || dateFrom || dateTo
                          ? "Try changing your search or filters."
                          : "New requests submitted through your website will appear here."
                      }
                    />
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="align-top hover:bg-slate-50/70">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">
                        {item.name || "Unnamed"}
                      </p>
                      <p className="mt-1 text-slate-500">
                        {item.email || "No email provided"}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-slate-700">
                      {item.phone || "—"}
                    </td>
                    <td className="px-4 py-4 text-slate-700">
                      {item.property || "Not specified"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-slate-600">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <EnquiryStatusSelect
                        item={item}
                        saving={savingId === item.id}
                        disabled={loading || Boolean(deletingId)}
                        onChange={handleRowStatusChange}
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <FuseButton
                        className="w-12"
                        label=""
                        undoLabel=""
                        ariaLabel={`Delete enquiry from ${item.name || "unnamed customer"}`}
                        undoAriaLabel={`Cancel deleting enquiry from ${item.name || "unnamed customer"}`}
                        doneLabel="Deleted"
                        icon={<Trash2 size={40} />}
                        color="#9f1239"
                        background="#fff1f2"
                        fuseColor="#e11d48"
                        size="sm"
                        radius={18}
                        undoWindow={4000}
                        fuse="outline"
                        commitOn="fuseEnd"
                        settle="reset"
                        disabled={loading || Boolean(deletingId)}
                        onCommit={() => handleEnquiryDelete(item)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="divide-y divide-slate-200 xl:hidden">
          {loading ? (
            <p className="px-5 py-10 text-center text-xs text-slate-500">
              Loading enquiries…
            </p>
          ) : error ? (
            <AdminEmptyState
              title="Enquiries could not be loaded"
              description="Check the backend connection and admin key, then refresh the list."
            />
          ) : items.length === 0 ? (
            <AdminEmptyState
              title="No enquiries found"
              description={
                search || status || property || dateFrom || dateTo
                  ? "Try changing your search or filters."
                  : "New requests submitted through your website will appear here."
              }
            />
          ) : (
            items.map((item) => (
              <article key={item.id} className="space-y-3 px-4 py-4 sm:px-5">
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-slate-900">
                      {item.name || "Unnamed"}
                    </h3>
                    <p className="mt-1 break-all text-xs text-slate-500">
                      {item.email || "No email provided"}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <EnquiryStatusSelect
                      item={item}
                      saving={savingId === item.id}
                      disabled={loading || Boolean(deletingId)}
                      onChange={handleRowStatusChange}
                    />
                    <FuseButton
                      className="w-12"
                      label=""
                      undoLabel=""
                      ariaLabel={`Delete enquiry from ${item.name || "unnamed customer"}`}
                      undoAriaLabel={`Cancel deleting enquiry from ${item.name || "unnamed customer"}`}
                      doneLabel="Deleted"
                      icon={<Trash2 size={20} />}
                      color="#9f1239"
                      background="#fff1f2"
                      fuseColor="#e11d48"
                      size="sm"
                      radius={18}
                      undoWindow={4000}
                      fuse="outline"
                      commitOn="fuseEnd"
                      settle="reset"
                      disabled={loading || Boolean(deletingId)}
                      onCommit={() => handleEnquiryDelete(item)}
                    />
                  </div>
                </div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs border-t border-neutral-200 mb-2">
                  <div className="min-w-0 mt-3">
                    <dt className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                      Phone
                    </dt>
                    <dd className="mt-1 break-all text-slate-700">
                      {item.phone || "—"}
                    </dd>
                  </div>
                  <div className="min-w-0 mt-3">
                    <dt className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                      Property
                    </dt>
                    <dd className="mt-1 wrap-break-word text-slate-700">
                      {item.property || "Not specified"}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                      Received
                    </dt>
                    <dd className="mt-1 text-slate-600">
                      {formatDate(item.createdAt)}
                    </dd>
                  </div>
                </dl>
              </article>
            ))
          )}
        </div>
        <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <span>
            {loading
              ? "Loading records…"
              : `Showing ${startRecord}–${endRecord} of ${pagination.total} enquiries`}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              disabled={loading || page <= 1}
              className="rounded border cursor-pointer border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <span className="px-1">
              Page {pagination.page} of {Math.max(pagination.totalPages, 1)}
            </span>
            <button
              type="button"
              onClick={() =>
                setPage((value) => Math.min(pagination.totalPages, value + 1))
              }
              disabled={loading || page >= pagination.totalPages}
              className="rounded border cursor-pointer border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
