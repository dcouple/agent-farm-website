---
title: Plugins
description: Install and validate reusable packages of Agent Farm profiles, agents, and skills.
---

# Plugins

A plugin packages versioned profiles, agents, skills, and supporting resources. Agent Farm includes a `dcouple` plugin to start your library.

## Install or update the bundled plugin

```sh
agent-farm plugin install
```

`agent-farm init` installs the bundled plugin during first-time setup. After updating your CLI checkout, run `plugin install` to apply its configuration updates.

CLI and plugin versions are independent. Updates check local modifications and report conflicts for you to resolve.

## Install a custom source

```sh
agent-farm plugin validate /path/to/config
agent-farm plugin install /path/to/config
```

Validation checks that profiles resolve, skills exist, and agent definitions parse. Keep credentials and project workspace connections local.

## Authoring workflow

The bundled configuration is authored in [dcouple/skills](https://github.com/dcouple/skills). Its publishing workflow validates the configuration and proposes an updated snapshot under `plugins/dcouple/` in the Agent Farm repository.

Start from the [bundled package](https://github.com/dcouple/agent-farm/tree/main/plugins/dcouple) when exploring the file structure and manifest. Plugins distribute configuration and resources.

Sources: [CLI commands](https://github.com/dcouple/agent-farm/blob/main/src/commands.ts) and [plugin operations](https://github.com/dcouple/agent-farm/blob/main/docs/operations.md#plugin-rollout).
