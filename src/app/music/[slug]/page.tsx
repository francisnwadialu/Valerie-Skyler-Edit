import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkJunoPage } from "@/components/pages/work-juno/WorkJunoPage";
import { FramerEffects } from "@/components/FramerEffects";
import { getMusicBySlug, getMusicItems } from "@/lib/sanity/queries";

export const dynamicParams = false;

// Static export: every music slug is prerendered at build time.
export async function generateStaticParams() {
  const items = await getMusicItems();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getMusicBySlug(slug);
  if (!item) {
    return { title: "Music · Valerie Skyler" };
  }
  return {
    title: `${item.title} · Music · Valerie Skyler`,
    description: item.headline || item.tags,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getMusicBySlug(slug);
  if (!item) notFound();

  return (
    <>
      <WorkJunoPage item={item} />
      <FramerEffects faq={{}} />
    </>
  );
}
