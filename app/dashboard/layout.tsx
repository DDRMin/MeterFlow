import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Meterflow</span>
            <span className="text-xs text-slate-500">{session.user.email}</span>
          </div>
          <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
            <Link href="/dashboard/admin" className="hover:text-slate-900">
              Admin
            </Link>
            <Link href="/dashboard/reader" className="hover:text-slate-900">
              Reader
            </Link>
            <Link href="/profile" className="hover:text-slate-900">
              Profile
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
