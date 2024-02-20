'use client';

import { useEffect } from 'react';

export default function Error({
  error, reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center h-screen">

      <h1 className="f text-7xl text-red-500 p-2 mb-4">Woopsie-daisy, we fucked up!</h1>

      <h1 className="f text-6xl text-red-500 p-2 mb-6">It seems an error has occurred</h1>

      <button onClick={reset}>
        <a href="/" className="border text-white text-2xl px-4 py-2 rounded hover:bg-white/10 transition duration-300">
          Return
        </a>
      </button>
    </main>  
  );
}
