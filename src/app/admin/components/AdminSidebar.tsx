"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ImagePlus,
  LogOut,
  Megaphone,
  Globe,
  Cpu,
} from "lucide-react";

const navItems = [
  { href: "/admin/portfolio", label: "Semua Portofolio", icon: LayoutDashboard },
  { href: "/admin/portfolio/new", label: "Tambah Baru", icon: ImagePlus },
];

const divisionItems = [
  { href: "/admin/portfolio?division=event-organizer", label: "Event Organizer", icon: Megaphone },
  { href: "/admin/portfolio?division=digital-agency", label: "Digital Agency", icon: Globe },
  { href: "/admin/portfolio?division=tech-house", label: "Tech House", icon: Cpu },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside className="w-64 min-h-screen bg-black flex flex-col shrink-0">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-white/10">
        <Link href="/admin/portfolio">
          <h1 className="text-lg font-bold text-white tracking-tight">
            AWSM <span className="font-light">Admin</span>
          </h1>
          <p className="text-xs text-white/30 mt-0.5">Content Management</p>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        <p className="px-3 text-[10px] font-semibold tracking-widest text-white/30 uppercase mb-3">
          Navigasi
        </p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href.split("?")[0] && !href.includes("?");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}

        <p className="px-3 text-[10px] font-semibold tracking-widest text-white/30 uppercase mt-6 mb-3">
          Per Divisi
        </p>
        {divisionItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}

        <p className="px-3 text-[10px] font-semibold tracking-widest text-white/30 uppercase mt-6 mb-3">
          Website
        </p>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all"
        >
          <Globe size={16} />
          Lihat Website
        </Link>
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={16} />
          Keluar
        </button>
      </div>
    </aside>
  );
}
