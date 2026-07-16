import Link from "next/link";
import { PlaceholderCard } from "@/components/PlaceholderCard";

export default function Home() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "StudyFlow";

  return (
    <div className="page-stack">
      <section className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] md:items-center">
        <div className="grid gap-5">
          <p className="page-kicker">Student productivity</p>
          <h1 className="page-title">{appName}</h1>
          <p className="page-description">
            A focused workspace for organizing study tasks, reviewing upcoming
            academic commitments, and keeping account preferences in one place.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex min-h-11 items-center justify-center rounded-radius bg-accent px-5 py-3 font-semibold text-white transition hover:bg-accent-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Open dashboard
            </Link>
            <Link
              href="/tasks"
              className="inline-flex min-h-11 items-center justify-center rounded-radius border border-border bg-surface px-5 py-3 font-semibold text-primary-text transition hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              View tasks
            </Link>
          </div>
        </div>
        <PlaceholderCard
          title="Today at a glance"
          description="This placeholder will become a launch summary for your study day."
          items={["3 focus blocks planned", "2 assignments queued", "1 exam reminder"]}
        />
      </section>
    </div>
  );
}
