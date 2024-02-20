import { uploadFile } from "./actions";
import { SubmitButton, SubmitSpinner } from "@/components/submit-components";

export default function Home() {
  return (
    <main className="bg-black-50 flex min-h-screen flex-col items-center p-24">
      <h1 className="font-bold text-7xl bg-gradient-to-r from-purple-500 to-white text-transparent bg-clip-text" >
        Monolith Cloud
      </h1>
      <p className="mt-8 w-2/3 text-center font-medium text-3xl bg-gradient-to-r from-purple-500 to-white text-transparent bg-clip-text leading-normal" >
         Place where all of your bullshit can be stored and shared.
      </p>
      {/* fix the margin between the second title and the form  */}
      <form className="mt-16 w-1/2 p-4 border-2 border-purple-500/80 rounded-md shadow-3xl hover:shadow-purple-500 transition-shadow duration-700 ease-in-out"
            action={uploadFile}>
        <div className="flex items-center justify-center w-full">
          <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer">
            <SubmitSpinner />
            <input name="file" id="file" type="file" className="hidden" required/>
          </label>
        </div>
        <SubmitButton />
      </form>
    </main>
  );
}
