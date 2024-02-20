'use client';

export default function CopyButton({ content, ...props }: {
  content: string
} & React.HTMLAttributes<HTMLButtonElement>) {
  return <button {...props} onClick={() => navigator.clipboard.writeText(content)} />;
}
