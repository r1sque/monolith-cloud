import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose';
import { secret } from "./lib/utils";
import { newSessionCookie } from './lib/utils';

export const config = {
  matcher: ['/upload'],
}

async function getSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  if (!session) {
    return null;
  }

  try {
    return jwtVerify(session, secret)
  } catch (_) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const session = await getSession(request);

  if (!session || Date.now() + session.payload.exp! < Date.now()) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const response = NextResponse.next();
  const { name, value, data } = await newSessionCookie();
  // @ts-ignore
  response.cookies.set(name, value, data);
  return response;
}
