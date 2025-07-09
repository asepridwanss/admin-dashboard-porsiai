import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const res = NextResponse.redirect(new URL("/signin", req.url));
  res.cookies.set("admin-auth-token", "", { maxAge: 0, path: "/" });
  return res;
}
