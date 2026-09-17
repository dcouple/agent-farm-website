---
title: CLI reference
description: Agent Farm commands for setup, native launches, headless execution, inspection, skills, workspaces, and plugins.
---

# CLI reference

Use `agent-farm help` to see the commands supported by your installed version. Add a command name for its flags and examples:

```sh
agent-farm help run
```

## Setup and discovery

| Command | Purpose |
| --- | --- |
| `agent-farm init` | Check prerequisites, install defaults, and walk through setup. |
| `agent-farm init --full` | Display the setup content together. |
| `agent-farm` | Open the interactive profile picker and configuration flow. |
| `agent-farm profiles list` | List profiles with resolved agents, harnesses, and models. |
| `agent-farm doctor` | Check prerequisites, configuration, profiles, workspaces, and skills. |
| `agent-farm help [COMMAND]` | Show the command reference. |

## Launch a profile

```sh
agent-farm run NAME [options]
```

| Flag | Value | Behavior |
| --- | --- | --- |
| `--directory` | Repository path | Work in this directory; defaults to the current directory. |
| `--workspace` | Workspace name | Add the workspace’s project connections. |
| `--message` | Quoted text | Supply an initial task. |
| `--exec` | Boolean | Execute headlessly. |
| `--build` | Boolean | Generate a bundle and print its path. |
| `--explain` | Boolean | Print the resolved launch command as JSON. |
| `--config-root` | Library path | Use a configuration library; defaults to `~/.config/agent-farm`. |

`--build` and `--explain` are preparation modes. Use the plain command to launch a session.

```sh
agent-farm run planner --directory ~/repos/my-app
agent-farm run implementer --workspace my-project --message "Fix the failing tests"
agent-farm run planner --workspace my-project --explain
```

### Headless execution

```sh
agent-farm run implementer --exec \
  --message "Fix the failing tests"
```

The native harness runs the task. Review [launch permissions](/docs/troubleshooting#launch-permissions) before automation.

## Inspect a setup

```sh
agent-farm inspect NAME --workspace WORKSPACE
```

The JSON result includes the resolved graph, model settings, skills, children, configured endpoints, and source paths. Use the native MCP view to verify a live connection.

## Manage global skills

```sh
agent-farm set global PROFILE --harness claude
agent-farm status global --harness claude
agent-farm unset global PROFILE --harness claude
```

These commands manage top-level skill links. Use `codex` to target Codex instead. See [Skills](/docs/skills).

## Manage a global workspace

```sh
agent-farm set global --workspace my-project --harness codex
agent-farm status global
agent-farm unset global --workspace my-project --harness codex
```

See [Workspaces](/docs/workspaces#install-a-workspace-globally) for ownership and session behavior.

## Authenticate a remote connection

```sh
agent-farm mcp login CONNECTION --workspace WORKSPACE --harness claude
```

Use the matching connection name from your workspace. Authenticate separately for each harness you use.

## Manage plugins

```sh
agent-farm plugin install
agent-farm plugin validate /path/to/config
agent-farm plugin install /path/to/config
```

Source: [Command definitions](https://github.com/dcouple/agent-farm/blob/main/src/commands.ts). Consult your installed CLI’s help when versions differ.
