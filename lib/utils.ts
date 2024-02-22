import { sql } from "@vercel/postgres";
import { head } from "@vercel/blob";
import { notFound } from "next/navigation";

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
