import { GuidePage, NextChapter } from "@/components/guide-page";
import { CodeBlock } from "@/components/landing/code-block";
import {
  configurationUrl,
  operationsUrl,
  pageMetadata,
  repository,
} from "@/lib/site";

export const metadata = pageMetadata(
  "Configuration",
  "Read an annotated agent.md example, connect a workspace, and configure shared skills, plugins, and headless Agent Farm launches.",
  "/configuration",
);

const agent = `---
harness: claude                    # Native CLI to launch
model:
  name: claude-fable-5-1            # Model selected by this agent
  reasoning: high                  # Thinking effort
skills:
  - create-ticket                  # Shared skill directory names
  - explain-visually
description: Discuss intent and create actionable tickets and briefs.
subagents:
  socrates:                        # Name the parent uses to delegate
    agent: socrates                 # Another file: agents/socrates.md
    mode: native                   # Delegate through the same harness
---

You are the issue-creation identity using dcouple/skills.
Use the bundled create-ticket skill to discuss work, preserve intent,
and create or update GitHub issues and Grain briefs when authorized
by the user. Follow its Socrates review and finalization gates.
Begin with the user's request. Keep this session focused on discussing
intent and creating tickets.`;
const workspace = `instructions: |
  Use the project associated with this workspace.
connections:
  project-tools:
    type: mcp
    url: https://YOUR-MCP-SERVER.example/mcp
    auth: native
    description: Query the tools for this project.`;

export default function Configuration() {
  return (
    <GuidePage
      path="/configuration"
      number="02"
      title="Plain files. Your choices."
      intro="Your library lives in ~/.config/agent-farm/. The interactive CLI creates the files for you; open them whenever you want to tune a setup."
    >
      <section id="profiles" aria-labelledby="profiles-title">
        <p className="eyebrow">Start with a name</p>
        <h2 id="profiles-title">A profile points to an agent.</h2>
        <p>
          A profile is the entry point you select in the picker or pass to{" "}
          <code>agent-farm run</code>. Its YAML names the agent. Model settings,
          skills, and instructions belong in the agent file.
        </p>
        <CodeBlock
          language="yaml"
          title="profiles/planner.yaml"
          code="agent: planner"
        />
      </section>
      <section id="agent" aria-labelledby="agent-title">
        <p className="eyebrow">Inside an agent.md file</p>
        <h2 id="agent-title">Define the worker.</h2>
        <p>
          This annotated example follows the{" "}
          <a href={`${repository}/blob/main/plugins/dcouple/agents/planner.md`}>
            bundled planner
          </a>
          . Save agent definitions as Markdown; the filename is their
          identifier. Use a model your installed harness and account support.
        </p>
        <CodeBlock language="yaml" title="agents/planner.md" code={agent} />
        <dl className="field-definitions">
          <div>
            <dt>harness</dt>
            <dd>
              <code>claude</code> or <code>codex</code>: the native CLI that
              executes the work.
            </dd>
          </div>
          <div>
            <dt>model</dt>
            <dd>
              The model name and reasoning effort for this agent. Availability
              depends on your native harness and account.
            </dd>
          </div>
          <div>
            <dt>skills</dt>
            <dd>
              Directory names from your shared <code>skills/</code> library.
              Each contains a <code>SKILL.md</code> playbook.
            </dd>
          </div>
          <div>
            <dt>description</dt>
            <dd>A short description of the agent’s job.</dd>
          </div>
          <div>
            <dt>subagents</dt>
            <dd>
              Explicit bindings to other agent files. Each needs a{" "}
              <code>mode</code>: <code>native</code> uses harness delegation;{" "}
              <code>process</code> launches a separate configuration and
              supports cross-harness children.
            </dd>
          </div>
          <div>
            <dt>Markdown body</dt>
            <dd>
              The instructions the agent follows. Optional{" "}
              <code>instructions_files</code> can prepend shared instructions.
            </dd>
          </div>
        </dl>
        <p className="guide-note">
          Install the bundled plugin with <code>agent-farm init</code> to get
          this planner’s referenced skills and Socrates child. Native child
          declarations support one level. See the{" "}
          <a href={configurationUrl}>full configuration reference</a> for
          supported fields and formats.
        </p>
      </section>
      <section id="workspace" aria-labelledby="workspace-title">
        <p className="eyebrow">Add project connections</p>
        <h2 id="workspace-title">A toolbox you can take along.</h2>
        <p>
          Replace the example URL with your provider’s real MCP endpoint.{" "}
          <code>auth: native</code> keeps sign-in in Claude Code or Codex; the
          optional description tells your agent what the connection is for.
        </p>
        <CodeBlock
          title="workspaces/my-project.yaml"
          language="yaml"
          code={workspace}
        />
        <CodeBlock
          title="Sign in, then launch"
          code={`agent-farm mcp login project-tools --workspace my-project --harness claude
agent-farm run planner --workspace my-project`}
        />
        <p>
          Your native harness stores credentials. Connect local stdio servers
          with <code>command</code> and <code>args</code>, and inherit
          environment variables by name through <code>env_vars</code>.{" "}
          <a href={`${configurationUrl}#local-mcp-servers-and-native-sign-in`}>
            Read the local server examples.
          </a>
        </p>
      </section>
      <section id="inspect" aria-labelledby="inspect-title">
        <p className="eyebrow">Check your setup</p>
        <h2 id="inspect-title">See what will be loaded.</h2>
        <CodeBlock
          title="Inspect and diagnose"
          code={`agent-farm inspect planner --workspace my-project
agent-farm doctor`}
        />
        <p>
          <code>inspect</code> shows the resolved graph, settings, and source
          paths. Check live connections in your native harness’s MCP view.
        </p>
      </section>
      <section id="global-skills" aria-labelledby="skills-title">
        <p className="eyebrow">Across repositories</p>
        <h2 id="skills-title">Keep useful skills close.</h2>
        <p>
          Install a profile’s top-level skills into your native user skill
          directory for use across repositories.
        </p>
        <CodeBlock
          title="Load, check, and remove managed skills"
          code={`agent-farm set global planner --harness claude
agent-farm status global --harness claude
agent-farm unset global planner --harness claude`}
        />
        <p>
          Unloading removes managed skill links while retaining the source
          files.{" "}
          <a href={`${configurationUrl}#source-files-versus-native-output`}>
            Read how native skill layouts are generated.
          </a>
        </p>
      </section>
      <section id="plugins" aria-labelledby="plugins-title">
        <p className="eyebrow">Share a library</p>
        <h2 id="plugins-title">Package your setups.</h2>
        <p>
          Plugins distribute versioned profiles, agents, skills, and supporting
          resources. Update the bundled configuration after updating your CLI
          checkout. Updates flag conflicts with local edits.
        </p>
        <CodeBlock
          title="Install the bundled configuration"
          code="agent-farm plugin install"
        />
        <p>
          For a custom source, use{" "}
          <code>agent-farm plugin validate /path/to/config</code> before{" "}
          <code>agent-farm plugin install /path/to/config</code>.
        </p>
      </section>
      <section id="headless" aria-labelledby="headless-title">
        <p className="eyebrow">For scripted work</p>
        <h2 id="headless-title">Run from a script.</h2>
        <p>
          Use <code>--exec</code> with a starting message for a headless run.
        </p>
        <CodeBlock
          title="Run a task headlessly"
          code={`agent-farm run implementer --exec \\
  --message "Fix the failing tests"`}
        />
        <p className="guide-note">
          Launch defaults: Claude <code>--dangerously-skip-permissions</code>;
          Codex <code>--yolo</code>. Review the{" "}
          <a href={operationsUrl}>launch permissions</a> before automating a
          task.
        </p>
      </section>
      <NextChapter href="/compare" label="Next / Find your fit">
        Where Agent Farm fits.
      </NextChapter>
    </GuidePage>
  );
}
