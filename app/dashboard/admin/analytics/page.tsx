import { Suspense } from "react";
import { getReadingsAnalytics } from "@/lib/analytics";
import { ReadingLineChart } from "@/components/charts";

export default async function AdminAnalyticsPage() {
  const analytics = await getReadingsAnalytics({ dateRange: "month" });

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Analytics Dashboard</h1>
        <a
          href="/api/export"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Export to Excel
        </a>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Readings</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{analytics.totalReadings}</p>
          <p className="mt-1 text-xs text-slate-500">
            {analytics.dateRange.from.toLocaleDateString()} - {analytics.dateRange.to.toLocaleDateString()}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Active Meters</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{analytics.readingsByMeter.length}</p>
          <p className="mt-1 text-xs text-slate-500">With readings this period</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Active Readers</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{analytics.readerPerformance.length}</p>
          <p className="mt-1 text-xs text-slate-500">Submitted readings</p>
        </div>
      </div>

      {/* Daily Trend Chart */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Readings Over Time</h2>
        <Suspense fallback={<div className="h-[300px] animate-pulse bg-slate-100" />}>
          <ReadingLineChart
            data={analytics.readingsByDay.map((d) => ({
              date: d.date,
              value: d.count,
            }))}
          />
        </Suspense>
      </div>

      {/* Meter Performance */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Readings by Meter</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
              <tr>
                <th className="pb-3 pr-4">Meter Code</th>
                <th className="pb-3 pr-4">Location</th>
                <th className="pb-3 pr-4">Readings</th>
                <th className="pb-3 pr-4">Avg Reading</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {analytics.readingsByMeter.map((meter) => (
                <tr key={meter.meterId} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 font-medium text-slate-900">{meter.meterCode}</td>
                  <td className="py-3 pr-4 text-slate-600">{meter.location}</td>
                  <td className="py-3 pr-4 text-slate-900">{meter.count}</td>
                  <td className="py-3 pr-4 text-slate-900">
                    {meter.avgReading ? Number(meter.avgReading).toFixed(2) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reader Performance */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Reader Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
              <tr>
                <th className="pb-3 pr-4">Reader Name</th>
                <th className="pb-3 pr-4">Email</th>
                <th className="pb-3 pr-4">Readings Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {analytics.readerPerformance.map((reader) => (
                <tr key={reader.userId} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 font-medium text-slate-900">{reader.userName}</td>
                  <td className="py-3 pr-4 text-slate-600">{reader.userEmail}</td>
                  <td className="py-3 pr-4 text-slate-900">{reader.readingsCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
