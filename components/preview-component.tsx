import { HeadBlobResult } from '@vercel/blob';
import CopyButton from './copy-button';

function PreviewElement({ blob, id }: { blob: HeadBlobResult, id: string }) {
  if (blob.contentType.startsWith('image/')) {
    return <img datatype={blob.contentType} id={id} className='max-h-600' src={blob.url} alt={blob.pathname} />;
  } else if (blob.contentType.startsWith('video/')) {
    return <video id={id} className='max-h-600' src={blob.url} controls />;
  } else if (blob.contentType.startsWith('audio/')) {
    return <audio id={id} controls src={blob.url} />;
  } else if (blob.contentType === 'application/pdf') {
    return <iframe id={id} src={blob.url} className='w-600 h-1300' title={blob.pathname} />;
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

  // make CopyButton also copy image contents
  return (
    <div {...props} className="flex flex-col items-center justify-center bg-black-200 rounded">
      <div className="bg-black-100 flex items-center justify-between w-full">
        <span className="pl-2">{blob.contentType}</span>
        {isCopiable && <CopyButton className="pr-2" content={`data`!}>Copy</CopyButton>}
      </div>
      <span className="bg-black-100 w-full flex justify-center">
        <PreviewElement id="preview" blob={blob} />
      </span>
    </div>
  );
}
