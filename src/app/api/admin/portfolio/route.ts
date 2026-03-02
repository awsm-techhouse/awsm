import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const division = searchParams.get("division");
  const publishedOnly = searchParams.get("published") !== "false";

  const items = await prisma.portfolioItem.findMany({
    where: {
      ...(division ? { division } : {}),
      ...(publishedOnly ? { published: true } : {}),
    },
    orderBy: [{ division: "asc" }, { order: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const item = await prisma.portfolioItem.create({
    data: {
      division: body.division,
      title: body.title,
      titleEn: body.titleEn,
      client: body.client,
      category: body.category,
      categoryEn: body.categoryEn,
      year: body.year,
      description: body.description,
      descriptionEn: body.descriptionEn,
      coverImage: body.coverImage ?? "",
      images: JSON.stringify(body.images ?? []),
      tags: JSON.stringify(body.tags ?? []),
      featured: body.featured ?? false,
      published: body.published ?? true,
      ctaEnabled: body.ctaEnabled ?? false,
      ctaLabel: body.ctaLabel ?? "",
      ctaLabelEn: body.ctaLabelEn ?? "",
      ctaUrl: body.ctaUrl ?? "",
      order: body.order ?? 0,
    },
  });

  return NextResponse.json(item, { status: 201 });
}
