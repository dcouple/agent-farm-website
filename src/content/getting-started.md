---
title: Get started
description: Install Agent Farm from source, initialize your profiles, and launch your first native coding session.
---

# Get started

## Prerequisites

- macOS or Linux.
- Node.js 22.15 or later.
- pnpm and Git.
- Claude Code or Codex installed and authenticated.

Use a repository you are comfortable giving your agent access to. Current launches enable Claude’s `--dangerously-skip-permissions` or Codex’s `--yolo` by default. See [launch permissions](/docs/troubleshooting#launch-permissions) for details.

## Install from source

```sh
git clone https://github.com/dcouple/agent-farm.git
cd agent-farm
pnpm install --frozen-lockfile && pnpm build
mkdir -p ~/.local/bin
ln -s "$PWD/dist/cli.js" ~/.local/bin/agent-farm
```

Keep the checkout: the command links to its built CLI. Add `~/.local/bin` to your shell’s `PATH`:

```sh
export PATH="$HOME/.local/bin:$PATH"
```

Put that export in your shell configuration, such as `~/.zshrc`, to keep it in future terminals.

## Initialize your library

```sh
agent-farm init
```

The walkthrough checks prerequisites, installs the default plugin’s profiles and skills, and offers to launch your first session.

Your configuration library lives in `~/.config/agent-farm/`.

## Launch a session

```sh
cd ~/repos/my-app
agent-farm
```

Choose a profile, optionally select a workspace, and confirm the repository. Agent Farm prepares a bundle under `.agent-farm/generated/` and opens the chosen native CLI.

From your project folder, you can launch a known profile directly:

```sh
agent-farm run planner
```

Use your repository’s `.gitignore` to exclude `.agent-farm/generated/` from version control. Keep bundles used by active sessions.

## Check your setup

```sh
agent-farm profiles list
agent-farm doctor
agent-farm help run
```

Next, [learn how profiles select agents](/docs/profiles) or [connect project tools](/docs/workspaces).

Source: [Installation and entry points](https://github.com/dcouple/agent-farm/blob/main/README.md).
