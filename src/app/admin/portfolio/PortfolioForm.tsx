"use client";

import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Plus, ExternalLink } from "lucide-react";

interface FormData {
  title: string;
  titleEn: string;
  client: string;
  division: string;
  category: string;
  categoryEn: string;
  year: string;
  description: string;
  descriptionEn: string;
  coverImage: string;
  images: string[];
  tags: string[];
  featured: boolean;
  published: boolean;
  ctaEnabled: boolean;
  ctaLabel: string;
  ctaLabelEn: string;
  ctaUrl: string;
  order: number;
}

const defaultForm: FormData = {
  title: "",
  titleEn: "",
  client: "",
  division: "event-organizer",
  category: "",
  categoryEn: "",
  year: new Date().getFullYear().toString(),
  description: "",
  descriptionEn: "",
  coverImage: "",
  images: [],
  tags: [],
  featured: false,
  published: true,
  ctaEnabled: false,
  ctaLabel: "",
  ctaLabelEn: "",
  ctaUrl: "",
  order: 0,
};

const divisions = [
  { value: "event-organizer", label: "AWSM Event Organizer" },
  { value: "digital-agency", label: "AWSM Digital Agency" },
  { value: "tech-house", label: "AWSM Tech House" },
];

interface Props {
  initialData?: Partial<FormData> & { id?: string };
  mode: "create" | "edit";
}

export default function PortfolioForm({ initialData, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({ ...defaultForm, ...initialData });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);

  function set(field: keyof FormData, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function uploadFile(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    return data.url as string;
  }

  async function handleCoverUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const url = await uploadFile(file);
      set("coverImage", url);
    } catch {
      setError("Gagal upload gambar cover");
    } finally {
      setUploadingCover(false);
    }
  }

  async function handleImagesUpload(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploadingImages(true);
    try {
      const urls = await Promise.all(files.map(uploadFile));
      set("images", [...form.images, ...urls]);
    } catch {
      setError("Gagal upload gambar");
    } finally {
      setUploadingImages(false);
    }
  }

  function addTag() {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      set("tags", [...form.tags, tag]);
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    set("tags", form.tags.filter((t) => t !== tag));
  }

  function removeImage(url: string) {
    set("images", form.images.filter((u) => u !== url));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url =
      mode === "create"
        ? "/api/admin/portfolio"
        : `/api/admin/portfolio/${initialData?.id}`;
    const method = mode === "create" ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/admin/portfolio");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Gagal menyimpan");
      }
    } catch {
      setError("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* ─── Basic Info ─── */}
      <section className="bg-white rounded-2xl border border-black/5 p-6 space-y-5">
        <h2 className="text-sm font-semibold text-black/60 uppercase tracking-wider">
          Informasi Dasar
        </h2>

        {/* Division */}
        <div>
          <label className="block text-sm font-medium text-black mb-1.5">
            Divisi <span className="text-red-500">*</span>
          </label>
          <select
            value={form.division}
            onChange={(e) => set("division", e.target.value)}
            required
            className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm text-black outline-none focus:ring-2 focus:ring-black/20 transition-all"
          >
            {divisions.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1.5">
              Judul (Indonesia) <span className="text-red-500">*</span>
            </label>
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              required
              placeholder="Contoh: Gala Dinner Korporat 2025"
              className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm text-black placeholder-black/30 outline-none focus:ring-2 focus:ring-black/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1.5">
              Judul (English) <span className="text-red-500">*</span>
            </label>
            <input
              value={form.titleEn}
              onChange={(e) => set("titleEn", e.target.value)}
              required
              placeholder="Example: Corporate Gala Dinner 2025"
              className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm text-black placeholder-black/30 outline-none focus:ring-2 focus:ring-black/20 transition-all"
            />
          </div>
        </div>

        {/* Client + Year */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1.5">
              Nama Klien <span className="text-red-500">*</span>
            </label>
            <input
              value={form.client}
              onChange={(e) => set("client", e.target.value)}
              required
              placeholder="Contoh: PT Nusantara Jaya"
              className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm text-black placeholder-black/30 outline-none focus:ring-2 focus:ring-black/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1.5">
              Tahun <span className="text-red-500">*</span>
            </label>
            <input
              value={form.year}
              onChange={(e) => set("year", e.target.value)}
              required
              placeholder="2025"
              className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm text-black placeholder-black/30 outline-none focus:ring-2 focus:ring-black/20 transition-all"
            />
          </div>
        </div>

        {/* Category */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1.5">
              Kategori (Indonesia) <span className="text-red-500">*</span>
            </label>
            <input
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              required
              placeholder="Contoh: Acara Korporat"
              className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm text-black placeholder-black/30 outline-none focus:ring-2 focus:ring-black/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1.5">
              Kategori (English) <span className="text-red-500">*</span>
            </label>
            <input
              value={form.categoryEn}
              onChange={(e) => set("categoryEn", e.target.value)}
              required
              placeholder="Example: Corporate Event"
              className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm text-black placeholder-black/30 outline-none focus:ring-2 focus:ring-black/20 transition-all"
            />
          </div>
        </div>

        {/* Order */}
        <div className="w-32">
          <label className="block text-sm font-medium text-black mb-1.5">
            Urutan (Order)
          </label>
          <input
            type="number"
            value={form.order}
            onChange={(e) => set("order", parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm text-black outline-none focus:ring-2 focus:ring-black/20 transition-all"
          />
        </div>
      </section>

      {/* ─── Description ─── */}
      <section className="bg-white rounded-2xl border border-black/5 p-6 space-y-5">
        <h2 className="text-sm font-semibold text-black/60 uppercase tracking-wider">
          Deskripsi
        </h2>
        <div>
          <label className="block text-sm font-medium text-black mb-1.5">
            Deskripsi (Indonesia) <span className="text-red-500">*</span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            required
            rows={4}
            placeholder="Ceritakan detail proyek ini dalam Bahasa Indonesia..."
            className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm text-black placeholder-black/30 outline-none focus:ring-2 focus:ring-black/20 transition-all resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-1.5">
            Deskripsi (English) <span className="text-red-500">*</span>
          </label>
          <textarea
            value={form.descriptionEn}
            onChange={(e) => set("descriptionEn", e.target.value)}
            required
            rows={4}
            placeholder="Describe this project in English..."
            className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm text-black placeholder-black/30 outline-none focus:ring-2 focus:ring-black/20 transition-all resize-none"
          />
        </div>
      </section>

      {/* ─── Images ─── */}
      <section className="bg-white rounded-2xl border border-black/5 p-6 space-y-5">
        <h2 className="text-sm font-semibold text-black/60 uppercase tracking-wider">
          Gambar
        </h2>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-black mb-1.5">
            Thumbnail / Cover Image
          </label>
          <div
            onClick={() => coverInputRef.current?.click()}
            className="relative border-2 border-dashed border-black/10 rounded-xl p-6 cursor-pointer hover:border-black/30 transition-colors group"
          >
            {form.coverImage ? (
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.coverImage}
                  alt="Cover"
                  className="w-20 h-14 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-sm text-black font-medium truncate max-w-xs">
                    {form.coverImage}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); set("coverImage", ""); }}
                    className="text-xs text-red-500 hover:underline mt-1"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-black/30">
                <Upload size={24} />
                <p className="text-sm">
                  {uploadingCover ? "Mengupload..." : "Klik untuk upload gambar cover"}
                </p>
                <p className="text-xs">PNG, JPG, WebP — maks 5MB</p>
              </div>
            )}
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverUpload}
            />
          </div>

          {/* Or URL */}
          <div className="mt-3">
            <input
              value={form.coverImage}
              onChange={(e) => set("coverImage", e.target.value)}
              placeholder="Atau paste URL gambar..."
              className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm text-black placeholder-black/30 outline-none focus:ring-2 focus:ring-black/20 transition-all"
            />
          </div>
        </div>

        {/* Additional Images */}
        <div>
          <label className="block text-sm font-medium text-black mb-1.5">
            Gambar Tambahan
          </label>
          <div
            onClick={() => imagesInputRef.current?.click()}
            className="border-2 border-dashed border-black/10 rounded-xl p-6 cursor-pointer hover:border-black/30 transition-colors text-center"
          >
            <Upload size={20} className="mx-auto text-black/30 mb-2" />
            <p className="text-sm text-black/30">
              {uploadingImages ? "Mengupload..." : "Klik untuk upload beberapa gambar"}
            </p>
            <input
              ref={imagesInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImagesUpload}
            />
          </div>

          {form.images.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-3">
              {form.images.map((url) => (
                <div key={url} className="relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt=""
                    className="w-20 h-14 object-cover rounded-lg border border-black/5"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Tags ─── */}
      <section className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
        <h2 className="text-sm font-semibold text-black/60 uppercase tracking-wider">
          Tags
        </h2>
        <div className="flex gap-2">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { e.preventDefault(); addTag(); }
            }}
            placeholder="Tambah tag lalu Enter..."
            className="flex-1 px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm text-black placeholder-black/30 outline-none focus:ring-2 focus:ring-black/20 transition-all"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-3 bg-black text-white rounded-xl hover:bg-zinc-800 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
        {form.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {form.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 text-sm font-medium text-black bg-zinc-100 px-3 py-1.5 rounded-full"
              >
                {tag}
                <button type="button" onClick={() => removeTag(tag)}>
                  <X size={12} className="text-black/40 hover:text-red-500" />
                </button>
              </span>
            ))}
          </div>
        )}
      </section>

      {/* ─── CTA Button ─── */}
      <section className="bg-white rounded-2xl border border-black/5 p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-black uppercase tracking-wider">
              Tombol Direct (CTA)
            </h2>
            <p className="text-xs text-black/40 mt-0.5">
              Tampilkan tombol link di halaman detail portofolio
            </p>
          </div>
          <button
            type="button"
            onClick={() => set("ctaEnabled", !form.ctaEnabled)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              form.ctaEnabled ? "bg-black" : "bg-zinc-200"
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                form.ctaEnabled ? "left-7" : "left-1"
              }`}
            />
          </button>
        </div>

        {form.ctaEnabled && (
          <div className="space-y-4 pt-2">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1.5">
                  Label Tombol (Indonesia)
                </label>
                <input
                  value={form.ctaLabel}
                  onChange={(e) => set("ctaLabel", e.target.value)}
                  placeholder="Contoh: Lihat Website"
                  className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm text-black placeholder-black/30 outline-none focus:ring-2 focus:ring-black/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1.5">
                  Label Tombol (English)
                </label>
                <input
                  value={form.ctaLabelEn}
                  onChange={(e) => set("ctaLabelEn", e.target.value)}
                  placeholder="Example: Visit Website"
                  className="w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm text-black placeholder-black/30 outline-none focus:ring-2 focus:ring-black/20 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1.5">
                URL Tujuan
              </label>
              <div className="relative">
                <input
                  value={form.ctaUrl}
                  onChange={(e) => set("ctaUrl", e.target.value)}
                  placeholder="https://..."
                  type="url"
                  className="w-full px-4 py-3 pl-10 bg-zinc-50 border border-black/10 rounded-xl text-sm text-black placeholder-black/30 outline-none focus:ring-2 focus:ring-black/20 transition-all"
                />
                <ExternalLink size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/30" />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─── Publishing ─── */}
      <section className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
        <h2 className="text-sm font-semibold text-black/60 uppercase tracking-wider">
          Pengaturan Publikasi
        </h2>

        {[
          {
            key: "published" as keyof FormData,
            label: "Publikasikan",
            description: "Tampilkan di website publik",
          },
          {
            key: "featured" as keyof FormData,
            label: "Unggulan (Featured)",
            description: "Tampilkan di halaman utama website",
          },
        ].map(({ key, label, description }) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-black">{label}</p>
              <p className="text-xs text-black/40">{description}</p>
            </div>
            <button
              type="button"
              onClick={() => set(key, !form[key])}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                form[key] ? "bg-black" : "bg-zinc-200"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                  form[key] ? "left-7" : "left-1"
                }`}
              />
            </button>
          </div>
        ))}
      </section>

      {/* ─── Submit ─── */}
      <div className="flex items-center gap-4 pb-10">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-zinc-800 transition-colors disabled:opacity-50"
        >
          {loading
            ? "Menyimpan..."
            : mode === "create"
            ? "Simpan Portofolio"
            : "Update Portofolio"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3.5 text-sm font-medium text-black/60 hover:text-black transition-colors"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
