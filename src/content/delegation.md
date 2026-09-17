---
title: Child agents
description: Bind child agents explicitly and choose native or process delegation for each worker.
---

# Child agents

An agent can declare other agents it may delegate to. Every binding names an agent file and chooses a delegation mode.

## Native delegation

The bundled planner binds its Socrates reviewer this way:

```yaml
subagents:
  socrates:
    agent: socrates
    mode: native
```

The parent delegates through its native harness. The child’s definition lives in `agents/socrates.md`.

Native child declarations support one level. Claude native children inherit the parent’s connections. Harness capabilities determine the native delegation behavior.

## Process delegation

Use process mode to launch a separately generated configuration, including for cross-harness children:

```yaml
subagents:
  worker:
    agent: worker
    mode: process
```

The bundled `worker` is a Codex agent. Its definition illustrates a worker with its own model and skill selection:

```yaml
---
harness: codex
model:
  name: gpt-5.6-luna
  reasoning: max
description: Implement assigned work and return verification evidence.
skills:
  - implementer
---

Implement the assigned task, run relevant checks, and report evidence.
Return remaining questions to the parent.
```

Choose a model available to your harness and account. Process children receive their own generated configuration.

## Keep instructions and identities distinct

A document under a skill’s `references/` directory is supporting guidance. A child agent is an identity under `agents/`, selected through an explicit binding.

Inspect the parent graph before launching:

```sh
agent-farm inspect planner --workspace my-project
```

Use separate worktrees when parent and child work should make independent code changes. Generated bundles share access to the repository, credentials, and native global configuration.

Sources: [Agent definitions](https://github.com/dcouple/agent-farm/blob/main/CONFIGURATION.md#agents), [child behavior](https://github.com/dcouple/agent-farm/blob/main/docs/operations.md#child-agents), and [bundled worker](https://github.com/dcouple/agent-farm/blob/main/plugins/dcouple/agents/worker.md).
