import Image from "next/image";
import Link from "next/link";
import Confirmcard from "@/components/confirmcard";
import Norequest from "@/components/norequest";

const cardProps = [
  {
    title: "Available",
    value: "97%",
    changeValue: 1,
    changeText: "from last month",
    iconName: "success",
    link: "#"
  },
  {
    title: "In Progress",
    value: "20",
    changeText: "Active Orders",
    iconName: "progress",
    link: "#"
  },
  {
    title: "Earnings",
    value: "20",
    changeValue: 18,
    changeText: "from last month",
    iconName: "activity",
    link: "#"
  },
  {
    title: "Rating",
    value: "2",
    changeValue: 2,
    changeText: "from last month",
    iconName: "sanction",
    link: "#"
  },
];

export default function Home() {
  return (
    <main className="flex max-h-screen  flex-col w-full items-center justify-start gap-y-8 ">
      <div className="grid text-center gap-4  lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {
          cardProps.map((props, index) => (
            <Link
              href="#"
              key={index}
              className="group rounded-lg border  px-5 py-4 transition-colors border-slate-300  bg-gray-100 hover:bg-[#CAED5B] hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                {`${props.title} `}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Find in-depth information about Next.js features and API.
              </p>
            </Link>
          ))}
      </div>

      <div className="grid text-center gap-4 lg:w-full lg:mb-0 lg:grid-cols-5 lg:text-left  min-h-96">
        <div className="flex flex-col group rounded-lg col-span-3 border  px-5 py-4 transition-colors border-slate-300  bg-[#204C58] hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-xl font-semibold text-white`}>
            Direct Requests
          </h2>
          <Confirmcard />
          {/* <Norequest /> */}

        </div>
        <div className="group rounded-lg border col-span-2 px-5 py-4 transition-colors border-slate-100  bg-white  hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-xl font-semibold`}>
            Assignments in Progress
          </h2>

        </div>
      </div>

      {/* <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div> */}

    </main>
  );
}
