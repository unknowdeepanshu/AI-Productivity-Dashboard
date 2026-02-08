import { CTASection } from "@/components/section/cta";
import { Footer } from "@/components/section/footer";
import { Navbar } from "@/components/section/nav";
import { TechStack } from "@/components/section/tech";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import Image from "next/image";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="flex w-full flex-col items-center">
        {/* HERO */}
        <HeroSection />

        {/* HOW IT WORKS */}
        <section className="w-full max-w-6xl px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold">HOW IT WORKS</h2>
          <p className="mt-2 text-gray-500">
            All your updates. One dashboard. Zero hassle.
          </p>

          <div className="mt-12 grid gap-6 text-left md:grid-cols-3">
            <div className="rounded-xl border p-6">
              <h3 className="text-lg font-semibold">1 Connect Your Tools</h3>
              <p className="mt-2 text-gray-600">
                Sync Discord, Slack, Telegram, GitHub, and more
              </p>
            </div>

            <div className="rounded-xl border p-6">
              <h3 className="text-lg font-semibold">2 Choose Updates</h3>
              <p className="mt-2 text-gray-600">
                Pick what you care about — PRs, messages, issues
              </p>
            </div>

            <div className="rounded-xl border p-6">
              <h3 className="text-lg font-semibold">3 Get Smart Summaries</h3>
              <p className="mt-2 text-gray-600">
                See everything summarized in one dashboard
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="w-full bg-gray-50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-semibold">FEATURES</h2>
              <p className="mt-2 text-gray-500">
                All your updates. One dashboard. Zero hassle.
              </p>
            </div>

            <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
              <div className="space-y-6">
                <div className="rounded-xl border bg-white p-6">
                  <h3 className="text-lg font-semibold">
                    Multi-Tool Integration
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Connect your workspace across Discord, Slack, Telegram,
                    GitHub, and more.
                  </p>
                </div>

                <div className="rounded-xl border bg-white p-6">
                  <h3 className="text-lg font-semibold">
                    Centralized Update Feed
                  </h3>
                  <p className="mt-2 text-gray-600">
                    See all important updates from your connected tools in one
                    feed.
                  </p>
                </div>
              </div>

              <div>
                <img
                  src="https://picsum.photos/600/350"
                  alt="dashboard preview"
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="w-full max-w-6xl px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold">USE CASES</h2>
          <p className="mt-2 text-gray-500">Ideal for developers and teams.</p>

          <div className="mt-12 grid gap-6 text-left md:grid-cols-4">
            <div className="rounded-xl border p-6">
              <h3 className="font-semibold">Solo Developers</h3>
              <p className="mt-2 text-gray-600">
                Grow your workspace efficiently
              </p>
            </div>

            <div className="rounded-xl border p-6">
              <h3 className="font-semibold">Small Teams</h3>
              <p className="mt-2 text-gray-600">Keep everyone on track</p>
            </div>

            <div className="rounded-xl border p-6">
              <h3 className="font-semibold">Hackathon Projects</h3>
              <p className="mt-2 text-gray-600">
                Collaborate faster during sprints
              </p>
            </div>

            <div className="rounded-xl border p-6">
              <h3 className="font-semibold">Remote Collaboration</h3>
              <p className="mt-2 text-gray-600">
                One dashboard, no context switching
              </p>
            </div>
          </div>
        </section>
        <TechStack />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden border-b">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/paeges/herosectionbg-Copy.png" // put any image in public folder
          alt="background"
          fill
          priority
          className="object-cover opacity-10"
        />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl leading-tight font-bold md:text-5xl">
            One Dashboard.
            <br />
            Every Update.
            <br />
            No App Switching.
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Connect Discord, GitHub, and other tools. Let AI summarize
            everything happening across your workspace in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <SignedIn>
              <a
                href="/chat"
                className="rounded-md bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
              >
                Connect Your Tools
              </a>
            </SignedIn>

            <SignedOut>
              <SignUpButton>
                <button className="flex-1 cursor-pointer rounded-md bg-black px-4 py-2 font-medium text-white hover:bg-gray-800">
                  Connect Your Tools
                </button>
              </SignUpButton>
            </SignedOut>

            <a
              href="/interactables"
              className="flex-1 rounded-md border border-gray-300 px-6 py-3 font-medium hover:bg-gray-50"
            >
              View Example Updates
            </a>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="flex justify-center">
          <Image
            src="/paeges/herosectionbg-Copy.png" // put any image in public folder
            alt="dashboard preview"
            width={520}
            height={380}
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};
