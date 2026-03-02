import DivisionPageLayout from "@/components/layout/DivisionPageLayout";
import { divisions } from "@/lib/data";
import { getPortfolioByDivision } from "@/lib/portfolio";

const division = divisions.find((d) => d.id === "tech-house")!;

export default async function TechHousePage() {
  const items = await getPortfolioByDivision("tech-house");
  return <DivisionPageLayout division={division} items={items} />;
}
