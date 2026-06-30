import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

/**
 * Renders MDX/Markdown content (from the DB) on the server.
 * GFM (tables, task lists) + syntax highlighting via highlight.js.
 */
export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeHighlight],
        },
      }}
    />
  );
}
