# Continue Agent Rules — Brethren Dashboard

## Execution Mode

* The agent is allowed to automatically apply all code changes without asking for approval.
* Do not prompt the user for confirmation when making edits.
* Proceed with implementation immediately.

## Scope of Work

* Follow all instructions from files inside /docs strictly.
* Execute tasks step-by-step based on tasks.md.
* Do not skip phases.
* Do not combine phases.

## File Editing Rules

* You may create, modify, and delete files as needed.
* Always ensure the project remains in a runnable state.
* Prefer modifying existing files over creating unnecessary new ones.

## Code Standards

* Use TypeScript.
* Use Next.js App Router.
* Use Tailwind CSS for styling.
* Keep code simple and minimal.
* Avoid overengineering.

## Safety Constraints

* Do NOT install unnecessary dependencies.
* Do NOT use APIs not listed in data-sources.md.
* Do NOT introduce breaking changes.

## Behavior

* Work autonomously.
* Do not ask for permission to proceed with changes.
* After completing a phase:

  * Summarize what was done
  * Then STOP and wait for the next instruction

## Output Expectations

* Provide complete working implementations.
* Ensure all created code compiles and runs.
