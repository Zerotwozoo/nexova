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

  const now = new Date();
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    totalUsers,
    totalLicenses,
    totalDownloads,
    totalRevenue,
    usersThisMonth,
    licensesThisMonth,
    revenueThisMonth,
    recentPurchases,
    licenseStats,
    downloads30d,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.license.count(),
    prisma.download.count(),
    prisma.purchase.aggregate({ _sum: { amount: true } }),
    prisma.user.count({ where: { createdAt: { gte: firstOfMonth } } }),
    prisma.license.count({ where: { createdAt: { gte: firstOfMonth } } }),
    prisma.purchase.aggregate({ where: { createdAt: { gte: firstOfMonth } }, _sum: { amount: true } }),
    prisma.purchase.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    }),
    prisma.license.groupBy({
      by: ["plan"],
      _count: true,
      orderBy: { _count: { plan: "desc" } },
    }),
    prisma.download.count({
      where: { createdAt: { gte: new Date(Date.now() - 30 * 86400000) } },
    }),
  ]);

  return NextResponse.json({
    totalUsers,
    totalLicenses,
    totalDownloads,
    totalRevenue: totalRevenue._sum.amount ?? 0,
    usersThisMonth,
    licensesThisMonth,
    revenueThisMonth: revenueThisMonth._sum.amount ?? 0,
    recentPurchases,
    licenseStats,
    downloads30d,
  });
}
