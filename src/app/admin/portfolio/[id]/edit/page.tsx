import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import AdminSidebar from "../../../components/AdminSidebar";
import PortfolioForm from "../../PortfolioForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPortfolioPage({ params }: Props) {
  const { id } = await params;
  const item = await prisma.portfolioItem.findUnique({ where: { id } });

  if (!item) notFound();

  const initialData = {
    id: item.id,
    title: item.title,
    titleEn: item.titleEn,
    client: item.client,
    division: item.division,
    category: item.category,
    categoryEn: item.categoryEn,
    year: item.year,
    description: item.description,
    descriptionEn: item.descriptionEn,
    coverImage: item.coverImage,
    images: JSON.parse(item.images) as string[],
    tags: JSON.parse(item.tags) as string[],
    featured: item.featured,
    published: item.published,
    ctaEnabled: item.ctaEnabled,
    ctaLabel: item.ctaLabel,
    ctaLabelEn: item.ctaLabelEn,
    ctaUrl: item.ctaUrl,
    order: item.order,
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest text-black/30 uppercase mb-1">
            Edit Portofolio
          </p>
          <h1 className="text-2xl font-bold text-black">{item.title}</h1>
          <p className="text-sm text-black/40 mt-1">ID: {item.id}</p>
        </div>
        <PortfolioForm mode="edit" initialData={initialData} />
      </main>
    </div>
  );
}
