'use client';

import { useState } from 'react';

export default function CopyButton({ content, ...props }: {
  content: string
} & React.HTMLAttributes<HTMLButtonElement>) {
  const [click, setClicked] = useState(false);

  const clickHandler = () => {
    if (click) return;
    const preview = document.getElementById('preview');

    if (preview instanceof HTMLPreElement) {
      navigator.clipboard.writeText(preview.innerText);
    } else if (preview instanceof HTMLImageElement) {
      // fetching the image src and getting blob data and then copying it to user's clipboard
      fetch(preview.src)
        .then(res => res.blob())
        .then(blob => {
          navigator.clipboard.write([
            new ClipboardItem({
              [blob.type]: blob
            })
          ]);    
        });
    }

    setClicked(true);
    setTimeout(() => setClicked(false), 3000);
  };

  return <button {...props} onClick={clickHandler}>{click ? 'Copied!' : props.children}</button>;
}
