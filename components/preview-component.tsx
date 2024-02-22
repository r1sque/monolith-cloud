import { HeadBlobResult } from '@vercel/blob';
import CopyButton from './copy-button';
import { Red_Hat_Mono } from "next/font/google";
import { Span } from 'next/dist/trace';

const redHatMono = Red_Hat_Mono({ subsets: ['latin', 'latin-ext'] });

async function PreviewElement({ blob, id }: { blob: HeadBlobResult, id: string }) {
  if (blob.contentType.startsWith('image/')) {
    return <img id={id} className='max-h-600' src={blob.url} alt={blob.pathname} />;
  } else if (blob.contentType.startsWith('video/')) {
    return <video id={id} className='max-h-600' src={blob.url} controls />;
  } else if (blob.contentType.startsWith('audio/')) {
    return <audio id={id} src={blob.url} controls />;
  } else if (blob.contentType === 'application/pdf') {
    return <iframe id={id} src={blob.url} className='w-1300 h-600 phone:w-full' title={blob.pathname} />;
  } else if (blob.contentType.startsWith('text/') || blob.contentType.startsWith('application/')) {
    return (
      <div className=" text-justify overflow-x-auto max-h-600 h-full">
        <pre id={id} className={`mb-3 mt-3 ml-0.5 antialiased ${redHatMono.className}`}>{await (await fetch(blob.url)).text()}</pre>
      </div>
    );
  } else {
    return <p id={id} className="p-8">No preview available</p>
  }
}

export default async function PreviewComponent({
  blob, ...props
}: {
  blob: HeadBlobResult
} & React.HTMLAttributes<HTMLDivElement>) {
  const isCopiable = blob.contentType.startsWith('text/') || /application\/(?!pdf)/.test(blob.contentType) || blob.contentType.startsWith('image/');

  return (
    <div {...props} className="flex flex-col items-center justify-center bg-black-200 rounded">
      <div className="bg-black-100 flex items-center justify-between w-full">
        <span className="pl-2">{blob.contentType}</span>
        {isCopiable &&
          <CopyButton className="pr-2" onCopied={
            <span className="inline-flex items-center">
              <span className="text-blue-700 dark:text-blue-500">Copied</span>
              <svg className="w-3.5 h-3.5 ml-1.5 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
              </svg>
            </span>
          }>
            <span className="inline-flex items-center">
              <span>Copy</span>
              <svg className="w-3.5 h-3.5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
              </svg>
            </span>
          </CopyButton>}
      </div>

      <span className="bg-zinc-700 w-full flex justify-center">
        <PreviewElement id="preview" blob={blob} />
      </span>
    </div>
  );
}
