"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Search, Shield, UserCheck, UserX, Mail, Calendar, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface AdminUser {
  id: string;
  name: string | null;
  email: string;
  role: string;
  image: string | null;
  createdAt: string;
  _count: { licenses: number; downloads: number; purchases: number };
  licenses: Array<{ plan: string; status: string }>;
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const { data: users, isLoading } = useQuery<AdminUser[]>({
    queryKey: ["admin-users"],
    queryFn: () => fetch("/api/users").then((r) => r.json()),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (<Skeleton key={i} className="h-20 rounded-xl" />))}
        </div>
      </div>
    );
  }

  const filtered = (users ?? []).filter((u) => {
    const matchesSearch = (u.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const stats = [
    { label: "Total Users", value: users?.length ?? 0, icon: UserCheck },
    { label: "Admins", value: users?.filter((u) => u.role === "ADMIN").length ?? 0, icon: Shield, color: "text-amber-500" },
    { label: "With Licenses", value: users?.filter((u) => u.licenses.length > 0).length ?? 0, icon: Shield, color: "text-emerald-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">Manage all Nexova Trader users</p>
        </div>
        <Badge variant="premium" className="gap-1.5"><Shield className="h-3 w-3" />Admin Access</Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center bg-primary/5")}>
                  <Icon className={cn("h-4 w-4", stat.color || "text-primary")} />
                </div>
                <div>
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="USER">User</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          {filtered.length > 0 ? (
            <div className="divide-y">
              {filtered.map((user) => (
                <motion.div key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <Avatar className="h-10 w-10 rounded-xl shrink-0">
                      <AvatarFallback className={cn("rounded-xl text-xs font-medium", user.role === "ADMIN" ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white" : "bg-muted text-muted-foreground")}>
                        {(user.name ?? user.email)[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate flex items-center gap-2">
                        {user.name ?? "Unnamed"}
                        {user.role === "ADMIN" && <Shield className="h-3 w-3 text-amber-500" />}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{user.email}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(user.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mr-4">
                    <div className="text-center"><p className="font-medium text-foreground">{user._count.licenses}</p><p>Licenses</p></div>
                    <div className="text-center"><p className="font-medium text-foreground">{user._count.downloads}</p><p>Downloads</p></div>
                    <div className="text-center"><p className="font-medium text-foreground">{user._count.purchases}</p><p>Purchases</p></div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={user.role === "ADMIN" ? "premium" : "secondary"} className="text-[10px] capitalize">{user.role.toLowerCase()}</Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground text-sm">No users found</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
