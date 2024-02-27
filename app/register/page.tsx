'use client';

import { useFormState } from 'react-dom';
import { register } from '@/lib/actions';
import { SubmitButton } from '@/components/submit-components';
import Link from 'next/link';
import { Source_Sans_3 } from 'next/font/google';

const SourceSans = Source_Sans_3({ subsets: ['latin', 'latin-ext'] });

export default function RegisterPage() {
  const [errorMessage, action] = useFormState(register, undefined);

  return (
    <main className="bg-grid-gradient bg-center h-screen flex flex-col justify-center items-center">

      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-black-300 via-transparent to-black-300"></div>
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-black-300 via-transparent to-black-300"></div>
      <div className="absolute left-0 top-0 h-full w-full bg-shadow-gradient z-0"></div>

      <form className={`z-10 max-w-md flex flex-col items-center ${SourceSans.className}`}  action={action}>
        <h1 className="font-bold text-5xl text-center bg-gradient-to-r from-purple-500 to-white text-transparent bg-clip-text mb-8">
          Registering to <br />
          Monolith Cloud
        </h1>
        {errorMessage && <p className="text-center mb-4 -mt-4">{errorMessage}</p>}
        <input className="w-full text-white text-center bg-transparent hover:bg-[#ffffff36] focus:w-110% focus:bg-white focus:text-black-50 focus:placeholder-black-100 focus:caret-opacity-5 transition-all focus:focus:outline-none focus-visible:outline px-4 py-2 rounded border border-white/50 mb-3"
          name="login"
          placeholder="Username"
          minLength={4}
          maxLength={32}
          pattern="[\w_-àâçéèêëîïôûùüÿñæœ.]{4,32}"
          required
        />

        <input className="w-full text-white text-center bg-transparent hover:bg-[#ffffff36] focus:w-110% focus:bg-white focus:text-black-50 focus:placeholder-black-100 focus:caret-opacity-5 transition-all focus:focus:outline-none focus-visible:outline px-4 py-2 rounded border border-white/50 mb-3"
          name="code" 
          placeholder="Invitation Code"
          required
        />

        <input className="w-full text-white text-center bg-transparent hover:bg-[#ffffff36] focus:w-110% focus:bg-white focus:text-black-50 focus:placeholder-black-100 focus:caret-opacity-5 transition-all focus:focus:outline-none focus-visible:outline px-4 py-2 rounded border border-white/50 mb-5"
          name="password"
          type="password" 
          placeholder="Password"
          minLength={6}
          required
        />

        <SubmitButton className="w-full bg-purple-400 hover:bg-purple-500 text-white transition duration-300 font-bold py-2 px-4 rounded-lg " onPending="Proceeding...">Register</SubmitButton>
        <span className="flex justify-end m-3 -mb-2">
          Already have an account?
          <Link className="ml-3 inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/login">
            Login
            <svg className="w-4 h-4 fill-blue-600 rotate-90" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/></svg>
          </Link>
        </span>
      </form>
    </main>
  );
}
