"use client";

import React from "react";
import { useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery, useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import UserAnalytics from "../Analytics/UserAnalytics";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";
import { HiOutlineUsers, HiOutlineShoppingBag, HiOutlineAcademicCap, HiOutlineChartBar } from "react-icons/hi2";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";

const StatCard = ({ label, value, caption, icon: Icon, tone = "violet" }: any) => (
  <article className={`admin-stat-card admin-stat-${tone}`}>
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="admin-muted text-sm font-medium">{label}</p>
        <p className="mt-3 text-3xl font-semibold tracking-tight admin-foreground">{value ?? "—"}</p>
        <p className="mt-2 text-xs admin-muted">{caption}</p>
      </div>
      <span className="admin-stat-icon"><Icon size={21} /></span>
    </div>
  </article>
);

const DashboardWidgets = () => {
  const { data: usersData, isLoading: usersLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } = useGetOrdersAnalyticsQuery({});
  const { data: coursesData, isLoading: coursesLoading } = useGetCoursesAnalyticsQuery({});

  const users = usersData?.users?.last12Months ?? [];
  const orders = ordersData?.orders?.last12Months ?? [];
  const courses = coursesData?.courses?.last12Months ?? [];
  const totalUsers = users.reduce((sum: number, item: any) => sum + Number(item.count || 0), 0);
  const totalOrders = orders.reduce((sum: number, item: any) => sum + Number(item.count || 0), 0);
  const totalCourses = courses.reduce((sum: number, item: any) => sum + Number(item.count || 0), 0);
  const percent = (items: any[]) => {
    if (items.length < 2) return null;
    const previous = Number(items[items.length - 2]?.count || 0);
    const current = Number(items[items.length - 1]?.count || 0);
    if (!previous) return current ? null : 0;
    return ((current - previous) / previous) * 100;
  };
  const userChange = percent(users);
  const orderChange = percent(orders);

  return (
    <main className="admin-dashboard space-y-7">
      <section className="admin-welcome-panel">
        <div className="relative z-10 max-w-2xl">
          <span className="admin-eyebrow">LEARNING PLATFORM OVERVIEW</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-white">Your learning ecosystem, at a glance.</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">Monitor platform activity, follow growth trends, and keep your courses and community moving forward.</p>
        </div>
        <div className="admin-welcome-orb" aria-hidden="true"><span /><span /><span /></div>
        <div className="admin-welcome-foot"><span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" /> Platform analytics</div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Users this year" value={usersLoading ? "…" : totalUsers.toLocaleString()} caption="Combined monthly registrations" icon={HiOutlineUsers} tone="violet" />
        <StatCard label="Orders this year" value={ordersLoading ? "…" : totalOrders.toLocaleString()} caption="Orders across the last 12 months" icon={HiOutlineShoppingBag} tone="coral" />
        <StatCard label="Courses added" value={coursesLoading ? "…" : totalCourses.toLocaleString()} caption="Monthly course additions" icon={HiOutlineAcademicCap} tone="blue" />
        <StatCard label="User growth" value={userChange === null ? "—" : `${userChange >= 0 ? "+" : ""}${userChange.toFixed(1)}%`} caption="Compared with the previous month" icon={HiOutlineChartBar} tone="green" />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.8fr)] gap-5">
        <div className="admin-panel min-w-0">
          <div className="admin-panel-heading">
            <div><span className="admin-eyebrow">GROWTH</span><h2 className="admin-panel-title">User activity</h2></div>
            <span className="admin-period-pill">Last 12 months</span>
          </div>
          <UserAnalytics isDashboard />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-5">
          <div className="admin-mini-panel">
            <div className="flex items-center justify-between">
              <span className="admin-muted text-sm">Monthly orders</span>
              <span className="admin-stat-icon admin-stat-coral"><HiOutlineShoppingBag size={19} /></span>
            </div>
            <div className="mt-4 flex items-end justify-between gap-3">
              <div><p className="text-3xl font-semibold admin-foreground">{ordersLoading ? "…" : orders[orders.length - 1]?.count ?? 0}</p><p className="mt-1 text-xs admin-muted">Latest month</p></div>
              {orderChange !== null && <span className={`admin-change ${orderChange >= 0 ? "positive" : "negative"}`}>{orderChange >= 0 ? <FiArrowUpRight /> : <FiArrowDownRight />}{Math.abs(orderChange).toFixed(1)}%</span>}
            </div>
            <div className="admin-sparkline" aria-hidden="true">{orders.slice(-8).map((item: any, index: number) => <span key={item.month || index} style={{ height: `${Math.max(12, Math.min(100, Number(item.count || 0) / Math.max(1, ...orders.map((v: any) => Number(v.count || 0))) * 100))}%` }} />)}</div>
          </div>
          <div className="admin-mini-panel">
            <div className="flex items-center justify-between">
              <span className="admin-muted text-sm">Platform pulse</span>
              <span className="admin-stat-icon admin-stat-green"><HiOutlineChartBar size={19} /></span>
            </div>
            <p className="mt-4 text-2xl font-semibold admin-foreground">{ordersLoading || usersLoading ? "Loading…" : (totalUsers + totalOrders).toLocaleString()}</p>
            <p className="mt-1 text-xs admin-muted">User registrations + orders in the selected period</p>
            <div className="mt-5 h-2 overflow-hidden rounded-full admin-progress-track"><div className="admin-progress-fill" style={{ width: totalUsers + totalOrders ? `${Math.max(8, totalOrders / (totalUsers + totalOrders) * 100)}%` : "0%" }} /></div>
            <p className="mt-2 text-[11px] admin-muted">Activity mix · based on available analytics</p>
          </div>
        </div>
      </section>

      <section className="admin-panel min-w-0">
        <div className="admin-panel-heading">
          <div><span className="admin-eyebrow">REVENUE ACTIVITY</span><h2 className="admin-panel-title">Order trends</h2></div>
          <span className="admin-period-pill">Last 12 months</span>
        </div>
        <OrdersAnalytics isDashboard />
      </section>

      <section className="admin-panel min-w-0">
        <div className="admin-panel-heading">
          <div><span className="admin-eyebrow">LATEST ACTIVITY</span><h2 className="admin-panel-title">Recent transactions</h2></div>
          <span className="admin-period-pill">Latest orders</span>
        </div>
        <AllInvoices isDashboard />
      </section>
    </main>
  );
};

export default DashboardWidgets;
