import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("admin-auth-token")?.value;
    const { pathname } = request.nextUrl;

    const isLoginPage = pathname === "/signin";

    // ✅ Jika belum login dan akses selain /signin → redirect ke /signin
    if (!token && pathname === "/") {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    // ✅ Jika sudah login dan akses /signin → redirect ke /
    if (token && isLoginPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

// 🧠 Matcher: Tentukan route yang akan dicek
export const config = {
    matcher: ["/", "/signin"],
};
