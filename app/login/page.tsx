'use client';

import { useFormState } from 'react-dom';
import { authenticate } from '@/lib/actions';
import { SubmitButton } from '@/components/submit-components';
import { Source_Sans_3 } from "next/font/google";
import Link from 'next/link';

const SourceSans = Source_Sans_3({ subsets: ['latin', 'latin-ext'] });

export default function Page() {
  const [errorMessage, action] = useFormState(authenticate, undefined);

  return (
    <form className={`max-w-md flex flex-col items-center ${SourceSans.className}`}  action={action}>
      <h1 className="font-bold text-5xl text-center bg-gradient-to-r from-purple-500 to-white text-transparent bg-clip-text mb-8">
         Welcome to <br /> {/*has to be changer to "login" when front page is implemented */}
        Monolith Cloud
      </h1>

      {errorMessage && <p className="text-center mb-4 -mt-4">{errorMessage}</p>}
      <input className="w-full text-white text-center bg-transparent hover:bg-[#ffffff36] focus:w-110% focus:bg-white focus:text-black-50 focus:placeholder-black-100 focus:caret-opacity-5 transition-all focus:focus:outline-none focus-visible:outline px-4 py-2 rounded border border-white/50 mb-3"
        name="login" 
        placeholder="Username"
        minLength={4}
        required
      />

      <input className="w-full text-white text-center bg-transparent hover:bg-[#ffffff36] focus:w-110% focus:bg-white focus:text-black-50 focus:placeholder-black-100 focus:caret-opacity-5 transition-all focus:focus:outline-none focus-visible:outline px-4 py-2 rounded border border-white/50 mb-5"
        name="password"
        type="password" 
        placeholder="Password" 
        minLength={6}
        required
      />

      <SubmitButton className="w-full bg-purple-400 hover:bg-purple-500 text-white transition duration-300 font-bold py-2 px-4 rounded-lg " onPending="Proceeding...">Login</SubmitButton>
      <span className="flex justify-end m-3 -mb-2">
        New here?
        <Link className="ml-3 inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/register">
          Sign up
          <svg className="w-4 h-4 fill-blue-600" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/></svg>
        </Link>
      </span>
    </form>
  );
}
