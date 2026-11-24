import type { Metadata } from "next";
import { JournalPage } from "@/components/pages/journal/JournalPage";
import { FramerEffects } from "@/components/FramerEffects";
import { getPosts } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Articles · Valerie Skyler",
  description: "Articles, notes, and releases from Valerie Skyler.",
};

export default async function Page() {
  const posts = await getPosts();

  return (
    <>
      <JournalPage posts={posts} />
      <FramerEffects faq={{}} />
    </>
  );
}
