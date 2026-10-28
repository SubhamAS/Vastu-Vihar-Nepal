import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=919534095340"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Vastu Vihar on WhatsApp"
      title="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-10 items-center justify-center rounded-full bg-[#2a9e54] text-white shadow-[0_8px_24px_rgba(16,41,32,0.3)] transition duration-200 hover:scale-105 hover:bg-[#20bd5a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:bottom-7 sm:right-7 sm:size-12 motion-reduce:transition-none"
    >
      <FaWhatsapp size={25} aria-hidden="true" />
    </a>
  );
}
