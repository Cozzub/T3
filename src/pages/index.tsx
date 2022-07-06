import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { useSession, signIn, signOut } from "next-auth/react";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center w-1/2 min-h-screen mx-auto">
        <h1 className="font-extrabold text-center text-7xl">
          Create <span className="text-blue-500">T3</span> App
        </h1>

        <div className="w-fit">
          <h3 className="mt-4 text-3xl">This Stack uses:-</h3>
          <ul className="self-start text-xl underline list-disc">
            <li>
              <a href="https://nextjs.org" target="_blank" rel="noreferrer">
                Next.js
              </a>
            </li>
            <li>
              <a href="https://trpc.io" target="_blank" rel="noreferrer">
                tRPC
              </a>
            </li>
            <li>
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noreferrer"
              >
                TailwindCSS
              </a>
            </li>
            <li>
              <a
                href="https://typescriptlang.org"
                target="_blank"
                rel="noreferrer"
              >
                TypeScript
              </a>
            </li>

            <li>
              Not signed in <br />
              <button onClick={() => signIn("github")}>Sign in</button>
            </li>
          </ul>

          <div className="py-6 text-2xl">
            {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
