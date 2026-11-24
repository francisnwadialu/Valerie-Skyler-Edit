import type { Metadata } from "next";
import { LegalPrivacyPage } from "@/components/pages/legal-privacy/LegalPrivacyPage";
import { FramerEffects } from "@/components/FramerEffects";
import { faq } from "@/content/faq";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Updated 1 October 2026",
};

export default function Page() {
  return (
    <>
      <LegalPrivacyPage />
      <FramerEffects faq={faq["/legal/privacy"] ?? {}} />
    </>
  );
}
