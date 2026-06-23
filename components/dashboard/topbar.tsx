"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Moon, Sun, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

const routeLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/ai-assistant": "AI Assistant",
  "/dashboard/notes": "Notes",
  "/dashboard/tasks": "Tasks",
  "/dashboard/calendar": "Calendar",
  "/dashboard/finance": "Finance",
  "/dashboard/trading-journal": "Trading Journal",
  "/dashboard/news": "News",
  "/dashboard/documents": "Documents",
  "/dashboard/settings": "Settings",
  "/dashboard/profile": "Profile",
};

export function DashboardTopbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { userId } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const pageTitle = routeLabels[pathname] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-xl px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[240px]">
            <DashboardSidebar />
          </SheetContent>
        </Sheet>

        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h1 className="text-lg font-semibold">{pageTitle}</h1>
        </motion.div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center rounded-xl bg-muted px-3 py-1.5 text-sm text-muted-foreground gap-2">
          <Search className="h-4 w-4" />
          <span className="text-xs">Search...</span>
          <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </div>

        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        )}

        {userId && (
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-9 w-9 rounded-xl",
                userButtonPopoverCard: "rounded-xl shadow-lg border",
                userButtonPopoverActionItem: "rounded-lg",
              },
            }}
          />
        )}
      </div>
    </header>
  );
}
