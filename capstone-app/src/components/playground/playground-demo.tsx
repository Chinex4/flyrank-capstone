"use client";

import { AccessibleDialog } from "./accessible-dialog";
import { AccessibleTabs } from "./accessible-tabs";
import { Disclosure } from "./disclosure";

export function PlaygroundDemo() {
  return (
    <section
      className="playground-shell"
      aria-label="Hand-built component playground"
    >
      <article className="playground-panel">
        <div className="grid gap-3">
          <p className="page-kicker">Hand-built dialog</p>
          <h2 className="text-2xl font-semibold">Modal dialog</h2>
          <p className="text-secondary-text">
            Opens a modal, moves focus inside it, traps keyboard focus, closes
            with Escape, locks background scrolling, and returns focus to the
            trigger.
          </p>
          <div className="playground-preview">
            <AccessibleDialog
              title="Plan a focused study block"
              description="Use this modal pattern for future forms that need the student's immediate attention without losing page context."
              triggerLabel="Open dialog"
            />
          </div>
        </div>
      </article>

      <article className="playground-panel">
        <div className="grid gap-3">
          <p className="page-kicker">Hand-built tabs</p>
          <h2 className="text-2xl font-semibold">Keyboard tabs</h2>
          <p className="text-secondary-text">
            Uses ARIA tab roles, roving tab index, wrapping arrow navigation,
            Home, End, and click activation.
          </p>
          <div className="playground-preview">
            <AccessibleTabs />
          </div>
        </div>
      </article>

      <article className="playground-panel">
        <div className="grid gap-3">
          <p className="page-kicker">Hand-built disclosure</p>
          <h2 className="text-2xl font-semibold">Expandable content</h2>
          <p className="text-secondary-text">
            Uses a native button with aria-expanded and aria-controls for a
            simple show-and-hide pattern.
          </p>
          <div className="playground-preview">
            <Disclosure
              title="What should this pattern be used for?"
              panelId="studyflow-disclosure-panel"
            >
              Use this for optional details, short explanations, and settings
              summaries where the student should stay in control of what is
              visible.
            </Disclosure>
          </div>
        </div>
      </article>
    </section>
  );
}
