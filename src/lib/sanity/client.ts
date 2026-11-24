import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "./types";

export const SANITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "pls29s2l";
export const SANITY_DATASET =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const SANITY_API_VERSION =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN || undefined,
});

const builder = imageUrlBuilder(sanityClient);

/**
 * Resolves either a local/external URL string or a Sanity image asset reference
 * into a concrete image URL safe to pass to <img>.
 */
export function resolveImageUrl(
  source: SanityImageSource | undefined,
  fallback = "/assets/w2UlbKx2Vdo5e7BnZeNPIe1yo.webp",
  width?: number,
): string {
  if (!source) return fallback;
  if (typeof source === "string") {
    return source || fallback;
  }
  if (source.asset?.url) {
    return source.asset.url;
  }
  if (source.asset?._ref) {
    try {
      const chain = builder.image(source).auto("format");
      return width ? chain.width(width).url() : chain.url();
    } catch {
      return fallback;
    }
  }
  return fallback;
}

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  try {
    return await sanityClient.fetch<T>(query, params, {
      cache: "no-store",
    });
  } catch {
    return null;
  }
}
