"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

export default function ContactForm({ emailTo }: { emailTo?: string }) {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
    setStatus("idle");
    setErrorMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMessage("Lengkapi nama, email, dan pesan terlebih dahulu.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMessage("Masukkan alamat email yang valid.");
      return;
    }

    setStatus("loading");
    
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Gagal mengirim pesan.");
      }

      setFormData(initialFormData);
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="max-w-xl space-y-5"
      aria-describedby="contact-form-status"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-gray-200"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            disabled={status === "loading"}
            className="mt-2 block w-full rounded-md bg-white/5 px-3.5 py-2.5 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 disabled:opacity-50"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-gray-200"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            disabled={status === "loading"}
            className="mt-2 block w-full rounded-md bg-white/5 px-3.5 py-2.5 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 disabled:opacity-50"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-gray-200"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          disabled={status === "loading"}
          className="mt-2 block w-full resize-y rounded-md bg-white/5 px-3.5 py-2.5 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 disabled:opacity-50"
          placeholder="Tell me about your project"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </button>
      <p
        id="contact-form-status"
        role={status === "error" ? "alert" : "status"}
        className={
          status === "error"
            ? "text-sm text-red-400"
            : "text-sm text-emerald-400"
        }
      >
        {status === "error" && errorMessage}
        {status === "success" && "Pesan berhasil dikirim! Saya akan segera merespons via email."}
      </p>
    </form>
  );
}
