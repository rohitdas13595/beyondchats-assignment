"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SignUpButton() {
  const path = usePathname();

  if (path === "/") {
    return (
      <Link
        href="/signup"
        className="bg-crust py-1 px-4  font-bold text-white  rounded-2xl text-white shadow-xl border border-white hover:bg-mantle"
      >
        Create Chat Bot
      </Link>
    );
  }
}
