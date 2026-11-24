import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home/HomePage";
import { FramerEffects } from "@/components/FramerEffects";
import { faq } from "@/content/faq";
import { getMusicItems, getPosts } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Valerie Skyler",
  description:
    "Valerie Skyler — From ObsidianHeights2108. Music, shows, shop, and more.",
};

export default async function Page() {
  const [posts, musicItems] = await Promise.all([
    getPosts(),
    getMusicItems(),
  ]);

  return (
    <>
      <HomePage posts={posts} musicItems={musicItems} />
      <FramerEffects faq={faq["/"] ?? {}} />
    </>
  );
}
