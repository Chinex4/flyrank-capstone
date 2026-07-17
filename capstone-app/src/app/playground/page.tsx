import type { Metadata } from "next";
import { PlaygroundDemo } from "@/components/playground/playground-demo";

export const metadata: Metadata = {
  title: "Playground",
};

export default function PlaygroundPage() {
  return (
    <div className="page-stack">
      <header className="grid gap-3">
        <p className="page-kicker">Components</p>
        <h1 className="page-title">Accessible playground</h1>
        <p className="page-description">
          Hand-built React components for testing accessible interaction
          patterns before they become product features in StudyFlow.
        </p>
      </header>
      <PlaygroundDemo />
    </div>
  );
}
