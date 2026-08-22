"use client";

import { useEffect, useState } from "react";
import { UsersIcon } from "@heroicons/react/24/outline";

export default function VisitorBadge() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    async function trackVisitor() {
      try {
        const hasVisited = localStorage.getItem("has_visited");
        let res;

        if (!hasVisited) {
          // Kunjungan baru: Increment
          res = await fetch("/api/visitors", { method: "POST" });
          if (res.ok) {
            localStorage.setItem("has_visited", "true");
          }
        } else {
          // Kunjungan ulang: Hanya ambil angka
          res = await fetch("/api/visitors");
        }

        if (res?.ok) {
          const data = await res.json();
          setVisitorCount(data.count);
        }
      } catch (error) {
        console.error("Failed to track visitor", error);
      }
    }

    trackVisitor();
  }, []);

  if (visitorCount === null) return null;

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
      <UsersIcon className="size-4 text-indigo-400" />
      <span>
        <strong className="text-white">{visitorCount.toLocaleString()}</strong> visitors
      </span>
    </div>
  );
}
