import "./page.css";
import { SiteShell } from "@/components/site/SiteShell";
import { DEFAULT_FAQS, DEFAULT_SIGNUP_PLANS } from "@/lib/sanity/defaults";
import type { FaqItem, SignUpPlan } from "@/lib/sanity/types";
import { Head } from "./Head";
import { Plans } from "./Plans";
import { Questions } from "./Questions";

const PAGE_STYLE = "html body { background: rgb(255, 255, 255); }";

export function PricingPage({
  plans = DEFAULT_SIGNUP_PLANS,
  faqs = DEFAULT_FAQS["sign-up"],
}: {
  plans?: SignUpPlan[];
  faqs?: FaqItem[];
}) {
  return (
    <SiteShell current="/sign-up" pageStyle={PAGE_STYLE}>
      <div
        data-framer-root=""
        className="framer-y7bgL framer-9A9u7 framer-NTbwR framer-8eqjG framer-qVTq6 framer-1oyt83f"
        style={{ minHeight: "100vh", width: "auto", display: "contents" }}
      >
        <Head />
        <Plans plans={plans} />
        <Questions items={faqs} />
      </div>
    </SiteShell>
  );
}
