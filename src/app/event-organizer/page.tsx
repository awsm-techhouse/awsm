import DivisionPageLayout from "@/components/layout/DivisionPageLayout";
import { divisions } from "@/lib/data";
import { getPortfolioByDivision } from "@/lib/portfolio";

const division = divisions.find((d) => d.id === "event-organizer")!;

export default async function EventOrganizerPage() {
  const items = await getPortfolioByDivision("event-organizer");
  return <DivisionPageLayout division={division} items={items} />;
}
