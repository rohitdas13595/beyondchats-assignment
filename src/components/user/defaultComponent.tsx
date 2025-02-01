"use client";
import { deleteTokens } from "@/lib/actions/auth.action";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function DefaultComponent() {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full max-w-[1280px] mx-auto gap-4 h-screen px-12 lg:px-8">
      <section className="flex flex-col w-full mt-8 gap-4 bg-mantle items-center justify-center rounded-2xl p-8  h-1/2">
        <p>Unable to find Session</p>
        <p>Please Signin</p>
        <button
          // href="/signin"
          onClick={async () => {
            await deleteTokens();
            router.push("/signin");
          }}
          className="bg-crust py-1 px-4  font-bold text-white  rounded-2xl text-white shadow-xl border border-white hover:bg-mantle"
        >
          Signin
        </button>
      </section>
    </div>
  );
}
