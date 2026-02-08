import { IconUserX } from "@tabler/icons-react";
import * as React from "react";
export default function UserProfile() {
  const [user, setUser] = React.useState<number>(0);
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="m-6 flex flex-1 flex-col gap-4">
          <div className="flex flex-1 rounded-lg bg-white px-12 py-4">
            <div className="flex flex-1 flex-col">
              <div className="flex justify-between">
                <h1 className="text-3xl font-bold">Profile Name</h1>
                <button className="cursor-pointer rounded-lg bg-white px-4 py-1 font-mono text-zinc-600 shadow-md ring-1 ring-zinc-400 duration-300 outline-none placeholder:text-zinc-600 placeholder:opacity-50 hover:bg-zinc-200 focus:shadow-lg focus:ring-2">
                  Logout
                </button>
              </div>

              <hr className="mt-4 rounded-lg border-2" />

              <div className="mt-4 flex gap-4">
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto rounded">
                  <label className="flex w-full flex-1 cursor-pointer items-center justify-between rounded-md bg-white/40 p-4 shadow hover:bg-white/20 has-[:checked]:bg-white/30 has-[:checked]:text-indigo-900 has-[:checked]:ring-2 has-[:checked]:ring-indigo-200">
                    <div className="flex items-center">
                      <div className="flex items-center"></div>
                      <h2 className="text-lg">Name</h2>
                    </div>
                    <input
                      type="text"
                      name="serverType"
                      placeholder="Dipanshu viswakarma"
                      className="w-80 bg-zinc-200 px-4 py-1 font-mono text-zinc-600 shadow-md ring-1 ring-zinc-400 duration-300 outline-none placeholder:text-zinc-600 placeholder:opacity-50 focus:shadow-lg focus:ring-2"
                      readOnly={true}
                    />
                  </label>
                  <label className="flex w-full flex-1 cursor-pointer items-center justify-between rounded-md bg-white/40 p-4 shadow hover:bg-white/20 has-[:checked]:bg-white/30 has-[:checked]:text-indigo-900 has-[:checked]:ring-2 has-[:checked]:ring-indigo-200">
                    <div className="flex items-center">
                      <div className="flex items-center"></div>
                      <h2 className="text-lg">Email</h2>
                    </div>
                    <input
                      type="text"
                      name="serverType"
                      placeholder="dipanshuvishwakarma616@gmail.com"
                      className="w-80 bg-zinc-200 px-4 py-1 font-mono text-zinc-600 shadow-md ring-1 ring-zinc-400 duration-300 outline-none placeholder:text-zinc-600 placeholder:opacity-50 focus:shadow-lg focus:ring-2"
                      readOnly={true}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-1 rounded-lg bg-white px-12 py-4">
            <div className="flex flex-1 flex-col">
              <h1 className="text-2xl font-bold">Delete account</h1>

              <hr className="mt-4 rounded-lg border-2" />

              <div className="mt-4 flex gap-4">
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto rounded">
                  <label className="flex w-full flex-1 cursor-pointer items-center justify-between rounded-md bg-white/40 p-4 shadow hover:bg-white/20 has-[:checked]:bg-white/30 has-[:checked]:text-indigo-900 has-[:checked]:ring-2 has-[:checked]:ring-indigo-200">
                    <div className="flex items-center gap-8">
                      <IconUserX stroke={2} />
                      <div className="">
                        <h2 className="text-lg">Name</h2>
                        <p className="text-stone-600">
                          Your account will be permanently deleted.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setUser(user + 1)}
                      className="cursor-pointer rounded-lg bg-white px-4 py-1 font-mono text-zinc-600 shadow-md ring-1 ring-zinc-400 duration-300 outline-none placeholder:text-zinc-600 placeholder:opacity-50 hover:bg-zinc-200 focus:shadow-lg focus:ring-2"
                    >
                      Delete
                    </button>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
