import { X, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import "./contact-modal.css";

export default function ContactModal({
  isOpen,
  onClose,
  selectedProperty,
  onSubmit,
  formSubmitted,
  isSending,
  submitError,
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    property: selectedProperty || "",
  });
  const [isAnimating, setIsAnimating] = useState(false);

  if (!isOpen) return null;

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (isAnimating || isSending) return;
    setIsAnimating(true);
  };

  const finishSubmit = () => {
    setIsAnimating(false);
    onSubmit(form);
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        className="relative my-auto w-full max-w-lg border border-brand-line bg-brand-paper p-6 text-brand-ink shadow-2xl sm:p-9"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close contact form"
          className="absolute right-4 top-4 p-2 transition-colors hover:text-brand-ochre"
        >
          <X size={22} />
        </button>

        {formSubmitted ? (
          <div className="contact-confirmation-enter py-10 text-center">
            <CheckCircle2 size={48} className="mx-auto mb-5 text-brand-ochre" />

            <h2 className="font-serif text-3xl">Enquiry received</h2>

            <p className="mt-3 text-sm leading-6 text-neutral-600">
              We have saved your enquiry. Our team will get in touch soon.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-7 bg-brand-pine px-6 py-3 text-xs font-semibold tracking-widest text-white transition-colors hover:bg-brand-forest"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <>
            <span className="text-[10px] font-semibold tracking-[3px] text-brand-ochre">
              VASTU VIHAR NEPAL
            </span>

            <h2
              id="contact-title"
              className="mt-4 font-serif text-4xl leading-tight text-brand-pine"
            >
              Let's find your
              <span className="block text-brand-ochre">perfect home.</span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-neutral-600">
              Share your details and let us know what you're looking for.
            </p>

            <form onSubmit={submitForm} className="mt-7 space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-xs font-medium"
                >
                  Full name
                </label>

                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  required
                  autoComplete="name"
                  placeholder="Enter your name"
                  className="w-full border border-[#d7d4c8] bg-white px-4 py-3 text-sm outline-none focus:border-brand-pine"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="mb-2 block text-xs font-medium"
                >
                  Phone number
                </label>

                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={updateField}
                  required
                  autoComplete="tel"
                  pattern="[0-9+\-\s()]{7,20}"
                  placeholder="Enter your phone number"
                  className="w-full border border-[#d7d4c8] bg-white px-4 py-3 text-sm outline-none focus:border-brand-pine"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-xs font-medium"
                >
                  Email address
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateField}
                  autoComplete="email"
                  placeholder="Enter your email (optional)"
                  className="w-full border border-[#d7d4c8] bg-white px-4 py-3 text-sm outline-none focus:border-brand-pine"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-property"
                  className="mb-2 block text-xs font-medium"
                >
                  Interested in
                </label>

                <select
                  id="contact-property"
                  name="property"
                  value={form.property}
                  onChange={updateField}
                  className="w-full border border-[#d7d4c8] bg-white px-4 py-3 text-sm outline-none focus:border-brand-pine"
                >
                  <option value="">Select a property or category</option>
                  {[
                    "Pashupati Bungalow",
                    "Kanchanjunga Bungalow",
                    "Sagarmatha Bungalow",
                    "Suryodaya Bungalow",
                    "Simplex Bungalow",
                    "Small Suryodaya Bungalow",
                    "Bagmati Bungalow",
                  ].map((property) => (
                    <option key={property} value={property}>
                      {property}
                    </option>
                  ))}
                </select>
              </div>

              {submitError && (
                <p role="alert" className="text-sm text-red-700">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSending || isAnimating}
                className="flex w-full items-center justify-between bg-brand-pine px-5 py-4 text-xs font-semibold tracking-[1.5px] text-white active:scale-95 transition-colors hover:bg-brand-forest disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSending || isAnimating
                  ? "SENDING ENQUIRY..."
                  : "SEND ENQUIRY"}
                {!isSending && (
                  <Send
                    size={18}
                    aria-hidden="true"
                    className={isAnimating ? "contact-plane-flight" : ""}
                    onAnimationEnd={isAnimating ? finishSubmit : undefined}
                  />
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
