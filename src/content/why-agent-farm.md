---
title: Why Agent Farm
description: Give SEO, presentations, email, and coding their own focused agent setups, with the models, skills, references, and tools each job needs.
---

# Why Agent Farm

You want an agent to help with SEO. You choose a model, give it background on your site, and connect your search data. A skill walks it through the work: research what people search for, improve a page, and review the result.

Later, you need a presentation. Your agent needs brand guidelines, slide tools, and a workflow for turning an idea into a clear story. For email, it needs to understand the audience, follow your writing style, and work through drafting, review, and sending.

Tools let the agent take actions. Skills bring those actions together into a repeatable workflow. References give it background. Each job calls for a different mix.

Loading every workflow and reference into every session makes more instructions compete for the agent’s attention. A focused setup gives it the context that matters for the work at hand.

Agent Farm lets you save those choices. Pick the setup for the job and get to work.

## Give the job a name

A profile such as `planner` selects an agent definition. That definition holds the harness, model, thinking effort, skills, and instructions for the job.

```sh
agent-farm run planner
agent-farm run implementer
```

The name is a small promise: this is the setup you chose for this kind of work. You can inspect and edit it in plain files.

## Keep the playbooks together

A skill captures a workflow you want to repeat: investigate a bug, preserve intent in a ticket, or review a change. Agent definitions select skills from a shared library.

That gives you a place to improve the workflow and a choice about which agents use it.

## Bring the project’s tools

The worker and the project are separate choices. A workspace adds the project’s instructions and MCP connections to a launch.

```sh
agent-farm run planner --workspace my-project
```

For a connected project, a planning session can use an issue tracker alongside the repository. For another project, choose a different workspace while keeping the same planner.

## Keep your native terminal

Agent Farm assembles a launch bundle. Claude Code or Codex runs the conversation and provides the tools you use to do the work.

Your repository keeps its own instructions and references. Your native harness handles authentication. You keep editing the setup as your work changes.

## Start small

Start with the bundled profiles. Run a real task. When you find instructions or a playbook worth repeating, save them in the library.

[Launch your first session](/docs/getting-started), then [make the setup yours](/docs/profiles).

Further reading: [Agent Farm overview](https://github.com/dcouple/agent-farm/blob/main/README.md) and [configuration reference](https://github.com/dcouple/agent-farm/blob/main/CONFIGURATION.md).
