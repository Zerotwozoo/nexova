"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, DollarSign, Users, Download, Key, ShoppingCart, BarChart3, Activity, Loader2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface AdminStats {
  totalUsers: number;
  totalLicenses: number;
  totalDownloads: number;
  totalRevenue: number;
  usersThisMonth: number;
  licensesThisMonth: number;
  revenueThisMonth: number;
  downloads30d: number;
  recentPurchases: Array<{
    id: string;
    amount: number;
    plan: string;
    status: string;
    createdAt: string;
    user: { name: string | null; email: string };
  }>;
  licenseStats: Array<{ plan: string; _count: number }>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AdminDashboardPage() {
  const { data: stats, isLoading } = useQuery<AdminStats>({
    queryKey: ["admin-stats"],
    queryFn: () => fetch("/api/admin/stats").then((r) => r.json()),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3"><Skeleton className="h-8 w-48" /><Skeleton className="h-7 w-32 rounded-xl" /></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (<Skeleton key={i} className="h-28 rounded-xl" />))}
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const kpis = [
    { label: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, change: `+${((stats.revenueThisMonth / (stats.totalRevenue || 1)) * 100).toFixed(1)}%`, trend: "up" as const, icon: DollarSign },
    { label: "Licenses Sold", value: stats.totalLicenses.toLocaleString(), change: `+${stats.licensesThisMonth} this month`, trend: "up" as const, icon: Key },
    { label: "Active Users", value: stats.totalUsers.toLocaleString(), change: `+${stats.usersThisMonth} this month`, trend: "up" as const, icon: Users },
    { label: "Downloads (30d)", value: stats.downloads30d.toLocaleString(), change: `${((stats.downloads30d / (stats.totalDownloads || 1)) * 100).toFixed(0)}% of total`, trend: "up" as const, icon: Download },
    { label: "Avg Revenue/User", value: `$${(stats.totalRevenue / (stats.totalUsers || 1)).toFixed(2)}`, change: "lifetime", trend: "up" as const, icon: BarChart3 },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Sales Dashboard</h2>
            <p className="text-muted-foreground">
              Selamat datang, <span className="font-semibold text-foreground">Muhammad Al-Hafizi</span>
            </p>
          </div>
        </div>
        <Badge variant="premium" className="gap-1.5 px-3 py-1.5">
          <Activity className="h-3 w-3" />
          Owner Access
        </Badge>
      </div>

      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">{kpi.label}</CardTitle>
                <div className={cn("h-7 w-7 rounded-lg flex items-center justify-center", kpi.trend === "up" ? "bg-emerald-500/10" : "bg-red-500/10")}>
                  <Icon className={cn("h-3.5 w-3.5", kpi.trend === "up" ? "text-emerald-500" : "text-red-500")} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{kpi.value}</div>
                <p className={cn("mt-1 flex items-center text-xs font-medium", kpi.trend === "up" ? "text-emerald-500" : "text-red-500")}>
                  <TrendingUp className="mr-1 h-3 w-3" />{kpi.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Revenue Overview</CardTitle>
              <Badge variant="success">${stats.revenueThisMonth.toLocaleString()} this month</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[300px] text-muted-foreground text-sm">
                Revenue chart data available after more sales history
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>License Distribution</CardTitle>
              <Badge variant="success">{stats.totalLicenses} total</Badge>
            </CardHeader>
            <CardContent>
              {stats.licenseStats.length > 0 ? (
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.licenseStats.map((l) => ({ name: l.plan, sold: l._count }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                      <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(var(--border))", background: "hsl(var(--popover))" }} />
                      <Bar dataKey="sold" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground text-sm">No license data yet</div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader><CardTitle>Recent Purchases</CardTitle></CardHeader>
          <CardContent>
            {stats.recentPurchases.length > 0 ? (
              <div className="space-y-4">
                {stats.recentPurchases.map((purchase) => (
                  <div key={purchase.id} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {purchase.user.name?.[0] ?? purchase.user.email[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{purchase.user.name ?? "Unknown"}</p>
                        <p className="text-xs text-muted-foreground">{purchase.user.email}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <Badge variant="premium" className="text-[10px]">{purchase.plan}</Badge>
                      <p className="text-sm font-bold">${purchase.amount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{new Date(purchase.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground text-sm">No purchases yet</div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
