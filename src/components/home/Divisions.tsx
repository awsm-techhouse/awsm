"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { divisions } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export default function Divisions() {
  const { t, lang } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="divisions" className="bg-black py-32 md:py-40" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold tracking-[0.3em] text-white/40 uppercase mb-6"
        >
          {t("divisions.eyebrow")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight mb-20 whitespace-pre-line"
        >
          {t("divisions.title")}
        </motion.h2>

        {/* Division Cards */}
        <div className="flex flex-col gap-px">
          {divisions.map((div, i) => (
            <motion.div
              key={div.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
            >
              <Link
                href={div.href}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-6 py-12 md:py-16 border-t border-white/10 hover:border-white/30 transition-colors"
              >
                {/* Left */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 group-hover:opacity-80 transition-opacity">
                    {div.name}
                  </h3>
                  <p className="text-base text-white/50 max-w-lg leading-relaxed">
                    {lang === "en" ? div.descriptionEn : div.description}
                  </p>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4 md:flex-col md:items-end">
                  <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                    {t("divisions.cta")}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all">
                    <ArrowUpRight
                      size={16}
                      className="text-white group-hover:text-black transition-colors"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
