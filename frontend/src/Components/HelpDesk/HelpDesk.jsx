import { useEffect, useRef, useState } from "react";
import { Bot, ChevronDown, MessageCircle, Send, X } from "lucide-react";

const quickReplies = ["Building Models", "Projects Locations"];

const responses = {
  models: {
    text: "Explore our homes and compare the available models.",
    link: "/models",
    label: "Browse building models",
  },
  locations: {
    text: "Our project site contact page has the Birtamode location and map.",
    link: "/contact/site",
    label: "View project location",
  },
  price: {
    text: "You can view the latest available pricing on our price list page.",
    link: "/price-list",
    label: "Open price list",
  },
  contact: {
    text: "Our team can help with your enquiry. Visit the contact page for our Birgunj and Birtamode offices.",
    link: "/contact/office",
    label: "Contact our offices",
  },
};

const greeting = {
  id: "greeting",
  from: "assistant",
  text: "Greetings from Vastu Vihar Help Desk. How may I assist you?",
};

function getResponse(message) {
  const value = message.toLowerCase();
  if (/model|bungalow|home|house|building|property/.test(value)) return responses.models;
  if (/location|site|map|address|where|project/.test(value)) return responses.locations;
  if (/price|cost|budget|rate/.test(value)) return responses.price;
  if (/contact|call|phone|office|email|enquir/.test(value)) return responses.contact;
  return {
    text: "I can help you find building models, project locations, prices, or contact details. Choose an option below or call our team at +977 98025-91815.",
  };
}

export default function HelpDesk() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([greeting]);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen, messages]);

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const response = getResponse(trimmed);
    setMessages((current) => [
      ...current,
      { id: `${Date.now()}-user`, from: "user", text: trimmed },
      { id: `${Date.now()}-assistant`, from: "assistant", ...response },
    ]);
    setMessage("");
  };

  const chooseQuickReply = (reply) => {
    const response = reply === "Building Models" ? responses.models : responses.locations;
    setMessages((current) => [
      ...current,
      { id: `${Date.now()}-user`, from: "user", text: reply },
      { id: `${Date.now()}-assistant`, from: "assistant", ...response },
    ]);
  };

  return (
    <div className="fixed bottom-24 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-28 sm:right-7">
      {isOpen && (
        <section
          aria-label="Vastu Vihar Help Desk chat"
          className="flex h-[min(520px,calc(100dvh-7rem))] w-[min(360px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border-light bg-[#fffefa] shadow-[0_20px_60px_rgba(16,41,32,0.22)]"
        >
          <header className="flex items-center gap-3 bg-brand px-4 py-4 text-white">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/12 text-highlight">
              <Bot size={21} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-semibold">Vastu Vihar Help Desk</h2>
              <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/70">
                <span className="size-1.5 rounded-full bg-emerald-400" /> We are online to assist you
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Minimize help desk"
              className="rounded-full p-2 text-white/75 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
            >
              <ChevronDown size={19} />
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close help desk"
              className="rounded-full p-2 text-white/75 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
            >
              <X size={17} />
            </button>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto bg-[#f7f6f1] px-4 py-5">
            {messages.map((item) => (
              <div key={item.id} className={`flex ${item.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-3 text-[13px] leading-5 shadow-sm ${
                    item.from === "user"
                      ? "rounded-br-sm bg-brand text-white"
                      : "rounded-bl-sm border border-[#ece8df] bg-white text-[#39443d]"
                  }`}
                >
                  <p>{item.text}</p>
                  {item.link && (
                    <a
                      href={item.link}
                      className="mt-2 inline-flex text-xs font-semibold text-highlight-hover underline decoration-highlight/60 underline-offset-4 hover:text-brand"
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              </div>
            ))}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pl-1">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => chooseQuickReply(reply)}
                    className="rounded-full border border-border-dark/55 bg-white px-3 py-2 text-[11px] font-medium text-brand transition hover:border-brand hover:bg-[#f4f1e8] focus-visible:outline-2 focus-visible:outline-border-dark"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
            <div ref={messageEndRef} />
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(message);
            }}
            className="flex items-center gap-2 border-t border-border-light bg-white p-3"
          >
            <label htmlFor="help-desk-message" className="sr-only">Type your message</label>
            <input
              id="help-desk-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type your message..."
              className="min-w-0 flex-1 rounded-full bg-white px-4 py-3 text-sm text-brand outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-border-dark/50"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!message.trim()}
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-white transition hover:bg-layout-dark disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-dark"
            >
              <Send size={17} aria-hidden="true" />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close Vastu Vihar Help Desk" : "Open Vastu Vihar Help Desk"}
        aria-expanded={isOpen}
        className="flex size-14 items-center justify-center rounded-full bg-brand text-white shadow-[0_8px_24px_rgba(16,41,32,0.3)] transition duration-200 hover:scale-105 hover:bg-layout-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-border-dark sm:size-16"
      >
        {isOpen ? <X size={24} aria-hidden="true" /> : <MessageCircle size={25} aria-hidden="true" />}
      </button>
    </div>
  );
}
