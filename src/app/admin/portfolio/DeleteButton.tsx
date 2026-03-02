"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await fetch(`/api/admin/portfolio/${id}`, { method: "DELETE" });
    router.refresh();
    setLoading(false);
    setConfirming(false);
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-3 py-1.5 text-xs font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
        >
          {loading ? "..." : "Hapus"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-3 py-1.5 text-xs font-semibold bg-zinc-100 text-black rounded-lg hover:bg-zinc-200"
        >
          Batal
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-2 rounded-lg hover:bg-red-50 text-black/30 hover:text-red-500 transition-all"
      title={`Hapus "${title}"`}
    >
      <Trash2 size={15} />
    </button>
  );
}
