import Image from "next/image";
import { ApiKeyCheck } from "../ApiKeyCheck";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3 text-lg font-semibold">
          <Image src="/Octo-Icon.svg" alt="logo" width={32} height={32} />
          AI Team Dashboard
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/unknowdeepanshu/AI-Productivity-Dashboard"
            className="font-medium text-gray-600 hover:text-black"
          >
            GitHub
          </a>
          <SignedIn>
            <a
              href="/chat"
              className="rounded-md bg-black px-4 py-2 font-medium text-white hover:bg-gray-800"
            >
              Connect Tools
            </a>
          </SignedIn>
          <SignedOut>
            <SignUpButton>
              <button className="w-[8rem] cursor-pointer rounded-md bg-black px-4 py-2 font-medium text-white hover:bg-gray-800">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
