"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const stats = [
  { value: "3+", key: "about.stat.years" },
  { value: "100+", key: "about.stat.clients" },
  { value: "100+", key: "about.stat.projects" },
  { value: "2.000.000+", key: "about.stat.awards" },
];

export default function About() {
  const { t } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="bg-white py-32 md:py-40" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold tracking-[0.3em] text-black/40 uppercase mb-6"
        >
          {t("about.eyebrow")}
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-black leading-tight tracking-tight mb-8 whitespace-pre-line"
        >
          {t("about.title")}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-black/60 max-w-2xl leading-relaxed mb-20"
        >
          {t("about.description")}
        </motion.p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="bg-white p-8 md:p-10"
            >
              <div className="text-5xl md:text-6xl font-bold text-black tracking-tight mb-3">
                {stat.value}
              </div>
              <div className="text-sm text-black/50 leading-snug whitespace-pre-line">
                {t(stat.key)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
