// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("admin-auth-token")?.value;
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/signin";

  // ✅ Redirect ke /signin jika belum login
  if (!token && pathname === "/") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // ✅ Redirect ke / jika sudah login dan coba buka /signin
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ Tambahkan header CORS
  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return response;
}

// Terapkan hanya untuk route tertentu
export const config = {
  matcher: ["/", "/signin", "/api/:path*"], // ⬅️ tambahkan /api/* jika ingin middleware aktif untuk API juga
};
