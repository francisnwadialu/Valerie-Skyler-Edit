import { DuskHero } from "@/components/widgets/DuskHero";
import { resolveImageUrl } from "@/lib/sanity/client";
import { DEFAULT_POSTS } from "@/lib/sanity/defaults";
import type { PostItem } from "@/lib/sanity/types";

export function Head({ post = DEFAULT_POSTS[0] }: { post?: PostItem }) {
  const skySrc = resolveImageUrl(
    post.coverImage,
    "/assets/w2UlbKx2Vdo5e7BnZeNPIe1yo.webp",
    2000,
  );

  return (
    <div className="framer-374557" data-framer-name="§ Head @0">
      <div
        className="framer-10tainj-container"
        data-code-component-plugin-id="api"
        data-framer-name="Page head"
      >
        <DuskHero
          name={post.category || "Article"}
          split={2}
          line={post.title}
          sky={{ src: skySrc, alt: post.title }}
          focus="50% 50%"
          rays={true}
          rayX={18}
          scrim={0.35}
          tint={0.35}
          showLinks={false}
          showLine={true}
          kicker={post.readTime || ""}
          phoneTop={38}
        />
      </div>
    </div>
  );
}
