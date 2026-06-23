import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { role: true },
  });
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [total, recent, byVersion] = await Promise.all([
    prisma.download.count(),
    prisma.download.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.download.groupBy({
      by: ["version"],
      _count: true,
      orderBy: { _count: { version: "desc" } },
    }),
  ]);

  return NextResponse.json({ total, recent30d: recent, byVersion });
}
