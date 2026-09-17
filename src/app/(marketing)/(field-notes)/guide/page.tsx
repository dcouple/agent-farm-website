import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Boxes,
  Check,
  FolderGit2,
  GitBranch,
  Layers,
  Plug,
  Settings2,
  SlidersHorizontal,
  Terminal,
  WandSparkles,
} from "lucide-react";
import { GuidePage, NextChapter } from "@/components/guide-page";
import { CodeBlock } from "@/components/landing/code-block";
import {
  configurationUrl,
  operationsUrl,
  pageMetadata,
  repository,
} from "@/lib/site";

export const metadata = pageMetadata(
  "Field guide",
  "Explore Agent Farm features, follow a four-step launch walkthrough, and see what workspace connections add to your agent setup.",
  "/guide",
);

const features = [
  {
    icon: SlidersHorizontal,
    title: "Switch profiles",
    text: "Choose a saved agent with its own model, instructions, and skills.",
    href: "/configuration#profiles",
  },
  {
    icon: WandSparkles,
    title: "Set up interactively",
    text: "Let init check prerequisites and install your starting profiles and skills.",
    href: `${repository}#install`,
  },
  {
    icon: Plug,
    title: "Connect a workspace",
    text: "Bring a project’s remote or local MCP tools into a launch.",
    href: "#workspaces",
  },
  {
    icon: BookOpen,
    title: "Manage global skills",
    text: "Load a profile’s skills into your native user directory across repositories.",
    href: "/configuration#global-skills",
  },
  {
    icon: Boxes,
    title: "Install configuration plugins",
    text: "Share versioned profiles, agents, and skills; detect conflicts with local edits.",
    href: "/configuration#plugins",
  },
  {
    icon: Terminal,
    title: "Run headlessly",
    text: "Use headless execution with an initial message for scripted work.",
    href: "/configuration#headless",
  },
  {
    icon: GitBranch,
    title: "Declare child agents",
    text: "Choose native delegation or a separately launched process for each child.",
    href: `${configurationUrl}#agents`,
  },
  {
    icon: Layers,
    title: "Use either harness",
    text: "Launch Claude Code or Codex with the configuration your agent selects.",
    href: "/compare",
  },
  {
    icon: Settings2,
    title: "Inspect before launching",
    text: "Preview a profile’s settings, connections, and source files.",
    href: "/configuration#inspect",
  },
  {
    icon: FolderGit2,
    title: "Keep repository context",
    text: "Work alongside the repo’s own AGENTS.md, CLAUDE.md, and references.",
    href: `${configurationUrl}#workspaces-and-repositories`,
  },
];

const steps = [
  {
    title: "Pick a profile",
    body: "Choose the worker and playbooks for this job.",
    label: "01 / Profile",
    lines: ["$ agent-farm", "› planner", "  implementer", "  reviewer"],
  },
  {
    title: "Add a workspace",
    body: "Choose project connections when you need them.",
    label: "02 / Workspace · optional",
    lines: [
      "Project tools",
      "  None",
      "› my-project",
      "  MCP connections included",
    ],
  },
  {
    title: "Point at your repo",
    body: "Choose where the agent will read and work on files.",
    label: "03 / Repository",
    lines: [
      "Working directory",
      "~/repos/my-app",
      "",
      "Profile + tools + repo ✓",
    ],
  },
  {
    title: "Open your terminal",
    body: "Agent Farm builds the bundle and opens the selected native CLI.",
    label: "04 / Native session",
    lines: [
      ".agent-farm/generated/",
      "  instructions · skills · tools",
      "",
      "Claude Code or Codex →",
    ],
  },
];

export default function Guide() {
  return (
    <GuidePage
      path="/guide"
      number="01"
      title="A setup for every kind of work."
      intro="A planner needs different instructions from an implementer. Save those choices once, then take the right setup into your next repository."
    >
      <section aria-labelledby="features-title">
        <p className="eyebrow">The toolkit</p>
        <h2 id="features-title">Small pieces. Useful together.</h2>
        <ul className="feature-list">
          {features.map(({ icon: Icon, title, text, href }) => (
            <li key={title}>
              <Icon size={22} aria-hidden="true" />
              <div>
                <h3>
                  <a href={href}>
                    {title}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section id="walkthrough" aria-labelledby="walkthrough-title">
        <p className="eyebrow">From setup to session</p>
        <h2 id="walkthrough-title">Four choices. Then you’re in.</h2>
        <p>
          After <code>agent-farm init</code>, launch the interactive picker with{" "}
          <code>agent-farm</code>. This illustrated sequence shows the path to a
          session.
        </p>
        <ol className="walkthrough">
          {steps.map((step) => (
            <li key={step.title}>
              <div className="walkthrough-screen">
                <span>{step.label}</span>
                <pre>{step.lines.join("\n")}</pre>
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="guide-note">
          Illustrative screens. Your installed profiles and workspaces determine
          the choices shown.
        </p>
        <CodeBlock
          title="Already know your setup?"
          code="agent-farm run planner --workspace my-project"
        />
        <p className="guide-note">
          Review the <a href={operationsUrl}>launch permissions</a> before your
          first run.
        </p>
      </section>
      <section id="workspaces" aria-labelledby="workspace-title">
        <p className="eyebrow">The same worker, more context</p>
        <h2 id="workspace-title">Give the project a toolbox.</h2>
        <p>
          A repository tells the agent where to work. A workspace supplies named
          connections to external tools, independently of that folder.
        </p>
        <div className="workspace-pair">
          <article>
            <span className="eyebrow">Profile + repository</span>
            <h3>Work from the repository.</h3>
            <ul>
              <li>
                <Check size={16} aria-hidden="true" />
                Your selected model and instructions
              </li>
              <li>
                <Check size={16} aria-hidden="true" />
                Selected skills and child agents
              </li>
              <li>
                <Check size={16} aria-hidden="true" />
                Repository files and local context
              </li>
            </ul>
            <p>
              For example: plan a refactor from the code and tests already in
              the repo.
            </p>
          </article>
          <article className="workspace-connected">
            <span className="eyebrow">Add a workspace</span>
            <h3>Bring project tools along.</h3>
            <ul>
              <li>
                <Check size={16} aria-hidden="true" />
                Everything in the profile
              </li>
              <li>
                <Plug size={16} aria-hidden="true" />
                Your configured issue tracker
              </li>
              <li>
                <Plug size={16} aria-hidden="true" />
                Your configured error or analytics tools
              </li>
            </ul>
            <p>
              For example: use a connected tracker and error service to
              investigate a reported bug.
            </p>
          </article>
        </div>
        <p className="guide-note">
          Add your provider’s MCP endpoints and authenticate them first.
          Agent-defined connections and native global tools can also apply.
        </p>
        <Link className="text-link" href="/configuration#workspace">
          Build a workspace configuration{" "}
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </section>
      <NextChapter href="/configuration" label="Next / Configuration">
        See what goes into a setup.
      </NextChapter>
    </GuidePage>
  );
}
