import { auth } from "@/auth";

export default async function ReaderHomePage() {
  const session = await auth();
  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-semibold text-slate-900">Reader workspace</h1>
      <p className="text-slate-600">
        Submit readings for your assigned meters and review your history. Validation and meter assignment enforcement happen on the server.
      </p>
      <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
        Signed in as {session?.user.email}
      </div>
    </section>
  );
}
