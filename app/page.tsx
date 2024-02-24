import { SubmitButton, StatusLabel } from "@/components/submit-components";
import { uploadFile } from '@/lib/actions';

export default function Home() {
  return (
    <main className="bg-black-200 flex min-h-screen flex-col items-center p-24 phone:p-4">
      <h1 className="font-bold text-7xl text-center bg-gradient-to-r from-purple-500 to-white text-transparent bg-clip-text">
        Monolith Cloud
      </h1>
      <p className="mt-8 w-2/3 text-center font-medium text-3xl bg-gradient-to-r from-purple-500 to-white text-transparent bg-clip-text leading-normal phone:text-xl phone:w-full" >
         Place where all of your bullshit can be stored and shared.
      </p>
      <form className="mt-16 w-1/2 p-4 border-2 border-purple-500/80 rounded-md shadow-3xl hover:shadow-purple-500 transition-shadow duration-700 ease-in-out phone:w-full"
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
