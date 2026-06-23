import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { key } = await req.json();
  if (!key) return NextResponse.json({ error: "License key required" }, { status: 400 });

  const license = await prisma.license.findUnique({ where: { key } });
  if (!license) return NextResponse.json({ error: "Invalid license key" }, { status: 404 });
  if (license.status !== "active") return NextResponse.json({ error: "License is not active" }, { status: 400 });
  if (license.usedActivations >= license.maxActivations) {
    return NextResponse.json({ error: "Maximum activations reached" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const updated = await prisma.license.update({
    where: { id: license.id },
    data: {
      usedActivations: { increment: 1 },
      userId: user.id,
    },
  });

  return NextResponse.json(updated);
}
