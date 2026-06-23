import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = await clerkClient();
  const clerkUser = await client.users.getUser(clerkId);

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || email.split("@")[0];

  const user = await prisma.user.upsert({
    where: { clerkId },
    update: { email, name, image: clerkUser.imageUrl },
    create: { clerkId, email, name, image: clerkUser.imageUrl },
  });

  return NextResponse.json(user);
}
