import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "AWSM GROUP — Creative & Technology Ecosystem",
  description:
    "AWSM GROUP adalah ekosistem bisnis kreatif dan teknologi yang menaungi AWSM Event Organizer, AWSM Digital Agency, dan AWSM Tech House.",
  keywords: [
    "AWSM Group",
    "Event Organizer",
    "Digital Agency",
    "Tech House",
    "Indonesia",
  ],
  openGraph: {
    title: "AWSM GROUP",
    description: "Creative & Technology Business Ecosystem",
    type: "website",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="antialiased bg-white text-black">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
