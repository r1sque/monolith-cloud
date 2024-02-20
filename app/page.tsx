import { uploadFile } from "./actions";


// home page
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
      <form className=" mt-16 w-1/2 p-4 border-2 border-purple-500/80 rounded-md shadow-3xl hover:shadow-purple-500 transition-shadow duration-700 ease-in-out" action={uploadFile}>
        <div className="flex items-center justify-center w-full">
          <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 hover:scale-110 transition-transform duration-000 ease-in-out">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or <span className="font-semibold">drag and drop</span></p>
              <p className="text-xs text-gray-500 dark:text-gray-400">any files (MAX. 1MB)</p>
            </div>
            <input name="file" id="file" type="file" className="hidden" required/>
          </label>
        </div> 
        <button
          type="submit"
          className="w-full bg-purple-400 text-white py-2 px-4 rounded-md hover:bg-purple-500 transition-colors duration-300 focus-visible:outline-none focus-visible:ring focus-visible:border-purple-700"
        >
          Upload
        </button>
      </form>
    </main>
  );
}
