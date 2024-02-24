import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose';
import { secret } from "./lib/utils";

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|\\w+).*)'],
}

export async function middleware(request: NextRequest) {
  const toLogin = NextResponse.redirect(new URL('/login', request.url));

  const cookie = request.cookies.get('user')?.value;

  if (!cookie) {
    return toLogin;
  }

  try {
    await jwtVerify(cookie, secret);
  } catch (e: any) {
    return toLogin;
  }
}
