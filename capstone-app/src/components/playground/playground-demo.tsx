"use client";

import { AccessibleDialog } from "./accessible-dialog";
import { AccessibleTabs } from "./accessible-tabs";
import { Disclosure } from "./disclosure";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

      <section
        className="grid gap-4 border-t border-border pt-6"
        aria-labelledby="shadcn-reference-heading"
      >
        <div className="grid gap-2">
          <p className="page-kicker">Shadcn reference implementations</p>
          <h2 id="shadcn-reference-heading" className="text-2xl font-semibold">
            Radix-backed dialog and tabs
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="playground-panel">
            <div className="grid gap-3">
              <h3 className="text-xl font-semibold">Shadcn dialog</h3>
              <div className="playground-preview">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button type="button">Open shadcn dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Review weekly study plan</DialogTitle>
                      <DialogDescription>
                        This reference uses the generated shadcn dialog wrapper
                        around Radix Dialog primitives.
                      </DialogDescription>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">
                      The composed content renders through DialogContent,
                      DialogTitle, DialogDescription, and DialogClose primitives.
                    </p>
                    <DialogFooter>
                      <Button type="button">Save reference</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </article>

          <article className="playground-panel">
            <div className="grid gap-3">
              <h3 className="text-xl font-semibold">Shadcn tabs</h3>
              <div className="playground-preview">
                <Tabs defaultValue="plan" className="w-full">
                  <TabsList aria-label="Shadcn reference tabs">
                    <TabsTrigger value="plan">Plan</TabsTrigger>
                    <TabsTrigger value="focus">Focus</TabsTrigger>
                    <TabsTrigger value="review">Review</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="plan"
                    className="mt-4 rounded-md border border-border bg-background p-4"
                  >
                    Plan upcoming study blocks before the week starts.
                  </TabsContent>
                  <TabsContent
                    value="focus"
                    className="mt-4 rounded-md border border-border bg-background p-4"
                  >
                    Track focused sessions while keeping distractions low.
                  </TabsContent>
                  <TabsContent
                    value="review"
                    className="mt-4 rounded-md border border-border bg-background p-4"
                  >
                    Review progress and adjust the next study block.
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </article>
        </div>
      </section>
    </section>
  );
}
