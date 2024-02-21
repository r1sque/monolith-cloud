import { sql } from '@vercel/postgres';
import { head } from '@vercel/blob';
import PreviewComponent from '@/components/preview-component';
import CopyButton from '@/components/copy-button';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

async function fetchBlob(id: string) {
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

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blob = await fetchBlob(params.slug);

  const [size, unit] = calculateSizeAndUnit(blob.size);

  const metadata: Metadata = {
    title: `${blob.pathname} | Monolith Cloud`,
    openGraph: {
      siteName: 'Monolith Cloud',
      type: 'website',
      title: blob.pathname,
      description: `Uploaded at ${blob.uploadedAt.toDateString()} | ${size} ${unit}`,
      url: `https://monolith-cloud.vercel.app/${params.slug}`,
    }
  };
  const openGraph = metadata.openGraph!;

  if (blob.contentType.startsWith('image/')) {
    openGraph.images = [{
      url: blob.url,
      alt: blob.pathname,
    }];
  } else if (blob.contentType.startsWith('video/')) {
    // @ts-ignore
    openGraph.type = 'video.other'
    openGraph.videos = blob.url;
  } else if (blob.contentType.startsWith('audio/')) {
    // @ts-ignore
    openGraph.type = 'music.song'
    openGraph.audio = blob.url;
  }

  return metadata;
}

function calculateSizeAndUnit(size: number) {
  if (size >= 1_048_576) {
    return [(size / 1_048_576).toFixed(2), 'megabytes'];
  } else if (size >= 1024) {
    return [(size / 1024).toFixed(2), 'kilobytes'];
  }

  return [size, 'bytes'];
}

export default async function File({ params }: { params: { slug: string } }) {
  const blob = await fetchBlob(params.slug);

  const [size, unit] = calculateSizeAndUnit(blob.size);

  return (
    <main className=" h-screen flex flex-col">
      <nav className="bg-black-100">
        <div className="flex flex-wrap items-center justify-between mx-32 p-4">
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col text-lg p-4 md:p-0 mt-4 border border-black-100 rounded-lg bg-black-100 md:flex-row md:space-x-8 rtl:space-x-reverse">
              <li>
                <Link href="/" className="block py-2 px-3 text-white bg-white rounded md:bg-transparent md:text-white md:p-0 hover:text-white/90 transition duration-300" aria-current="page">Home</Link>
              </li>

              {/*
               <li>
                <Link href="https://github.com/r1sque/monolith-cloud" type="_blank" className="block py-2 px-3 text-white bg-white rounded md:bg-transparent md:text-white md:p-0 hover:text-white/90 transition duration-300" aria-current="page">GitHub Page</Link>
              </li> 
              */}

              {/*  nav that shows the path of the user
                <div className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse -translate-x-72 translate-y-10">
                  <a className="cursor-default text-white hover:text-white/90 transition duration-300" href="/">monolith-cloud.vercel.app</a>
                  <div aria-hidden="true" className="select-none text-white">/</div>
                  <a className="text-white hover:text-white/90 transition duration-300" href={params.slug}>{params.slug}</a>
                </div>
               */}
            </ul>
          </div>
        </div>
      </nav>
      <div className="bg-black-100 flex items-center justify-center h-screen">
        <div className="bg-white/5 max-w-2xl mx-auto p-4 rounded border shadow-md -translate-y-10 phone:size-2/3">
          <h2 className=" text-center text-2xl font-bold mb-4">{blob.pathname}</h2>

          <PreviewComponent blob={blob} className="mb-4" />

          <h3 className="text-lg text-center mb-2">
            Uploaded at <span className="font-semibold">{blob.uploadedAt.toDateString()}</span> <span>| </span> 
            <span className="font-semibold">{size} {unit}</span>. 
          </h3>
          <div className='flex items-center justify-center phone:scale-75'>
            <a href={blob.downloadUrl} className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
              Download
            </a>

            <CopyButton content={blob.url} className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ml-6">
              Copy direct link
            </CopyButton>

            <CopyButton content={`https://monolith-cloud.vercel.app/${params.slug}`} className="inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 ml-6">
              Copy link
            </CopyButton>
          </div>
        </div>
      </div>
    </main>
  );
}
