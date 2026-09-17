---
title: Profiles and agents
description: Create named entry points and define a native harness, model, skills, and instructions in an agent Markdown file.
---

# Profiles and agents

A profile is a launchable name. It points to an agent definition in your configuration library.

## Library layout

```text
~/.config/agent-farm/
├── profiles/
│   └── planner.yaml
├── agents/
│   └── planner.md
├── skills/
│   └── create-ticket/
│       └── SKILL.md
└── workspaces/
    └── my-project.yaml
```

Run `agent-farm` to create a profile interactively, or edit the files directly.

## Name the profile

Create `profiles/planner.yaml`:

```yaml
agent: planner
```

The profile selects the full identity from `agents/planner.md`. Settings belong in that agent file.

## Define the agent

This example follows the bundled Claude planner. Its referenced skills and child agent are installed by `agent-farm init`.

```yaml filename="agents/planner.md"
---
harness: claude
model:
  name: claude-fable-5-1
  reasoning: high
skills:
  - create-ticket
  - explain-visually
description: Discuss intent and create actionable tickets and briefs.
subagents:
  socrates:
    agent: socrates
    mode: native
---

Discuss the user's intent and create actionable tickets.
Use the create-ticket workflow and its Socrates review.
Begin with the user's request.
```

Use a model available to your account and installed harness.

| Field | Purpose |
| --- | --- |
| `harness` | `claude` or `codex`, the native CLI to launch. |
| `model.name` | The model identifier. |
| `model.reasoning` | The reasoning effort supported by the selected model and harness. |
| `skills` | Directory names in the shared skills library. |
| `description` | A short description of the agent’s work. |
| `subagents` | Explicit child bindings, each with an `agent` and `mode`. |
| Markdown body | Instructions for the agent. |
| `instructions_files` | Optional shared instruction files to prepend. |

The filename gives the agent its identifier. An agent can be a profile’s entry point, a child, or both.

## Inspect and launch

```sh
agent-farm profiles list
agent-farm inspect planner
agent-farm run planner
```

`inspect` returns the resolved configuration graph and source paths. Add `--workspace my-project` to preview project connections too.

## Repository context

Your repository’s `AGENTS.md`, `CLAUDE.md`, and references stay repository-owned. Agent Farm writes the launch bundle into `.agent-farm/generated/` in that repository.

Read [Skills](/docs/skills) and [Child agents](/docs/delegation) to extend the definition.

Sources: [Configuration reference](https://github.com/dcouple/agent-farm/blob/main/CONFIGURATION.md#agents) and [bundled planner](https://github.com/dcouple/agent-farm/blob/main/plugins/dcouple/agents/planner.md).
