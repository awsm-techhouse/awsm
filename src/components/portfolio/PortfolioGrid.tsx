"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { PortfolioItem } from "@/types";
import PortfolioCard from "./PortfolioCard";

interface PortfolioGridProps {
  items: PortfolioItem[];
  showFilter?: boolean;
  eyebrow?: string;
}

export default function PortfolioGrid({
  items,
  showFilter = true,
  eyebrow,
}: PortfolioGridProps) {
  const { t, lang } = useI18n();
  const [filter, setFilter] = useState<"all" | "featured">("all");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered =
    filter === "featured" ? items.filter((i) => i.featured) : items;

  return (
    <section id="portfolio" className="bg-white py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs font-semibold tracking-[0.3em] text-black/40 uppercase mb-4"
            >
              {eyebrow ?? t("portfolio.eyebrow")}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-black tracking-tight"
            >
              {t("portfolio.eyebrow")}
            </motion.h2>
          </div>

          {/* Filter */}
          {showFilter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-1 bg-black/5 p-1 rounded-full"
            >
              {(["all", "featured"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
                    filter === f
                      ? "bg-black text-white shadow-sm"
                      : "text-black/60 hover:text-black"
                  }`}
                >
                  {f === "all" ? t("portfolio.all") : t("portfolio.featured")}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, i) => (
            <PortfolioCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
