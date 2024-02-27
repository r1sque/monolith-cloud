'use client';

import { useFormStatus } from 'react-dom';
import { useState, useEffect } from 'react';

function useOnFileChange() {
  const [file, setFile] = useState<File>();

  useEffect(() => {
    const handleFileChange = (event: any) => {
      const newFile = event.target.files[0];
      setFile(newFile);
    };

    const fileInput = document.getElementById('file');

    fileInput?.addEventListener('change', handleFileChange);

    return () => fileInput?.removeEventListener('change', handleFileChange);
  }, []);

  return {
    file,
    // @ts-ignore
    isBig: file?.size > 1_048_576,
  };
}

function useFullScreenDrag(inputSelector: string) {
  const [isDragging, setDragging] = useState(false);

  useEffect(() => {
    const onDrop = (e: DragEvent) => {
      e.preventDefault();

      const file = document.querySelector(inputSelector) as HTMLInputElement;
      file.files = e.dataTransfer?.files || null;
      file.dispatchEvent(new Event('change'));
      setDragging(false);
    };

    const onDragEnter = (_: DragEvent) => setDragging(true);

    const onDragLeave = (e: DragEvent) => {
      if (e.x === 0 && e.y === 0) {
        setDragging(false);
      }
    };

    const onDragOver = (e: DragEvent) => e.preventDefault();

    document.addEventListener('drop', onDrop);
    document.addEventListener('dragenter', onDragEnter);
    document.addEventListener('dragleave', onDragLeave);
    document.addEventListener('dragover', onDragOver);

    return () => {
      document.removeEventListener('drop', onDrop);
      document.removeEventListener('dragenter', onDragEnter);
      document.removeEventListener('dragleave', onDragLeave);
      document.removeEventListener('dragover', onDragOver);
    };
  }, [inputSelector]);

  return isDragging;
}

export function SubmitButton({ onPending, ...props }: {
  onPending?: string
} & React.HTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();
  const { isBig } = useOnFileChange();

  return (
    <button
      disabled={pending || isBig}
      type="submit"
      className={`w-full py-2 px-4 rounded-md focus-visible:outline-none focus-visible:ring focus-visible:border-purple-700 ${
        isBig
          ? 'bg-zinc-700 text-gray-500 line-through cursor-not-allowed transition-all duration-300'
          : 'bg-purple-400 hover:bg-purple-500 text-white transition duration-300'
    }`}
    {...props}>
      {pending ? onPending : props.children}
    </button>
  );
}

export function StatusLabel() {
  const { pending } = useFormStatus();
  const { file, isBig } = useOnFileChange();
  const isDraging = useFullScreenDrag('#file');

  return (
    <div className="flex flex-col items-center justify-center pt-5 pb-6 hover:scale-110 transition-transform duration-000 ease-in-out">
      {pending ? (      
        <svg className="animate-spin w-12 h-12 mb-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <svg className={`w-8 h-8 mb-4 text-gray-500 dark:text-gray-400 ${isDraging ? 'hidden' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
        </svg>
      )}
      {file ? (
        <>
          <p className={`mb-2 text-sm text-gray-500 dark:text-gray-400 break-all ${isDraging ? 'hidden' : ''}`}><span className="font-semibold">{file.name}</span></p>
          {isBig && <p className="text-md text-center text-red-500 dark:text-red-400">File is too big</p>}
        </>
      ) : (
        <>
          <p className={`mb-2 text-sm text-center text-gray-500 dark:text-gray-400 ${isDraging ? 'hidden' : ''}`}><span className="font-semibold">Click to upload</span> or <span className="font-semibold">drag and drop</span></p>
          <p className={`text-xs text-center text-gray-500 dark:text-gray-400 ${isDraging ? 'hidden' : ''}`}>any files (MAX. 1MB)</p>
        </>
      )}
      {isDraging && (
        <p className="text-lg text-center text-gray-400 font-semibold transition-all fade-text duration-500 ease-in-out">Drop it here to upload it
          <div className="flex items-center justify-center">
            <svg className="mt-5 w-10 h-10 text-gray-800 dark:text-white animate-bounce" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-2M8 9l4-5 4 5m1 8h0"/>
            </svg>
          </div>
        </p>
      )}
    </div>
  );
}
