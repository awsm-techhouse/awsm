"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { divisions } from "@/lib/data";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Brand */}
          <div className="max-w-xs">
            <h2 className="text-2xl font-semibold tracking-tight mb-3">
              AWSM <span className="font-light">GROUP</span>
            </h2>
            <p className="text-sm text-white/50 leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Divisions */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-5">
              {t("nav.divisions")}
            </h3>
            <ul className="flex flex-col gap-3">
              {divisions.map((div) => (
                <li key={div.id}>
                  <Link
                    href={div.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {div.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-5">
              {t("nav.contact")}
            </h3>
            <a
              href={`mailto:${t("contact.email")}`}
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              {t("contact.email")}
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            © {year} AWSM GROUP. {t("footer.rights")}
          </p>
          <div className="flex gap-6">
            {["Instagram", "LinkedIn", "Twitter"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-white/30 hover:text-white/70 transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
