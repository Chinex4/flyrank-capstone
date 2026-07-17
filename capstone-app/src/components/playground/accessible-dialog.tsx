"use client";

import { useEffect, useId, useRef, useState } from "react";

type AccessibleDialogProps = {
  title: string;
  description: string;
  triggerLabel: string;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function AccessibleDialog({
  title,
  description,
  triggerLabel,
}: AccessibleDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const descriptionId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const closeDialog = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const returnFocusElement = triggerRef.current;
    document.body.style.overflow = "hidden";

    const dialog = dialogRef.current;
    const focusableElements = dialog
      ? Array.from(
          dialog.querySelectorAll<HTMLElement>(focusableSelector),
        ).filter((element) => !element.hasAttribute("disabled"))
      : [];

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    window.setTimeout(() => {
      firstFocusable?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      if (!firstFocusable || !lastFocusable) {
        event.preventDefault();
        dialog?.focus();
        return;
      }

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      }

      if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusElement?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="control-button"
        onClick={() => setIsOpen(true)}
      >
        {triggerLabel}
      </button>

      {isOpen ? (
        <div className="dialog-overlay" aria-hidden={false}>
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="dialog-container"
            tabIndex={-1}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id={titleId} className="text-2xl font-semibold">
                  {title}
                </h3>
                <p id={descriptionId} className="mt-2 text-secondary-text">
                  {description}
                </p>
              </div>
              <button
                type="button"
                className="control-button secondary-button shrink-0"
                aria-label="Close dialog"
                onClick={closeDialog}
              >
                Close
              </button>
            </div>
            <div className="grid gap-3 rounded-radius border border-border bg-background p-4">
              <p className="font-semibold">Example dialog content</p>
              <p className="text-secondary-text">
                This space can later hold a study-block form, confirmation
                content, or a focused decision flow.
              </p>
              <button
                type="button"
                className="control-button w-fit"
                onClick={closeDialog}
              >
                Confirm example
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
