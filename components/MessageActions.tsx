"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MessageActions({
  message,
}: {
  message: { id: string; is_read: boolean };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggleRead = async () => {
    setLoading(true);
    try {
      await fetch(`/api/messages/${message.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_read: !message.is_read }),
      });
      router.refresh();
    } catch (e) {
      console.error(e);
      alert("Gagal mengubah status pesan");
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async () => {
    if (!confirm("Yakin ingin menghapus pesan ini?")) return;
    setLoading(true);
    try {
      await fetch(`/api/messages/${message.id}`, {
        method: "DELETE",
      });
      router.refresh();
    } catch (e) {
      console.error(e);
      alert("Gagal menghapus pesan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
      <button
        type="button"
        disabled={loading}
        onClick={toggleRead}
        className={`px-3 py-1.5 text-xs font-semibold rounded-md ring-1 ring-inset focus:z-10 disabled:opacity-50 ${
          message.is_read
            ? "bg-gray-800 text-gray-300 hover:bg-gray-700 ring-white/10"
            : "bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 ring-indigo-500/20"
        }`}
      >
        {message.is_read ? "Tandai Belum Dibaca" : "Tandai Sudah Dibaca"}
      </button>
      <button
        type="button"
        disabled={loading}
        onClick={deleteMessage}
        className="px-3 py-1.5 text-xs font-semibold rounded-md bg-red-500/10 text-red-400 ring-1 ring-inset ring-red-500/20 hover:bg-red-500/20 focus:z-10 disabled:opacity-50"
      >
        Hapus
      </button>
    </div>
  );
}
