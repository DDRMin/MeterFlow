import { redirect } from "next/navigation";

import { auth, signIn } from "@/auth";

async function login(formData: FormData) {
  "use server";
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard/admin",
  });
}

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-white/10 bg-white/5 p-8 text-slate-50 shadow-xl">
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-200">Meterflow</p>
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="text-sm text-slate-200/80">Use the credentials provided by your administrator.</p>
        </div>
        <form action={login} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-slate-100">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white outline-none ring-0 transition focus:border-white/40"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-slate-100">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white outline-none ring-0 transition focus:border-white/40"
            />
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
