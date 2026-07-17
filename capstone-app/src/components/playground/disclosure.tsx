"use client";

import { ReactNode, useState } from "react";

type DisclosureProps = {
  title: string;
  panelId: string;
  children: ReactNode;
};

export function Disclosure({ title, panelId, children }: DisclosureProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="control-button secondary-button w-full justify-between text-left"
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={() => setIsExpanded((current) => !current)}
      >
        <span>{title}</span>
        <span aria-hidden="true">{isExpanded ? "-" : "+"}</span>
      </button>
      <div id={panelId} className="disclosure-panel" hidden={!isExpanded}>
        <p className="text-secondary-text">{children}</p>
      </div>
    </div>
  );
}
