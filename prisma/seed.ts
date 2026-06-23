import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { randomBytes } from "crypto";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
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
      fileSize: 8_589_934, // ~8.2 MB
      fileUrl: "/downloads/nexova-trader-v3.2.exe",
      os: "Windows 10/11 64-bit",
      published: true,
      changelog: "• New multi-timeframe analysis engine\n• Optimized memory usage (-40%)\n• Added BitGet exchange support\n• Fixed WebSocket reconnection bug\n• Improved order execution latency",
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
      changelog: "• Custom indicator scripting API\n• Improved backtesting accuracy\n• New alert conditions system\n• Performance optimizations",
    },
  });

  console.log(`  ✅ Created product: ${v32.name} v${v32.version}`);

  // Create admin user (CEO)
  const ceoUser = await prisma.user.upsert({
    where: { email: "ceo@nexova.app" },
    update: {},
    create: {
      clerkId: "ceo-clerk-id",
      email: "ceo@nexova.app",
      name: "Muhammad Al-Hafizi",
      role: "ADMIN",
    },
  });

  const coFounderUser = await prisma.user.upsert({
    where: { email: "olivia@nexova.app" },
    update: {},
    create: {
      clerkId: "cofounder-clerk-id",
      email: "olivia@nexova.app",
      name: "Olivia Marza",
      role: "ADMIN",
    },
  });

  console.log(`  ✅ Created admin: ${ceoUser.name}`);
  console.log(`  ✅ Created admin: ${coFounderUser.name}`);

  // Create demo user with license
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@nexova.app" },
    update: {},
    create: {
      clerkId: "demo-clerk-id",
      email: "demo@nexova.app",
      name: "Demo Trader",
      role: "USER",
    },
  });

  const demoLicenseKey = generateLicenseKey();
  const demoPurchase = await prisma.purchase.create({
    data: {
      amount: 599,
      plan: "Professional",
      status: "completed",
      paymentMethod: "card",
      paymentId: "pi_demo_001",
      userId: demoUser.id,
    },
  });

  await prisma.license.create({
    data: {
      key: demoLicenseKey,
      plan: "Professional",
      status: "active",
      maxActivations: 3,
      usedActivations: 1,
      userId: demoUser.id,
      purchaseId: demoPurchase.id,
    },
  });

  console.log(`  ✅ Created demo user: ${demoUser.name}`);
  console.log(`  ✅ License key: ${demoLicenseKey}`);

  // Create some sample purchases and licenses for stats
  const sampleUsers = [
    { name: "Alex Thompson", email: "alex@example.com" },
    { name: "Sarah Mitchell", email: "sarah@example.io" },
    { name: "James Wilson", email: "james@example.co" },
  ];

  for (const su of sampleUsers) {
    const user = await prisma.user.upsert({
      where: { email: su.email },
      update: {},
      create: {
        clerkId: `sample-${su.email}`,
        email: su.email,
        name: su.name,
        role: "USER",
      },
    });

    const purchase = await prisma.purchase.create({
      data: {
        amount: su.name === "James Wilson" ? 299 : 599,
        plan: su.name === "James Wilson" ? "Standard" : "Professional",
        status: "completed",
        paymentMethod: "card",
        userId: user.id,
      },
    });

    await prisma.license.create({
      data: {
        key: generateLicenseKey(),
        plan: purchase.plan,
        status: "active",
        maxActivations: 3,
        usedActivations: 1,
        userId: user.id,
        purchaseId: purchase.id,
      },
    });

    // Record a download for each
    await prisma.download.create({
      data: {
        version: "3.2",
        productId: v32.id,
        userId: user.id,
        ip: "192.168.1.1",
      },
    });

    console.log(`  ✅ Created user: ${su.name}`);
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
