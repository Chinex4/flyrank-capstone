"use client";

import { useEffect, useState } from "react";

type HealthData = {
  status: string;
  application: string;
  timestamp: string;
  environment: string;
};

type HealthState =
  | { phase: "loading" }
  | { phase: "success"; data: HealthData }
  | { phase: "error"; message: string };

export function HealthStatus() {
  const [health, setHealth] = useState<HealthState>({ phase: "loading" });

  useEffect(() => {
    let isMounted = true;

    async function loadHealth() {
      try {
        const response = await fetch("/api/health", { cache: "no-store" });

        if (!response.ok) {
          throw new Error(`Health check failed with ${response.status}`);
        }

        const data = (await response.json()) as HealthData;

        if (isMounted) {
          setHealth({ phase: "success", data });
        }
      } catch (error) {
        if (isMounted) {
          setHealth({
            phase: "error",
            message:
              error instanceof Error
                ? error.message
                : "The health check could not be loaded.",
          });
        }
      }
    }

    loadHealth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (health.phase === "loading") {
    return (
      <section className="placeholder-card" aria-live="polite">
        <p className="font-medium">Checking application health...</p>
      </section>
    );
  }

  if (health.phase === "error") {
    return (
      <section className="placeholder-card" aria-live="polite">
        <h2 className="text-2xl font-semibold">Health check unavailable</h2>
        <p className="mt-2 text-secondary-text">{health.message}</p>
      </section>
    );
  }

  return (
    <section className="placeholder-card" aria-live="polite">
      <div className="grid gap-4">
        <div>
          <p className="page-kicker">Live status</p>
          <h2 className="mt-2 text-2xl font-semibold">
            {health.data.application} is {health.data.status}
          </h2>
        </div>
        <dl className="placeholder-grid">
          <div className="metric-card">
            <dt className="text-sm text-secondary-text">Status</dt>
            <dd className="mt-1 font-semibold">{health.data.status}</dd>
          </div>
          <div className="metric-card">
            <dt className="text-sm text-secondary-text">Application</dt>
            <dd className="mt-1 font-semibold">{health.data.application}</dd>
          </div>
          <div className="metric-card">
            <dt className="text-sm text-secondary-text">Environment</dt>
            <dd className="mt-1 font-semibold">{health.data.environment}</dd>
          </div>
          <div className="metric-card">
            <dt className="text-sm text-secondary-text">Timestamp</dt>
            <dd className="mt-1 font-semibold">
              {new Date(health.data.timestamp).toLocaleString()}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
