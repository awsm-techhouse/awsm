"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { PortfolioItem } from "@/types";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

interface PortfolioDetailProps {
  item: PortfolioItem;
}

const gradients = [
  "from-zinc-900 to-zinc-700",
  "from-neutral-900 to-stone-700",
];

export default function PortfolioDetail({ item }: PortfolioDetailProps) {
  const { t, lang } = useI18n();

  const title = lang === "en" ? item.titleEn : item.title;
  const description = lang === "en" ? item.descriptionEn : item.description;
  const category = lang === "en" ? item.categoryEn : item.category;
  const ctaLabel = lang === "en" ? item.ctaLabelEn || item.ctaLabel : item.ctaLabel || item.ctaLabelEn;

  const divisionLabels: Record<string, string> = {
    "event-organizer": "AWSM Event Organizer",
    "digital-agency": "AWSM Digital Agency",
    "tech-house": "AWSM Tech House",
  };

  return (
    <main className="bg-white min-h-screen pt-16">
      {/* Hero */}
      <div
        className={`w-full aspect-[4/3] sm:aspect-video md:aspect-[21/9] relative overflow-hidden ${
          item.coverImage ? "" : `bg-gradient-to-br ${gradients[0]}`
        }`}
      >
        {item.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.coverImage}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-16"
        >
          <div className="max-w-7xl mx-auto">
            <span className="text-xs font-semibold tracking-widest text-white/60 uppercase">
              {divisionLabels[item.division]} · {category}
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mt-3">
              {title}
            </h1>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link
            href={`/${item.division}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-black/50 hover:text-black transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            {t("portfolio.back")} — {divisionLabels[item.division]}
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-1 space-y-8"
          >
            {[
              { label: t("portfolio.client"), value: item.client },
              { label: t("portfolio.year"), value: item.year },
              { label: t("portfolio.category"), value: category },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs font-semibold tracking-widest text-black/30 uppercase mb-1.5">
                  {label}
                </p>
                <p className="text-base font-medium text-black">{value}</p>
              </div>
            ))}

            {/* Tags */}
            {item.tags.length > 0 && (
              <div>
                <p className="text-xs font-semibold tracking-widest text-black/30 uppercase mb-3">
                  Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-black/60 bg-black/5 px-3 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Button */}
            {item.ctaEnabled && item.ctaUrl && (
              <div className="pt-2">
                <a
                  href={item.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-semibold rounded-full hover:bg-black/80 transition-all hover:scale-[1.02] group"
                >
                  {ctaLabel || "Lihat Lebih Lanjut"}
                  <ArrowUpRight
                    size={14}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>
              </div>
            )}
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2"
          >
            <p className="text-base md:text-xl lg:text-2xl text-black/70 leading-relaxed font-light">
              {description}
            </p>
          </motion.div>
        </div>

        {/* Image Gallery */}
        {item.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {item.images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt={`${title} — ${i + 1}`}
                className="w-full aspect-[4/3] object-cover rounded-2xl"
              />
            ))}
          </motion.div>
        )}

        {/* Placeholder if no images */}
        {item.images.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {[0, 1].map((i) => (
              <div
                key={i}
                className={`aspect-[4/3] rounded-2xl ${
                  i === 0 ? "bg-zinc-100" : "bg-stone-100"
                }`}
              />
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}
