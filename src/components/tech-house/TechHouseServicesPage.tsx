"use client";

import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PortfolioItem } from "@/types";
import { TECH_HOUSE_FAQS, TECH_HOUSE_WHATSAPP_URL } from "./content";
import {
  getPortfolioBucket,
  getPortfolioNeedLine,
  getPortfolioSolutionLine,
} from "./portfolioUtils";

interface TechHouseServicesPageProps {
  selectedItems: PortfolioItem[];
}

const serviceCategories = [
  "Website & Web Development",
  "Custom Software Development",
  "Business Systems",
  "Business Automation",
  "API & System Integration",
  "WhatsApp & Customer Communication",
  "AI Solutions",
  "Data Analytics & Machine Learning",
  "IoT & Smart Systems",
  "UI/UX & Digital Product Design",
  "Cloud, Hosting & Deployment",
  "Maintenance & Continuous Development",
] as const;

const serviceDetails = [
  {
    title: "Website & Web Development",
    description:
      "Untuk company website, corporate website, landing page, e-commerce, web application, dan CMS yang mudah dikelola.",
    points: [
      "Company / Corporate Website",
      "Landing Page Campaign",
      "E-Commerce",
      "Web Application",
      "CMS + SEO-ready structure",
    ],
  },
  {
    title: "Custom Software & Business Systems",
    description:
      "Jika software siap pakai tidak sesuai proses Anda, kami membangun sistem custom agar proses bisnis lebih terstruktur.",
    points: [
      "Custom Dashboard",
      "Inventory / Sales / Booking System",
      "CRM & Customer Management",
      "Employee / Internal System",
      "KPI Dashboard & Reporting",
    ],
  },
  {
    title: "Business Automation & Integration",
    description:
      "Mengurangi pekerjaan manual melalui automation dan menghubungkan sistem agar data tidak terpisah.",
    points: [
      "Workflow Automation",
      "Automated Notification & Reporting",
      "Order / Form Automation",
      "API Integration",
      "Website → Payment → Dashboard flow",
    ],
  },
  {
    title: "AI, Data Analytics & Machine Learning",
    description:
      "Menggunakan AI secara praktis untuk chatbot, asisten internal, analitik data, forecasting, dan recommendation.",
    points: [
      "AI Chatbot & AI Assistant",
      "AI Integration with Website / WhatsApp / System",
      "Data Cleaning & Data Visualization",
      "Forecasting / Prediction / Classification",
      "KPI Monitoring Dashboard",
    ],
  },
  {
    title: "IoT & Smart Systems",
    description:
      "Menghubungkan sensor/perangkat ke sistem digital untuk monitoring real-time dan automation berbasis kondisi.",
    points: [
      "IoT Monitoring (Temperature, Humidity, Energy, dll.)",
      "Remote Monitoring Dashboard",
      "Sensor Integration",
      "Smart Automation",
      "Alerts & Historical Reporting",
    ],
  },
  {
    title: "UI/UX, Deployment & Maintenance",
    description:
      "Membantu desain produk, menyiapkan sistem online, dan support pengembangan berkelanjutan setelah go-live.",
    points: [
      "User Flow, Wireframe, UI Design, Prototype",
      "Domain / Hosting / Server Setup",
      "Database & SSL Configuration",
      "Bug Fixing & Performance Optimization",
      "Continuous Improvement Support",
    ],
  },
] as const;

const whyAwsmPoints = [
  "Anda tidak harus mengerti teknologi. Cukup ceritakan kebutuhan atau masalah Anda.",
  "Solusi dibuat sesuai kebutuhan project, bukan paket yang dipaksakan sama.",
  "Tidak hanya website: software, business system, automation, AI, data, dan IoT.",
  "Fokus pada masalah yang ingin diselesaikan, bukan sekadar teknologi yang dipakai.",
  "Scope, fitur, timeline, dan deliverables dibahas sebelum development dimulai.",
  "Teknologi dipilih secara rasional sesuai kebutuhan, bukan sekadar tren.",
  "Sistem dapat dirancang agar mudah dikembangkan di masa depan.",
  "Satu partner untuk kebutuhan teknologi yang berkembang bertahap.",
] as const;

const howWeWorkSteps = [
  "Consultation — Ceritakan kebutuhan, masalah, atau ide Anda.",
  "Discovery — Kami memahami proses, pengguna, dan tujuan project.",
  "Solution Design — Menentukan pendekatan dan teknologi yang sesuai.",
  "Scope & Proposal — Menyusun scope, timeline, deliverables, dan proposal.",
  "Design & Development — Merancang, mengembangkan, dan mengintegrasikan solusi.",
  "Testing — Menguji sistem berdasarkan kebutuhan yang disepakati.",
  "Deployment — Menyiapkan agar website/sistem siap digunakan.",
  "Support & Improvement — Maintenance dan pengembangan lanjutan bila dibutuhkan.",
] as const;

const useCases = [
  {
    title: "Saya butuh website perusahaan.",
    helps: [
      "Company Website",
      "Corporate Website",
      "Landing Page",
      "CMS",
      "SEO-ready Website",
      "Portfolio Website",
    ],
  },
  {
    title: "Saya ingin jualan online.",
    helps: [
      "E-Commerce",
      "Product Catalog",
      "Shopping Cart",
      "Payment Gateway",
      "Order Management",
      "Customer Account",
    ],
  },
  {
    title: "Saya masih mengelola data dengan Excel.",
    helps: [
      "Custom Business System",
      "Database",
      "Dashboard",
      "Inventory System",
      "Reporting System",
      "Management System",
    ],
  },
  {
    title: "Banyak pekerjaan masih dilakukan manual.",
    helps: [
      "Workflow Automation",
      "Automated Notification",
      "Automated Reporting",
      "Data Processing",
      "API Integration",
    ],
  },
  {
    title: "Saya ingin menggunakan AI.",
    helps: [
      "AI Chatbot",
      "AI Assistant",
      "AI Integration",
      "Data Analysis",
      "Prediction",
      "AI Automation",
    ],
  },
  {
    title: "Saya ingin memantau mesin atau sensor.",
    helps: [
      "IoT Monitoring",
      "Sensor Integration",
      "Remote Monitoring",
      "Real-time Dashboard",
      "Smart Automation",
    ],
  },
] as const;

function getBucketLabel(bucket: string) {
  if (bucket === "website-software") return "Website & Software";
  if (bucket === "business-systems") return "Business Systems";
  if (bucket === "automation") return "Automation";
  if (bucket === "ai-data") return "AI & Data";
  if (bucket === "iot") return "IoT";
  return "General";
}

export default function TechHouseServicesPage({
  selectedItems,
}: TechHouseServicesPageProps) {
  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen overflow-x-hidden">
        <section className="bg-black pt-32 pb-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-semibold tracking-[0.3em] text-white/40 uppercase mb-6">
              AWSM TECH HOUSE
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight max-w-5xl mb-7">
              Digital &amp; Technology Solutions Built Around Your Needs
            </h1>
            <p className="text-base md:text-xl text-white/65 max-w-3xl mb-8">
              Butuh website, sistem bisnis, automation, AI, atau solusi IoT?
              Ceritakan kebutuhan Anda. Kami bantu menentukan teknologi yang
              tepat dan membangun solusinya bersama Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href={TECH_HOUSE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/85 transition-all group"
              >
                Konsultasi Sekarang
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
              <Link
                href="/tech-house/portofolio"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/25 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-all group"
              >
                Lihat Portofolio
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-white/75">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} /> Custom Solution
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} /> Sesuai Kebutuhan
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} /> Konsultasi Terlebih Dahulu
              </span>
            </div>
            <p className="text-sm md:text-base text-white/60 max-w-3xl mt-6">
              Tidak tahu harus mulai dari mana? Tidak masalah. Ceritakan
              masalah atau ide Anda. Kami bantu menerjemahkannya menjadi solusi
              teknologi.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-4">
            Punya Masalah atau Ide? Mungkin Kami Bisa Membantu.
          </h2>
          <p className="text-black/65 max-w-4xl mb-10">
            Anda tidak perlu tahu teknologi apa yang harus digunakan. Cukup
            ceritakan apa yang ingin Anda capai. Kami yang membantu memikirkan
            solusi teknisnya.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase) => (
              <article
                key={useCase.title}
                className="border border-black/10 rounded-3xl p-7"
              >
                <h3 className="text-xl font-semibold text-black mb-4">
                  {useCase.title}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-black/70 text-sm">
                  {useCase.helps.map((item) => (
                    <li key={item} className="inline-flex items-start gap-2">
                      <span className="text-black/30">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <a
            href={TECH_HOUSE_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-10 px-6 py-3 bg-black text-white text-sm font-semibold rounded-full hover:bg-black/85 transition-all group"
          >
            Konsultasi Sekarang
            <ArrowUpRight
              size={15}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 md:pb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-4">
            Apa yang Bisa Kami Bangun?
          </h2>
          <p className="text-black/65 max-w-4xl mb-10">
            Kami menyediakan berbagai layanan digital dan teknologi. Tidak yakin
            layanan mana yang Anda butuhkan? Ceritakan kebutuhan Anda dan kami
            akan membantu menentukan solusi yang paling sesuai.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceCategories.map((service) => (
              <div
                key={service}
                className="rounded-2xl border border-black/10 bg-black/[0.02] px-5 py-4 text-sm font-medium text-black/80"
              >
                {service}
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 md:pb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-10">
            Detail Layanan Utama
          </h2>
          <div className="space-y-5">
            {serviceDetails.map((detail) => (
              <article
                key={detail.title}
                className="rounded-3xl border border-black/10 p-7 md:p-8"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-black mb-3">
                  {detail.title}
                </h3>
                <p className="text-black/65 mb-4">{detail.description}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-5 text-sm text-black/75">
                  {detail.points.map((point) => (
                    <li key={point} className="inline-flex items-start gap-2">
                      <span className="text-black/35">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 md:pb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-8">
            Kenapa Memilih AWSM?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whyAwsmPoints.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-black/10 p-5 text-black/75"
              >
                {point}
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 md:pb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-8">
            Bagaimana Project Anda Dikerjakan?
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {howWeWorkSteps.map((step, index) => (
              <li
                key={step}
                className="rounded-2xl border border-black/10 p-5 flex gap-4"
              >
                <span className="w-8 h-8 rounded-full bg-black text-white text-xs font-semibold inline-flex items-center justify-center flex-shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-black/75">{step}</span>
              </li>
            ))}
          </ol>
          <p className="text-black/65 max-w-4xl mt-8 text-sm md:text-base">
            Setiap project memiliki kebutuhan yang berbeda. Karena itu, kami
            tidak menggunakan satu harga untuk semua client. Setelah memahami
            kebutuhan Anda, kami akan menentukan scope, solusi, dan proposal
            yang sesuai.
          </p>
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 md:pb-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-3">
                Contoh Project yang Telah Kami Kerjakan
              </h2>
              <p className="text-black/65 max-w-3xl">
                Setiap project memiliki kebutuhan yang berbeda. Lihat bagaimana
                kami menerjemahkan kebutuhan menjadi solusi digital dan
                teknologi.
              </p>
            </div>
            <Link
              href="/tech-house/portofolio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-black/65 transition-colors"
            >
              Lihat Semua Portofolio
              <ArrowUpRight size={15} />
            </Link>
          </div>
          {selectedItems.length === 0 ? (
            <div className="rounded-2xl border border-black/10 p-8 text-black/60">
              Portofolio sedang diperbarui. Anda tetap bisa konsultasi kebutuhan
              project Anda sekarang.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-3xl border border-black/10 p-6 bg-white"
                >
                  <p className="text-[11px] font-semibold tracking-[0.12em] text-black/45 uppercase mb-2">
                    {getBucketLabel(getPortfolioBucket(item))}
                  </p>
                  <h3 className="text-lg font-semibold text-black mb-3">
                    {item.title}
                  </h3>
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
                    Lihat Project <ArrowUpRight size={14} />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 md:pb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {TECH_HOUSE_FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-black/10 px-5 py-4 open:bg-black/[0.02]"
              >
                <summary className="cursor-pointer list-none font-semibold text-black flex items-center justify-between gap-3">
                  {faq.question}
                  <span className="text-black/40 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-black/65 mt-3 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-black py-20 md:py-24 px-6 lg:px-8 mb-16 md:mb-0">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              Punya Kebutuhan atau Ide? Mari Kita Diskusikan.
            </h2>
            <p className="text-white/70 max-w-3xl mb-7">
              Tidak perlu tahu harus menggunakan teknologi apa. Ceritakan saja
              apa yang ingin Anda capai. Kami akan membantu mencari solusi yang
              paling sesuai.
            </p>
            <a
              href={TECH_HOUSE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/85 transition-all group"
            >
              Konsultasi Sekarang
              <ArrowUpRight
                size={16}
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
