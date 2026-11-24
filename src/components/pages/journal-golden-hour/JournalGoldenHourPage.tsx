import "./page.css";
import { SiteShell } from "@/components/site/SiteShell";
import { DEFAULT_POSTS } from "@/lib/sanity/defaults";
import type { PostItem } from "@/lib/sanity/types";
import { Head } from "./Head";
import { Article } from "./Article";

const PAGE_STYLE = "html body { background: rgb(255, 255, 255); }";

export function JournalGoldenHourPage({
  post = DEFAULT_POSTS[0],
}: {
  post?: PostItem;
}) {
  return (
    <SiteShell current="/articles" pageStyle={PAGE_STYLE}>
      <div
        data-framer-root=""
        className="framer-Kn2PM framer-NTbwR framer-XzRtY framer-8eqjG framer-A1zZ6 framer-vv6u6v"
        style={{ minHeight: "100vh", width: "auto", display: "contents" }}
      >
        <Head post={post} />
        <Article post={post} />
      </div>
    </SiteShell>
  );
}
