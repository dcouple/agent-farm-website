import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents as getMDXComponents } from "@/mdx-components";
import { pageMetadata } from "@/lib/site";

export const generateStaticParams = generateStaticParamsFor("mdxPath");
export const dynamicParams = false;
const Wrapper = getMDXComponents().wrapper;
type Props = { params: Promise<{ mdxPath?: string[] }> };

export async function generateMetadata({ params }: Props) {
  const { mdxPath = [] } = await params;
  const { metadata } = await importPage(mdxPath);
  const path = `/docs${mdxPath.length ? `/${mdxPath.join("/")}` : ""}`;
  const result = pageMetadata(
    String(metadata.title || "Documentation"),
    String(metadata.description || "Agent Farm documentation"),
    path,
  );
  return {
    ...result,
    alternates: {
      ...result.alternates,
      types: {
        "text/markdown": `/docs/raw/${mdxPath.join("/") || "index"}.md`,
      },
    },
  };
}

export default async function DocsPage(props: Props) {
  const params = await props.params;
  const {
    default: Content,
    toc,
    metadata,
    sourceCode,
  } = await importPage(params.mdxPath);
  const slug = params.mdxPath?.join("/") || "index";
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <Content {...props} params={params} />
      <div className="docs-page-links" data-pagefind-ignore>
        <a href={`/docs/raw/${slug}.md`}>Read as Markdown</a>
        <a href="/llms.txt">AI documentation index</a>
        <a href="/llms-full.txt">All docs in one file</a>
      </div>
    </Wrapper>
  );
}
