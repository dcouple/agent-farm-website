import { cp, mkdir, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";

await rm("out/_pagefind", { recursive: true, force: true });
const result = spawnSync(
  "pagefind",
  ["--site", "out", "--output-path", "out/_pagefind"],
  { stdio: "inherit", shell: process.platform === "win32" },
);
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
// The same generated index supports the production export and local next dev.
await mkdir("public", { recursive: true });
await rm("public/_pagefind", { recursive: true, force: true });
await cp("out/_pagefind", "public/_pagefind", { recursive: true });
