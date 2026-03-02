"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { PortfolioItem } from "@/types";
import { ArrowUpRight } from "lucide-react";

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
}

// Placeholder gradient colors for items without images
const gradients = [
  "from-zinc-900 to-zinc-700",
  "from-neutral-900 to-neutral-600",
  "from-stone-900 to-stone-600",
  "from-gray-900 to-gray-600",
];

export default function PortfolioCard({ item, index }: PortfolioCardProps) {
  const { lang } = useI18n();

  const title = lang === "en" ? item.titleEn : item.title;
  const category = lang === "en" ? item.categoryEn : item.category;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <Link href={`/${item.division}/${item.id}`} className="group block">
        {/* Image / Placeholder */}
        <div
          className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 ${
            item.coverImage ? "bg-zinc-100" : `bg-gradient-to-br ${gradients[index % gradients.length]}`
          }`}
        >
          {item.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.coverImage}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {/* Gradient overlay + featured badge */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent">
            {item.featured && (
              <span className="absolute top-4 left-4 text-[10px] font-semibold tracking-widest text-white/70 uppercase bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                Featured
              </span>
            )}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
              <ArrowUpRight size={18} className="text-black" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-black/40 uppercase tracking-wider">
              {category}
            </span>
            <span className="text-xs text-black/30">{item.year}</span>
          </div>
          <h3 className="text-lg font-semibold text-black leading-snug tracking-tight group-hover:opacity-60 transition-opacity">
            {title}
          </h3>
          <p className="text-sm text-black/50">{item.client}</p>
        </div>
      </Link>
    </motion.div>
  );
}
