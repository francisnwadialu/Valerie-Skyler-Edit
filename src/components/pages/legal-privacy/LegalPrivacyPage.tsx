import "./page.css";
import { SiteShell } from "@/components/site/SiteShell";
import { Head } from "./Head";
import { Text } from "./Text";

const PAGE_STYLE = "html body { background: rgb(255, 255, 255); }";

export function LegalPrivacyPage() {
  return (
    <SiteShell current="" pageStyle={PAGE_STYLE}>
      <div
        data-framer-root=""
        className="framer-lXguv framer-8eqjG framer-XzRtY framer-ft8eso"
        style={{ minHeight: "100vh", width: "auto", display: "contents" }}
      >
        <Head />
        <Text />
      </div>
    </SiteShell>
  );
}
