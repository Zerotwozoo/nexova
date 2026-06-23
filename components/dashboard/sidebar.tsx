"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  ListChecks,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  Shield,
  BarChart3,
  Users,
  Download,
  Key,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/downloads", label: "Downloads", icon: Download },
  { href: "/dashboard/license", label: "License", icon: Key },
  { href: "/dashboard/documentation", label: "Documentation", icon: FileText },
  { href: "/dashboard/changelog", label: "Changelog", icon: ListChecks },
  { href: "/dashboard/support", label: "Support", icon: Calendar },
];

const bottomItems = [
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        layout
        className={cn(
          "fixed left-0 top-0 z-30 flex h-screen flex-col border-r bg-sidebar transition-all duration-300",
          collapsed ? "w-[72px]" : "w-[240px]"
        )}
      >
        <div className={cn(
          "flex h-16 items-center border-b px-4",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 text-white text-sm font-bold">
                A
              </div>
              <span className="text-sm">Nexova</span>
            </Link>
          )}
          {collapsed && (
            <Link href="/dashboard" className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 text-white text-sm font-bold">
              A
            </Link>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return collapsed ? (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex h-10 w-full items-center justify-center rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="flex-1 truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-3 space-y-1">
          {!collapsed && (
            <div className="px-3 py-1.5">
              <div className="flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Admin</span>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="flex justify-center py-1">
              <div className="h-px w-6 bg-border" />
            </div>
          )}

          {[
            { href: "/dashboard/admin", label: "Analytics", icon: BarChart3, admin: true, collapsed },
            { href: "/dashboard/admin/users", label: "Users", icon: Users, admin: true, collapsed },
          ].map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return collapsed ? (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex h-10 w-full items-center justify-center rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-amber-500/10 text-amber-500"
                        : "text-muted-foreground hover:bg-amber-500/5 hover:text-amber-500"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-amber-500/10 text-amber-500"
                    : "text-muted-foreground hover:bg-amber-500/5 hover:text-amber-500"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="flex-1 truncate">{item.label}</span>
              </Link>
            );
          })}

          <div className="py-1">
            <div className="h-px bg-border" />
          </div>

          {bottomItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return collapsed ? (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex h-10 w-full items-center justify-center rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="flex-1 truncate">{item.label}</span>
              </Link>
            );
          })}

          {!collapsed && (
            <div className="pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-3 text-muted-foreground"
                onClick={() => setCollapsed(true)}
              >
                <ChevronLeft className="h-4 w-4" />
                Collapse
              </Button>
            </div>
          )}
        </div>

        {collapsed && (
          <div className="border-t p-3 flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
              onClick={() => setCollapsed(false)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </motion.aside>
    </TooltipProvider>
  );
}
