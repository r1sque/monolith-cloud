import { HeadBlobResult } from '@vercel/blob';
import CopyButton from './copy-button';

async function PreviewElement({ blob, id }: { blob: HeadBlobResult, id: string }) {
  if (blob.contentType.startsWith('image/')) {
    return <img id={id} className='max-h-600' src={blob.url} alt={blob.pathname} />;
  } else if (blob.contentType.startsWith('video/')) {
    return <video id={id} className='max-h-600' src={blob.url} controls />;
  } else if (blob.contentType.startsWith('audio/')) {
    return <audio id={id} controls src={blob.url} />;
  } else if (blob.contentType === 'application/pdf') {
    return <iframe id={id} src={blob.url} className='w-600 h-1300' title={blob.pathname} />;
  } else if (blob.contentType.startsWith('text/') || blob.contentType.startsWith('application/')) {
    return (
      <div className="text-justify overflow-x-auto max-h-600 h-full">
        <pre id={id} className="m-3 mb-5">{await (await fetch(blob.url)).text()}</pre>
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
        {isCopiable && <CopyButton className="pr-2" content={``}>Copy</CopyButton>}
      </div>

      <span className="bg-black-100 w-full flex justify-center">
        <PreviewElement id="preview" blob={blob} />
      </span>
    </div>
  );
}
