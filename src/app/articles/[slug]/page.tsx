import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JournalGoldenHourPage } from "@/components/pages/journal-golden-hour/JournalGoldenHourPage";
import { FramerEffects } from "@/components/FramerEffects";
import { getPostBySlug, getPosts } from "@/lib/sanity/queries";

export const dynamicParams = false;

// Static export: every article slug is prerendered at build time.
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "Article · Valerie Skyler" };
  }
  return {
    title: `${post.title} · Valerie Skyler`,
    description: post.excerpt || `${post.category} article from Valerie Skyler.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <JournalGoldenHourPage post={post} />
      <FramerEffects faq={{}} />
    </>
  );
}
