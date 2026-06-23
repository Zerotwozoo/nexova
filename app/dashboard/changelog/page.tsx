"use client";

import { useQuery } from "@tanstack/react-query";
import { Clock, CheckCircle2, Sparkles, Bug, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  version: string;
  changelog: string | null;
  createdAt: string;
}

export default function ChangelogPage() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => fetch("/api/products").then((r) => r.json()),
  });

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Changelog</h2>
        <p className="text-muted-foreground">Every update to Nexova Trader, documented</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-40 rounded-xl" />)}
        </div>
      ) : (
        <div className="relative space-y-6">
          <div className="absolute left-[19px] top-10 bottom-10 w-px bg-border" />

          {products?.map((product, i) => (
            <div key={product.id} className="relative pl-12">
              <div className={cn(
                "absolute left-2.5 top-1.5 h-7 w-7 rounded-full border-2 flex items-center justify-center bg-background",
                i === 0 ? "border-emerald-500" : "border-muted-foreground/30"
              )}>
                <div className={cn(
                  "h-2.5 w-2.5 rounded-full",
                  i === 0 ? "bg-emerald-500" : "bg-muted-foreground/30"
                )} />
              </div>

              <Card className={cn(i === 0 && "border-emerald-500/30")}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge variant={i === 0 ? "premium" : "secondary"} className="text-sm px-3 py-1">
                        v{product.version}
                      </Badge>
                      {i === 0 && (
                        <Badge variant="success" className="text-[10px]">Latest</Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(product.createdAt).toLocaleDateString("en-US", {
                        year: "numeric", month: "long", day: "numeric"
                      })}
                    </span>
                  </div>
                  {product.changelog ? (
                    <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                      {product.changelog}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No changelog details available</p>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
