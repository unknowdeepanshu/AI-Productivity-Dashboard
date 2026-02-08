import { IconBrandDiscord } from "@tabler/icons-react";
export default function Discord() {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <h1 className="text-3xl font-bold">Discord Tool</h1>

        <div className="mt-4">
          <div className="flex gap-4">
            <label className="flex w-52 cursor-pointer items-center justify-between rounded-md bg-white/40 p-4 shadow hover:bg-white/20 has-[:checked]:bg-white/30 has-[:checked]:text-indigo-900 has-[:checked]:ring-2 has-[:checked]:ring-indigo-200">
              <input
                type="radio"
                name="repoType"
                className="h-5 w-5 checked:border-indigo-500"
              />
              <div className="flex items-center">
                <div className="flex items-center"></div>
                <h2 className="text-lg">Personal Server</h2>
              </div>
            </label>
            <label className="flex w-60 cursor-pointer items-center justify-between rounded-md bg-white/40 p-4 shadow hover:bg-white/20 has-[:checked]:bg-white/30 has-[:checked]:text-indigo-900 has-[:checked]:ring-2 has-[:checked]:ring-indigo-200">
              <input
                type="radio"
                name="serverType"
                className="h-5 w-5 checked:border-indigo-500"
              />
              <div className="flex items-center">
                <div className="flex items-center"></div>
                <h2 className="text-lg">Organization Server</h2>
              </div>
            </label>
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto rounded border p-4">
            <h2 className="text-2xl">Server</h2>
            <input
              type="text"
              placeholder="Enter Discord server name"
              className="mt-4 rounded border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <div className="h-80 space-y-2 overflow-y-auto rounded border p-4">
              <label className="flex w-full cursor-pointer items-center justify-between rounded-md bg-white/40 p-4 shadow hover:bg-white/20 has-[:checked]:bg-white/30 has-[:checked]:text-indigo-900 has-[:checked]:ring-2 has-[:checked]:ring-indigo-200">
                <div className="flex items-center space-x-5">
                  <div className="flex items-center gap-2">
                    <IconBrandDiscord stroke={2} />
                    <span> {""}</span>
                  </div>
                  <h2 className="text-lg">Google Pay</h2>
                </div>
                <input
                  type="radio"
                  name="repoType"
                  className="h-5 w-5 checked:border-indigo-500"
                />
              </label>

              <label className="flex w-full cursor-pointer items-center justify-between rounded-md bg-white/40 p-4 shadow hover:bg-white/20 has-[:checked]:bg-white/30 has-[:checked]:text-indigo-900 has-[:checked]:ring-2 has-[:checked]:ring-indigo-200">
                <div className="flex items-center space-x-5">
                  <div className="flex items-center gap-2">
                    <IconBrandDiscord stroke={2} />
                    <span> {""}</span>
                  </div>
                  <h2 className="text-lg">Google Pay</h2>
                </div>
                <input
                  type="radio"
                  name="repoType"
                  className="h-5 w-5 checked:border-indigo-500"
                />
              </label>
              <label className="flex w-full cursor-pointer items-center justify-between rounded-md bg-white/40 p-4 shadow hover:bg-white/20 has-[:checked]:bg-white/30 has-[:checked]:text-indigo-900 has-[:checked]:ring-2 has-[:checked]:ring-indigo-200">
                <div className="flex items-center space-x-5">
                  <div className="flex items-center gap-2">
                    <IconBrandDiscord stroke={2} />
                    <span> {""}</span>
                  </div>
                  <h2 className="text-lg">Google Pay</h2>
                </div>
                <input
                  type="radio"
                  name="repoType"
                  className="h-5 w-5 checked:border-indigo-500"
                />
              </label>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto rounded border p-4">
            <h2 className="text-2xl">Channels</h2>
            <div className="h-80 space-y-2 overflow-y-auto rounded border p-4">
              <fieldset>
                <div className="space-y-2">
                  <label
                    className="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
                    htmlFor="Option1"
                  >
                    <div className="flex items-center">
                      ​
                      <input
                        id="Option1"
                        className="size-4 rounded border-gray-300"
                        type="checkbox"
                      />
                    </div>

                    <div>
                      <strong className="font-medium text-gray-900">
                        {" "}
                        Manish Tamang
                      </strong>
                    </div>
                  </label>

                  <label
                    className="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
                    htmlFor="Option1"
                  >
                    <div className="flex items-center">
                      ​
                      <input
                        id="Option1"
                        className="size-4 rounded border-gray-300"
                        type="checkbox"
                      />
                    </div>

                    <div>
                      <strong className="font-medium text-gray-900">
                        {" "}
                        Manish Tamang
                      </strong>
                    </div>
                  </label>

                  <label
                    className="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
                    htmlFor="Option2"
                  >
                    <div className="flex items-center">
                      ​
                      <input
                        id="Option2"
                        className="size-4 rounded border-gray-300"
                        type="checkbox"
                      />
                    </div>

                    <div>
                      <strong className="font-medium text-gray-900">
                        {" "}
                        Manish Tamang
                      </strong>
                    </div>
                  </label>

                  <label
                    className="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
                    htmlFor="Option3"
                  >
                    <div className="flex items-center">
                      ​
                      <input
                        id="Option3"
                        className="size-4 rounded border-gray-300"
                        type="checkbox"
                      />
                    </div>

                    <div>
                      <strong className="font-medium text-gray-900">
                        {" "}
                        Manish Tamang
                      </strong>
                    </div>
                  </label>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <hr className="mt-4 border-4" />
        <div className="mt-4 flex justify-end">
          <button className="mt-2 cursor-pointer rounded-lg border-b-[4px] border-blue-600 bg-blue-500 px-6 py-2 text-white transition-all hover:-translate-y-[1px] hover:border-b-[6px] hover:brightness-110 active:translate-y-[2px] active:border-b-[2px] active:brightness-90">
            Apply
          </button>
        </div>
      </div>
    </>
  );
}
