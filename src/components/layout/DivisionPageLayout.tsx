"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { PortfolioItem, DivisionInfo } from "@/types";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowUpRight } from "lucide-react";

interface DivisionPageLayoutProps {
  division: DivisionInfo;
  items: PortfolioItem[];
}

export default function DivisionPageLayout({
  division,
  items,
}: DivisionPageLayoutProps) {
  const { t, lang } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const tagline = lang === "en" ? division.taglineEn : division.tagline;
  const description =
    lang === "en" ? division.descriptionEn : division.description;

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">
        {/* Hero */}
        <section className="bg-black min-h-[70vh] flex flex-col justify-end pb-20 px-6 lg:px-8 pt-32 relative overflow-hidden">
          {/* Background texture */}
          <div
            className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="max-w-7xl mx-auto relative z-10 w-full">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <Link
                href="/"
                className="text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                {t("division.back")}
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs font-semibold tracking-[0.3em] text-white/40 uppercase mb-5"
            >
              {t("divisions.eyebrow")}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight mb-6"
            >
              {division.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed"
            >
              {tagline}
            </motion.p>
          </div>
        </section>

        {/* Description */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-xl md:text-2xl text-black/60 max-w-3xl leading-relaxed font-light"
          >
            {description}
          </motion.p>
        </section>

        {/* Portfolio Grid */}
        <section
          className="max-w-7xl mx-auto px-6 lg:px-8 pb-32"
          ref={ref}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-12 border-t border-black/10 pt-12"
          >
            <h2 className="text-2xl font-bold text-black tracking-tight">
              {t("division.portfolio.title")} — {items.length}{" "}
              {lang === "id" ? "Proyek" : "Projects"}
            </h2>
          </motion.div>

          {items.length === 0 ? (
            <p className="text-black/40 text-center py-20">
              {t("division.portfolio.empty")}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item, i) => (
                <PortfolioCard key={item.id} item={item} index={i} />
              ))}
            </div>
          )}
        </section>

        {/* CTA to other divisions */}
        <section className="bg-black py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-[0.3em] text-white/40 uppercase mb-4">
              {lang === "id" ? "Divisi Lainnya" : "Other Divisions"}
            </p>
            <Link
              href="/#divisions"
              className="inline-flex items-center gap-3 text-xl md:text-2xl font-semibold text-white hover:opacity-70 transition-opacity group"
            >
              {lang === "id"
                ? "Lihat Semua Divisi"
                : "Explore All Divisions"}
              <ArrowUpRight
                size={24}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
