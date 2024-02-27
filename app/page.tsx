import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";


const MontserratFont = Montserrat({ subsets: ['latin', 'latin-ext'] });

export default function Home() {
  return (
    <main className="relative bg-center bg-black-300 flex flex-col items-center place-content-center phone:p-4">

    <nav className="bg-black-100/5 fixed w-full z-20 top-0 start-0 border-b border-white/20 backdrop-blur-xl">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        <a href="/" className="flex items-center space-x-10 rtl:space-x-reverse">
        <Image
          src="/monolith.png"
          width={60}
          height={60}
          className=""
          alt="Monolith Cloud Logo"
        />
        </a>

        <ul className="flex items-center space-x-10">
          <li>
            <a href="#main" className="block py-2 px-3 text-white/50 hover:text-purple-300" aria-current="page">
              Main
            </a>
          </li>
          <li>
            <a
              href="#project"
              className="block py-2 px-3 text-white/50 hover:text-purple-300"
            >
              Project
            </a>
          </li>
          <li>
            <a
              href="#tools"
              className="block py-2 px-3 text-white/50 hover:text-purple-300"
            >
              Tools
            </a>
          </li>
          <li>
            <a
              href="#others"
              className="block py-2 px-3 text-white/50 hover:text-purple-300"
            >
              Others
            </a>
          </li>
        </ul>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link
            target="_blank"
            href="https://github.com/r1sque/monolith-cloud"
            className="text-white/90 hover:text-white bg-gradient-to-bl from-purple-500 via-purple-600 to-purple-700 bg-300% hover:animate-gradient transition duration-300 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Github Page
          </Link>
        </div>
      </div>
    </nav>

    <hr id="main"/>{/* its there for the navigation of the navbar */}

    <section className="relative bg-grid-gradient bg-center h-500 min-w-full p-12 mt-28" > {/* Adjusted margin-top to create space below the nav */}

      <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-black-300 via-transparent to-black-300"></div>
      <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-b from-black-300 via-transparent to-black-300"></div>
      <div className="absolute left-0 top-0 w-full h-full bg-shadow-gradient z-0"></div>

      <h1 className="relative mt-20 font-semibold text-6xl text-center bg-gradient-to-r from-purple-500 to-white text-transparent bg-clip-text">
        Monolith Cloud
      </h1>
      <p className="relative mt-8 text-white text-center text-lg capitalize leading-normal phone:text-xl phone:w-full">
        very quick, very simple and convinient way to sotre and share small files with others
      </p>
      
      <div className="flex flex-row items-center justify-center mt-5 gap-6 phone:flex-col phone:gap-y-2">

        <Link href="/register">
          <button className="w-40 flex justify-center items-center relative text-white px-8 py-4 rounded transition duration-300 phone:w-full phone:text-center overflow-hidden">
            <span className="absolute inset-0 bg-transparent border-2 border-gradient"></span>
            <span className="relative z-10">Register</span>
            <svg className="w-4 h-4 fill-white ml-2" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
              <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/>
            </svg>
          </button>
        </Link>

        <Link className="z-10" href="/login">
          <button className="w-40 flex justify-center items-center bg-gradient-to-bl from-purple-700 via-purple-500 to-purple-700 bg-300% hover:animate-gradient transition duration-300 text-white px-8 py-4 rounded phone:w-full phone:text-center">
            <span>Login</span>
            <svg className="w-4 h-4 fill-white ml-2" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
              <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/>
            </svg>
          </button>
        </Link>

        <hr className="w-0" id="project"/> {/* its there for the navigation of the navbar */}

      </div>
    </section>
    
    <section className="relative bg-[url('/upload.png')] bg-cover bg-center bg-no-repeat h-500 min-w-full p-12 mt-10 mb-10"> {/* Adjusted margin-top to create space below the nav */}

      <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-b from-black-300 via-transparent to-black-300 backdrop-blur"></div>

      <div className="relative flex flex-col items-center justify-center mb-10">
        <h2 className="text-4xl text-center mb-10">What is this Project</h2>
        <p className="text-lg text-center leading-normal mb-5 w-1/2">
          Monolith Cloud is a tool that allows you to quikly store small files and share them freely without any inconvenience.
          It is built with Nextjs, tailwind CSS and typescript. It is also hosted on Vercel which provides the storage database and the user database.
          </p>
      </div>

      <h2 className="relative flex flex-col items-center justify-center mb-10 text-3xl text-center ">This project was made by</h2>

      <div className="relative grid justify-items-center break-words text-center grid-cols-2 phone:grid-cols-1 gap-y-32 gap-x-0 m-auto max-w-1300">
        <div className="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
          <h3 className="text-white">r1sque</h3>
          <p className="text-indigo-300">Made the Frontend</p>
          <div className="flex justify-center mt-5 space-x-5">
            <Link href="https://github.com/r1sque" target="_blank" rel="noopener noreferrer" className="inline-block text-gray-400">
              <span className="sr-only">GitHub</span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 496 512"
                className="w-6 h-6 text-gray-400 hover:text-gray-100"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z">
                </path>
              </svg>
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
          <h3 className="text-white">sirkostya009</h3>
          <p className="text-indigo-300">Made the Backend</p>
          <div className="flex justify-center mt-5 space-x-5">
            <Link href="https://github.com/sirkostya009" target="_blank" rel="noopener noreferrer" className="inline-block text-gray-400">
              <span className="sr-only">GitHub</span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 496 512"
                className="w-6 h-6 text-gray-400 hover:text-gray-100"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z">
                </path>
              </svg>
            </Link>
          </div>
        </div>
      </div> 
      <hr className="w-0" id="tools"/> {/* its there for the navigation of the navbar */}
    </section>
    
    <section className={`bg-shadow-gradient1 bg-[#362152] min-w-full p-12 mt-20 ${MontserratFont.className}`}>

      <div className="grid justify-items-center break-words text-center grid-cols-2 phone:grid-cols-1 gap-y-32 gap-x-56 m-auto max-w-1300">
        <div className="max-w-xl flex flex-col items-center ">
          <Link href="https://nextjs.org" target="_blank">
            <span className="flex items-center place-content-center">
              <Image
                src="/next-js.svg"
                width={40}
                height={40}
                className="-mt-4"
                alt="Monolith Cloud Logo"
              />
              <h2 className="text-4xl font-semibold ml-4 mb-4">Next.js</h2>
            </span>
          </Link>
          <p className="text-lg">Next.js is a React framework that enables functionality like server-side rendering and routing, allowing for efficient and optimized web applications.</p>
        </div>

        <div className="max-w-xl flex flex-col items-center ">
          <Link href="https://www.typescriptlang.org" target="_blank">
            <span className="flex items-center place-content-center">
                <Image
                  src="/typescript.svg"
                  width={40}
                  height={40}
                  className="-mt-3"
                  alt="Monolith Cloud Logo"
                />
                <h2 className="text-4xl font-semibold ml-3 mb-4">TypeScript</h2>
              </span>
          </Link>
          <p className="text-lg">TypeScript is a superset of JavaScript that adds static typing. It helps catch potential errors during development and enhances code maintainability.</p>
        </div>

        <div className="max-w-xl flex flex-col items-center ">
          <Link href="https://tailwindcss.com" target="_blank">
            <span className="flex items-center place-content-center">
              <Image
                src="/tailwindcss.svg"
                width={40}
                height={40}
                className="-mt-5"
                alt="Monolith Cloud Logo"
              />
              <h2 className="text-4xl font-semibold ml-4 mb-4">Tailwind CSS</h2>
            </span>
          </Link>
          <p className="text-lg">Tailwind CSS is a utility-first CSS framework that provides a set of low-level utility classes to build designs directly in your markup.</p>
        </div>

        <div className="max-w-xl flex flex-col items-center ">
          <div className="flex items-center mb-4 ">
            <Link href="https://vercel.com/storage/postgres" target="_blank">
              <span className="flex items-center">
                <Image
                  src="/postgress.svg"
                  width={30}
                  height={30}
                  className="-mb-1 saturate-0 invert"
                  alt="Monolith Cloud Logo"
                />
                <h2 className="text-xl ml-2">PostgreSQL Database</h2>
              </span>
            </Link>
            <span className="ml-4 select-none"> / </span>
            <Link href="https://vercel.com/storage/blob" target="_blank">
              <span className="flex items-center">
                <Image
                  src="/blob.svg"
                  width={30}
                  height={30}
                  className="-mb-1 ml-4 saturate-0 invert"
                  alt="Monolith Cloud Logo"
                />
                <h2 className="text-xl ml-2">Blob Storage</h2>
              </span>
            </Link>
          </div>
            <p className="text-lg">Vercel is a platform for hosting web applications. Integrating with PostgreSQL database and blob storage allows for efficient data storage and retrieval.</p>
        </div>
      </div>
      
    </section>
    
    <section className="min-w-full flex flex-col items-center justify-center mb-10 p-12 mt-12"> 
      
      <h2 className="text-4xl mt-10">About the next project</h2>
      <p className="text-lg mt-5 text-center">We are currenly working on a CSV Pipeline</p>
      <p className="mt-10 text-transparent hover:text-white cursor-pointer transition-all duration-500 ease-in-out">ay look I ai't gonna lie ion know what browski sirkostya009 meant by this but hey hesaid we gotta do it so we doing it type thing 🧑‍🦯</p>
    </section>
    <hr className="w-0" id="others"/> {/* its there for the navigation of the navbar */}
    <footer className="mt-32">
      <p>Style inspired by <Link href="https://twitter.com/Backifyco" target="_blank">
        https://twitter.com/Backifyco </Link>
      </p>
    </footer>
    </main>
  );
}
