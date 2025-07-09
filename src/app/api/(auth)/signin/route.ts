import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  console.log(username, password);
  console.log(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const res = NextResponse.redirect(new URL("/", req.url));

    res.cookies.set("admin-auth-token", process.env.ADMIN_TOKEN!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 hari
    });

    return res;
  }

  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}
