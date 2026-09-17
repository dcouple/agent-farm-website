---
title: Skills
description: Create shared SKILL.md workflows, select them for agents, and manage skills in native user directories.
---

# Skills

A skill is a reusable workflow with a name, a description, and instructions. Agents select skills by their directory names.

## Write a playbook

Create `~/.config/agent-farm/skills/review-change/SKILL.md`:

```md
---
name: review-change
description: Review a code change and report actionable findings.
---

Read the task and diff. Trace the affected behavior.
Run the relevant checks. Report findings with file references,
expected behavior, and evidence.
```

Add it to an agent definition:

```yaml
skills:
  - review-change
```

## Keep supporting material nearby

```text
skills/review-change/
├── SKILL.md
├── references/
│   └── review-rubric.md
└── metadata/
    └── codex.yaml
```

Use `references/` for supporting guidance. Keep executable helpers and assets in suitable directories alongside the skill.

For Codex presentation and invocation policy, `metadata/codex.yaml` can contain:

```yaml
interface:
  display_name: Review Change
  short_description: Review code with actionable evidence
  default_prompt: Use $review-change to review this diff.
policy:
  allow_implicit_invocation: true
```

## Native layouts

Agent Farm preserves `SKILL.md` and supporting files. For Codex it translates `metadata/codex.yaml` to the native `agents/openai.yaml` path. Claude’s generated layout uses the skill and its supporting resources.

Keep one metadata filename per skill. Imported skills using the native `agents/openai.yaml` filename remain supported.

## Use skills across repositories

```sh
agent-farm set global planner --harness claude
agent-farm status global --harness claude
agent-farm unset global planner --harness claude
```

`set global PROFILE` installs that profile’s selected top-level skills into the native user skill directory. To launch its model, instructions, and children together, use `agent-farm run PROFILE`.

`status global` shows managed, pre-existing, and changed skills. Unloading removes owned links and preserves source files.

User-level layouts live under `~/.cache/agent-farm/user-skill-layouts/` and link to central sources. Existing file edits remain live. After adding, removing, or renaming files, unload every profile sharing that skill and load them again.

Source: [Skill authoring and native output](https://github.com/dcouple/agent-farm/blob/main/CONFIGURATION.md#skills).
