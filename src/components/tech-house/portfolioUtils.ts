import { PortfolioItem } from "@/types";

export type PortfolioFilter =
  | "all"
  | "website-software"
  | "business-systems"
  | "automation"
  | "ai-data"
  | "iot";

const iotKeywords = ["iot", "sensor", "arduino", "esp32", "mqtt", "device"];
const aiDataKeywords = [
  "ai",
  "machine learning",
  "ml",
  "chatbot",
  "llm",
  "data",
  "analytics",
  "prediction",
  "forecast",
];
const automationKeywords = [
  "automation",
  "workflow",
  "notifikasi",
  "notification",
  "scheduled",
  "approval",
  "integrasi",
  "integration",
  "api",
];
const businessSystemKeywords = [
  "inventory",
  "crm",
  "erp",
  "dashboard",
  "management",
  "report",
  "booking",
  "internal",
  "sistem",
  "system",
];

function hasAnyKeyword(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

export function getPortfolioBucket(item: PortfolioItem): PortfolioFilter {
  const text = [
    item.title,
    item.titleEn,
    item.category,
    item.categoryEn,
    item.description,
    item.descriptionEn,
    ...item.tags,
  ]
    .join(" ")
    .toLowerCase();

  if (hasAnyKeyword(text, iotKeywords)) return "iot";
  if (hasAnyKeyword(text, aiDataKeywords)) return "ai-data";
  if (hasAnyKeyword(text, automationKeywords)) return "automation";
  if (hasAnyKeyword(text, businessSystemKeywords)) return "business-systems";
  return "website-software";
}

export function getPortfolioNeedLine(item: PortfolioItem) {
  return `Kami membantu ${item.client} pada kebutuhan ${item.category.toLowerCase()}.`;
}

export function getPortfolioSolutionLine(item: PortfolioItem) {
  const firstSentence = item.description.split(".")[0].trim();
  if (!firstSentence) return `Solusi yang dibangun: ${item.category}.`;
  return `Solusi yang dibuat: ${firstSentence}.`;
}
