"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  // @ts-ignore
  const { messages, sendMessage, status } = useChat();
  const isLoading = status === "submitted" || status === "streaming";
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [localInput, setLocalInput] = useState("");

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localInput.trim()) return;

    if (sendMessage) {
      sendMessage({ text: localInput });
    }
    setLocalInput("");
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Tombol Buka Tutup Chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex size-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
          isOpen
            ? "bg-gray-800 text-gray-400 hover:text-white"
            : "bg-indigo-500 text-white hover:bg-indigo-400 hover:scale-110"
        }`}
      >
        {isOpen ? (
          <XMarkIcon className="size-6" />
        ) : (
          <ChatBubbleLeftRightIcon className="size-6" />
        )}
      </button>

      {/* Jendela Chat */}
      <div
        className={`absolute bottom-20 left-0 w-[90vw] sm:w-[400px] h-[500px] max-h-[70vh] flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gray-900 shadow-2xl ring-1 ring-white/5 transition-all duration-300 origin-bottom-left ${
          isOpen
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-indigo-500 p-4 text-white">
          <h3 className="font-semibold">Ask Me Anything</h3>
          <p className="text-xs text-indigo-100">
            Saya adalah asisten AI portfolio ini.
          </p>
        </div>

        {/* Area Pesan */}
        <div className="flex-1 overflow-y-auto scrollbar-none p-4 space-y-4 bg-gray-900/50">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-gray-500">
              <ChatBubbleLeftRightIcon className="size-10 mb-2 opacity-20" />
              <p className="text-sm">
                Halo! Ada yang ingin ditanyakan tentang saya, proyek, atau skill
                saya?
              </p>
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-indigo-500 text-white rounded-br-none"
                      : "bg-white/10 text-gray-200 rounded-bl-none"
                  }`}
                >
                  <div className="prose prose-invert prose-sm">
                    <ReactMarkdown>
                      {(m as any).text ||
                        (m as any).parts
                          ?.map((p: any) => p.text || "")
                          .join("") ||
                        (m as any).content ||
                        ""}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl rounded-bl-none bg-white/10 px-4 py-2 text-sm text-gray-400">
                <span className="animate-pulse">Mengetik...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Form Input */}
        <form
          onSubmit={handleFormSubmit}
          className="border-t border-white/10 bg-gray-900 p-3 flex gap-2"
        >
          <input
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)}
            placeholder="Tanya sesuatu..."
            className="flex-1 rounded-full bg-white/5 px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !localInput.trim()}
            className="flex size-10 items-center justify-center rounded-full bg-indigo-500 text-white transition hover:bg-indigo-400 disabled:opacity-50"
          >
            <PaperAirplaneIcon className="size-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
