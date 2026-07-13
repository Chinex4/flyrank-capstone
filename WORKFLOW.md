# AI-Assisted Workflow Comparison

## Feature

I implemented the same notification settings feature twice from the same React baseline. The first version was created on `experiment/vague-settings-form` using one broad prompt: build a clean and functional notification settings form. The second version was created independently on `experiment/spec-driven-settings-form` using a detailed prompt with file references, validation rules, accessibility requirements, edge cases, tests, and explicit verification steps.

## Correctness

The vague version produced a working form, but the branch comparison showed that it did not include an automated test setup or a dedicated validation utility. The specification-driven version added `NotificationSettings.test.jsx`, `test/setup.js`, `phoneValidation.js`, a Vitest configuration, and a `test` script in `package.json`. It also added React Testing Library, Jest DOM, User Event, jsdom, and Vitest as development dependencies.

The precise version handled the SMS workflow more deliberately. The phone field appears only when SMS alerts are enabled, the number is required only in that state, and validation can normalize spaces, hyphens, parentheses, and a leading plus sign before checking the digit length. The test suite covers the field being hidden initially, appearing when SMS is enabled, rejecting invalid input, accepting valid input, and no longer requiring the number after SMS is disabled.

## Accessibility

The detailed prompt required visible labels connected with `htmlFor` and `id`, field-specific errors connected through `aria-describedby`, keyboard support, semantic form markup, focus movement to the first invalid field, and an accessible confirmation message. These requirements made accessibility part of the implementation rather than something left for manual review.

## Branch Differences

The final branch diff covered 10 files, with 3,830 insertions and 1,893 deletions. The larger change came mainly from the lockfile, test dependencies, component restructuring, new tests, and the validation utility. Both branches were created from commit `4750daf`, so the comparison remained fair. The stronger branch was then merged into `main` with a non-fast-forward merge.

## Review Effort and AI Mistake

The main AI mistake I caught in the vague round was treating “functional” as sufficient without proving the important behaviour. It generated no automated tests, so conditional validation and submission feedback still required manual checking. The precise round took more setup, but the plan, tests, and build verification reduced uncertainty and made review faster.

## Rules Learned

I updated the project rules to require connected labels, accessible validation feedback, tests for conditional fields and edge cases, and successful test and production build commands before frontend changes are committed.