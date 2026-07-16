import type { Metadata } from "next";
import { PlaceholderCard } from "@/components/PlaceholderCard";

export const metadata: Metadata = {
  title: "Tasks",
};

export default function TasksPage() {
  return (
    <div className="page-stack">
      <header className="grid gap-3">
        <p className="page-kicker">Planning</p>
        <h1 className="page-title">Study tasks</h1>
        <p className="page-description">
          A place for assignments, reading goals, revision sessions, and
          project milestones.
        </p>
      </header>
      <PlaceholderCard
        title="Task list placeholder"
        description="Task creation, completion, filters, and priority controls will be added in a later iteration."
        items={["Assignment queue", "Reading goals", "Revision checklist"]}
      />
    </div>
  );
}
