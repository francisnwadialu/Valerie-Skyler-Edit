import "./page.css";
import { SiteShell } from "@/components/site/SiteShell";
import { DEFAULT_POSTS } from "@/lib/sanity/defaults";
import type { PostItem } from "@/lib/sanity/types";
import { Head } from "./Head";
import { Notes } from "./Notes";

const PAGE_STYLE = "html body { background: rgb(255, 255, 255); }";

export function JournalPage({
  posts = DEFAULT_POSTS,
}: {
  posts?: PostItem[];
}) {
  return (
    <SiteShell current="/articles" pageStyle={PAGE_STYLE}>
      <div
        data-framer-root=""
        className="framer-s5SxX framer-khn68q"
        style={{ minHeight: "100vh", width: "auto", display: "contents" }}
      >
        <Head />
        <Notes posts={posts} />
      </div>
    </SiteShell>
  );
}
