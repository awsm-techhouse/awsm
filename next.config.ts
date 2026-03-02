import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "@libsql/client", "libsql"],
};

export default nextConfig;
