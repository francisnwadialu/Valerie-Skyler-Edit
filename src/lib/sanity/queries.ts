import { sanityFetch } from "./client";
import {
  DEFAULT_FAQS,
  DEFAULT_MUSIC_ITEMS,
  DEFAULT_POSTS,
  DEFAULT_SHOW_ITEMS,
  DEFAULT_SIGNUP_PLANS,
} from "./defaults";
import type {
  FaqItem,
  FaqPageKey,
  MusicItem,
  PostItem,
  ShowItem,
  SignUpPlan,
} from "./types";

export function toFaqMap(items: FaqItem[]): Record<string, string> {
  const map: Record<string, string> = {};
  for (const item of items) {
    const q = item.question?.trim();
    if (q) {
      map[q] = item.answer ?? "";
    }
  }
  return map;
}

export async function getFaqs(page: FaqPageKey): Promise<FaqItem[]> {
  const rows = await sanityFetch<FaqItem[]>(
    `*[_type == "faqItem" && page == $page] | order(coalesce(order, 999) asc, _createdAt asc){
      _id,
      page,
      question,
      answer,
      order
    }`,
    { page },
  );
  if (rows && rows.length > 0) return rows;
  return DEFAULT_FAQS[page] ?? [];
}

export async function getPosts(): Promise<PostItem[]> {
  const rows = await sanityFetch<PostItem[]>(
    `*[_type == "post"] | order(coalesce(order, 999) asc, publishedAt desc, _createdAt desc){
      _id,
      title,
      "slug": slug.current,
      category,
      readTime,
      excerpt,
      coverImage,
      publishedAt,
      body,
      order
    }`,
  );
  if (rows && rows.length > 0) {
    return rows.filter((p) => Boolean(p.slug && p.title));
  }
  return DEFAULT_POSTS;
}

export async function getPostBySlug(slug: string): Promise<PostItem | null> {
  const row = await sanityFetch<PostItem | null>(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      category,
      readTime,
      excerpt,
      coverImage,
      publishedAt,
      body,
      order
    }`,
    { slug },
  );
  if (row && row.title) return row;
  return DEFAULT_POSTS.find((p) => p.slug === slug) ?? null;
}

export async function getShowItems(): Promise<ShowItem[]> {
  const rows = await sanityFetch<ShowItem[]>(
    `*[_type == "showItem"] | order(coalesce(order, 999) asc, _createdAt asc){
      _id,
      title,
      "slug": slug.current,
      orderLabel,
      phase,
      summary,
      priceLabel,
      ctaLabel,
      coverImage,
      body,
      order
    }`,
  );
  if (rows && rows.length > 0) {
    return rows.filter((s) => Boolean(s.slug && s.title));
  }
  return DEFAULT_SHOW_ITEMS;
}

export async function getShowBySlug(slug: string): Promise<ShowItem | null> {
  const row = await sanityFetch<ShowItem | null>(
    `*[_type == "showItem" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      orderLabel,
      phase,
      summary,
      priceLabel,
      ctaLabel,
      coverImage,
      body,
      order
    }`,
    { slug },
  );
  if (row && row.title) return row;
  return DEFAULT_SHOW_ITEMS.find((s) => s.slug === slug) ?? null;
}

export async function getSignUpPlans(): Promise<SignUpPlan[]> {
  const rows = await sanityFetch<SignUpPlan[]>(
    `*[_type == "signUpPlan"] | order(coalesce(order, 999) asc, _createdAt asc){
      _id,
      title,
      phaseLabel,
      price,
      timeline,
      features,
      ctaLabel,
      ctaHref,
      coverImage,
      order
    }`,
  );
  if (rows && rows.length > 0) {
    return rows.filter((p) => Boolean(p.title));
  }
  return DEFAULT_SIGNUP_PLANS;
}

export async function getMusicItems(): Promise<MusicItem[]> {
  const rows = await sanityFetch<MusicItem[]>(
    `*[_type == "musicItem"] | order(coalesce(order, 999) asc, _createdAt asc){
      _id,
      title,
      "slug": slug.current,
      year,
      time,
      tags,
      sector,
      result,
      headline,
      coverImage,
      stills,
      body,
      featuredOnHome,
      order
    }`,
  );
  if (rows && rows.length > 0) {
    return rows.filter((m) => Boolean(m.slug && m.title));
  }
  return DEFAULT_MUSIC_ITEMS;
}

export async function getMusicBySlug(slug: string): Promise<MusicItem | null> {
  const row = await sanityFetch<MusicItem | null>(
    `*[_type == "musicItem" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      year,
      time,
      tags,
      sector,
      result,
      headline,
      coverImage,
      stills,
      body,
      featuredOnHome,
      order
    }`,
    { slug },
  );
  if (row && row.title) return row;
  return DEFAULT_MUSIC_ITEMS.find((m) => m.slug === slug) ?? null;
}
