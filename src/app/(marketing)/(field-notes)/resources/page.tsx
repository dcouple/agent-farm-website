import { ArrowUpRight } from "lucide-react";
import { GuidePage, NextChapter } from "@/components/guide-page";
import { operationsUrl, pageMetadata, repository } from "@/lib/site";

export const metadata = pageMetadata(
  "Resources",
  "Find Agent Farm source code, configuration docs, shared skills, example agents, operational notes, and the sibling project Pane.",
  "/resources",
);

const resources = [
  {
    label: "Build & contribute",
    title: "Agent Farm on GitHub",
    description:
      "Source code, installation instructions, issues, and the product overview.",
    href: repository,
  },
  {
    label: "Reference",
    title: "Documentation",
    description:
      "File formats, agent definitions, child bindings, native skill layouts, and MCP connections.",
    href: "/docs",
  },
  {
    label: "The writeup",
    title: "Why Agent Farm",
    description:
      "A setup for each kind of work, with shared playbooks and your native terminal.",
    href: "/docs/why-agent-farm",
  },
  {
    label: "Playbooks",
    title: "Skills & profile sources",
    description:
      "The shared workflows and configuration behind the bundled dcouple plugin.",
    href: "https://github.com/dcouple/skills",
  },
  {
    label: "Practical details",
    title: "Operational notes",
    description:
      "Launch permissions, authentication, generated files, and current limitations.",
    href: operationsUrl,
  },
  {
    label: "Learn by reading",
    title: "Bundled agents",
    description:
      "Real planner, implementer, reviewer, and other definitions to inspect and adapt.",
    href: `${repository}/tree/main/plugins/dcouple/agents`,
  },
  {
    label: "Evidence",
    title: "Verification history",
    description:
      "Recorded component tests and native launch checks, with their verification boundaries.",
    href: `${repository}/blob/main/docs/verification-history.md`,
  },
  {
    label: "Sibling project",
    title: "Pane",
    description:
      "A home for parallel agent workspaces, terminals, and your Git workflow.",
    href: "https://runpane.com",
  },
];

export default function Resources() {
  return (
    <GuidePage
      path="/resources"
      number="04"
      title="Keep exploring."
      intro="The code, the playbooks, and the details behind your setup. A few useful places to go next."
    >
      <section aria-label="Project resources">
        <ul className="resource-list">
          {resources.map((resource) => (
            <li key={resource.title}>
              <a href={resource.href}>
                <div>
                  <span className="eyebrow">{resource.label}</span>
                  <h2>{resource.title}</h2>
                  <p>{resource.description}</p>
                </div>
                <ArrowUpRight size={23} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>
      <NextChapter href="/#get-started" label="Ready when you are">
        Start your first session.
      </NextChapter>
    </GuidePage>
  );
}
