// Shared site chrome (nav bar, footer, sky) lives in the page stylesheets.
import "@/components/pages/work/page.css";
import "./page.css";
import { SiteShell } from "@/components/site/SiteShell";
import { Head } from "./Head";
import { Products } from "./Products";

const PAGE_STYLE = "html body { background: #141416; }";

export function ShopPage() {
  return (
    <SiteShell current="/shop" pageStyle={PAGE_STYLE}>
      <div
        data-framer-root=""
        className="shop-root"
        style={{ display: "contents" }}
      >
        <Head />
        <Products />
      </div>
    </SiteShell>
  );
}
