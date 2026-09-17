---
title: Workspaces and MCP
description: Connect remote and local MCP servers, use native sign-in, and share project guidance through a workspace.
---

# Workspaces and MCP

A workspace holds a project’s tool connections and shared guidance. Choose it independently of the repository folder and agent profile.

## Connect a remote server

Create `~/.config/agent-farm/workspaces/my-project.yaml`:

```yaml
instructions: |
  Use the project associated with this workspace.
  Keep operations within the user's requested scope.
connections:
  project-tools:
    type: mcp
    url: https://YOUR-MCP-SERVER.example/mcp
    auth: native
    description: |
      Query tools for this project.
      Select the project before running queries.
```

Replace the example URL with your provider’s MCP endpoint. The description gives the agent context about the service and project selection.

## Authenticate and launch

For the Claude planner:

```sh
agent-farm mcp login project-tools --workspace my-project --harness claude
agent-farm run planner --workspace my-project
```

For Codex, use `--harness codex` during login and a Codex profile such as `astra-planner` at launch.

The native client opens its sign-in flow and stores credentials. Claude and Codex each maintain their own credentials. Stable connection names and URLs support reuse across repositories; changing either can require a fresh login.

## Connect a local server

A connection can launch a local stdio process:

```yaml
connections:
  local-service:
    type: mcp
    command: example-mcp-server
    args: [serve]
    env:
      PROJECT_ID: example-project
    env_vars: [EXAMPLE_API_TOKEN]
```

Use your server’s actual command. It must be on `PATH` or use an absolute path. The process runs in your selected repository.

- `args` passes arguments as an array.
- `env` holds literal, non-secret settings.
- `env_vars` lists variables inherited at launch, keeping secret values in the environment.

Use the service’s own authentication flow for local servers.

## Check the connection

```sh
agent-farm inspect planner --workspace my-project
```

This shows configured endpoints and source files. Check live connectivity in the native harness’s MCP view.

Workspace instructions are prepended to agent instructions. Connection descriptions become a Workspace tools section. Service permissions remain enforced by the provider; project guidance supplies prompt context.

## Install a workspace globally

```sh
agent-farm set global --workspace my-project --harness codex
agent-farm status global
agent-farm unset global --workspace my-project --harness codex
```

Each harness has one global workspace slot. The install includes the workspace’s connections, instructions, and descriptions. Profile and model settings stay under the agent definition.

Agent Farm tracks ownership and checks for conflicts before writing. Start fresh native sessions to pick up changes. On scoped `agent-farm run` launches, explicitly select `--workspace` for the tools you want.

Source: [Workspaces, sign-in, and global installation](https://github.com/dcouple/agent-farm/blob/main/CONFIGURATION.md#workspaces-and-repositories).
