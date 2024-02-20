export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="f text-7xl text-red-500 mb-24">Oups, The file has not been found!</h1>
      <a href="/" className="bg-black text-white text-2xl px-4 py-2 rounded hover:bg-white/10 transition duration-300">
        Return
      </a>
    </main>  
  );
}
