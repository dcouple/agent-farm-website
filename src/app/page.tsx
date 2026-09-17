import {
  Terminal,
  Layers,
  Wrench,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Stethoscope,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm">
      <pre className="overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function EntryPoint({
  icon: Icon,
  command,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  command: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <code className="text-sm font-semibold">{command}</code>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Badge variant="secondary" className="mb-6">
            Harness Configurator
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Agent Farm
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Switch agent setups for Claude Code and Codex without reinstalling
            everything. Save a setup, pick it, launch.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/dcouple/agent-farm"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              View on GitHub
            </a>
            <a
              href="#get-started"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 text-sm font-medium hover:bg-muted transition-colors"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <Separator />

      {/* What it is */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold tracking-tight">
            What is Agent Farm?
          </h2>
          <p className="mt-4 text-muted-foreground">
            A harness is the full working setup around an AI model —
            instructions, tools, permissions, and checks. Agent Farm lets you
            save different setups and switch between them. Pick a profile, point
            it at a repo, and it opens your native terminal with that
            configuration loaded.
          </p>
        </div>
      </section>

      {/* Primitives */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-10">
            Four building blocks
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Layers className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-lg">Profile</CardTitle>
                </div>
                <CardDescription>
                  A saved setup. &ldquo;When I say <em>planner</em>, I mean: use
                  this AI, with these skills, at this thinking level.&rdquo; Like
                  choosing which worker to send.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Terminal className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-lg">Agent</CardTitle>
                </div>
                <CardDescription>
                  The worker definition. Which AI brain, what it knows, what
                  instructions it follows, who it can delegate to.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-lg">Skill</CardTitle>
                </div>
                <CardDescription>
                  A playbook. Step-by-step instructions for a kind of task: how
                  to create a ticket, review code, or investigate a bug.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Wrench className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-lg">Workspace</CardTitle>
                </div>
                <CardDescription>
                  The toolbox for a project. Which external tools (Linear,
                  Sentry, databases) an agent can reach when working on that
                  project.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Entry points */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-10">
            Four entry points
          </h2>
          <div className="space-y-8">
            <EntryPoint
              icon={Sparkles}
              command="agent-farm init"
              description="First-time setup. Checks prerequisites, installs profiles, explains how everything works, and offers to launch your first session."
            />
            <EntryPoint
              icon={Terminal}
              command="agent-farm"
              description="Interactive profile picker. Create profiles and workspaces, edit existing ones, inspect configs, or just pick and launch."
            />
            <EntryPoint
              icon={HelpCircle}
              command="agent-farm help"
              description="Structured command reference. Works for humans reading a terminal and agents discovering capabilities."
            />
            <EntryPoint
              icon={Stethoscope}
              command="agent-farm doctor"
              description="Diagnostic check. Prerequisites, config directory, profiles, skills, workspaces — all at a glance."
            />
          </div>
        </div>
      </section>

      <Separator />

      {/* Get started */}
      <section id="get-started" className="py-20 bg-muted/30">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            Get started
          </h2>
          <p className="text-muted-foreground mb-6">
            Requires Node 22.15+, macOS or Linux, and the Claude Code and/or
            Codex CLI installed.
          </p>
          <CodeBlock>{`git clone https://github.com/dcouple/agent-farm.git
cd agent-farm
pnpm install --frozen-lockfile && pnpm build
mkdir -p ~/.local/bin
ln -s "$PWD/dist/cli.js" ~/.local/bin/agent-farm
agent-farm init`}</CodeBlock>
          <p className="text-sm text-muted-foreground mt-4">
            Add <code className="text-xs bg-muted px-1 py-0.5 rounded">~/.local/bin</code> to
            your shell&apos;s PATH.
            Then <code className="text-xs bg-muted px-1 py-0.5 rounded">agent-farm init</code> walks
            you through the rest.
          </p>
        </div>
      </section>

      {/* Workspaces */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            Connect your tools
          </h2>
          <p className="text-muted-foreground mb-6">
            A workspace wires MCP connections — Linear, Sentry, PostHog,
            databases — into any profile you launch with it. Create one
            interactively or write a YAML file.
          </p>
          <CodeBlock>{`# Create a workspace interactively
agent-farm
→ + Create new workspace

# Or write ~/.config/agent-farm/workspaces/bloomtext.yaml:
connections:
  linear:
    type: mcp
    url: https://mcp.linear.app/sse
    auth: native
  sentry:
    type: mcp
    url: https://mcp.sentry.dev/sse
    auth: native`}</CodeBlock>
          <p className="text-muted-foreground mt-6 mb-4">
            Authenticate each connection once, then launch with the workspace:
          </p>
          <CodeBlock>{`# Sign in to each MCP (once per harness)
agent-farm mcp login linear --workspace bloomtext --harness codex
agent-farm mcp login sentry --workspace bloomtext --harness codex

# Launch with the workspace attached
agent-farm run astra-planner --workspace bloomtext`}</CodeBlock>
          <p className="text-sm text-muted-foreground mt-4">
            The same workspace works with any profile.
            Run <code className="text-xs bg-muted px-1 py-0.5 rounded">agent-farm help mcp</code> for details.
          </p>
        </div>
      </section>

      {/* Power user */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            For power users
          </h2>
          <CodeBlock>{`agent-farm run planner --directory ~/repos/my-app
agent-farm run implementer --workspace bloomtext \\
  --message "Fix the failing tests"`}</CodeBlock>
          <p className="text-sm text-muted-foreground mt-4">
            Run <code className="text-xs bg-muted px-1 py-0.5 rounded">agent-farm help run</code> for
            all flags.
          </p>
        </div>
      </section>

      <Separator />

      {/* Footer */}
      <footer className="py-12">
        <div className="mx-auto max-w-3xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Built by{" "}
            <a
              href="https://github.com/dcouple"
              className="underline underline-offset-4 hover:text-foreground"
            >
              dcouple
            </a>
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/dcouple/agent-farm"
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="https://github.com/dcouple/agent-farm/blob/main/CONFIGURATION.md"
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Docs
            </a>
            <a
              href="https://github.com/dcouple/skills"
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Skills
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
