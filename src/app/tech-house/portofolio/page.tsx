import type { Metadata } from "next";
import TechHousePortfolioPage from "@/components/tech-house/TechHousePortfolioPage";
import { getPortfolioByDivision } from "@/lib/portfolio";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio Digital & Technology Solutions | AWSM Tech House",
  description:
    "Lihat portfolio website, software, business systems, automation, AI, data, dan IoT solutions yang dikembangkan AWSM Tech House.",
};

export default async function TechHousePortfolioRoute() {
  const items = await getPortfolioByDivision("tech-house");
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
      {
        "@type": "ListItem",
        position: 3,
        name: "Portofolio",
        item: "https://www.awsm.my.id/tech-house/portofolio/",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TechHousePortfolioPage items={items} />
    </>
  );
}
