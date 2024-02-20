import { sql } from '@vercel/postgres';
import { head } from '@vercel/blob';
import PreviewComponent from '@/components/preview-component';
import CopyButton from '@/components/copy-button';
import { notFound } from 'next/navigation';
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

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

  const openGraph: OpenGraph = {};

  switch (blob.contentType) {
    case 'image/png':
    case 'image/jpeg':
    case 'image/gif':
    case 'image/webp':
      openGraph.images = [{
        url: blob.url,
        alt: blob.pathname,
      }];
      break;
    case 'video/mp4':
      openGraph.videos = [{
        url: blob.url,
      }];
      break;
    case 'audio/mpeg':
      openGraph.audio = [{
        url: blob.url,
      }];
  }

  return {
    title: `${blob.pathname} | Monolith Cloud`,
    openGraph: {
      ...openGraph,
      title: blob.pathname,
      description: `Uploaded at ${blob.uploadedAt.toDateString()} | ${blob.size} bytes`,
      type: 'website',
      url: blob.url,
    }
  };
}

function calculateSizeAndUnit(size: number) {
  if (size >= 1_048_576) {
    return [size / 1_048_576, 'megabytes'];
  } else if (size >= 1024) {
    return [size / 1024, 'kilobytes'];
  }

  return [size, 'bytes'];
}

export default async function File({ params }: { params: { slug: string } }) {
  const blob = await fetchBlob(params.slug);

  const [size, unit] = calculateSizeAndUnit(blob.size);

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="bg-gray-800 max-w-2xl mx-auto p-4 rounded border shadow-md">
        <h2 className=" text-center text-2xl font-bold mb-4">{blob.pathname}</h2>

        <PreviewComponent blob={blob} className="mb-4" />

        <h3 className="text-lg mb-2">
          Uploaded at <span className="font-semibold">{blob.uploadedAt.toDateString()}</span> <span>|</span> 
          <span className="font-semibold">{size} {unit}</span>. 
        </h3>
        <div>
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
    </main>

  );
}
