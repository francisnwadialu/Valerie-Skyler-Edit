import "./page.css";
import { SiteShell } from "@/components/site/SiteShell";
import { DEFAULT_FAQS } from "@/lib/sanity/defaults";
import type { FaqItem } from "@/lib/sanity/types";
import { Head } from "./Head";
import { Brief } from "./Brief";

const PAGE_STYLE = "html body { background: rgb(255, 255, 255); }";

export function ContactPage({
  faqs = DEFAULT_FAQS.contact,
}: {
  faqs?: FaqItem[];
}) {
  return (
    <SiteShell current="/contact" pageStyle={PAGE_STYLE}>
      <div
        data-framer-root=""
        className="framer-1GJfI framer-8eqjG framer-9A9u7 framer-iqbJV framer-z51fui"
        style={{ minHeight: "100vh", width: "auto", display: "contents" }}
      >
        <Head />
        <Brief faqs={faqs} />
      </div>
    </SiteShell>
  );
}
