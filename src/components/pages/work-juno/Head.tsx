import { DuskHero } from "@/components/widgets/DuskHero";
import { resolveImageUrl } from "@/lib/sanity/client";
import { DEFAULT_MUSIC_ITEMS } from "@/lib/sanity/defaults";
import type { MusicItem } from "@/lib/sanity/types";

export function Head({
  item = DEFAULT_MUSIC_ITEMS[0],
}: {
  item?: MusicItem;
}) {
  const skySrc = resolveImageUrl(
    item.coverImage,
    "/assets/Y2X7sGZkQ49oUsVM1KLmOJ5xHU.webp",
    2000,
  );

  return (
    <div className="framer-mxaxbb" data-framer-name="§ Head @0">
      <div
        className="framer-162158a-container"
        data-code-component-plugin-id="api"
        data-framer-name="Page head"
      >
        <DuskHero
          name={item.title}
          split={3}
          line={item.headline || item.tags}
          sky={{ src: skySrc, alt: item.title }}
          focus="50% 50%"
          rays={true}
          rayX={18}
          scrim={0.35}
          tint={0.35}
          showLinks={false}
          showLine={true}
          kicker={item.tags}
          phoneTop={38}
        />
      </div>
    </div>
  );
}
