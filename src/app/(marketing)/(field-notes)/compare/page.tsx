import { GuidePage, NextChapter } from "@/components/guide-page";
import { operationsUrl, pageMetadata, repository } from "@/lib/site";

export const metadata = pageMetadata(
  "Compare approaches",
  "Compare Agent Farm, direct native configuration, and Omnigent by workflow and interface. Find the right fit for repeatable agent setups.",
  "/compare",
);

export default function Compare() {
  return (
    <GuidePage
      path="/compare"
      number="03"
      title="Keep the workflow you like."
      intro="Agent Farm is for switching repeatable setups while staying in Claude Code or Codex. Start with the part of your workflow you want to change."
    >
      <section aria-labelledby="fit-title">
        <p className="eyebrow">Find your fit</p>
        <h2 id="fit-title">Three ways to set up work.</h2>
        <p>Choose the approach that fits your workflow.</p>
        <div
          className="comparison-scroll"
          role="region"
          aria-label="Comparison of agent setup approaches"
          tabIndex={0}
        >
          <table className="comparison-table">
            <caption>Native configuration, Agent Farm, and Omnigent</caption>
            <thead>
              <tr>
                <th scope="col">Approach</th>
                <th scope="col">What you manage</th>
                <th scope="col">Where you work</th>
                <th scope="col">A good fit when…</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Native configuration</th>
                <td>Each harness’s own settings, instructions, and tools.</td>
                <td>The native Claude Code or Codex interface.</td>
                <td>You prefer to configure each harness directly.</td>
              </tr>
              <tr className="comparison-featured">
                <th scope="row">
                  Agent Farm<span>Your setups, saved</span>
                </th>
                <td>
                  Named profiles, shared skills, child definitions, and
                  workspace connections.
                </td>
                <td>
                  The native Claude Code or Codex terminal, launched with a
                  generated configuration.
                </td>
                <td>You switch roles or projects and want reusable setups.</td>
              </tr>
              <tr>
                <th scope="row">Omnigent</th>
                <td>
                  Agents and persistent, shareable sessions through Omnigent.
                </td>
                <td>
                  Omnigent’s interface for its Claude Code and Codex
                  integrations, with connected web, mobile, and desktop
                  interfaces.
                </td>
                <td>You want a shared session experience across interfaces.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="guide-note">
          Based on the{" "}
          <a href={`${repository}#how-it-works`}>Agent Farm README</a> and{" "}
          <a href="https://omnigent.ai/docs/interact/terminal">
            Omnigent terminal documentation
          </a>
          , reviewed September 16, 2026. Interfaces and supported integrations
          can change.
        </p>
      </section>
      <section aria-labelledby="scope-title">
        <p className="eyebrow">What Agent Farm owns</p>
        <h2 id="scope-title">Configuration, then launch.</h2>
        <p>
          Agent Farm combines your agent definition, selected skills, children,
          and optional workspace connections into a launch bundle. Claude Code
          or Codex executes the agent turns and supplies the native tools.
        </p>
        <div
          className="scope-flow"
          aria-label="Agent Farm configures, the native harness executes"
        >
          <span>
            <strong>Agent Farm</strong>Assemble your setup
          </span>
          <span aria-hidden="true">→</span>
          <span>
            <strong>Claude Code / Codex</strong>Run the work
          </span>
        </div>
        <p>
          Separate bundles let you launch different configurations in one
          repository. Use separate worktrees for independent code changes.
        </p>
        <p>
          <a href={operationsUrl}>Read the operational notes.</a>
        </p>
      </section>
      <section aria-labelledby="pane-title">
        <p className="eyebrow">A sibling project</p>
        <h2 id="pane-title">Need room for parallel work?</h2>
        <p>
          <a href="https://runpane.com">Pane</a> manages visible agent
          workspaces and terminals. Agent Farm manages the setup you bring to a
          session. Explore Pane when you want to organize multiple pieces of
          work side by side.
        </p>
      </section>
      <NextChapter href="/resources" label="Next / Keep exploring">
        Go straight to the source.
      </NextChapter>
    </GuidePage>
  );
}
