"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Download,
  TrendingUp,
  BarChart3,
  Zap,
  Shield,
  LineChart,
  Cpu,
  Star,
  Menu,
  X,
  Moon,
  Sun,
  Activity,
  Timer,
  Gauge,
  CandlestickChart,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const features = [
  { icon: CandlestickChart, title: "Real-Time Analysis", description: "Advanced chart patterns, support/resistance detection, and market structure analysis in real-time.", gradient: "from-blue-500 to-cyan-500" },
  { icon: Zap, title: "Ultra-Fast Execution", description: "Sub-millisecond order execution engine optimized for high-frequency trading strategies.", gradient: "from-purple-500 to-pink-500" },
  { icon: BarChart3, title: "Backtesting Engine", description: "Test your strategies against 10+ years of historical data with detailed performance analytics.", gradient: "from-amber-500 to-orange-500" },
  { icon: Gauge, title: "Risk Management", description: "Built-in position sizing, stop-loss optimization, and portfolio risk assessment tools.", gradient: "from-emerald-500 to-teal-500" },
  { icon: LineChart, title: "Multi-Exchange Support", description: "Connect to Binance, Bybit, Coinbase, and 20+ other exchanges simultaneously.", gradient: "from-indigo-500 to-violet-500" },
  { icon: Cpu, title: "Low-Latency Architecture", description: "Written in C++ with FPGA support for the absolute lowest possible latency.", gradient: "from-rose-500 to-red-500" },
  { icon: Activity, title: "Real-Time Alerts", description: "Customizable alerts via Telegram, Discord, email, or SMS for any market condition.", gradient: "from-sky-500 to-blue-500" },
  { icon: Shield, title: "Enterprise Security", description: "256-bit encryption, hardware security keys, and secure enclave for API credentials.", gradient: "from-fuchsia-500 to-purple-500" },
];

const testimonials = [
  { name: "Alexandre Moreau", role: "Prop Trader, London", avatar: "AM", content: "I've been using Nexova Trader for 6 months. My win rate went from 62% to 81%. The backtesting engine is a game-changer." },
  { name: "Jessica Tanaka", role: "Quant Developer, Tokyo", avatar: "JT", content: "The low-latency architecture is incredible. I'm seeing execution times under 50 microseconds on Binance futures." },
  { name: "Marcus Williams", role: "Retail Trader, Sydney", avatar: "MW", content: "Best $299 I've ever spent on trading software. The support team is also incredibly responsive and helpful." },
];

const pricingPlans = [
  { name: "Standard", price: "$299", period: "/lifetime", description: "Perfect for retail traders", features: ["Full trading engine access", "Real-time market analysis", "Basic backtesting", "3 exchange connections", "Email support", "1-year updates"], cta: "Buy Now", popular: false },
  { name: "Professional", price: "$599", period: "/lifetime", description: "For serious active traders", features: ["Everything in Standard", "Advanced backtesting suite", "Unlimited exchange connections", "Custom indicator builder", "Discord priority support", "Lifetime updates", "API access"], cta: "Buy Now", popular: true },
  { name: "Enterprise", price: "$1,999", period: "/year", description: "For trading firms & funds", features: ["Everything in Professional", "White-label solution", "Dedicated server setup", "Custom strategy development", "24/7 phone support", "SLA guarantee", "Team training session"], cta: "Contact Sales", popular: false },
];

const faqs = [
  { question: "Is Nexova Trader compatible with my broker?", answer: "Nexova Trader supports all major exchanges including Binance, Bybit, Coinbase, Kraken, OKX, and 20+ more through our universal API connector. We also support MetaTrader 4/5 and cTrader bridges." },
  { question: "Do I need programming experience to use it?", answer: "Not at all! While we offer advanced scripting for custom strategies, the pre-built indicators and strategy templates can be used entirely through the graphical interface. Most users never write a single line of code." },
  { question: "What are the system requirements?", answer: "Windows 10/11 (64-bit), 8GB RAM, 500MB storage. For optimal performance, we recommend an SSD and a multi-core processor. The software is a single portable EXE file — no installation required." },
  { question: "Can I get a refund if it doesn't work for me?", answer: "Yes! We offer a 14-day money-back guarantee. If you're not satisfied with Nexova Trader for any reason, contact our support team within 14 days of purchase for a full refund." },
  { question: "How are updates delivered?", answer: "Updates are delivered automatically through the built-in updater. Standard plan includes 1 year of updates, Professional includes lifetime updates. You'll be notified when a new version is available." },
  { question: "Is my trading data secure?", answer: "Absolutely. Nexova Trader runs entirely on your machine. Your API keys are stored in a hardware-encrypted secure enclave. We never have access to your exchange accounts or trading capital." },
];

export default function LandingPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);

  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen">
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-transparent"
        style={{
          backgroundColor: useTransform(bgOpacity, (v) => `hsl(var(--background) / ${v})`),
          borderColor: useTransform(scrollY, [0, 100], ["transparent", "hsl(var(--border))"]),
        }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 text-white text-sm font-bold">NT</div>
            <span className="hidden sm:inline">Nexova <span className="text-muted-foreground font-normal">Trader</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</Link>
            <Link href="#faq" className="hover:text-foreground transition-colors">FAQ</Link>
            <Link href="#download" className="hover:text-foreground transition-colors">Download</Link>
          </div>
          <div className="flex items-center gap-3">
            {mounted && (
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="text-muted-foreground">
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}
            <Link href="/auth/login"><Button variant="ghost" size="sm">My Account</Button></Link>
            <Link href="#pricing"><Button size="sm" className="hidden sm:inline-flex">Purchase<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="border-t bg-background md:hidden overflow-hidden">
              <div className="flex flex-col p-4 gap-2">
                <Link href="#features" className="px-3 py-2 rounded-xl hover:bg-accent text-sm" onClick={() => setOpen(false)}>Features</Link>
                <Link href="#pricing" className="px-3 py-2 rounded-xl hover:bg-accent text-sm" onClick={() => setOpen(false)}>Pricing</Link>
                <Link href="#testimonials" className="px-3 py-2 rounded-xl hover:bg-accent text-sm" onClick={() => setOpen(false)}>Testimonials</Link>
                <Link href="#faq" className="px-3 py-2 rounded-xl hover:bg-accent text-sm" onClick={() => setOpen(false)}>FAQ</Link>
                <Separator className="my-2" />
                <Link href="/auth/login" onClick={() => setOpen(false)}><Button variant="ghost" className="w-full justify-start">My Account</Button></Link>
                <Link href="#pricing" onClick={() => setOpen(false)}><Button className="w-full">Purchase Now</Button></Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-green-500/5 to-teal-500/5 dark:from-emerald-500/10 dark:via-green-500/10 dark:to-teal-500/10" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/20 rounded-full blur-[128px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[128px] animate-float" style={{ animationDelay: "-3s" }} />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="premium" className="mb-6 px-4 py-1.5 text-sm gap-1.5">
              <Zap className="h-3.5 w-3.5" />
              Used by 2,400+ traders worldwide
            </Badge>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            The Ultimate{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 bg-clip-text text-transparent">Trading Executable</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            One portable EXE. Zero dependencies. Unlimited potential. Nexova Trader is the most advanced Windows-based trading platform — combining institutional-grade analytics with retail-friendly pricing.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#pricing"><Button size="lg" className="text-base h-12 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/25">Purchase Nexova Trader <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
            <Link href="#features"><Button variant="outline" size="lg" className="text-base h-12 px-8">See All Features</Button></Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="mt-16 relative">
            <div className="relative mx-auto max-w-5xl rounded-2xl border bg-card shadow-2xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-3 rounded-xl bg-background/10 backdrop-blur-sm border border-white/10 px-5 py-2.5">
                    <div className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-mono text-white/80">Nexova Trader v3.2 — Live Market</span>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-2 w-16 rounded-full bg-emerald-500/50" />
                    <div className="h-2 w-24 rounded-full bg-red-500/30" />
                    <div className="h-2 w-20 rounded-full bg-emerald-500/50" />
                    <div className="h-2 w-12 rounded-full bg-emerald-500/50" />
                  </div>
                  <p className="text-xs text-white/40 font-mono mt-4">BTC/USD · ETH/USD · SOL/USD · AVAX/USD</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Built for the modern trader</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Everything you need to analyze, execute, and manage your trades — all in a single 8MB EXE file.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <CardHeader>
                      <div className={cn("h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center mb-2 transition-transform group-hover:scale-110", feature.gradient)}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-base">{feature.title}</CardTitle>
                      <CardDescription className="text-sm">{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DOWNLOAD SECTION */}
      <section id="download" className="py-24 sm:py-32 bg-muted/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Badge variant="premium" className="mb-4">Direct Download</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Ready to download?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Purchase a license to unlock the download. Existing customers can log in to access their files.</p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard"><Button size="lg" className="text-base h-12 px-8 gap-2"><Download className="h-5 w-5" />Customer Download Portal</Button></Link>
              <Link href="#pricing"><Button variant="outline" size="lg" className="text-base h-12 px-8">Purchase License</Button></Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-emerald-500" /> Virus-free</span>
              <span className="flex items-center gap-1.5"><Download className="h-4 w-4 text-emerald-500" /> 8MB download</span>
              <span className="flex items-center gap-1.5"><Timer className="h-4 w-4 text-emerald-500" /> Instant access</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Simple, one-time pricing</h2>
            <p className="mt-4 text-lg text-muted-foreground">No subscriptions. No hidden fees. Own your trading software forever.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative">
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"><Badge variant="premium" className="px-4 py-1">Most Popular</Badge></div>}
                <Card className={cn("h-full transition-all duration-300 hover:shadow-lg", plan.popular && "border-emerald-500/50 shadow-md shadow-emerald-500/10")}>
                  <CardHeader>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="mt-2"><span className="text-4xl font-bold">{plan.price}</span>{plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}</div>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">{plan.features.map((f) => (<li key={f} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-emerald-500 shrink-0" /><span>{f}</span></li>))}</ul>
                    <Button className={cn("w-full mt-4", plan.popular && "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg")} variant={plan.popular ? "default" : "outline"}>{plan.cta}</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">All plans include a <span className="font-medium text-foreground">14-day money-back guarantee</span>. No questions asked.</p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 sm:py-32 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Trusted by traders worldwide</h2>
            <p className="mt-4 text-lg text-muted-foreground">Join 2,400+ traders who already use Nexova Trader.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex gap-1">{Array.from({ length: 5 }).map((_, j) => (<Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />))}</div>
                    <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{t.content}&rdquo;</p>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-sm font-semibold">{t.avatar}</div>
                      <div><p className="text-sm font-medium">{t.name}</p><p className="text-xs text-muted-foreground">{t.role}</p></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Frequently asked questions</h2>
            <p className="mt-4 text-lg text-muted-foreground">Everything you need to know about Nexova Trader.</p>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="cursor-pointer transition-all duration-200 hover:shadow-sm" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium pr-4">{faq.question}</h3>
                      <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200", openFaq === i && "rotate-180")} />
                    </div>
                    <AnimatePresence>{openFaq === i && (<motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="mt-3 text-sm text-muted-foreground overflow-hidden">{faq.answer}</motion.p>)}</AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 bg-gradient-to-br from-emerald-500/5 via-green-500/5 to-teal-500/5 dark:from-emerald-500/10 dark:via-green-500/10 dark:to-teal-500/10 border-y">
        <div className="mx-auto max-w-3xl px-4 sm:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Ready to elevate your trading?</h2>
            <p className="mt-4 text-lg text-muted-foreground">Join thousands of traders who trust Nexova Trader. Download, install, and start trading in minutes.</p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="#pricing"><Button size="lg" className="text-base h-12 px-10 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/25">Get Nexova Trader Now <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
              <Link href="/dashboard"><Button variant="outline" size="lg" className="text-base h-12 px-10">Customer Login</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-semibold">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-sm font-bold">NT</div>
                <span>Nexova <span className="text-muted-foreground font-normal">Trader</span></span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">Advanced trading executable for Windows. Built for speed. Designed for profit.</p>
            </div>
            <div><h4 className="text-sm font-semibold mb-4">Product</h4><ul className="space-y-3 text-sm text-muted-foreground"><li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li><li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li><li><Link href="#download" className="hover:text-foreground transition-colors">Download</Link></li></ul></div>
            <div><h4 className="text-sm font-semibold mb-4">Company</h4><ul className="space-y-3 text-sm text-muted-foreground"><li><span className="hover:text-foreground transition-colors cursor-pointer">About</span></li><li><span className="hover:text-foreground transition-colors cursor-pointer">CEO: Muhammad Al-Hafizi</span></li><li><span className="hover:text-foreground transition-colors cursor-pointer">Co-Founder: Olivia Marza</span></li></ul></div>
            <div><h4 className="text-sm font-semibold mb-4">Legal</h4><ul className="space-y-3 text-sm text-muted-foreground"><li><span className="hover:text-foreground transition-colors cursor-pointer">Terms of Service</span></li><li><span className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</span></li><li><span className="hover:text-foreground transition-colors cursor-pointer">Refund Policy</span></li></ul></div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Nexova Trader. All rights reserved. Trading involves risk.</div>
        </div>
      </footer>
    </div>
  );
}
