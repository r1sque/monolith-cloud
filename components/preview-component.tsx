import { HeadBlobResult } from '@vercel/blob';
import CopyButton from './copy-button';

function PreviewElement({ blob }: { blob: HeadBlobResult }) {
  if (blob.contentType.startsWith('image/')) {
    return <img className='max-h-600' src={blob.url} alt={blob.pathname} />;
  } else if (blob.contentType.startsWith('video/')) {
    return <video className='max-h-600' src={blob.url} controls />;
  } else if (blob.contentType.startsWith('audio/')) {
    return <audio controls src={blob.url} />;
  } else if (blob.contentType === 'application/pdf') {
    return <iframe src={blob.url} className='w-600 h-1300' title={blob.pathname} />;
  } else {
    return <p className="p-8">No preview available</p>
  }
}

export default function PreviewComponent({
  blob, ...props
}: {
  blob: HeadBlobResult
} & React.HTMLAttributes<HTMLDivElement>) {
  const isCopiable = blob.contentType.startsWith('text/') || blob.contentType.startsWith('application/') || blob.contentType.startsWith('image/');

  return (
    <div {...props} className="flex flex-col items-center justify-center bg-black-200 rounded">
      <div className="bg-black-100 flex items-center justify-between w-full">
        <span className="pl-2">{blob.contentType}</span>
        {isCopiable && <CopyButton className="pr-2" content={`blob.`}>Copy</CopyButton>}
      </div>
      <span className="bg-black-100 w-full flex justify-center">
        <PreviewElement blob={blob} />
      </span>
    </div>
  );
}
