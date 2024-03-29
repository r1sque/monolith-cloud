import { SubmitButton, StatusLabel } from "@/components/submit-components";
import { uploadFile } from '@/lib/actions';

export default function Home() {
  return (
    <main className="relative bg-grid-gradient bg-center bg-black-300 flex min-h-screen flex-col items-center place-content-center phone:p-4">      
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-black-300 via-transparent to-black-300"></div>
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-black-300 via-transparent to-black-300"></div>

      <h1 className="relative  font-bold text-7xl text-center bg-gradient-to-r from-purple-500 to-white text-transparent bg-clip-text">
        Monolith Cloud
      </h1>

      <p className="relative mt-8 text-center font-medium text-3xl bg-gradient-to-r from-purple-500 to-white text-transparent bg-clip-text leading-normal phone:text-xl phone:w-full">
        Place where all of your bullshit can be stored and shared.
      </p>

      <form className="bg-black-300 relative max-w-800 mt-16 w-3/4 p-4 border-2 border-purple-500/80 rounded-md shadow-3xl hover:bg-black-300 hover:shadow-purple-500 transition-all duration-700 ease-in-out phone:w-full"
            action={uploadFile}>
        <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer">
          <StatusLabel />
          <input name="file" id="file" type="file" className="hidden" required/>
        </label>
        <SubmitButton onPending="Uploading...">Upload</SubmitButton>
      </form>
    </main>
  );
}
