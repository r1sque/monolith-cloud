import { HeadBlobResult } from '@vercel/blob';

export default function PreviewComponent({
  blob, ...props
}: {
  blob: HeadBlobResult
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
    </div>
  );
}
