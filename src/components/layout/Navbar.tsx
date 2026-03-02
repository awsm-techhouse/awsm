"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Menu, X } from "lucide-react";

const navLinks = [
  { key: "nav.home", href: "/" },
  { key: "nav.about", href: "/#about" },
  { key: "nav.divisions", href: "/#divisions" },
  { key: "nav.portfolio", href: "/#portfolio" },
  { key: "nav.contact", href: "/#contact" },
];

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-black/5 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className={`text-xl font-semibold tracking-tight transition-colors ${
            scrolled ? "text-black" : "text-white"
          }`}
        >
          AWSM<span className="font-light"> GROUP</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:opacity-60 ${
                scrolled ? "text-black" : "text-white"
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        {/* Right side: Language + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "id" ? "en" : "id")}
            className={`text-xs font-semibold tracking-widest px-3 py-1.5 rounded-full border transition-all ${
              scrolled
                ? "border-black/20 text-black hover:bg-black hover:text-white"
                : "border-white/40 text-white hover:bg-white hover:text-black"
            }`}
          >
            {lang === "id" ? "EN" : "ID"}
          </button>

          {/* Mobile Hamburger */}
          <button
            className={`md:hidden ${scrolled ? "text-black" : "text-white"}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white ${
          menuOpen ? "max-h-96 border-b border-black/5" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="text-sm font-medium text-black hover:opacity-60 transition-opacity"
              onClick={() => setMenuOpen(false)}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
