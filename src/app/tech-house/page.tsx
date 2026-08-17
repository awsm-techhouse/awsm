import type { Metadata } from "next";
import TechHouseServicesPage from "@/components/tech-house/TechHouseServicesPage";
import { getPortfolioByDivision } from "@/lib/portfolio";
import { TECH_HOUSE_FAQS } from "@/components/tech-house/content";

export const metadata: Metadata = {
  title: "Digital & Technology Solutions Indonesia | AWSM Tech House",
  description:
    "AWSM Tech House membantu bisnis membangun website, software, business system, automation, AI, data, dan IoT sesuai kebutuhan. Konsultasikan kebutuhan teknologi Anda.",
  keywords: [
    "digital solutions Indonesia",
    "technology solutions Indonesia",
    "IT solutions Indonesia",
    "software development Indonesia",
    "custom software development Indonesia",
    "web development Indonesia",
    "business automation Indonesia",
    "AI solutions Indonesia",
    "IoT solutions Indonesia",
    "jasa pembuatan website",
    "jasa web development",
    "jasa software development",
    "jasa aplikasi web",
    "jasa sistem informasi",
    "jasa dashboard",
    "jasa automation",
    "jasa integrasi API",
    "jasa AI",
    "jasa chatbot AI",
    "jasa IoT",
  ],
};

function getSelectedPortfolioIds(limit: number, items: { id: string; featured: boolean }[]) {
  const featured = items.filter((item) => item.featured);
  if (featured.length >= Math.min(limit, 3)) return featured.slice(0, limit).map((item) => item.id);

  const selected = [...featured];
  const remaining = items.filter((item) => !item.featured);
  for (const item of remaining) {
    if (selected.length >= limit) break;
    selected.push(item);
  }
  return selected.map((item) => item.id);
}

export default async function TechHousePage() {
  const items = await getPortfolioByDivision("tech-house");
  const selectedIds = getSelectedPortfolioIds(6, items);
  const selectedItems = items.filter((item) => selectedIds.includes(item.id));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: TECH_HOUSE_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.awsm.my.id/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tech House",
        item: "https://www.awsm.my.id/tech-house/",
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Digital & Technology Solutions",
    provider: {
      "@type": "Organization",
      name: "AWSM Tech House",
      url: "https://www.awsm.my.id/tech-house/",
    },
    areaServed: "Indonesia",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <TechHouseServicesPage selectedItems={selectedItems} />
    </>
  );
}
