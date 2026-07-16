# AI Usage Report

## Application Overview

For this assignment, I created a small React application called Study Task Manager. The application allows users to add study tasks, assign priorities, mark tasks as completed, delete tasks, filter tasks by status, and view the number of total, pending, and completed tasks. The application also uses localStorage to preserve tasks after the browser is refreshed.

## How AI Helped

I used Codex inside Cursor as my development assistant. I first gave it a detailed prompt describing the application requirements, expected behaviour, accessibility requirements, and verification steps.

Codex inspected the existing Vite project, proposed an implementation plan, and generated the main React components and styling. It helped implement task creation, filtering, completion updates, deletion, statistics, form validation, and localStorage persistence.

I later used a second prompt to ask Codex to review the implementation for state management errors, localStorage problems, accessibility issues, whitespace validation, incorrect task counts, and responsive design problems. This review helped identify areas that needed additional verification instead of assuming that the first generated result was correct.

## Manual Testing

I manually tested the application by adding tasks with different priorities, submitting an empty task, changing task completion states, switching between filters, deleting tasks, and refreshing the browser. I also checked the application at different screen sizes.

## Manual Improvements and Corrections

I manually changed the subtitle and empty-state message to make the interface clearer. I also reviewed the task submission logic to ensure whitespace-only values could not be added. The task title is trimmed before validation and before being saved.

These changes showed that AI-generated code still needs human review. Codex accelerated the initial implementation, while manual testing helped confirm that the final application behaved as expected.