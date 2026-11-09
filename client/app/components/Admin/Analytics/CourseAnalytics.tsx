"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import Loader from "../../Loader/Loader";

const palette = ["#9b70ff", "#ff8a70", "#5b9dff", "#40c9a2", "#e9b65b", "#bd8cff"];

const CourseAnalytics = () => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});
  const analyticsData = (data?.courses?.last12Months ?? []).map((item: any) => ({ name: item.month, courses: Number(item.count || 0) }));

  if (isLoading) return <div className="admin-chart-loading"><Loader /></div>;

  return (
    <main className="admin-analytics-page">
      <div className="admin-analytics-heading"><span className="admin-eyebrow">CONTENT PERFORMANCE</span><h1 className="admin-page-title">Courses analytics</h1><p className="admin-muted mt-2">New course activity across the last 12 months.</p></div>
      <div className="admin-panel p-5 md:p-7">
        <div className="admin-panel-heading"><div><h2 className="admin-panel-title">Course creation trend</h2><p className="admin-muted mt-1 text-xs">Monthly course additions</p></div><span className="admin-period-pill">12 months</span></div>
        <div className="h-[420px] w-full">
          {analyticsData.length ? <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analyticsData} margin={{ top: 20, right: 12, left: -18, bottom: 0 }} barCategoryGap="30%">
              <CartesianGrid stroke="var(--admin-chart-grid)" strokeDasharray="4 6" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "var(--admin-chart-text)", fontSize: 11 }} dy={10} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: "var(--admin-chart-text)", fontSize: 11 }} width={42} />
              <Tooltip cursor={{ fill: "rgba(155,112,255,.08)" }} contentStyle={{ background: "var(--admin-tooltip-bg)", border: "1px solid var(--admin-panel-border)", borderRadius: 14, boxShadow: "0 12px 30px rgba(20,12,45,.12)" }} labelStyle={{ color: "var(--admin-chart-text)" }} />
              <Bar dataKey="courses" radius={[8, 8, 3, 3]} maxBarSize={38} isAnimationActive animationDuration={1300}>
                {analyticsData.map((entry: any, index: number) => <Cell key={entry.name || index} fill={palette[index % palette.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer> : <div className="admin-empty-chart">No course analytics are available yet.</div>}
        </div>
      </div>
    </main>
  );
};

export default CourseAnalytics;
