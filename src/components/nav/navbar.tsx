import Image from "next/image";
import { SignUpButton } from "./signupButton";

export function Navbar() {
  return (
    <div className="flex flex-row justify-between w-full bg-mantle z-10 items-center sticky top-0 py-2  px-8">
      <div className="flex items-center  gap-2 justify-center">
        <Image src="/images/logo.png" alt="logo" width={50} height={50} />
        <h1 className="text-3xl font-bold text-white">Beyondchats</h1>
      </div>
      <div>
        <SignUpButton />
      </div>
    </div>
  );
}
