"use client";

import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  Mail,
  Calendar,
  MapPin,
  Link,
  Shield,
  Award,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function TwitterIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) return null;

  const initials = user.firstName
    ? `${user.firstName[0]}${user.lastName?.[0] ?? ""}`
    : user.emailAddresses[0]?.emailAddress[0].toUpperCase() ?? "?";

  const stats = [
    { label: "Notes", value: "24" },
    { label: "Tasks", value: "18" },
    { label: "Trades", value: "47" },
    { label: "Documents", value: "12" },
  ];

  const activity = [
    { action: "Created a new note", time: "2 hours ago" },
    { action: "Completed 3 tasks", time: "5 hours ago" },
    { action: "Logged a trade (AAPL)", time: "1 day ago" },
    { action: "Uploaded a document", time: "2 days ago" },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Avatar className="h-20 w-20 rounded-2xl">
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback className="rounded-2xl text-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold">
                  {user.firstName} {user.lastName}
                </h2>
                <Badge variant="premium">Pro</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  {user.emailAddresses[0]?.emailAddress}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Joined June 2026
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  New York, NY
                </span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Button variant="outline" size="sm">
                  <TwitterIcon />
                  <span className="ml-1.5">Twitter</span>
                </Button>
                <Button variant="outline" size="sm">
                  <GithubIcon />
                  <span className="ml-1.5">GitHub</span>
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                  Website
                </Button>
              </div>
            </div>
            <Button>Edit Profile</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="h-4 w-4 text-muted-foreground" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activity.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary/30 shrink-0" />
                <div>
                  <p className="text-sm">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Award className="h-4 w-4 text-muted-foreground" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Early Adopter", desc: "Joined in the first month", unlocked: true },
              { label: "Note Master", desc: "Created 100 notes", unlocked: false, progress: "24/100" },
              { label: "Task Crusher", desc: "Completed 500 tasks", unlocked: false, progress: "142/500" },
              { label: "Trader Pro", desc: "Logged 50 trades", unlocked: true },
            ].map((achievement) => (
              <div key={achievement.label} className={cn("flex items-center justify-between p-3 rounded-xl", achievement.unlocked ? "bg-accent" : "bg-muted/50")}>
                <div>
                  <p className="text-sm font-medium">{achievement.label}</p>
                  <p className="text-xs text-muted-foreground">{achievement.progress || achievement.desc}</p>
                </div>
                {achievement.unlocked && <Badge variant="success" className="text-[10px]">Unlocked</Badge>}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
