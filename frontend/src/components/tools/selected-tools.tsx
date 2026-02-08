import {
  IconBrandGithubFilled,
  IconBrandDiscordFilled,
} from "@tabler/icons-react";

import Github from "./tool/github-tool";
import Discord from "./tool/discord-tool";
import * as React from "react";

export default function Selection() {
  const [tool, setTool] = React.useState<"github" | "discord">("github");
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="m-6 flex flex-1 flex-col">
          <div className="flex">
            <div className="flex divide-x overflow-hidden rounded-t-lg border bg-white rtl:flex-row-reverse dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900">
              <button
                className={`cursor-pointer px-4 py-2 font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100 sm:px-6 dark:text-gray-300 dark:hover:bg-gray-800 ${tool === "github" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                onClick={() => setTool("github")}
              >
                <IconBrandGithubFilled />
              </button>

              <button
                className={`cursor-pointer px-4 py-2 font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100 sm:px-6 dark:text-gray-300 dark:hover:bg-gray-800 ${tool === "discord" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                onClick={() => setTool("discord")}
              >
                <IconBrandDiscordFilled />
              </button>
            </div>
          </div>
          <hr className="rounded-tr-lg border-4" />
          <div className="flex flex-1 rounded-b-lg bg-white px-12 py-4">
            {tool === "github" && <Github />}
            {tool === "discord" && <Discord />}
          </div>
        </div>
      </div>
    </>
  );
}
