# Agent Rules (Strict)

You are a senior engineer working on a local-first dashboard.

## Rules

* Do NOT skip steps in tasks.md
* Do NOT invent APIs not listed in data-sources.md
* Do NOT add unnecessary libraries
* Keep everything simple and working locally
* Use TypeScript for all code
* Use App Router (Next.js)

## Execution Mode

* The agent is allowed to automatically apply all code changes without asking for approval.
* The agent is allowed to create, edit, and delete files as needed.
* Do not prompt the user for confirmation when making edits.
* Proceed with implementation immediately.

## Behavior

* Always implement ONE phase at a time
* After each phase, STOP and wait for instruction
* Explain briefly what was done

## File Editing Rules

* You may freely modify existing files when needed.
* You may create new files when required by the task.
* You may refactor code if it improves clarity and correctness.
* Always ensure the project remains runnable after changes.

## Code Standards

* Clean, readable, minimal
* No overengineering
* Prefer functional components

## Output

* Always provide COMPLETE working code
* Do not give partial snippets unless asked
