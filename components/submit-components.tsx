'use client';

import { useFormStatus } from 'react-dom';
import { useState, useEffect } from 'react';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="w-full bg-purple-400 text-white py-2 px-4 rounded-md hover:bg-purple-500 transition-colors duration-300 focus-visible:outline-none focus-visible:ring focus-visible:border-purple-700"
    >
      {pending ? 'Uploading...' : 'Upload'}
    </button>
  );
}

export function useOnFileChange() {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const handleFileChange = (event: any) => {
      const newFile = event.target.files[0] || null;
      setFile(newFile);
    };

    const fileInput = document.getElementById('file'); // Replace with the actual ID of your file input

    if (fileInput) {
      fileInput.addEventListener('change', handleFileChange);

      return () => {
        fileInput.removeEventListener('change', handleFileChange);
      };
    }
  }, []);

  return file;
}

export function SubmitSpinner() {
  const { pending } = useFormStatus();
  const file = useOnFileChange();

  return (
    <>
      {pending ? (
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg className="animate-spin w-12 h-12 mb-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      ) : (
      <div className="flex flex-col items-center justify-center pt-5 pb-6 hover:scale-110 transition-transform duration-000 ease-in-out">
        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
        </svg>
        {file ? (
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">{file?.name}</span></p>
        ) : (
          <>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or <span className="font-semibold">drag and drop</span></p>
            <p className="text-xs text-gray-500 dark:text-gray-400">any files (MAX. 1MB)</p>
          </>
        )}
      </div>
      )}
    </>
  );
}
