import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Auth } from "./Contexts/UserContext";

const protectedRoutes = ["/user"];

export default function middleware(req: NextRequest) {
  const isAuthenticated = true;
  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

