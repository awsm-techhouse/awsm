import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const division = searchParams.get("division");

  const items = await prisma.transaction.findMany({
    where: division ? { division } : {},
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const item = await prisma.transaction.create({
    data: {
      division: body.division,
      type: body.type,
      status: body.status ?? "pending",
      description: body.description,
      amount: Number(body.amount),
      date: body.date,
      notes: body.notes ?? "",
    },
  });

  return NextResponse.json(item, { status: 201 });
}
