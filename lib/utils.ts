import { sql } from "@vercel/postgres";
import { head } from "@vercel/blob";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { SignJWT } from 'jose';

export async function fetchBlob(id: string) {
  try {
    const { rows: [row] } = await sql`SELECT blob_url FROM metadata WHERE id = ${id}`;

    if (!row) {
      throw new Error();
    }

    return await head(row['blob_url']);
  } catch (e: any) {
    if (e.message !== '') {
      console.error(e);
    }
    notFound();
  }
}

export function calculateSizeAndUnit(size: number) {
  if (size >= 1_048_576) {
    return [(size / 1_048_576).toFixed(2), 'megabytes'];
  } else if (size >= 1024) {
    return [(size / 1024).toFixed(2), 'kilobytes'];
  }

  return [size, 'bytes'];
}

export const secret = new TextEncoder().encode(process.env.SECRET!);

export async function newSessionCookie() {
  return {
    name: 'session',
    value: await new SignJWT()
      .setIssuedAt()
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(secret),
    data: {
      maxAge: 60 * 60 * 7 * 24,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/'
    },
  };
}
