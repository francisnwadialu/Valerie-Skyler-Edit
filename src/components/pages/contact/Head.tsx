import type { CSSProperties } from "react";
import { DuskHero } from "@/components/widgets/DuskHero";
export function Head() {
  return (
    <div className="framer-zmp2ta" data-framer-name="§ Head @0">
      <div
        className="framer-vcfei-container"
        data-code-component-plugin-id="api"
        data-framer-name="Page head"
      >
        <DuskHero
          name=""
          split={4}
          line=""
          sky={{
            src: "https://pub-e41cf51e3602425f820c1ff1e2b4661c.r2.dev/media/valerieskyler-contacthero.webp",
            alt: "",
          }}
          focus="50% 50%"
          rays={true}
          rayX={18}
          scrim={0.35}
          tint={0.35}
          showLinks={false}
          showLine={false}
          kicker=""
          phoneTop={38}
        />
      </div>
    </div>
  );
}
