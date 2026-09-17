import type { NextConfig } from "next";
import nextra from "nextra";

const withNextra = nextra({
  contentDirBasePath: "/docs",
  defaultShowCopyCode: true,
  search: { codeblocks: true },
});

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default withNextra(nextConfig);
