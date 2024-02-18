import Image from "next/image";
import { uploadFile } from "./actions";

// home page
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Monolith-Cloud</h1>
      <h3>Place where all of your bullshit can be stored and shared.</h3>

      <form action={uploadFile}>
        <input type="file" name="file"/>
        <button type="submit">Upload</button>
      </form>
    </main>
  );
}
