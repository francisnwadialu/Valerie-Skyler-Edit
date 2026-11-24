import "./page.css";
import { SiteShell } from "@/components/site/SiteShell";
import { resolveImageUrl } from "@/lib/sanity/client";
import { DEFAULT_MUSIC_ITEMS, DEFAULT_POSTS } from "@/lib/sanity/defaults";
import type { MusicItem, PostItem } from "@/lib/sanity/types";
import type { WorkItem } from "@/components/widgets/PinnedWork";
import { Hero } from "./Hero";
import { ThreeHours } from "./ThreeHours";
import { SelectedWork } from "./SelectedWork";
import { Index } from "./Index";
import { Recognition } from "./Recognition";

const PAGE_STYLE =
  "html body { background: var(--token-389dc5de-9e21-428a-b8a4-b3ac4289a539); }";

export function HomePage({
  posts = DEFAULT_POSTS,
  musicItems = DEFAULT_MUSIC_ITEMS,
}: {
  posts?: PostItem[];
  musicItems?: MusicItem[];
}) {
  const featured = musicItems.filter((item) => item.featuredOnHome !== false);
  const pinnedSource = (featured.length > 0 ? featured : musicItems).slice(
    0,
    5,
  );

  const pinnedItems: WorkItem[] = pinnedSource.map((item) => ({
    title: item.title,
    tags: item.tags.replace(/\s*·\s*/g, ", "),
    year: item.year,
    time: item.time,
    link:
      item.title === "Juno" && process.env.NEXT_PUBLIC_FOURTHWALL_JUNO_URL
        ? process.env.NEXT_PUBLIC_FOURTHWALL_JUNO_URL
        : item.title === "Alder Hotel" && process.env.NEXT_PUBLIC_FOURTHWALL_ALDER_URL
          ? process.env.NEXT_PUBLIC_FOURTHWALL_ALDER_URL
          : `/music/${item.slug}`,
    image: resolveImageUrl(
      item.coverImage,
      "/assets/Y2X7sGZkQ49oUsVM1KLmOJ5xHU.webp",
      2000,
    ),
  }));

  return (
    <SiteShell current="/" pageStyle={PAGE_STYLE}>
      <div
        data-framer-root=""
        className="framer-K0snl framer-NTbwR framer-A1zZ6 framer-72rtr7"
        style={{ minHeight: "100vh", width: "auto", display: "contents" }}
      >
        <Hero />
        <ThreeHours />
        <SelectedWork items={pinnedItems} />
        <Index />
        {/* Statement, Reel, Evening, Crafts, the sky ribbon (Clients), Voice and the
            Journal teaser are archived at the owner's request but kept intact — see
            ./ARCHIVE.md to bring one back. */}
        <Recognition />
      </div>
    </SiteShell>
  );
}
