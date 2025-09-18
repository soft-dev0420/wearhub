export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/health`, { cache: "no-store" })
    .catch(() => null);
  const data = res ? await res.json() : { ok: false };
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">WearHub</h1>
      <p className="mt-4">API status: {data.ok ? "✅" : "❌"}</p>
    </main>
  );
}
