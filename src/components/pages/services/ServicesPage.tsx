import "./page.css";
import { SiteShell } from "@/components/site/SiteShell";
import { DEFAULT_FAQS, DEFAULT_SHOW_ITEMS } from "@/lib/sanity/defaults";
import type { FaqItem, ShowItem } from "@/lib/sanity/types";
import { Head } from "./Head";
import { Crafts } from "./Crafts";
import { Questions } from "./Questions";

const PAGE_STYLE = "html body { background: rgb(255, 255, 255); }";

export function ServicesPage({
  shows = DEFAULT_SHOW_ITEMS,
  faqs = DEFAULT_FAQS.shows,
}: {
  shows?: ShowItem[];
  faqs?: FaqItem[];
}) {
  return (
    <SiteShell current="/shows" pageStyle={PAGE_STYLE}>
      <div
        data-framer-root=""
        className="framer-Pypst framer-9A9u7 framer-NTbwR framer-iqbJV framer-8eqjG framer-A1zZ6 framer-1p4abbf"
        style={{ minHeight: "100vh", width: "auto", display: "contents" }}
      >
        <Head />
        <Crafts items={shows} />
        <Questions items={faqs} />
      </div>
    </SiteShell>
  );
}
