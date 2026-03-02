export type Division = "event-organizer" | "digital-agency" | "tech-house";
export type Language = "id" | "en";

export interface PortfolioItem {
  id: string;
  division: Division;
  title: string;
  titleEn: string;
  client: string;
  category: string;
  categoryEn: string;
  year: string;
  description: string;
  descriptionEn: string;
  coverImage: string;
  images: string[];
  tags: string[];
  featured: boolean;
  published: boolean;
  ctaEnabled: boolean;
  ctaLabel: string;
  ctaLabelEn: string;
  ctaUrl: string;
  order: number;
}

export interface DivisionInfo {
  id: Division;
  name: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
  color: string;
  href: string;
}
