"use client";

import { useQuery } from "@tanstack/react-query";
import { Key, CheckCircle2, AlertCircle, Copy, Clock, Shield, Download as DownloadIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface License {
  id: string;
  key: string;
  plan: string;
  status: string;
  maxActivations: number;
  usedActivations: number;
  expiresAt: string | null;
  createdAt: string;
  purchase: { amount: number; createdAt: string } | null;
}

export default function LicensePage() {
  const { data: licenses, isLoading } = useQuery<License[]>({
    queryKey: ["licenses"],
    queryFn: () => fetch("/api/licenses").then((r) => r.json()),
  });

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("License key copied");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (!licenses || licenses.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">License</h2>
          <p className="text-muted-foreground">You don't have any active licenses</p>
        </div>
        <Card className="p-12 text-center">
          <Key className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No License Found</h3>
          <p className="text-sm text-muted-foreground mb-6">Purchase Nexova Trader to get your license key</p>
          <a href="/#pricing"><Button>View Pricing</Button></a>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">License Management</h2>
        <p className="text-muted-foreground">Manage your Nexova Trader licenses</p>
      </div>

      {licenses.map((license) => (
        <Card key={license.id} className={cn(
          "overflow-hidden",
          license.status === "active" ? "border-emerald-500/30" : "border-red-500/30"
        )}>
          <div className={cn(
            "h-1",
            license.status === "active" ? "bg-emerald-500" : "bg-red-500"
          )} />
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-10 w-10 rounded-xl flex items-center justify-center",
                  license.status === "active" ? "bg-emerald-500/10" : "bg-red-500/10"
                )}>
                  {license.status === "active" ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-lg">{license.plan} License</CardTitle>
                  <CardDescription>
                    Purchased on {new Date(license.purchase?.createdAt ?? license.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
              </div>
              <Badge variant={license.status === "active" ? "success" : "destructive"} className="capitalize">
                {license.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 rounded-xl bg-muted/50">
              <div>
                <p className="text-xs text-muted-foreground mb-1">License Key</p>
                <p className="text-sm sm:text-base font-mono font-bold tracking-wider">{license.key}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => copyKey(license.key)}>
                <Copy className="h-4 w-4 mr-2" /> Copy
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 rounded-xl bg-muted/30">
                <p className="text-xs text-muted-foreground">Plan</p>
                <p className="text-sm font-semibold mt-1">{license.plan}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/30">
                <p className="text-xs text-muted-foreground">Activations</p>
                <p className="text-sm font-semibold mt-1">{license.usedActivations} / {license.maxActivations}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/30">
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="text-sm font-semibold mt-1 capitalize">{license.status}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/30">
                <p className="text-xs text-muted-foreground">Expires</p>
                <p className="text-sm font-semibold mt-1">{license.expiresAt ? new Date(license.expiresAt).toLocaleDateString() : "Lifetime"}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Activation Usage</p>
              <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{ width: `${(license.usedActivations / license.maxActivations) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {license.maxActivations - license.usedActivations} activation{license.maxActivations - license.usedActivations !== 1 ? "s" : ""} remaining
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
