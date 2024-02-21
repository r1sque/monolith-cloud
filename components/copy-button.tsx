'use client';

import { useState } from 'react';

export default function CopyButton({ content, ...props }: {
  content: string | Blob
} & React.HTMLAttributes<HTMLButtonElement>) {
  const [click, setClicked] = useState(false);

  const clickHandler = () => {
    if (click) return;
    const preview = document.getElementById('preview');

    if (preview instanceof HTMLParagraphElement) {
      navigator.clipboard.writeText(content);
    } else if (preview instanceof HTMLImageElement) {
      // fetching the image src and getting blob data and then copying it to user's clipboard
      fetch(preview.src)
        .then((nig) => nig.blob())
        .then((blob) => {
          navigator.clipboard.write([
            new ClipboardItem({
              // @ts-ignore
              [preview.datatype]: blob
            })
          ]);    
        });
    }

    setClicked(true);
    setTimeout(() => setClicked(false), 3000);
  };

  return <button {...props} onClick={clickHandler}>
    {click ? 'Copied!' : props.children}
  </button>;
}
