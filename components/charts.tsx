"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ReadingChartProps {
  data: Array<{
    date: Date | string;
    value: number;
    delta?: number;
  }>;
}

export function ReadingLineChart({ data }: ReadingChartProps) {
  const chartData = data.map((item) => ({
    date: typeof item.date === "string" ? item.date : item.date.toLocaleDateString(),
    value: item.value,
    delta: item.delta || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
        <YAxis stroke="#64748b" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#0ea5e9"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          name="Reading Value"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

interface ConsumptionChartProps {
  data: Array<{
    date: Date | string;
    delta: number;
  }>;
}

export function ConsumptionBarChart({ data }: ConsumptionChartProps) {
  const chartData = data.map((item) => ({
    date: typeof item.date === "string" ? item.date : item.date.toLocaleDateString(),
    consumption: item.delta,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
        <YAxis stroke="#64748b" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="consumption"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ r: 4 }}
          name="Consumption Delta"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
