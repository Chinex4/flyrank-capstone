import type { Metadata } from "next";
import { PlaceholderCard } from "@/components/PlaceholderCard";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <div className="page-stack">
      <header className="grid gap-3">
        <p className="page-kicker">Preferences</p>
        <h1 className="page-title">Settings</h1>
        <p className="page-description">
          Account preferences and notification controls for the StudyFlow
          workspace.
        </p>
      </header>
      <PlaceholderCard
        title="Settings placeholder"
        description="Profile details, reminder preferences, and notification rules will be added later."
        items={["Account profile", "Notification timing", "Reminder channels"]}
      />
    </div>
  );
}
