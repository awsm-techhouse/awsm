"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Language } from "@/types";

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (id: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  id: {
    // Navbar
    "nav.home": "Beranda",
    "nav.about": "Tentang",
    "nav.divisions": "Divisi",
    "nav.portfolio": "Portofolio",
    "nav.contact": "Kontak",

    // Hero
    "hero.title": "AWSM GROUP",
    "hero.subtitle": "Kami adalah ekosistem bisnis kreatif dan teknologi yang mendorong transformasi dan menciptakan dampak nyata.",
    "hero.cta.primary": "Lihat Portofolio",
    "hero.cta.secondary": "Tentang Kami",

    // About
    "about.eyebrow": "Tentang Kami",
    "about.title": "Satu Grup,\nTiga Kekuatan",
    "about.description": "AWSM GROUP adalah holding company yang menaungi tiga divisi bisnis unggulan. Dengan lebih dari 3 tahun pengalaman, kami telah melayani ratusan klien dari berbagai industri di seluruh Indonesia.",
    "about.stat.years": "Tahun\nPengalaman",
    "about.stat.clients": "Klien\nPuas",
    "about.stat.projects": "Proyek\nSelesai",
    "about.stat.awards": "Engagement",

    // Divisions
    "divisions.eyebrow": "Divisi Kami",
    "divisions.title": "Tiga Pilar\nKesuksesan",
    "divisions.cta": "Lihat Portofolio",

    // Portfolio
    "portfolio.eyebrow": "Portofolio",
    "portfolio.all": "Semua",
    "portfolio.featured": "Unggulan",
    "portfolio.view": "Lihat Detail",
    "portfolio.back": "Kembali",
    "portfolio.client": "Klien",
    "portfolio.year": "Tahun",
    "portfolio.category": "Kategori",
    "portfolio.other": "Proyek Lainnya",

    // Division pages
    "division.back": "← Kembali ke Beranda",
    "division.portfolio.title": "Portofolio",
    "division.portfolio.empty": "Belum ada portofolio",

    // Contact
    "contact.eyebrow": "Hubungi Kami",
    "contact.title": "Mari Berkolaborasi",
    "contact.subtitle": "Punya proyek? Hubungi divisi kami yang tepat.",
    "contact.cta": "Kirim Pesan",
    "contact.email": "awsm.eventorganizer@gmail.com",
    "contact.phone": "Telepon",
    "contact.instagram": "Instagram",
    "contact.eo.name": "AWSM Event Organizer",
    "contact.eo.phone": "+62 851-3845-2566",
    "contact.eo.email": "awsm.eventorganizer@gmail.com",
    "contact.eo.instagram": "awsm.eventorganizer",
    "contact.da.name": "AWSM Digital Agency",
    "contact.da.phone": "+62 851-3845-2566",
    "contact.da.email": "awsm.digitalagency@gmail.com",
    "contact.da.instagram": "awsm.eventorganizer",
    "contact.th.name": "AWSM Tech House",
    "contact.th.phone": "+62 851-1123-4860",
    "contact.th.email": "awsm.techhouse@gmail.com",
    "contact.th.instagram": "awsm.techhouse",

    // Footer
    "footer.tagline": "Ekosistem Bisnis Kreatif & Teknologi",
    "footer.rights": "Seluruh hak cipta dilindungi.",
  },
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "About",
    "nav.divisions": "Divisions",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Contact",

    // Hero
    "hero.title": "AWSM GROUP",
    "hero.subtitle": "We are a creative and technology business ecosystem driving transformation and creating real impact.",
    "hero.cta.primary": "View Portfolio",
    "hero.cta.secondary": "About Us",

    // About
    "about.eyebrow": "About Us",
    "about.title": "One Group,\nThree Forces",
    "about.description": "AWSM GROUP is a holding company overseeing three premier business divisions. With over 5 years of experience, we have served hundreds of clients across various industries throughout Indonesia.",
    "about.stat.years": "Years of\nExperience",
    "about.stat.clients": "Satisfied\nClients",
    "about.stat.projects": "Projects\nCompleted",
    "about.stat.awards": "Engagement",

    // Divisions
    "divisions.eyebrow": "Our Divisions",
    "divisions.title": "Three Pillars\nof Success",
    "divisions.cta": "View Portfolio",

    // Portfolio
    "portfolio.eyebrow": "Portfolio",
    "portfolio.all": "All",
    "portfolio.featured": "Featured",
    "portfolio.view": "View Details",
    "portfolio.back": "Back",
    "portfolio.client": "Client",
    "portfolio.year": "Year",
    "portfolio.category": "Category",
    "portfolio.other": "Other Projects",

    // Division pages
    "division.back": "← Back to Home",
    "division.portfolio.title": "Portfolio",
    "division.portfolio.empty": "No portfolio items yet",

    // Contact
    "contact.eyebrow": "Contact Us",
    "contact.title": "Let's Collaborate",
    "contact.subtitle": "Have a project in mind? Reach out to the right division.",
    "contact.cta": "Send Message",
    "contact.email": "awsm.eventorganizer@gmail.com",
    "contact.phone": "Phone",
    "contact.instagram": "Instagram",
    "contact.eo.name": "AWSM Event Organizer",
    "contact.eo.phone": "+62 851-3845-2566",
    "contact.eo.email": "awsm.eventorganizer@gmail.com",
    "contact.eo.instagram": "awsm.eventorganizer",
    "contact.da.name": "AWSM Digital Agency",
    "contact.da.phone": "+62 851-3845-2566",
    "contact.da.email": "awsm.digitalagency@gmail.com",
    "contact.da.instagram": "awsm.eventorganizer",
    "contact.th.name": "AWSM Tech House",
    "contact.th.phone": "+62 851-1123-4860",
    "contact.th.email": "awsm.techhouse@gmail.com",
    "contact.th.instagram": "awsm.techhouse",

    // Footer
    "footer.tagline": "Creative & Technology Business Ecosystem",
    "footer.rights": "All rights reserved.",
  },
};

const I18nContext = createContext<I18nContextType>({
  lang: "id",
  setLang: () => {},
  t: (id) => id,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("id");

  const t = (id: string): string => {
    return translations[lang][id] ?? id;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
