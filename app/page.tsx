import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  if (session?.user?.role === "ADMIN") {
    redirect("/dashboard/admin");
  }

  if (session?.user) {
    redirect("/dashboard/reader");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16">
        <div className="space-y-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-100">
            Meterflow
          </span>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Meter Reading Management System for secure field operations
          </h1>
          <p className="max-w-3xl text-lg text-slate-200/90">
            Admins manage meters, assignments, analytics, and exports. Field readers submit accurate, validated readings from the meters they are assigned.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-200"
            >
              Log in to dashboard
            </Link>
            <Link
              href="/dashboard/admin/analytics"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-white hover:bg-white/10"
            >
              View analytics layout
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
            <h2 className="text-lg font-semibold">RBAC-first security</h2>
            <p className="mt-2 text-sm text-slate-200/80">
              Auth.js v5 with bcrypt credential login, middleware-enforced roles, and server-side authorization on every API.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
            <h2 className="text-lg font-semibold">Operational analytics</h2>
            <p className="mt-2 text-sm text-slate-200/80">
              Meter-level trends, reader productivity, and exports to Excel built with server actions and Recharts.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
            <h2 className="text-lg font-semibold">Field-ready uploads</h2>
            <p className="mt-2 text-sm text-slate-200/80">
              Local-file upload abstraction ready for S3, profile images, and data validation for every reading.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
