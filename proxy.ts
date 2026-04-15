import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  const isAuthPage = req.nextUrl.pathname.startsWith("/sign-in") || req.nextUrl.pathname.startsWith("/sign-up");
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  // If trying to access dashboard and NOT logged in
  if (isDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // If logged in and trying to access auth pages, redirect to dashboard
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};