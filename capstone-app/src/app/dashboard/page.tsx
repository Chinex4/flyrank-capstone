import type { Metadata } from "next";
import { PlaceholderCard } from "@/components/PlaceholderCard";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="page-stack">
      <header className="grid gap-3">
        <p className="page-kicker">Overview</p>
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">
          A high-level snapshot of study progress, deadlines, and upcoming
          academic priorities.
        </p>
      </header>
      <PlaceholderCard
        title="Study overview placeholder"
        description="Future versions will summarize task completion, calendar events, and current study streaks."
        items={["Weekly progress", "Upcoming deadlines", "Focus time summary"]}
      />
    </div>
  );
}
