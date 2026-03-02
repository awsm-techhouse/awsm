import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Divisions from "@/components/home/Divisions";
import Contact from "@/components/home/Contact";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import { getFeaturedPortfolio } from "@/lib/portfolio";

export default async function Home() {
  const featuredItems = await getFeaturedPortfolio();

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Divisions />
      <PortfolioGrid
        items={featuredItems}
        showFilter={false}
        eyebrow="Karya Terbaik Kami"
      />
      <Contact />
      <Footer />
    </>
  );
}
