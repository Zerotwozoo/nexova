import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/pricing(.*)",
  "/blog(.*)",
  "/auth/login(.*)",
  "/auth/register(.*)",
  "/auth/forgot-password(.*)",
  "/auth/callback(.*)",
  "/api/(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|xml|ttf|woff2?|ico|svg|png|jpg|jpeg|gif|webp)).*)",
  ],
};
