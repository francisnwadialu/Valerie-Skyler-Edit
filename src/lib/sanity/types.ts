import type { PortableTextBlock } from "@portabletext/react";

export type SanityImageSource =
  | string
  | {
      _type?: "image";
      asset?: {
        _ref?: string;
        _type?: string;
        url?: string;
      };
      alt?: string;
    };

export type FaqPageKey = "shows" | "sign-up" | "contact";

export interface FaqItem {
  _id: string;
  page: FaqPageKey;
  question: string;
  answer: string;
  order?: number;
}

export interface PostItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  readTime?: string;
  excerpt?: string;
  coverImage?: SanityImageSource;
  publishedAt?: string;
  body?: PortableTextBlock[] | string[];
  order?: number;
}

export interface ShowItem {
  _id: string;
  title: string;
  slug: string;
  orderLabel: string;
  phase: string;
  summary: string;
  priceLabel: string;
  ctaLabel?: string;
  coverImage?: SanityImageSource;
  body?: PortableTextBlock[] | string[];
  order?: number;
}

export interface SignUpPlan {
  _id: string;
  title: string;
  phaseLabel: string;
  price: string;
  timeline: string;
  features: string[];
  ctaLabel?: string;
  ctaHref?: string;
  coverImage?: SanityImageSource;
  order?: number;
}

export interface MusicItem {
  _id: string;
  title: string;
  slug: string;
  year: string;
  time: string;
  tags: string;
  sector?: string;
  result?: string;
  headline?: string;
  coverImage?: SanityImageSource;
  stills?: SanityImageSource[];
  body?: PortableTextBlock[] | string[];
  featuredOnHome?: boolean;
  order?: number;
}
