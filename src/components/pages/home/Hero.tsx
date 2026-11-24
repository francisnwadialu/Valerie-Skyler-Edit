import type { CSSProperties } from "react";
import { DuskHero } from "@/components/widgets/DuskHero";
export function Hero() {
  return (
    <div className="framer-18lrb3k" data-framer-name="§ Hero @0">
      <div
        className="framer-1r23qv6-container"
        data-code-component-plugin-id="api"
        data-framer-name="Dusk Hero"
      >
        <DuskHero
          name=""
          split={4}
          line=""
          sky={{
            src: "https://pub-e41cf51e3602425f820c1ff1e2b4661c.r2.dev/media/valerieskyler-homepagehero.webp",
            alt: "A woman on a high balcony looking out over a violet city skyline at dusk",
          }}
          focus="50% 45%"
          rays={true}
          rayX={30}
          scrim={0.58}
          tint={0.35}
          cta1=""
          link1="/sign-up"
          cta2=""
          link2="/music"
          showLinks={false}
          showLine={false}
          phoneDrop={15}
          phoneFocus="22% 45%"
          phoneTop={11}
          topColor="rgb(114, 87, 140)"
        />
      </div>
    </div>
  );
}
