import { supabase } from "@/lib/supabase";
import MessageActions from "@/components/MessageActions";

// Hindari caching agar dashboard selalu update
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MessagesPage() {
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-8 text-center text-red-500 bg-red-500/10 rounded-lg">
        Gagal memuat pesan: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold leading-6 text-white">
            Pesan Masuk
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Daftar pesan dari pengunjung portfolio Anda.
          </p>
        </div>
      </div>

      {!messages || messages.length === 0 ? (
        <div className="bg-gray-800 rounded-xl ring-1 ring-white/10 p-8 text-center">
          <p className="text-gray-400">Belum ada pesan masuk.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {messages.map((msg: any) => (
            <div
              key={msg.id}
              className={`p-6 rounded-xl ring-1 transition-colors ${
                msg.is_read
                  ? "bg-gray-800 ring-white/5 opacity-70"
                  : "bg-gray-800/80 ring-indigo-500/30 border-l-4 border-indigo-500 shadow-lg"
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-start">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {msg.name}
                  </h3>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-sm text-indigo-400 hover:text-indigo-300 block mt-1"
                  >
                    {msg.email}
                  </a>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(msg.created_at).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                
                <MessageActions message={msg} />
              </div>
              <div className="mt-4 text-gray-300 text-sm whitespace-pre-wrap bg-white/5 p-4 rounded-lg">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
