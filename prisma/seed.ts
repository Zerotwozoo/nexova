import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { randomBytes } from "crypto";

const url = new URL(process.env.DATABASE_URL!);
url.searchParams.set("sslmode", "require");
const adapter = new PrismaPg({ connectionString: url.toString() });
const prisma = new PrismaClient({ adapter });

function generateLicenseKey(): string {
  const segments = Array.from({ length: 4 }, () =>
    randomBytes(3).toString("hex").toUpperCase()
  );
  return `NEXOVA-${segments.join("-")}`;
}

async function main() {
  console.log("🌱 Seeding Nexova Trader database...\n");

  // Create products (EXE versions)
  const v32 = await prisma.product.upsert({
    where: { id: "prod-v32" },
    update: {},
    create: {
      id: "prod-v32",
      name: "Nexova Trader",
      version: "3.2",
      description: "Latest stable release with multi-timeframe analysis and optimized memory usage.",
      fileName: "nexova-trader-v3.2.exe",
      fileSize: 8_589_934,
      fileUrl: "/downloads/nexova-trader-v3.2.exe",
      os: "Windows 10/11 64-bit",
      published: true,
      changelog:
        "• New multi-timeframe analysis engine\n• Optimized memory usage (-40%)\n• Added BitGet exchange support\n• Fixed WebSocket reconnection bug\n• Improved order execution latency",
    },
  });

  await prisma.product.upsert({
    where: { id: "prod-v31" },
    update: {},
    create: {
      id: "prod-v31",
      name: "Nexova Trader",
      version: "3.1",
      description: "Previous stable release with custom indicator scripting API.",
      fileName: "nexova-trader-v3.1.exe",
      fileSize: 8_493_568,
      fileUrl: "/downloads/nexova-trader-v3.1.exe",
      os: "Windows 10/11 64-bit",
      published: true,
      changelog:
        "• Custom indicator scripting API\n• Improved backtesting accuracy\n• New alert conditions system\n• Performance optimizations",
    },
  });

  console.log(`  ✅ Product: ${v32.name} v${v32.version}`);

  // Admin users
  const ceo = await prisma.user.upsert({
    where: { email: "ceo@nexova.app" },
    update: {},
    create: {
      clerkId: "ceo-clerk-id",
      email: "ceo@nexova.app",
      name: "Muhammad Al-Hafizi",
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "olivia@nexova.app" },
    update: {},
    create: {
      clerkId: "cofounder-clerk-id",
      email: "olivia@nexova.app",
      name: "Olivia Marza",
      role: "ADMIN",
    },
  });

  console.log(`  ✅ Admin: ${ceo.name}`);

  // Demo user with license
  const demo = await prisma.user.upsert({
    where: { email: "demo@nexova.app" },
    update: {},
    create: {
      clerkId: "demo-clerk-id",
      email: "demo@nexova.app",
      name: "Demo Trader",
      role: "USER",
    },
  });

  const demoKey = generateLicenseKey();
  const demoPurchase = await prisma.purchase.create({
    data: {
      amount: 599,
      plan: "Professional",
      status: "completed",
      paymentMethod: "card",
      paymentId: "pi_demo_001",
      userId: demo.id,
    },
  });

  await prisma.license.create({
    data: {
      key: demoKey,
      plan: "Professional",
      status: "active",
      maxActivations: 3,
      usedActivations: 1,
      userId: demo.id,
      purchaseId: demoPurchase.id,
    },
  });

  console.log(`  ✅ Demo: ${demo.name} (key: ${demoKey})`);

  // Sample users
  const samples = [
    { name: "Alex Thompson", email: "alex@example.com", plan: "Professional", amount: 599 },
    { name: "Sarah Mitchell", email: "sarah@example.io", plan: "Professional", amount: 599 },
    { name: "James Wilson", email: "james@example.co", plan: "Standard", amount: 299 },
  ];

  for (const s of samples) {
    const user = await prisma.user.upsert({
      where: { email: s.email },
      update: {},
      create: { clerkId: `sample-${s.email}`, email: s.email, name: s.name, role: "USER" },
    });

    const purchase = await prisma.purchase.create({
      data: { amount: s.amount, plan: s.plan, status: "completed", paymentMethod: "card", userId: user.id },
    });

    await prisma.license.create({
      data: {
        key: generateLicenseKey(),
        plan: s.plan,
        status: "active",
        maxActivations: 3,
        usedActivations: 1,
        userId: user.id,
        purchaseId: purchase.id,
      },
    });

    await prisma.download.create({
      data: { version: "3.2", productId: v32.id, userId: user.id },
    });

    console.log(`  ✅ Sample: ${s.name}`);
  }

  console.log("\n🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
