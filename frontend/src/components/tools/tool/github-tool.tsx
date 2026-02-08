import { useEffect, useState } from "react";
import { IconBrandGithub, IconX } from "@tabler/icons-react";

export default function Github() {
  const [repoType, setRepoType] = useState<"personal" | "org">("personal");
  const [data, setData] = useState<any>(null);
  const [selectedRepo, setSelectedRepo] = useState<any | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/state/698606009acb1465fe18fcd9")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div>Loading GitHub data…</div>;

  // Personal repos
  const personalRepos = data.repos.filter((repo: any) =>
    repo.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Org repos
  const orgRepos = data.org
    .flatMap((org: any) =>
      org.repos.map((repo: any) => ({
        ...repo,
        orgLogin: org.orgLogin,
      })),
    )
    .filter((repo: any) =>
      repo.name.toLowerCase().includes(search.toLowerCase()),
    );

  const reposToShow = repoType === "personal" ? personalRepos : orgRepos;

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="text-3xl font-bold">GitHub Tool</h1>

      {/* Repo type selector */}
      <div className="mt-4 flex gap-4">
        {["personal", "org"].map((type) => (
          <label
            key={type}
            className="flex w-52 cursor-pointer items-center justify-between rounded-md bg-white/40 p-4 shadow hover:bg-white/20 has-[:checked]:bg-white/30 has-[:checked]:ring-2 has-[:checked]:ring-indigo-200"
          >
            <input
              type="radio"
              name="repoType"
              checked={repoType === type}
              onChange={() => {
                setRepoType(type as any);
                setSelectedRepo(null); // reset when switching
              }}
            />
            <h2 className="text-lg">
              {type === "personal" ? "Personal Repo" : "Organization Repo"}
            </h2>
          </label>
        ))}
      </div>

      {/* ✅ Selected repo preview */}
      {selectedRepo && (
        <div className="mt-4 flex items-center justify-between rounded-lg border bg-indigo-50 p-4">
          <div className="flex items-center gap-3">
            <IconBrandGithub className="text-indigo-600" />
            <div>
              <p className="font-medium">{selectedRepo.name}</p>
              <p className="text-sm text-gray-600">
                {selectedRepo.orgLogin ? `${selectedRepo.orgLogin} / ` : ""}
                {selectedRepo.full_name}
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedRepo(null)}
            className="rounded p-1 hover:bg-indigo-100"
          >
            <IconX size={18} />
          </button>
        </div>
      )}

      {/* Search */}
      <input
        type="text"
        placeholder="Search repo…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-4 rounded border px-4 py-2 focus:ring-2 focus:ring-blue-500"
      />

      {/* Repo list */}
      <div className="mt-4 h-80 space-y-2 overflow-y-auto rounded border p-4">
        {reposToShow.map((repo: any) => (
          <label
            key={repo.full_name}
            className="flex cursor-pointer items-center justify-between rounded-md bg-white/40 p-4 shadow hover:bg-white/20 has-[:checked]:ring-2 has-[:checked]:ring-indigo-200"
          >
            <div className="flex items-center gap-4">
              <IconBrandGithub />
              <div>
                <p className="text-lg font-medium">{repo.name}</p>
                <p className="text-sm text-gray-600">
                  {repo.orgLogin ? `${repo.orgLogin} / ` : ""}
                  {repo.full_name}
                </p>
              </div>
            </div>

            <input
              type="radio"
              name="selectedRepo"
              checked={selectedRepo?.full_name === repo.full_name}
              onChange={() => setSelectedRepo(repo)}
            />
          </label>
        ))}
      </div>

      {/* Action */}
      <div className="mt-4 flex justify-end">
        <button
          disabled={!selectedRepo}
          className="rounded-lg bg-blue-500 px-6 py-2 text-white disabled:opacity-50"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
