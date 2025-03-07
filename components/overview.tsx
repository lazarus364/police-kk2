"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 42,
  },
  {
    name: "Feb",
    total: 38,
  },
  {
    name: "Mar",
    total: 49,
  },
  {
    name: "Apr",
    total: 53,
  },
  {
    name: "May",
    total: 47,
  },
  {
    name: "Jun",
    total: 65,
  },
  {
    name: "Jul",
    total: 71,
  },
  {
    name: "Aug",
    total: 58,
  },
  {
    name: "Sep",
    total: 54,
  },
  {
    name: "Oct",
    total: 63,
  },
  {
    name: "Nov",
    total: 60,
  },
  {
    name: "Dec",
    total: 47,
  },
]

export function Overview() {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Case Overview</h3>
          <div className="text-sm text-muted-foreground">Monthly case volume</div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

