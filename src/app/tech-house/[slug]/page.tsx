import { notFound } from "next/navigation";
import PortfolioDetail from "@/components/portfolio/PortfolioDetail";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getPortfolioById } from "@/lib/portfolio";

export default async function TechPortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getPortfolioById(slug);

  if (!item || item.division !== "tech-house") {
    notFound();
  }

  return (
    <>
      <Navbar />
      <PortfolioDetail item={item} />
      <Footer />
    </>
  );
}
