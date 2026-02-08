const tech = [
  { name: "Next.js", desc: "App Router" },
  { name: "Tambo AI", desc: "Generative UI" },
  { name: "Supabase", desc: "Database" },
  { name: "Drizzle", desc: "ORM" },
  { name: "Better Auth", desc: "Authentication" },
  { name: "Tailwind", desc: "Styling" },
];

export function TechStack() {
  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-3xl font-semibold">Tech Stack</h2>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {tech.map((item) => (
            <div
              key={item.name}
              className="rounded-xl border bg-white p-6 transition hover:shadow-sm"
            >
              <h3 className="font-semibold">{item.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
