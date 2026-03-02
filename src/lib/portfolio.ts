import { prisma } from "@/lib/db";
import { PortfolioItem } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseItem(raw: any): PortfolioItem {
  return {
    ...raw,
    images: JSON.parse(raw.images ?? "[]") as string[],
    tags: JSON.parse(raw.tags ?? "[]") as string[],
  } as PortfolioItem;
}

export async function getAllPortfolio(publishedOnly = true): Promise<PortfolioItem[]> {
  const items = await prisma.portfolioItem.findMany({
    where: publishedOnly ? { published: true } : undefined,
    orderBy: [{ division: "asc" }, { order: "asc" }, { createdAt: "desc" }],
  });
  return items.map(parseItem);
}

export async function getPortfolioByDivision(
  division: string,
  publishedOnly = true
): Promise<PortfolioItem[]> {
  const items = await prisma.portfolioItem.findMany({
    where: { division, ...(publishedOnly ? { published: true } : {}) },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return items.map(parseItem);
}

export async function getFeaturedPortfolio(): Promise<PortfolioItem[]> {
  const items = await prisma.portfolioItem.findMany({
    where: { featured: true, published: true },
    orderBy: [{ division: "asc" }, { order: "asc" }, { createdAt: "desc" }],
  });
  return items.map(parseItem);
}

export async function getPortfolioById(id: string): Promise<PortfolioItem | null> {
  const item = await prisma.portfolioItem.findUnique({ where: { id, published: true } });
  if (!item) return null;
  return parseItem(item);
}
