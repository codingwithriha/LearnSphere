"use client";

import React from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import Loader from "../../Loader/Loader";

type Props = { isDashboard?: boolean };

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return <div className="admin-chart-tooltip"><p className="text-xs admin-muted">{label}</p><p className="mt-1 text-sm font-semibold admin-foreground">{Number(payload[0].value).toLocaleString()} orders</p></div>;
};

export default function OrdersAnalytics({ isDashboard }: Props) {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});
  const analyticsData = (data?.orders?.last12Months ?? []).map((item: any) => ({ name: item.name || item.month, Count: Number(item.count || 0) }));

  if (isLoading) return <div className="admin-chart-loading"><Loader /></div>;

  return (
    <section className={isDashboard ? "admin-chart-wrap admin-chart-dashboard" : "admin-analytics-page"}>
      {!isDashboard && <div className="admin-analytics-heading"><span className="admin-eyebrow">COMMERCE PERFORMANCE</span><h1 className="admin-page-title">Orders analytics</h1><p className="admin-muted mt-2">Order activity across the last 12 months.</p></div>}
      <div className={isDashboard ? "h-[290px] w-full" : "h-[440px] w-full"}>
        {analyticsData.length ? <ResponsiveContainer width="100%" height="100%">
          <LineChart data={analyticsData} margin={{ top: 18, right: 18, left: -18, bottom: 0 }}>
            <CartesianGrid stroke="var(--admin-chart-grid)" strokeDasharray="4 6" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "var(--admin-chart-text)", fontSize: 11 }} dy={10} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--admin-chart-text)", fontSize: 11 }} width={42} />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#ff8a70", strokeDasharray: "4 4" }} />
            <Line type="monotone" dataKey="Count" stroke="#ff8a70" strokeWidth={3} dot={{ r: 3, fill: "#ff8a70", strokeWidth: 0 }} activeDot={{ r: 7, fill: "#ff8a70", stroke: "var(--admin-panel-bg)", strokeWidth: 3 }} isAnimationActive animationDuration={1500} animationEasing="ease-out" />
          </LineChart>
        </ResponsiveContainer> : <div className="admin-empty-chart">No order analytics are available yet.</div>}
      </div>
    </section>
  );
}
