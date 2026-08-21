"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { profile } from "@/data/portfolio";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

type FormStatus = "idle" | "success" | "error";

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

export default function ContactForm() {
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`,
    );

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setFormData(initialFormData);
    setStatus("success");
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
            className="mt-2 block w-full rounded-md bg-white/5 px-3.5 py-2.5 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
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
            className="mt-2 block w-full rounded-md bg-white/5 px-3.5 py-2.5 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
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
          className="mt-2 block w-full resize-y rounded-md bg-white/5 px-3.5 py-2.5 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
          placeholder="Tell me about your project"
        />
      </div>
      <button
        type="submit"
        className="rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Send message
      </button>
      <p
        id="contact-form-status"
        role={status === "error" ? "alert" : "status"}
        className={
          status === "error"
            ? "text-sm text-red-300"
            : "text-sm text-emerald-300"
        }
      >
        {status === "error" && errorMessage}
        {status === "success" && "Your email app is ready with the message."}
      </p>
    </form>
  );
}
