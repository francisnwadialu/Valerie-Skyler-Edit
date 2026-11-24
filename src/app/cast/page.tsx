import type { Metadata } from "next";
import { StudioPage } from "@/components/pages/studio/StudioPage";
import { FramerEffects } from "@/components/FramerEffects";
import { faq } from "@/content/faq";

export const metadata: Metadata = {
  title: "Cast · Valerie Skyler",
  description: "Cast and recognition.",
};

export default function Page() {
  return (
    <>
      <StudioPage />
      <FramerEffects faq={faq["/cast"] ?? {}} />
    </>
  );
}
