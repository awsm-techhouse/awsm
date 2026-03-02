"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AdminSidebar from "@/app/admin/components/AdminSidebar";
import {
  Plus,
  Trash2,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Wallet,
  X,
  Check,
} from "lucide-react";

type TxType = "income" | "expense" | "debt" | "receivable";

interface Transaction {
  id: string;
  division: string;
  type: TxType;
  status: string;
  description: string;
  amount: number;
  date: string;
  notes: string;
}

const DIVISIONS = [
  { id: "event-organizer", label: "Event Organizer", short: "EO" },
  { id: "digital-agency", label: "Digital Agency", short: "DA" },
  { id: "tech-house", label: "Tech House", short: "TH" },
];

const TYPE_CONFIG: Record<
  TxType,
  { label: string; color: string; bg: string; border: string; icon: React.ElementType; sign: number }
> = {
  income: {
    label: "Uang Masuk",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: TrendingUp,
    sign: 1,
  },
  expense: {
    label: "Uang Keluar",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    icon: TrendingDown,
    sign: -1,
  },
  debt: {
    label: "Hutang",
    color: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
    icon: CreditCard,
    sign: -1,
  },
  receivable: {
    label: "Piutang",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: Wallet,
    sign: 1,
  },
};

const EMPTY_FORM = {
  description: "",
  amount: "",
  date: new Date().toISOString().split("T")[0],
  notes: "",
  status: "pending",
};

function fmt(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function FinanceDivisionPage() {
  const params = useParams();
  const router = useRouter();
  const division = params.division as string;

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingType, setAddingType] = useState<TxType | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/finance?division=${division}`);
    const data = await res.json();
    setTransactions(data);
    setLoading(false);
  }, [division]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const currentDivision = DIVISIONS.find((d) => d.id === division);

  async function handleAdd(type: TxType) {
    if (!form.description || !form.amount || !form.date) return;
    setSaving(true);
    await fetch("/api/admin/finance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ division, type, ...form, amount: Number(form.amount) }),
    });
    setSaving(false);
    setAddingType(null);
    setForm(EMPTY_FORM);
    fetchData();
  }

  async function handleChangeStatus(id: string, newStatus: string) {
    await fetch(`/api/admin/finance/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchData();
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus transaksi ini?")) return;
    setDeletingId(id);
    await fetch(`/api/admin/finance/${id}`, { method: "DELETE" });
    setDeletingId(null);
    fetchData();
  }

  const byType = (type: TxType) => transactions.filter((t) => t.type === type);

  const total = {
    income: byType("income").reduce((s, t) => s + t.amount, 0),
    expense: byType("expense").reduce((s, t) => s + t.amount, 0),
    debt: byType("debt").reduce((s, t) => s + t.amount, 0),
    receivable: byType("receivable").reduce((s, t) => s + t.amount, 0),
  };

  const saldiKas = total.income - total.expense;
  const kekayaanBersih = saldiKas + total.receivable - total.debt;

  if (!currentDivision) {
    router.replace("/admin/finance");
    return null;
  }

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-1">
            Keuangan
          </p>
          <h1 className="text-2xl font-bold text-zinc-900">
            {currentDivision.label}
          </h1>
        </div>

        {/* Division Tabs */}
        <div className="flex gap-2 mb-8">
          {DIVISIONS.map((d) => (
            <Link
              key={d.id}
              href={`/admin/finance/${d.id}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                d.id === division
                  ? "bg-black text-white"
                  : "bg-white text-zinc-500 border border-zinc-200 hover:border-zinc-400"
              }`}
            >
              {d.short} — {d.label}
            </Link>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32 text-zinc-400 text-sm">
            Memuat data...
          </div>
        ) : (
          <div className="space-y-6">
            {/* Transaction Sections */}
            {(["income", "expense", "debt", "receivable"] as TxType[]).map((type) => {
              const cfg = TYPE_CONFIG[type];
              const rows = byType(type);
              const Icon = cfg.icon;
              return (
                <div
                  key={type}
                  className={`rounded-2xl border ${cfg.border} ${cfg.bg} overflow-hidden`}
                >
                  {/* Section Header */}
                  <div className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm`}>
                        <Icon size={15} className={cfg.color} />
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${cfg.color}`}>{cfg.label}</p>
                        <p className="text-xs text-zinc-500">
                          {rows.length} transaksi · {fmt(rows.reduce((s, t) => s + t.amount, 0))}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setAddingType(type);
                        setForm(EMPTY_FORM);
                      }}
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-all shadow-sm"
                    >
                      <Plus size={12} />
                      Tambah
                    </button>
                  </div>

                  {/* Inline Add Form */}
                  {addingType === type && (
                    <div className="px-5 pb-4">
                      <div className="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm">
                        <p className="text-xs font-semibold text-zinc-500 mb-3 uppercase tracking-wider">
                          Tambah {cfg.label}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                          <input
                            className="col-span-1 sm:col-span-2 px-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
                            placeholder="Keterangan *"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                          />
                          <input
                            type="number"
                            className="px-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
                            placeholder="Jumlah (Rp) *"
                            value={form.amount}
                            onChange={(e) => setForm({ ...form, amount: e.target.value })}
                          />
                          <input
                            type="date"
                            className="px-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
                            value={form.date}
                            onChange={(e) => setForm({ ...form, date: e.target.value })}
                          />
                          <input
                            className="col-span-1 sm:col-span-2 px-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
                            placeholder="Catatan (opsional)"
                            value={form.notes}
                            onChange={(e) => setForm({ ...form, notes: e.target.value })}
                          />
                          <div className="col-span-1 sm:col-span-2 flex items-center gap-3">
                            <p className="text-xs text-zinc-500 font-medium">Status:</p>
                            <div className="flex gap-2">
                              {(["pending", "lunas"] as const).map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => setForm({ ...form, status: s })}
                                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                                    form.status === s
                                      ? s === "lunas"
                                        ? "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-300"
                                        : "bg-yellow-100 text-yellow-700 ring-2 ring-yellow-300"
                                      : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200"
                                  }`}
                                >
                                  {s === "lunas" ? "Lunas" : "Pending"}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAdd(type)}
                            disabled={saving || !form.description || !form.amount}
                            className="flex items-center gap-1.5 px-4 py-2 bg-black text-white text-xs font-semibold rounded-lg disabled:opacity-40 hover:bg-zinc-800 transition-colors"
                          >
                            <Check size={12} />
                            {saving ? "Menyimpan..." : "Simpan"}
                          </button>
                          <button
                            onClick={() => setAddingType(null)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-zinc-100 text-zinc-600 text-xs font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
                          >
                            <X size={12} />
                            Batal
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Rows */}
                  {rows.length > 0 && (
                    <div className="px-5 pb-5">
                      <div className="bg-white rounded-xl border border-zinc-100 overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-zinc-100">
                              <th className="text-left px-4 py-2.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                Tanggal
                              </th>
                              <th className="text-left px-4 py-2.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                Keterangan
                              </th>
                              <th className="text-left px-4 py-2.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider hidden md:table-cell">
                                Catatan
                              </th>
                              <th className="text-left px-4 py-2.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="text-right px-4 py-2.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                Jumlah
                              </th>
                              <th className="px-4 py-2.5 w-10" />
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((tx, i) => (
                              <tr
                                key={tx.id}
                                className={`border-b border-zinc-50 last:border-0 ${i % 2 === 1 ? "bg-zinc-50/50" : ""}`}
                              >
                                <td className="px-4 py-3 text-zinc-500 whitespace-nowrap text-xs">
                                  {tx.date}
                                </td>
                                <td className="px-4 py-3 font-medium text-zinc-800">
                                  {tx.description}
                                </td>
                                <td className="px-4 py-3 text-zinc-400 text-xs hidden md:table-cell">
                                  {tx.notes || "—"}
                                </td>
                                <td className="px-4 py-3">
                                  <select
                                    value={tx.status}
                                    onChange={(e) => handleChangeStatus(tx.id, e.target.value)}
                                    className={`text-xs font-semibold rounded-full px-2.5 py-1 border-0 outline-none cursor-pointer appearance-none text-center transition-colors ${
                                      tx.status === "lunas"
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }`}
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="lunas">Lunas</option>
                                  </select>
                                </td>
                                <td className={`px-4 py-3 text-right font-semibold whitespace-nowrap ${cfg.color}`}>
                                  {cfg.sign > 0 ? "+" : "-"}{fmt(tx.amount)}
                                </td>
                                <td className="px-4 py-3 text-right">
                                  <button
                                    onClick={() => handleDelete(tx.id)}
                                    disabled={deletingId === tx.id}
                                    className="p-1.5 text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-40"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {rows.length === 0 && addingType !== type && (
                    <div className="px-5 pb-5">
                      <p className="text-center text-xs text-zinc-400 py-6 bg-white rounded-xl border border-dashed border-zinc-200">
                        Belum ada data {cfg.label.toLowerCase()}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Summary */}
            <div className="rounded-2xl bg-white border border-zinc-200 p-6 shadow-sm">
              <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-5">
                Ringkasan Keuangan
              </p>

              {/* 4 type totals */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {(["income", "expense", "debt", "receivable"] as TxType[]).map((type) => {
                  const cfg = TYPE_CONFIG[type];
                  const Icon = cfg.icon;
                  return (
                    <div key={type} className={`rounded-xl p-4 ${cfg.bg} border ${cfg.border}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={13} className={cfg.color} />
                        <p className={`text-xs font-semibold ${cfg.color}`}>{cfg.label}</p>
                      </div>
                      <p className={`text-lg font-bold ${cfg.color}`}>{fmt(total[type])}</p>
                    </div>
                  );
                })}
              </div>

              {/* Two main metric boxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Box 1: Saldo Kas Aktif */}
                <div
                  className={`rounded-xl p-5 border ${
                    saldiKas >= 0
                      ? "bg-emerald-50 border-emerald-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${
                    saldiKas >= 0 ? "text-emerald-600" : "text-red-600"
                  }`}>
                    Saldo Kas Aktif
                  </p>
                  <p className="text-xs text-zinc-400 mb-3">
                    Uang Masuk − Uang Keluar
                  </p>
                  <p className="text-xs text-zinc-400 mb-1">
                    {fmt(total.income)} − {fmt(total.expense)}
                  </p>
                  <p
                    className={`text-2xl md:text-3xl font-bold tracking-tight ${
                      saldiKas >= 0 ? "text-emerald-700" : "text-red-700"
                    }`}
                  >
                    {saldiKas >= 0 ? "+" : ""}{fmt(saldiKas)}
                  </p>
                </div>

                {/* Box 2: Kekayaan Bersih */}
                <div
                  className={`rounded-xl p-5 border ${
                    kekayaanBersih >= 0
                      ? "bg-blue-50 border-blue-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${
                    kekayaanBersih >= 0 ? "text-blue-600" : "text-red-600"
                  }`}>
                    Kekayaan Bersih
                  </p>
                  <p className="text-xs text-zinc-400 mb-3">
                    Saldo Kas + Piutang − Hutang
                  </p>
                  <p className="text-xs text-zinc-400 mb-1">
                    {fmt(saldiKas)} + {fmt(total.receivable)} − {fmt(total.debt)}
                  </p>
                  <p
                    className={`text-2xl md:text-3xl font-bold tracking-tight ${
                      kekayaanBersih >= 0 ? "text-blue-700" : "text-red-700"
                    }`}
                  >
                    {kekayaanBersih >= 0 ? "+" : ""}{fmt(kekayaanBersih)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
