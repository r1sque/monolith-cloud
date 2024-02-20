export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="f font-bold text-7xl text-red-500 mb-16">Oups, requested page has not been found!</h1>
      <a href="/" className="border text-white text-2xl px-4 py-2 rounded hover:bg-white/10 transition duration-300">
        Return home
      </a>
    </main>  
  );
}
