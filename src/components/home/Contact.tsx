"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Phone, Mail, Instagram } from "lucide-react";

const divisions = ["eo", "da", "th"] as const;

export default function Contact() {
  const { t } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="bg-white py-32 md:py-40" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold tracking-[0.3em] text-black/40 uppercase mb-6"
        >
          {t("contact.eyebrow")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-8xl font-bold text-black leading-tight tracking-tight mb-6"
        >
          {t("contact.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base md:text-xl text-black/50 max-w-lg mb-10 md:mb-16"
        >
          {t("contact.subtitle")}
        </motion.p>

        {/* Division Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {divisions.map((div, i) => (
            <motion.div
              key={div}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
              className="bg-black rounded-3xl p-8 flex flex-col gap-6"
            >
              <h3 className="text-white text-base font-semibold leading-snug">
                {t(`contact.${div}.name`)}
              </h3>

              <div className="flex flex-col gap-4">
                {/* Phone */}
                <a
                  href={`https://wa.me/${t(`contact.${div}.phone`).replace(/[\s\-+()]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <Phone size={14} className="text-white" />
                  </span>
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                    {t(`contact.${div}.phone`)}
                  </span>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${t(`contact.${div}.email`)}`}
                  className="flex items-center gap-3 group"
                >
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <Mail size={14} className="text-white" />
                  </span>
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors break-all">
                    {t(`contact.${div}.email`)}
                  </span>
                </a>

                {/* Instagram */}
                <a
                  href={`https://instagram.com/${t(`contact.${div}.instagram`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <Instagram size={14} className="text-white" />
                  </span>
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                    @{t(`contact.${div}.instagram`)}
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
