'use server';

import { put, del } from "@vercel/blob";
import { redirect } from "next/navigation";
import { sql } from '@vercel/postgres';

export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File;

  if (file.size > 1_048_576) {
    throw new Error('Requested file size is too big!');
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

    await sql`
    INSERT INTO metadata (id, blob_url) VALUES (${id}, ${blob.url})
    RETURNING id;
    `;
  } catch (e) {
    console.error(e);
    throw new Error('Something went wrong during upload');
  }

  redirect('/' + id);
}
