import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest, res: NextResponse) {
  const path = req.nextUrl.pathname;

  if (path === "/signin" || path === "/signup") {
    const accessToken = req.cookies.get("accessToken")?.value;
    if (accessToken) {
      return NextResponse.redirect(new URL("/user", req.url));
    }
  }
  //   if (path && path.startsWith("/user")) {
  //     const accessToken = req.cookies.get("accessToken")?.value;
  //     if (!accessToken) {
  //       return NextResponse.redirect(new URL("/signin", req.url));
  //     }
  //   }

  NextResponse.next();
}
