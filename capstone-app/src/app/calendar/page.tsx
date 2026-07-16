import type { Metadata } from "next";
import { PlaceholderCard } from "@/components/PlaceholderCard";

export const metadata: Metadata = {
  title: "Calendar",
};

export default function CalendarPage() {
  return (
    <div className="page-stack">
      <header className="grid gap-3">
        <p className="page-kicker">Schedule</p>
        <h1 className="page-title">Study calendar</h1>
        <p className="page-description">
          A calendar view for classes, exams, study blocks, and important
          academic dates.
        </p>
      </header>
      <PlaceholderCard
        title="Calendar placeholder"
        description="Month, week, and agenda views will be implemented after the base route structure is stable."
        items={["Class schedule", "Exam dates", "Study blocks"]}
      />
    </div>
  );
}
