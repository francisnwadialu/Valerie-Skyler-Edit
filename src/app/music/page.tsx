import type { Metadata } from "next";
import { WorkPage } from "@/components/pages/work/WorkPage";
import { FramerEffects } from "@/components/FramerEffects";
import { faq } from "@/content/faq";
import { getMusicItems } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Music · Valerie Skyler",
  description: "Music from Valerie Skyler.",
};

export default async function Page() {
  const items = await getMusicItems();

  return (
    <>
      <WorkPage items={items} />
      <FramerEffects faq={faq["/music"] ?? {}} />
    </>
  );
}
