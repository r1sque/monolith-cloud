import PreviewComponent from '@/components/preview-component';
import CopyButton from '@/components/copy-button';
import { fetchBlob, calculateSizeAndUnit } from '@/lib/utils'
import Link from 'next/link';

export default async function File({ params }: { params: { slug: string } }) {
  const blob = await fetchBlob(params.slug);

  const [size, unit] = calculateSizeAndUnit(blob.size);

  return (
    <main className="bg-black-200 items-center justify-center h-screen flex flex-col phone:h-full phone:flex flex-grow">
      <div className="bg-white/5 max-w-2xl mx-auto p-4 rounded border-2 border-purple-500/80 shadow-md phone:w-full">
        <div className="grid justify-items-start mb-3 phone:flex phone:flex-col phone:items-center">
          <button className="">
            <Link href="/">
              <svg className="fill-white/70 hover:fill-white transition duration-300 size-8 -mb-8 phone:mb-1" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
              </svg>
            </Link>
          </button>

          <h2 className="justify-self-center text-center text-2xl font-bold">{blob.pathname}</h2>
        </div>

        <PreviewComponent blob={blob} className="mb-4" />

        <h3 className="text-lg text-center m-2 phone:flex phone:flex-col">
          <span>Uploaded at <span className="font-semibold">{blob.uploadedAt.toDateString()}</span></span>
          <span className="phone:hidden">| </span> 
          <span className="font-semibold">{size} {unit}</span>
        </h3>

        <div className='flex flex-row items-center justify-center gap-6 phone:flex-col phone:gap-y-2 '>
          <Link href={blob.downloadUrl} className="inline-block bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 bg-300% hover:animate-gradient text-white px-4 py-2 rounded  transition duration-300 phone:w-full phone:text-center">
            Download
          </Link>

          <CopyButton content={blob.url} className="inline-block bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 bg-300% hover:animate-gradient text-white px-4 py-2 rounded  transition duration-300 phone:w-full phone:text-center">
            Copy direct link
          </CopyButton>

          <CopyButton content={`https://monolith-cloud.vercel.app/${params.slug}`} className="inline-block bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 bg-300% hover:animate-gradient text-white px-4 py-2 rounded  transition duration-300 phone:w-full phone:text-center">
            Copy link
          </CopyButton>
        </div>
      </div>
    </main>
  );
}
