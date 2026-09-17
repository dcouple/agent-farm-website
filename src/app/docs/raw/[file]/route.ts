import { getDocs, markdownDocument } from "@/lib/docs";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getDocs().map((doc) => ({ file: `${doc.slug}.md` }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;
  const doc = getDocs().find((item) => `${item.slug}.md` === file);
  if (!doc) return new Response("Page not found", { status: 404 });
  return new Response(markdownDocument(doc), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
