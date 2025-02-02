import { InteractiveHoverButton } from "@/components/ui/button/interactiveButton";
import dynamic from "next/dynamic";
import Link from "next/link";

const DynamicGlobe = dynamic(() =>
  import("@/components/ui/globe").then((mod) => mod.Globe)
);
export default function Home() {
  return (
    <div className="flex flex-col w-full max-w-[1280px] mx-auto gap-4 h-screen px-12 lg:px-8">
      <section className="flex  flex-col-reverse lg:flex-row  pt:4  lg:pt-8 gap-4  lg:gap-8 justify-between">
        <div className="flex flex-col p-4 gap-4  justify-center items-center lg:items-start">
          <h3 className="text-4xl font-bold">Make AI your brand manager</h3>
          <p className="italic">
            Keep your customers glued to your site. Cut costs through
            automation.
          </p>
          <Link href="/signup">
            <InteractiveHoverButton className="w-fit my-12">
              Create Chatbot for free
            </InteractiveHoverButton>
          </Link>
        </div>
        <div className="w-full flex items-center  justify-center">
          <img src="/illustrations/home.svg" alt="" />
        </div>
      </section>
      <div className="flex pb-12">
        <div className="relative flex flex-col size-full  items-center justify-center overflow-visible rounded-lg w-full  pt-8 md:shadow-xl">
          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-peach to-yellow bg-clip-text text-center text-4xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            Make Global Presence
          </span>
          <DynamicGlobe className="top-0" />
          <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
        </div>
      </div>
    </div>
  );
}
