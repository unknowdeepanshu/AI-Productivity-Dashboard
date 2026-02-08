import { IconBrandDiscord, IconBrandGithub } from "@tabler/icons-react";

export default function ToolsAuth() {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="m-6 flex flex-1 flex-col">
          <div className="flex flex-1 rounded-lg bg-white px-12 py-4">
            <div className="flex flex-1 flex-col">
              <h1 className="text-3xl font-bold">Tools</h1>

              <hr className="mt-4 rounded-lg border-2" />

              <div className="mt-4 flex gap-4">
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto rounded border p-4">
                  <div className="flex h-80 gap-3 overflow-y-auto rounded border p-4">
                    <div className="flex h-40 gap-3">
                      {/*  Tool item */}
                      <div className="w-80 transform rounded-lg bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
                        <div className="p-4">
                          <div className="flex items-center gap-2">
                            <IconBrandGithub stroke={2} />
                            <h2 className="text-xl font-semibold">Github</h2>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <button className="cursor-pointer rounded-lg bg-black px-4 py-2 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none">
                              auth
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* discord */}
                      <div className="w-80 transform rounded-lg bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
                        <div className="p-4">
                          <div className="flex items-center gap-2">
                            <IconBrandDiscord stroke={2} />
                            <h2 className="text-xl font-semibold">Discord</h2>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <button className="cursor-pointer rounded-lg bg-black px-4 py-2 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none">
                              auth
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
