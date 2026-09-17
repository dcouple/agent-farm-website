---
title: Agent Farm documentation
description: Keep a toolbox ready for each kind of work your AI assistant does, with saved instructions, workflows, references, and tools.
---

# Agent Farm documentation

Think of Agent Farm as a set of toolboxes for your AI assistant. You might keep one for SEO, another for presentations, and another for coding.

For each job, you choose the AI model, give it useful background, and pick the tools it needs. You also give it **skills**: step-by-step workflows, like researching a topic or turning an outline into slides.

Agent Farm saves those choices so you can pick a setup by name and start working in Claude Code or Codex. Your toolbox is ready whenever you need it.

## Start here

1. [Install Agent Farm](/docs/getting-started) and launch your first session.
2. [Create a profile](/docs/profiles) with the model and instructions you want.
3. [Add skills](/docs/skills) for the work you do often.
4. [Connect a workspace](/docs/workspaces) for project tools.

For the thinking behind the product, read [Why Agent Farm](/docs/why-agent-farm).

## The building blocks

Imagine bringing someone in to help with your business. You would tell them what job they have, show them how you like the work done, and give them the material they need. Setting up an AI assistant follows the same pattern.

### An agent gives the worker a job

Someone researching a market needs different guidance from someone building a presentation. An **agent definition** records those choices: which AI app and model to use, what instructions to follow, and which skills and helpers to bring along. You can give each role a setup suited to its work.

### A skill explains how to do the work

Giving someone access to email lets them send a message. They still need a process: understand the recipient, check the facts, draft the message, review it, and send it when approved.

A **skill** is that repeatable workflow, written down for the agent. Tools provide the individual actions; the skill explains how to use them together. When you improve the process, every agent using that skill can benefit.

### A profile makes the setup easy to choose

Once you have a setup you like, give it a name. A **profile** points to an agent definition, so choosing `planner` brings back your planning setup. You can switch jobs and return later with the same choices ready.

### A workspace brings in the project

The same presentation specialist might work for two companies. Each has its own brand guidance, background material, and tools. A **workspace** supplies project instructions and tool connections separately from the agent’s role. You can bring the same way of working to a different project.

### A plugin shares what works

Once you have useful agents and workflows, a teammate may want to use them too. A **plugin** packages profiles, agent definitions, and skills together so they can install the setup and build on it. The bundled plugin gives you a starting set to try and adapt.

## Pick your next step

- [CLI reference](/docs/cli): commands, flags, and examples.
- [Child agents](/docs/delegation): native and process delegation.
- [Plugins](/docs/plugins): install and share configurations.
- [Troubleshooting](/docs/troubleshooting): diagnose setup and connection issues.
- [For AI tools](/docs/ai-tools): Markdown pages and a complete text export.

## Source and scope

These guides are adapted from the [Agent Farm repository](https://github.com/dcouple/agent-farm). Each technical guide links to its source. Commands describe the documented launcher reviewed on September 16, 2026.
