import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export function CTASection() {
  return (
    <section className="w-full py-24 text-center">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl font-semibold">
          Ready to connect your workspace?
        </h2>

        <p className="mt-4 text-gray-600">
          Let AI track your GitHub, Discord, and team updates automatically.
        </p>

        <SignedIn>
          <a
            href="/chat"
            className="mt-8 inline-block cursor-pointer rounded-lg bg-black px-8 py-4 font-medium text-white hover:bg-gray-800"
          >
            Connect Your Tools
          </a>{" "}
        </SignedIn>

        <SignedOut>
          <SignUpButton>
            <button className="mt-8 inline-block cursor-pointer rounded-lg bg-black px-8 py-4 font-medium text-white hover:bg-gray-800">
              Connect Your Tools
            </button>
          </SignUpButton>
        </SignedOut>
      </div>
    </section>
  );
}
