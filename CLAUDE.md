# AI Development Instructions

## Working Directory

Work from the repository root.

Do not assume that a backend or frontend directory exists. If the project is later separated into backend and frontend folders, clearly state which folder you are working in before making changes.

## Project Overview

This repository contains the FlyRank capstone project and demonstrates an AI-assisted software development workflow.

## Technology Stack

- Node.js LTS
- JavaScript
- npm
- Git and GitHub

## Coding Conventions

- Write clear and readable JavaScript.
- Use descriptive variable and function names.
- Keep functions small and focused.
- Avoid unnecessary dependencies.
- Add error handling where operations may fail.
- Do not commit secrets, API keys, or environment files.
- Update the README when setup instructions change.

## Git Conventions

Use Conventional Commits:

- `feat:` for new functionality
- `fix:` for bug fixes
- `docs:` for documentation
- `refactor:` for code restructuring
- `test:` for tests
- `chore:` for configuration and maintenance

Each commit should contain one logical change.

## AI Assistant Behaviour

Before changing files:

1. Read the relevant files.
2. Explain the intended change briefly.
3. Avoid unrelated modifications.
4. Preserve the existing project structure.
5. Verify that the project still runs after changes.


## Frontend Form Rules

1. Every form control must have a visible label connected using `htmlFor` and `id`.

2. Validation errors must be displayed beside the relevant field and connected using `aria-describedby`.

3. Conditional fields must only be validated while they are enabled or visible.

4. Form changes must include tests for valid input, invalid input, and conditional behaviour.

5. Before committing frontend changes, run both `npm test` and `npm run build`.

6. AI-generated UI must be checked manually for keyboard navigation, focus behaviour, and accessible status messages.