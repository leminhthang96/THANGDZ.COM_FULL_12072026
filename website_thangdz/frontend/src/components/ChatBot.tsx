"use client";

import { FormEvent, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Bot, Loader2, MessageCircle, Send, UserRound, X } from "lucide-react";
import { usePathname } from "next/navigation";

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  content: string;
  createdAt: string;
};

type ChatUser = {
  type: "guest" | "member";
  email: string | null;
  role: string | null;
  name: string | null;
};

type AuthSnapshot = {
  isLoggedIn: boolean;
  email: string | null;
  role: string | null;
};

const serverAuthSnapshot = JSON.stringify({ isLoggedIn: false, email: null, role: null });

const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "bot",
  content: "Chào bạn, mình là trợ lý AI của Lê Minh Thắng. Bạn cần mình hỗ trợ gì hôm nay?",
  createdAt: "",
};

function createId(prefix = "msg") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createSessionId() {
  const randomId = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

  return `web-${randomId}`;
}

function getOrCreateSessionId() {
  const storageKey = "chatbot_session_id";
  const existingSession = localStorage.getItem(storageKey);

  if (existingSession) {
    return existingSession;
  }

  const sessionId = createSessionId();
  localStorage.setItem(storageKey, sessionId);
  return sessionId;
}

function getAuthSnapshot() {
  if (typeof window === "undefined") {
    return serverAuthSnapshot;
  }

  return JSON.stringify({
    isLoggedIn: Boolean(localStorage.getItem("token")),
    email: localStorage.getItem("email"),
    role: localStorage.getItem("role"),
  });
}

function subscribeToAuthChanges(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("authchange", callback);
  window.addEventListener("focus", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("authchange", callback);
    window.removeEventListener("focus", callback);
  };
}

export default function ChatBot() {
  const pathname = usePathname();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const authSnapshot = useSyncExternalStore(subscribeToAuthChanges, getAuthSnapshot, () => serverAuthSnapshot);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [guestName, setGuestName] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const auth = useMemo<AuthSnapshot>(() => JSON.parse(authSnapshot), [authSnapshot]);
  const user = useMemo<ChatUser>(
    () => ({
      type: auth.isLoggedIn ? "member" : "guest",
      email: auth.isLoggedIn ? auth.email : null,
      role: auth.isLoggedIn ? auth.role : null,
      name: auth.isLoggedIn ? auth.email : guestName.trim() || null,
    }),
    [auth.email, auth.isLoggedIn, auth.role, guestName],
  );

  const displayName = useMemo(() => {
    if (user.type === "member") {
      return user.email || "Tài khoản đã đăng nhập";
    }

    return guestName.trim() || "Khách";
  }, [guestName, user.email, user.type]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedInput = input.trim();

    if (!trimmedInput || isSending) {
      return;
    }

    const userMessage: ChatMessage = {
      id: createId("user"),
      role: "user",
      content: trimmedInput,
      createdAt: new Date().toISOString(),
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInput("");
    setError("");
    setIsSending(true);

    try {
      const response = await fetch("/chatbot-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedInput,
          sessionId: getOrCreateSessionId(),
          user: {
            ...user,
            name: displayName,
          },
          page: {
            path: pathname,
            url: window.location.href,
          },
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || data.detail?.message || "Không thể gửi tin nhắn. Vui lòng thử lại.");
      }

      const botMessage: ChatMessage = {
        id: createId("bot"),
        role: "bot",
        content: data.reply || "Mình đã nhận được tin nhắn của bạn.",
        createdAt: new Date().toISOString(),
      };

      setMessages((currentMessages) => [...currentMessages, botMessage]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Có lỗi xảy ra khi gửi tin nhắn.";
      setError(message);
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: createId("bot-error"),
          role: "bot",
          content: message,
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen && (
        <section className="flex h-[min(640px,calc(100vh-120px))] w-[calc(100vw-40px)] max-w-[390px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cyan-400/15 text-cyan-300">
                <Bot className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold text-white">Trợ lý AI ThangDz</h2>
                <p className="truncate text-xs text-slate-400">Đang chat với: {displayName}</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Đóng khung chat"
              onClick={() => setIsOpen(false)}
              className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          {user.type === "guest" && (
            <div className="border-b border-white/10 px-4 py-3">
              <label className="mb-1.5 block text-xs font-medium text-slate-400" htmlFor="chatbot-guest-name">
                Tên khách
              </label>
              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="chatbot-guest-name"
                  value={guestName}
                  onChange={(event) => setGuestName(event.target.value)}
                  placeholder="Nhập tên nếu muốn"
                  className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] pl-9 pr-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/15"
                />
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="flex flex-col gap-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${
                      message.role === "user"
                        ? "rounded-br-md bg-cyan-400 text-slate-950"
                        : "rounded-bl-md border border-white/10 bg-white/[0.04] text-slate-100"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isSending && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-slate-300">
                    <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />
                    <span>Đang trả lời...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border-t border-white/10 p-3">
            {error && <p className="mb-2 line-clamp-2 text-xs text-rose-300">{error}</p>}
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
                rows={1}
                placeholder="Nhập tin nhắn..."
                className="max-h-28 min-h-11 flex-1 resize-none rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-sm leading-5 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/15"
              />
              <button
                type="submit"
                aria-label="Gửi tin nhắn"
                disabled={!input.trim() || isSending}
                className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-xl bg-cyan-400 text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
              >
                {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
          </form>
        </section>
      )}

      <button
        type="button"
        aria-label={isOpen ? "Đóng khung chat" : "Mở khung chat AI"}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="grid h-14 w-14 cursor-pointer place-items-center rounded-full bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:-translate-y-0.5 hover:bg-cyan-300"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}