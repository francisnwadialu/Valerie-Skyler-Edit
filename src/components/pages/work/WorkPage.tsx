import "./page.css";
import { SiteShell } from "@/components/site/SiteShell";
import { DEFAULT_MUSIC_ITEMS } from "@/lib/sanity/defaults";
import type { MusicItem } from "@/lib/sanity/types";
import { Head } from "./Head";
import { Projects } from "./Projects";

const PAGE_STYLE = "html body { background: rgb(255, 255, 255); }";

export function WorkPage({
  items = DEFAULT_MUSIC_ITEMS,
}: {
  items?: MusicItem[];
}) {
  return (
    <SiteShell current="/music" pageStyle={PAGE_STYLE}>
      <div
        data-framer-root=""
        className="framer-zHztP framer-173ehfy"
        style={{ minHeight: "100vh", width: "auto", display: "contents" }}
      >
        <Head />
        <Projects items={items} />
      </div>
    </SiteShell>
  );
}
