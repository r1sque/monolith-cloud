'use server';

import { put, del } from "@vercel/blob";
import { redirect } from "next/navigation";
import { sql } from '@vercel/postgres';
import { hash, compareSync } from "bcrypt";
import { newSessionCookie } from './utils';
import { cookies } from "next/headers";

export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File;

  if (file.size > 1_048_576) {
    throw new Error();
  }

  const blob = await put(file.name, file, { access: 'public' });

  const id = Array.from(/https:\/\/[\w+._-]+\/.*-(\w+)\..*/.exec(blob.url)![1]).filter((_, i) => i % 2).join('');

  try {
    await sql`INSERT INTO metadata (id, blob_url) VALUES (${id}, ${blob.url})`;
  } catch (e) {
    console.error(e);
    del(blob.url);
    throw new Error();
  }

  redirect('/' + id);
}

export async function addSessionCookie() {
  const { name, value, data } = await newSessionCookie();

  // @ts-ignore
  cookies().set(name, value, data);
}

export async function register(_: unknown, formData: FormData) {
  const username = formData.get('login') as string;
  const invitationCode = formData.get('code') as string;
  const password = formData.get('password') as string;

  if (!/^[\w_-àâçéèêëîïôûùüÿñæœ.]{4,32}$/i.test(username)) {
    return 'Invalid username';
  }

  const { rows: [code] } = await sql`SELECT code FROM invite_codes WHERE code = ${invitationCode}`;

  if (!code) {
    return 'Invalid invitation code';
  }

  sql`DELETE FROM invite_codes WHERE code = ${invitationCode}`;

  const encrypted = await hash(password, 8);

  try {
    await sql`INSERT INTO users VALUES (${username}, ${encrypted})`;
  } catch (e: any) {
    return 'Username already taken.'
  }

  await addSessionCookie();

  return redirect('/upload');
}

export async function authenticate(_: unknown, formData: FormData) {
  const username = formData.get('login') as string;
  const password = formData.get('password') as string;

  const { rows: [row] } = await sql`SELECT password FROM users WHERE username = ${username}`;

  if (!row) {
    return 'User not found';
  }

  if (!compareSync(password, row.password)) {
    return 'Wrong credentials';
  }

  await addSessionCookie();

  return redirect('/upload');
}
