import "./page.css";
import { SiteShell } from "@/components/site/SiteShell";
import { DEFAULT_MUSIC_ITEMS } from "@/lib/sanity/defaults";
import type { MusicItem } from "@/lib/sanity/types";
import { Head } from "./Head";
import { Story } from "./Story";

const PAGE_STYLE = "html body { background: rgb(255, 255, 255); }";

export function WorkJunoPage({
  item = DEFAULT_MUSIC_ITEMS[0],
}: {
  item?: MusicItem;
}) {
  return (
    <SiteShell current="/music" pageStyle={PAGE_STYLE}>
      <div
        data-framer-root=""
        className="framer-wr7Dv framer-9A9u7 framer-iqbJV framer-8eqjG framer-XzRtY framer-khd8j6"
        style={{ minHeight: "100vh", width: "auto", display: "contents" }}
      >
        <Head item={item} />
        <Story item={item} />
      </div>
    </SiteShell>
  );
}
