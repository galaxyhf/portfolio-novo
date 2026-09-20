import { auth } from "@/lib/neon/auth";

export const proxy = auth.middleware({ loginUrl: "/admin/login" });

export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/projects/:path*"],
};
