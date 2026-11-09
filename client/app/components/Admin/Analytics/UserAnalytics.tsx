"use client";

import React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import Loader from "../../Loader/Loader";

type Props = { isDashboard?: boolean };

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return <div className="admin-chart-tooltip"><p className="text-xs admin-muted">{label}</p><p className="mt-1 text-sm font-semibold admin-foreground">{Number(payload[0].value).toLocaleString()} users</p></div>;
};

const UserAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const analyticsData = (data?.users?.last12Months ?? []).map((item: any) => ({ name: item.month, count: Number(item.count || 0) }));

  if (isLoading) return <div className="admin-chart-loading"><Loader /></div>;

  return (
    <section className={isDashboard ? "admin-chart-wrap admin-chart-dashboard" : "admin-analytics-page"}>
      {!isDashboard && <div className="admin-analytics-heading"><span className="admin-eyebrow">PLATFORM PERFORMANCE</span><h1 className="admin-page-title">Users analytics</h1><p className="admin-muted mt-2">Registration activity across the last 12 months.</p></div>}
      <div className="h-[300px] w-full">
        {analyticsData.length ? <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={analyticsData} margin={{ top: 14, right: 18, left: -18, bottom: 0 }}>
            <defs><linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9b70ff" stopOpacity={0.32} /><stop offset="95%" stopColor="#9b70ff" stopOpacity={0.015} /></linearGradient></defs>
            <CartesianGrid stroke="var(--admin-chart-grid)" strokeDasharray="4 6" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "var(--admin-chart-text)", fontSize: 11 }} dy={10} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--admin-chart-text)", fontSize: 11 }} width={42} />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#9b70ff", strokeDasharray: "4 4" }} />
            <Area type="monotone" dataKey="count" stroke="#9b70ff" strokeWidth={3} fill="url(#usersGradient)" activeDot={{ r: 6, strokeWidth: 0, fill: "#9b70ff" }} isAnimationActive animationDuration={1400} animationEasing="ease-out" />
          </AreaChart>
        </ResponsiveContainer> : <div className="admin-empty-chart">No user analytics are available yet.</div>}
      </div>
    </section>
  );
};

export default UserAnalytics;
