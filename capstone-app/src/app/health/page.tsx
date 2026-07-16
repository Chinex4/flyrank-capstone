import type { Metadata } from "next";
import { HealthStatus } from "@/components/HealthStatus";
import { PlaceholderCard } from "@/components/PlaceholderCard";

export const metadata: Metadata = {
  title: "Health",
};

export default function HealthPage() {
  return (
    <div className="page-stack">
      <header className="grid gap-3">
        <p className="page-kicker">Operations</p>
        <h1 className="page-title">Application health</h1>
        <p className="page-description">
          A browser-side status check for the StudyFlow application health
          endpoint.
        </p>
      </header>
      <PlaceholderCard
        title="Health status placeholder"
        description="This screen currently verifies that the app health endpoint is reachable from the browser."
        items={["Route handler", "Client fetch", "Failure-safe rendering"]}
      />
      <HealthStatus />
    </div>
  );
}
