import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const item = await prisma.portfolioItem.findUnique({ where: { id } });

  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(item);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await req.json();

  const item = await prisma.portfolioItem.update({
    where: { id },
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

  return NextResponse.json(item);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;

  await prisma.portfolioItem.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
