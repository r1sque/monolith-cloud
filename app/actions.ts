'use server';

import { put } from "@vercel/blob";
import { redirect } from "next/navigation";

const runtime = 'edge';

export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File;

  // persist metadata in the database here
  const id = file.name;

  const blob = await put(file.name, file, { access: 'public' });

  redirect(`/${id}`);
}
