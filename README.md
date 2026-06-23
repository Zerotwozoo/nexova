# Nexova Trader

Website penjualan trading executable (EXE) untuk Windows. Dibangun dengan Next.js 16, TypeScript, Tailwind CSS v4, Prisma + Supabase, Clerk Auth.

## 🚀 Deploy ke Vercel

### 1. Setup Database (Supabase)

1. Buat project di [supabase.com](https://supabase.com)
2. Copy connection string: Settings > Database > Connection string
3. Simpan sebagai `DATABASE_URL`

### 2. Setup Auth (Clerk)

1. Buat application di [dashboard.clerk.com](https://dashboard.clerk.com)
2. Copy `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` dan `CLERK_SECRET_KEY`

### 3. Deploy ke Vercel

```bash
# 1. Push ke GitHub dulu
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/nexova.git
git push -u origin main

# 2. Import di Vercel (vercel.com/import)
#    Isi environment variables:
#    - DATABASE_URL
#    - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
#    - CLERK_SECRET_KEY
#    - NEXT_PUBLIC_APP_URL (https://nexova.vercel.app)

# 3. Deploy! Vercel otomatis jalan:
#    - npm install + prisma generate
#    - next build
```

### 4. Push Schema & Seed ke Supabase

Setelah deploy pertama, jalankan:

```bash
# Push schema ke database Supabase
npx prisma db push

# Seed data awal (admin, produk, demo)
npm run db:seed
```

### 5. Webhook Clerk (opsional)

Untuk sync user otomatis, di Clerk dashboard:
- Webhooks > Add Endpoint
- URL: `https://nexova.vercel.app/api/users/sync`
- Events: `user.created`, `user.updated`

## 📦 Local Development

```bash
npm install
npx prisma db push
npm run db:seed
npm run dev
# → http://localhost:3000
```

## 📁 Struktur

```
app/
├── api/           # API routes (products, licenses, purchases, users, admin)
├── auth/          # Clerk auth pages (login, register, forgot-password)
├── dashboard/     # Customer dashboard + admin panel
├── layout.tsx     # Root layout
├── page.tsx       # Landing page produk
```

## 👑 Akun Default (seed)

| Role | Email | Nama |
|------|-------|------|
| Admin | ceo@nexova.app | Muhammad Al-Hafizi |
| Admin | olivia@nexova.app | Olivia Marza |
| Demo | demo@nexova.app | Demo Trader |
