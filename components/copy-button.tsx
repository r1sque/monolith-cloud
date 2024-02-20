'use client';

import { useState } from 'react';

export default function CopyButton({ content, ...props }: {
  content: string
} & React.HTMLAttributes<HTMLButtonElement>) {
  const [click, setClicked] = useState(false);

  const clickHandler = () => {
    if (click) return;
    navigator.clipboard.writeText(content);
    setClicked(true);
    setTimeout(() => setClicked(false), 3000);
  };

  return <button {...props} onClick={clickHandler}>
    {click ? 'Copied!' : props.children}
  </button>;
}
