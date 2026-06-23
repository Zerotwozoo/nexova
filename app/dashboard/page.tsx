"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Download, Key, CheckCircle2, Monitor, Clock, Shield, FileCode, ExternalLink, Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  version: string;
  description: string;
  fileName: string;
  fileSize: number;
  fileUrl: string;
  os: string;
  changelog: string | null;
  createdAt: string;
}

interface License {
  id: string;
  key: string;
  plan: string;
  status: string;
  maxActivations: number;
  usedActivations: number;
  expiresAt: string | null;
  purchase: { amount: number } | null;
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><Skeleton className="h-8 w-64" /><Skeleton className="h-4 w-48 mt-2" /></div>
        <Skeleton className="h-7 w-32 rounded-xl" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (<Skeleton key={i} className="h-28 rounded-xl" />))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user: clerkUser, isLoaded: clerkLoaded } = useUser();
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (clerkLoaded && clerkUser && !synced) {
      fetch("/api/users/sync", { method: "POST" }).catch(console.error);
      setSynced(true);
    }
  }, [clerkLoaded, clerkUser, synced]);

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => fetch("/api/products").then((r) => r.json()),
    enabled: synced,
  });

  const { data: licenses, isLoading: licensesLoading } = useQuery<License[]>({
    queryKey: ["licenses"],
    queryFn: () => fetch("/api/licenses").then((r) => r.json()),
    enabled: synced,
  });

  if (!clerkLoaded || (clerkLoaded && !synced) || productsLoading || licensesLoading) {
    return <DashboardSkeleton />;
  }

  const activeLicense = licenses?.[0];
  const latestProduct = products?.[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome back{clerkUser?.firstName ? `, ${clerkUser.firstName}` : ""}
          </h2>
          <p className="text-muted-foreground">Your Nexova Trader download portal</p>
        </div>
        {activeLicense && (
          <Badge variant="premium" className="gap-1.5 px-3 py-1.5">
            <Shield className="h-3 w-3" />
            {activeLicense.plan} License
          </Badge>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border-emerald-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">License Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span className="text-lg font-bold text-emerald-500 capitalize">
                {activeLicense?.status ?? "No License"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {activeLicense?.expiresAt ? `Expires: ${new Date(activeLicense.expiresAt).toLocaleDateString()}` : "Lifetime"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">License Key</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-mono font-bold tracking-wider">
              {activeLicense?.key ?? "—"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {activeLicense ? "Click to copy" : "Purchase to get a license"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Activations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold">
              {activeLicense ? `${activeLicense.usedActivations} / ${activeLicense.maxActivations}` : "—"}
            </p>
            {activeLicense && (
              <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{ width: `${(activeLicense.usedActivations / activeLicense.maxActivations) * 100}%` }}
                />
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Latest Version</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold">{latestProduct?.version ?? "—"}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {latestProduct ? `Released ${new Date(latestProduct.createdAt).toLocaleDateString()}` : ""}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-4 w-4 text-emerald-500" />
              Download Nexova Trader
            </CardTitle>
            <CardDescription>
              {activeLicense ? "Choose your version and download" : "Purchase a license to unlock downloads"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {products && products.length > 0 ? products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className={cn("transition-all hover:shadow-md", i === 0 && "border-emerald-500/50")}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", i === 0 ? "bg-emerald-500/10" : "bg-muted")}>
                          <FileCode className={cn("h-5 w-5", i === 0 ? "text-emerald-500" : "text-muted-foreground")} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">{product.name} v{product.version}</p>
                            {i === 0 && <Badge variant="premium" className="text-[10px] px-1.5 py-0">Latest</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{product.description}</p>
                          <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground">
                            <span className="flex items-center gap-1"><Monitor className="h-3 w-3" />{product.os}</span>
                            <span>{(product.fileSize / 1024 / 1024).toFixed(1)} MB</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="shrink-0 gap-1.5"
                        disabled={!activeLicense}
                        onClick={() => {
                          toast.success(`Downloading ${product.name} v${product.version}`);
                          fetch("/api/downloads/record", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ productId: product.id, version: product.version }),
                          }).catch(console.error);
                        }}
                      >
                        <Download className="h-3.5 w-3.5" />
                        {activeLicense ? "Download" : "Locked"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )) : (
              <div className="text-center py-12 text-muted-foreground text-sm">
                No products available yet. Check back soon.
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          {latestProduct?.changelog && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Latest Changes — v{latestProduct.version}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground whitespace-pre-line">
                  {latestProduct.changelog}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-amber-500/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0">
                  <ExternalLink className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">{activeLicense ? "Need help?" : "Ready to get started?"}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activeLicense
                      ? "Check out the documentation or contact support."
                      : "Purchase a license to download Nexova Trader and start trading."
                    }
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => window.location.href = activeLicense ? "/dashboard/documentation" : "/#pricing"}
                  >
                    {activeLicense ? "View Docs" : "View Pricing"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {activeLicense && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Key className="h-4 w-4 text-muted-foreground" />
              Quick Start Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { step: "1", title: "Download", desc: "Download the EXE file from the panel above" },
                { step: "2", title: "Run", desc: "Double-click to run — no installation needed" },
                { step: "3", title: "Activate", desc: "Enter your license key and start trading" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-sm font-bold shrink-0">{item.step}</div>
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
