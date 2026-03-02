import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AWSM Admin Panel",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-zinc-50">{children}</div>;
}
