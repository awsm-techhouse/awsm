"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PortfolioItem } from "@/types";
import {
  PortfolioFilter,
  getPortfolioBucket,
  getPortfolioNeedLine,
  getPortfolioSolutionLine,
} from "./portfolioUtils";
import { TECH_HOUSE_WHATSAPP_URL } from "./content";

interface TechHousePortfolioPageProps {
  items: PortfolioItem[];
}

const filters: { id: PortfolioFilter; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "website-software", label: "Website & Software" },
  { id: "business-systems", label: "Business Systems" },
  { id: "automation", label: "Automation" },
  { id: "ai-data", label: "AI & Data" },
  { id: "iot", label: "IoT" },
];

export default function TechHousePortfolioPage({
  items,
}: TechHousePortfolioPageProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>("all");

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return items;
    return items.filter((item) => getPortfolioBucket(item) === activeFilter);
  }, [activeFilter, items]);

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen overflow-x-hidden">
        <section className="bg-black pt-32 pb-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-semibold tracking-[0.3em] text-white/40 uppercase mb-6">
              AWSM TECH HOUSE
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-4xl mb-4">
              Portofolio AWSM Tech House
            </h1>
            <p className="text-base md:text-xl text-white/65 max-w-3xl">
              Lihat website, software, business systems, automation, AI, data,
              dan IoT solutions yang telah kami kerjakan.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeFilter === filter.id
                    ? "bg-black text-white"
                    : "bg-black/5 text-black/65 hover:bg-black/10"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 md:pb-24">
          {filteredItems.length === 0 ? (
            <div className="rounded-2xl border border-black/10 p-8 text-black/60">
              Belum ada project pada kategori ini.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-3xl border border-black/10 p-6 bg-white"
                >
                  <p className="text-[11px] font-semibold tracking-[0.12em] text-black/45 uppercase mb-2">
                    {item.category}
                  </p>
                  <h2 className="text-lg font-semibold text-black mb-3">
                    {item.title}
                  </h2>
                  <p className="text-sm text-black/65 mb-2">
                    {getPortfolioNeedLine(item)}
                  </p>
                  <p className="text-sm text-black/65 mb-5">
                    {getPortfolioSolutionLine(item)}
                  </p>
                  <Link
                    href={`/tech-house/${item.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-black/65 transition-colors"
                  >
                    View Case Study <ArrowUpRight size={14} />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="bg-black py-16 px-6 lg:px-8 mb-16 md:mb-0">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                Punya kebutuhan serupa?
              </h2>
              <p className="text-white/70">
                Ceritakan kebutuhan project Anda, kami bantu petakan solusinya.
              </p>
            </div>
            <a
              href={TECH_HOUSE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/85 transition-all group w-fit"
            >
              Konsultasi Sekarang
              <ArrowUpRight
                size={15}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          </div>
        </section>
      </main>

      <a
        href={TECH_HOUSE_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black text-white text-center font-semibold py-4 border-t border-white/10"
      >
        Konsultasi Sekarang
      </a>

      <Footer />
    </>
  );
}
