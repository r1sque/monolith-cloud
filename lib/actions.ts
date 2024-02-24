'use server';

import { put, del } from "@vercel/blob";
import { redirect } from "next/navigation";
import { sql } from '@vercel/postgres';
import { hash, compareSync } from "bcrypt";
import { addUserCookie } from './utils';

export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File;

  if (file.size > 1_048_576) {
    throw new Error();
  }

  let id: string;
  try {
    const blob = await put(file.name, file, { access: 'public' });

    const match = /https:\/\/[\w+._-]+\/.*-(\w+)\..*/.exec(blob.url);
    if (match === null) {
      del(blob.url);
      throw new Error('failed to match regex');
    }
    id = Array.from(match[1]).filter((_, i) => i % 2).join('');

    await sql`INSERT INTO metadata (id, blob_url) VALUES (${id}, ${blob.url})`;
  } catch (e) {
    console.error(e);
    throw new Error();
  }

  redirect('/' + id);
}

export async function register(state: unknown, formData: FormData) {
  const login = formData.get('login') as string;
  const invitationCode = formData.get('code') as string;
  const password = formData.get('password') as string;

  const { rows: [{ code }] } = await sql`SELECT code FROM invite_codes WHERE code = ${invitationCode}`;
  if (!code) {
    return 'Invalid invitation code';
  } else {
    sql`DELETE FROM invite_codes WHERE code = ${invitationCode}`;
  }

  if (/^[\w_-àâçéèêëîïôûùüÿñæœ.]{4,32}$/i.test(login)) {
    return 'Login too long';
  }

  const encrypted = await hash(password, 8);

  try {
    await sql`INSERT INTO users VALUES (${login}, ${encrypted})`;
  } catch (e: any) {
    return 'Username already taken.'
  }

  await addUserCookie(login);

  return redirect('/');
}

export async function authenticate(_: unknown, formData: FormData) {
  const login = formData.get('login') as string;
  const password = formData.get('password') as string;

  const { rows: [row] } = await sql`SELECT password FROM users WHERE username = ${login}`;

  if (!row) {
    return 'User not found';
  }

  if (!compareSync(password, row.password)) {
    return 'Wrong credentials';
  }

  await addUserCookie(login);

  return redirect('/');
}