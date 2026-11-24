import "./page.css";
import { SiteShell } from "@/components/site/SiteShell";
import { Head } from "./Head";
import { About } from "./About";
import { People } from "./People";
import { Recognition } from "./Recognition";

const PAGE_STYLE = "html body { background: rgb(255, 255, 255); }";

export function StudioPage() {
  return (
    <SiteShell current="/cast" pageStyle={PAGE_STYLE}>
      <div
        data-framer-root=""
        className="framer-msCq8 framer-9A9u7 framer-NTbwR framer-8eqjG framer-qVTq6 framer-1xo20gj"
        style={{ minHeight: "100vh", width: "auto", display: "contents" }}
      >
        <Head />
        <About />
        <People />
        <Recognition />
      </div>
    </SiteShell>
  );
}
