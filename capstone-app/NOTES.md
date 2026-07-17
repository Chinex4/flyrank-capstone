# Component Accessibility Notes

## Source files compared

- `src/components/playground/accessible-dialog.tsx`
- `src/components/playground/accessible-tabs.tsx`
- `src/components/playground/disclosure.tsx`
- `src/components/playground/playground-demo.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/ui/tabs.tsx`
- `src/components/ui/button.tsx`
- `components.json`
- `package.json`
- `node_modules/@radix-ui/react-dialog/dist/index.d.ts`
- `node_modules/@radix-ui/react-dialog/dist/index.mjs`
- `node_modules/@radix-ui/react-tabs/dist/index.d.ts`
- `node_modules/@radix-ui/react-tabs/dist/index.mjs`

## Manually built components

### Custom dialog

`AccessibleDialog` is a hand-built client component that accepts `title`, `description`, and `triggerLabel` props. It renders a native trigger button, conditionally renders a fixed overlay and `role="dialog"` container, links the title and description through generated ids, marks the dialog with `aria-modal="true"`, locks body scrolling while open, moves initial focus into the dialog, traps `Tab` and `Shift+Tab`, closes on `Escape`, and returns focus to the original trigger on close.

Keyboard interactions checked from the implementation:

- `Enter` or `Space` on the native trigger button opens the dialog.
- Initial focus moves to the first focusable element inside the dialog.
- `Tab` wraps from the last focusable element back to the first.
- `Shift+Tab` wraps from the first focusable element back to the last.
- `Escape` closes the dialog.
- Focus returns to the trigger button after close.

### Custom tabs

`AccessibleTabs` is a hand-built tabs component with an internal tab data array. It renders a `role="tablist"`, native button tabs with `role="tab"`, `aria-selected`, `aria-controls`, roving `tabIndex`, and `role="tabpanel"` panels linked by `aria-labelledby`.

Keyboard interactions checked from the implementation:

- `Tab` moves to the currently selected tab because only that tab has `tabIndex={0}`.
- `ArrowRight` selects and focuses the next tab, wrapping from the last tab to the first.
- `ArrowLeft` selects and focuses the previous tab, wrapping from the first tab to the last.
- `Home` selects and focuses the first tab.
- `End` selects and focuses the last tab.
- Click selects the clicked tab.

### Custom disclosure

`Disclosure` is a hand-built disclosure component that renders a native button connected to a panel by `aria-controls`. It updates `aria-expanded` and toggles the panel with the `hidden` attribute.

Keyboard interactions checked from the implementation:

- `Enter` toggles the disclosure because the control is a native button.
- `Space` toggles the disclosure because the control is a native button.
- `Tab` reaches the disclosure button in normal document order.

## Shadcn reference implementations

The `/playground` page now includes a visually separate "Shadcn reference implementations" section below the hand-built examples. It renders only a shadcn dialog and shadcn tabs example. No shadcn disclosure or accordion was added.

The generated shadcn dialog source in `src/components/ui/dialog.tsx` wraps `radix-ui` Dialog primitives and exposes composable parts: `Dialog`, `DialogTrigger`, `DialogPortal`, `DialogOverlay`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, and `DialogClose`. `DialogContent` always renders through `DialogPortal`, adds an overlay, and includes an optional close button by default. The installed Radix dialog package is `@radix-ui/react-dialog@1.1.19`; its compiled source imports `FocusScope`, `DismissableLayer`, `Portal`, `RemoveScroll`, and `hideOthers`.

The generated shadcn tabs source in `src/components/ui/tabs.tsx` wraps `radix-ui` Tabs primitives and exposes `Tabs`, `TabsList`, `TabsTrigger`, and `TabsContent`. The wrapper defaults `orientation` to `"horizontal"` and forwards the rest of the primitive props. The installed Radix tabs package is `@radix-ui/react-tabs@1.1.17`; its types include `orientation`, `dir`, and `activationMode`, with automatic activation as the default.

## Concrete gaps and differences

- Portal rendering: the custom dialog renders inline where `AccessibleDialog` is used. The shadcn dialog renders `DialogContent` through `DialogPortal`, backed by Radix Portal, so dialog content is moved out of the local page layout.
- Background content isolation: the custom dialog sets `aria-modal="true"` and traps keyboard focus, but it does not hide background content from assistive technology. Radix dialog imports and uses `hideOthers` for modal content.
- Focus and dismissal primitives: the custom dialog manually snapshots focusable elements once when the dialog opens and handles only `Escape` plus tab wrapping. Radix dialog uses `FocusScope` and `DismissableLayer`, which are explicit primitive layers for focus containment, outside interaction handling, and dismissal behavior.
- Scroll locking: the custom dialog directly sets `document.body.style.overflow = "hidden"` and restores the previous value. Radix dialog imports and uses `react-remove-scroll`, including support for keeping dialog content scrollable when it is outside the scroll lock wrapper.
- Tabs options: the custom tabs are horizontal, automatic activation only, and left-to-right only. Radix tabs expose `orientation`, `dir`, and `activationMode`, allowing vertical tab behavior, RTL direction, and manual activation through props.

## Custom component corrections

No custom component mistakes were discovered that required correction. The hand-built component files were not replaced with shadcn components, and their keyboard behavior was preserved.

The custom component prop types contain no `any` types. This was checked with:

```bash
rg -n "\bany\b|TODO|FIXME" src/components/playground src/components/ui components.json package.json
```

The command returned no matches.

## Verification results

- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npm run build`: first attempt failed because the sandbox could not fetch the configured Google Font from `https://fonts.googleapis.com`. The same command was rerun with approved network access and passed.

Final successful production build result:

- Compiled successfully.
- TypeScript finished successfully.
- Static pages generated successfully, including `/playground`.
