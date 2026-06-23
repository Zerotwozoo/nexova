"use client";

import { useState } from "react";
import { BookOpen, ChevronRight, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const docTitles = [
  "Getting Started",
  "Connecting Exchanges",
  "Strategy Configuration",
  "Backtesting",
  "Risk Management",
  "Performance Optimization",
  "License Activation",
];

const docContent: Record<string, string> = {
  "Getting Started":
    "Download Nexova Trader, run the EXE file, and enter your license key. The software requires Windows 10/11 64-bit and 8GB RAM. No installation needed — just double-click and trade.",
  "Connecting Exchanges":
    "Go to Settings > Exchange Manager. Select your exchange from the supported list (Binance, Bybit, Coinbase, Kraken, OKX, etc.). Enter your API key and secret. We recommend using a dedicated API key with trading permissions only.",
  "Strategy Configuration":
    "Navigate to Strategies tab. Choose from pre-built templates or create custom strategies using our visual editor. Set entry conditions, exit rules, position sizing, and risk parameters.",
  Backtesting:
    "Open the Backtesting panel. Select your strategy, choose the asset pair, set the date range (up to 10 years supported), and click Start. Results include win rate, profit factor, max drawdown, and Sharpe ratio.",
  "Risk Management":
    "Configure stop-loss, take-profit, and trailing stop parameters per position. Set maximum daily loss limits, position size constraints, and portfolio exposure limits in the Risk tab.",
  "Performance Optimization":
    "For optimal performance: run on SSD storage, close background applications, use wired internet connection. The software uses approximately 200MB RAM during normal operation.",
  "License Activation":
    "Your license key can be activated on up to 3 devices. To activate: Help > Activate License > Enter your key. Deactivate from the same menu before transferring to a new device.",
};

export default function DocumentationPage() {
  const [search, setSearch] = useState("");
  const [activeDoc, setActiveDoc] = useState(0);

  const filtered = docTitles.filter((t) =>
    t.toLowerCase().includes(search.toLowerCase())
  );

  const currentTitle = docTitles[activeDoc];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Documentation</h2>
        <p className="text-muted-foreground">
          Everything you need to know about using Nexova Trader
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search documentation..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        <Card className="h-fit">
          <CardContent className="p-3">
            <nav className="space-y-1">
              {filtered.map((title) => {
                const idx = docTitles.indexOf(title);
                return (
                  <button
                    key={title}
                    onClick={() => setActiveDoc(idx)}
                    className={cn(
                      "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-left transition-all",
                      activeDoc === idx
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium"
                        : "text-muted-foreground hover:bg-accent"
                    )}
                  >
                    <BookOpen className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{title}</span>
                    <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold">{currentTitle}</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {docContent[currentTitle]}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
