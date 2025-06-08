import { NextRequest, NextResponse } from "next/server";

const VIEW_MODE_COOKIE = "view-mode";
const VIEW_MODE_COOKIE_MAX_AGE = 60 * 60 * 24;

export async function middleware(req: NextRequest) {
  const viewModeCookie = req.cookies.get(VIEW_MODE_COOKIE);

  if (!viewModeCookie) {
    const randomView = Math.random() < 0.5 ? "list" : "grid";
    const res = NextResponse.next();

    res.cookies.set(VIEW_MODE_COOKIE, randomView, {
      maxAge: VIEW_MODE_COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
      // secure: false,
    });

    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*", "/"],
};
