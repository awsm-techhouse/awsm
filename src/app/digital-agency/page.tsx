import DivisionPageLayout from "@/components/layout/DivisionPageLayout";
import { divisions } from "@/lib/data";
import { getPortfolioByDivision } from "@/lib/portfolio";

export const dynamic = "force-dynamic";

const division = divisions.find((d) => d.id === "digital-agency")!;

export default async function DigitalAgencyPage() {
  const items = await getPortfolioByDivision("digital-agency");
  return <DivisionPageLayout division={division} items={items} />;
}
