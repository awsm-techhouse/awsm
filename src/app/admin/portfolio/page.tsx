import { prisma } from "@/lib/db";
import Link from "next/link";
import AdminSidebar from "../components/AdminSidebar";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star } from "lucide-react";
import DeleteButton from "./DeleteButton";

const divisionLabels: Record<string, string> = {
  "event-organizer": "Event Organizer",
  "digital-agency": "Digital Agency",
  "tech-house": "Tech House",
};

const divisionColors: Record<string, string> = {
  "event-organizer": "bg-purple-100 text-purple-700",
  "digital-agency": "bg-blue-100 text-blue-700",
  "tech-house": "bg-green-100 text-green-700",
};

interface Props {
  searchParams: Promise<{ division?: string }>;
}

export default async function AdminPortfolioPage({ searchParams }: Props) {
  const { division } = await searchParams;

  const items = await prisma.portfolioItem.findMany({
    where: division ? { division } : undefined,
    orderBy: [{ division: "asc" }, { order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-black">
              {division ? `${divisionLabels[division]} — Portofolio` : "Semua Portofolio"}
            </h1>
            <p className="text-sm text-black/40 mt-1">
              {items.length} item ditemukan
            </p>
          </div>
          <Link
            href="/admin/portfolio/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-zinc-800 transition-colors"
          >
            <Plus size={16} />
            Tambah Portofolio
          </Link>
        </div>

        {/* Division filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { label: "Semua", value: undefined },
            { label: "Event Organizer", value: "event-organizer" },
            { label: "Digital Agency", value: "digital-agency" },
            { label: "Tech House", value: "tech-house" },
          ].map(({ label, value }) => (
            <Link
              key={label}
              href={value ? `/admin/portfolio?division=${value}` : "/admin/portfolio"}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-all ${
                division === value
                  ? "bg-black text-white border-black"
                  : "bg-white text-black/60 border-black/10 hover:border-black/30"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Table */}
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-black/5 p-16 text-center">
            <p className="text-black/40 text-sm mb-4">Belum ada portofolio</p>
            <Link
              href="/admin/portfolio/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-xl"
            >
              <Plus size={16} />
              Tambah yang Pertama
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/5">
                  <th className="text-left text-xs font-semibold text-black/40 uppercase tracking-wide px-6 py-4">
                    Judul
                  </th>
                  <th className="text-left text-xs font-semibold text-black/40 uppercase tracking-wide px-4 py-4">
                    Divisi
                  </th>
                  <th className="text-left text-xs font-semibold text-black/40 uppercase tracking-wide px-4 py-4">
                    Klien
                  </th>
                  <th className="text-left text-xs font-semibold text-black/40 uppercase tracking-wide px-4 py-4">
                    Tahun
                  </th>
                  <th className="text-left text-xs font-semibold text-black/40 uppercase tracking-wide px-4 py-4">
                    Status
                  </th>
                  <th className="text-right text-xs font-semibold text-black/40 uppercase tracking-wide px-6 py-4">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr
                    key={item.id}
                    className={`border-b border-black/5 last:border-0 hover:bg-zinc-50 transition-colors ${
                      i % 2 === 0 ? "" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {item.featured && (
                          <Star size={12} className="text-amber-500 fill-amber-500 shrink-0" />
                        )}
                        <div>
                          <p className="text-sm font-semibold text-black leading-snug">
                            {item.title}
                          </p>
                          <p className="text-xs text-black/40 mt-0.5">{item.titleEn}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          divisionColors[item.division] ?? "bg-zinc-100 text-zinc-600"
                        }`}
                      >
                        {divisionLabels[item.division] ?? item.division}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-black/70">{item.client}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-black/70">{item.year}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {item.published ? (
                          <span className="flex items-center gap-1.5 text-xs font-medium text-green-600">
                            <Eye size={12} /> Publik
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-xs font-medium text-black/30">
                            <EyeOff size={12} /> Draft
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/portfolio/${item.id}/edit`}
                          className="p-2 rounded-lg hover:bg-zinc-100 text-black/50 hover:text-black transition-all"
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </Link>
                        <DeleteButton id={item.id} title={item.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
