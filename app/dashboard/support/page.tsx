"use client";

import { useState } from "react";
import { Mail, MessageCircle, BookOpen, Send, Loader2, CheckCircle2, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const faqs = [
  { q: "How do I activate my license?", a: "Open Nexova Trader, go to Help > Activate License, enter your key, and click Activate." },
  { q: "Can I use the same license on multiple computers?", a: "Yes, your license can be activated on up to 3 devices simultaneously." },
  { q: "How do I update to the latest version?", a: "Download the latest EXE from your dashboard and run it. Your settings are preserved." },
  { q: "My antivirus flagged the EXE as suspicious", a: "This is a false positive. Add an exception in your antivirus settings. The EXE is signed and verified." },
];

export default function SupportPage() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    toast.success("Message sent! We'll get back to you within 24 hours.");
  };

  if (sent) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 space-y-4">
        <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold">Message Sent!</h2>
        <p className="text-muted-foreground">We'll respond to your inquiry within 24 hours. Check your email for our reply.</p>
        <Button variant="outline" onClick={() => setSent(false)}>Send Another Message</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Support</h2>
        <p className="text-muted-foreground">We're here to help you get the most out of Nexova Trader</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-all cursor-pointer">
          <CardContent className="p-5 flex flex-col items-center text-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="text-sm font-semibold">Live Chat</h3>
            <p className="text-xs text-muted-foreground">Mon-Fri, 9AM-6PM EST</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all cursor-pointer">
          <CardContent className="p-5 flex flex-col items-center text-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Mail className="h-5 w-5 text-emerald-500" />
            </div>
            <h3 className="text-sm font-semibold">Email Support</h3>
            <p className="text-xs text-muted-foreground">24h response time</p>
          </CardContent>
        </Card>
        <a href="/dashboard/documentation" className="block">
          <Card className="hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-5 flex flex-col items-center text-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="text-sm font-semibold">Documentation</h3>
              <p className="text-xs text-muted-foreground">Self-help guides</p>
            </CardContent>
          </Card>
        </a>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>Fill out the form and we'll respond within 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" value={subject} onChange={(e) => setSubject(e.target.value)} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Describe your issue in detail..." rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required />
            </div>
            <Button type="submit" disabled={sending} className="w-full sm:w-auto">
              {sending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <p className="text-sm font-medium">{faq.q}</p>
              <p className="text-sm text-muted-foreground mt-1">{faq.a}</p>
              <Separator className="mt-4" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
