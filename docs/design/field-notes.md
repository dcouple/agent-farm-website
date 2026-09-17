# Field Notes landing page

Issue: https://github.com/dcouple/agent-farm-website/issues/1

Approved direction: [Field Notes](field-notes-approved.png), selected by the user with “i love field notes. do it.”

## Intent

Give Agent Farm the same care and personality as the user's Grain examples: a forest-green hero, warm paper sections, golden buttons, original workbench artwork, illustrated feature icons, and landscape contours. Keep the native-terminal product explanation clear. This remains a single page without tracking.

The mockup's incidental navigation, text, and commands are illustrative. Preserve the real installation instructions, four building blocks, four CLI entry points, workspace setup, and power-user examples. Use existing GitHub documentation for explanatory links; no separate writeup URL or verified download count was supplied.

## Implementation plan

- [x] Create a production workbench illustration, editable SVG details, and a matching favicon. Keep terminal text and feature labels in HTML.
- [x] Rebuild the page and typography around the approved desktop/mobile composition, with compact cream sections and two distinct workspace setup steps.
- [x] Add an accessible profile preview, copy buttons with failure feedback, mobile navigation, and reduced-motion-aware reveal effects.
- [x] Verify lint/build, real browser rendering and interactions, keyboard access, and narrow/medium/wide layouts. Independently review the result against this intent.

## Sources

- Product commands and requirements: https://github.com/dcouple/agent-farm/blob/main/README.md
- Workspace formats: https://github.com/dcouple/agent-farm/blob/main/CONFIGURATION.md
- Design references: user-supplied Grain screenshots and https://runpane.com
- Approved mockup generated with the built-in image tool; original prompts remain at `/Users/parsas/.codex/generated_images/agent-farm-mockups/prompts.json`.

## Scope

Implementation and local verification are authorized. Commit, PR, publishing, and deployment are not part of this request.

## Art direction update

The user subsequently requested the pixel-art style from their Agent Farm banner, specifically for the images, and asked to see options for every generated image asset before it is used on the site. The earlier workbench artwork was removed from `public/` and is retained only as an unapproved draft. The Field Notes layout remains approved. The user approved Pixel Workbench (option 1) with “1 for sure”. It is the only generated illustration authorized for use. The terminal remains live HTML; on smaller screens it moves below the artwork to keep the controls readable and easy to tap. Future generated assets still require options and approval before integration.


## Final assets and validation

- Approved pixel artwork: [Pixel Workbench](pixel-workbench-approved.png); generated with the built-in image tool. [Production prompt](pixel-workbench-prompt.txt). Served as `public/images/pixel-workbench.webp` (311 KB).
- Unselected artwork is retained locally at `/Users/parsas/.codex/generated_images/agent-farm-mockups/asset-drafts/`, outside the website's public assets.
- Favicon reuses the site's existing sprout mark. No additional generated illustration was introduced.
- [Desktop screenshot](qa/desktop.png) and [mobile screenshot](qa/mobile.png).
- Production build, ESLint, TypeScript, and whitespace checks passed.
- Browser layout checks at 320, 390, 768, 1024, 1101, 1440, and 1920px: no page-level horizontal overflow or clipped terminal contents.
- Radio target sizes: 36px in detached/mobile layouts; at least 24px within the desktop monitor.
- Verified mouse and arrow-key profile selection; copy success feedback; mobile menu toggle, Escape and anchor dismissal; installation anchor; expandable power-user examples; image loading and valid local anchors. Browser console returned no errors or warnings.
- Content stays visible without reveal JavaScript. CSS disables animation and smooth scrolling for reduced-motion preferences.
- Independent implementation review: ready; its small-target finding was corrected and re-reviewed.

The generated mockup's invented navigation and incomplete sample code were replaced with real GitHub documentation links and complete commands. No separate writeup link or download count was available, so the credibility row uses the project source, creator, and README explanation.


## Copy and depth refinement

User feedback: the hero, small illustrations, and shapes are liked; the rest felt overwhelming and repetitive. Remove the “A little structure. A lot of possibility.” tagline, make the copy concise, and add visual depth. Show mockups before future substantial section redesigns, in addition to the existing image-approval requirement.

Applied a restrained pass within the approved layout: removed the tagline and redundant section footnotes, shortened headings and feature descriptions, simplified the final call to action, and added subtle paper gradients, edge highlights, and soft panel shadows. Existing artwork, commands, and interactions are preserved.

### Interactive CLI demo

At the user's request, the approved pixel monitor now contains a click-through CLI simulation. It follows the launch branch in `../agent-farm/src/interactive.ts`: profile, workspace, repository directory, configuration build, and handoff to the native CLI. The three profiles remain illustrative demo choices; the sample BloomText workspace matches the page's Linear/Sentry example. Nothing executes or connects to external tools.

Choices support clicks, Tab, arrow keys, Home/End, and Enter. Escape/Back returns to the previous step; Restart cancels the simulated build timer. Repository input rejects blank/whitespace-only values. Focus follows explicit transitions; the delayed completion does not steal focus after the visitor leaves the demo. At widths up to 1280px, the existing detached terminal treatment provides room for accessible controls.

Verified profile and workspace choices, custom repository input, empty input validation, keyboard selection, Escape, restart during build, and completion for multiple profiles. Checked the tightest embedded layout at 1281px and mobile at 390px. Lint and production build passed. No image assets changed.

### Codex session and simpler-page exploration

Removed the visible DEMO badge and “Simulated · nothing runs” text at the user's request. Launch now progresses through bundle preparation into a Codex-style screen, with the chosen directory and profile, a clickable sample prompt, and a short streamed response. Scripted content remains client-only; timers clean up on restart/unmount and reduced motion skips streaming. Verified launch, prompt response, desktop screen fit at 1281px and mobile fit at 390px; lint/build pass.

User also flagged that the custom SVG building-block icons differ from the pixel hero and that the page still feels busier than the Agent Farm README. Those icons were drawn in `artwork.tsx`, not sourced from the README. Proposed three preview-only simplifications using the existing README pixel shed/workflow as references: Lean README, One shared setup, Pocket guide. Drafts are under `/Users/parsas/.codex/generated_images/agent-farm-mockups/simpler-landing/`. No lower-section redesign or new artwork has been integrated pending the user's choice. Generated mockups are layout concepts; small code/type details and removed demo badges may drift from the implementation.

### Approved option 2 + session section, published

User selected option 2, replacing its installation section with option 3's “From setup to session.” Implemented the pixel shed with four short definitions, then compact init/launch commands and an expandable source-install guide. Reused the original README shed rather than the mockup's regenerated cutout. Removed the old SVG cards, command grid, workspace tutorial, proof strip, and closing CTA from the page. Hero and interactive Codex sample are preserved.

User explicitly requested deployment to their dcouple Google Cloud account and getagentfarm.com, and then approved going live and optimizing image sizes. Deployed to a new isolated `dcouple-agent-farm` project under dcouple.ai. Configured apex and www custom domains; DNS is to be entered by the user in Namecheap. See `docs/deployment.md` for exact records, caching, asset sizes, and update instructions. No new generated artwork was added.

The user requested an Open source badge in the hero. Added a subtle pill above the headline linking to the repository, and published it. No additional art or lower-section redesign. Lighthouse on the optimized site scored mobile 95/100/100/100 and desktop 100/100/100/100 before this final badge-only update. User-entered Namecheap DNS verified against authoritative nameservers; HTTPS provisioning remains automatic and pending propagation.
