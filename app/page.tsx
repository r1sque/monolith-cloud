import { SubmitButton, StatusLabel } from "@/components/submit-components";
import { put, del } from "@vercel/blob";
import { redirect } from "next/navigation";
import { sql } from '@vercel/postgres';

export default function Home() {
  async function uploadFile(formData: FormData) {
    'use server';

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

  return (
    <main className="bg-black-50 flex min-h-screen flex-col items-center p-24">
      <h1 className="font-bold text-7xl  text-center bg-gradient-to-r from-purple-500 to-white text-transparent bg-clip-text" >
        Monolith Cloud
      </h1>
      <p className="mt-8 w-2/3 text-center font-medium text-3xl bg-gradient-to-r from-purple-500 to-white text-transparent bg-clip-text leading-normal" >
         Place where all of your bullshit can be stored and shared.
      </p>
      {/* fix the margin between the second title and the form  */}
      <form className="mt-16 w-1/2 p-4 border-2 border-purple-500/80 rounded-md shadow-3xl hover:shadow-purple-500 transition-shadow duration-700 ease-in-out"
            action={uploadFile}>
        <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer">
          <StatusLabel />
          <input name="file" id="file" type="file" className="hidden" required/>
        </label>
        <SubmitButton />
      </form>
    </main>
  );
}
