import type { CSSProperties } from "react";
import { resolveImageUrl } from "@/lib/sanity/client";
import { DEFAULT_SHOW_ITEMS } from "@/lib/sanity/defaults";
import type { ShowItem } from "@/lib/sanity/types";

export function Crafts({
  items = DEFAULT_SHOW_ITEMS,
}: {
  items?: ShowItem[];
}) {
  return (
    <div className="framer-ne99ol" data-framer-name="§ Crafts @0.05">
      <div className="framer-1l026qa" data-framer-name="Inner">
        <div className="framer-1jbbrxm" data-framer-name="Services list">
          {items.map((item) => {
            const imgSrc = resolveImageUrl(
              item.coverImage,
              "/assets/daSvfhVTqOjJPrOX4JdHeMoIAA.webp",
              1400,
            );
            return (
              <a
                key={item._id}
                className="framer-crl2m7 framer-8fhzwd"
                data-border="true"
                data-framer-name="Services item"
                href={`/shows/${item.slug}`}
              >
                <div className="ssr-variant">
                  <div className="framer-3nrjit" data-framer-name="Cover">
                    <div
                      style={
                        {
                          position: "absolute",
                          borderRadius: "inherit",
                          cornerShape: "inherit",
                          top: "0",
                          right: "0",
                          bottom: "0",
                          left: "0",
                        } as CSSProperties
                      }
                      data-framer-background-image-wrapper="true"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        decoding="async"
                        loading="lazy"
                        width="1400"
                        height="1848"
                        sizes="(min-width: 1200px) 220px, (min-width: 810px) and (max-width: 1199.98px) 220px, (max-width: 809.98px) calc(min(100vw, 1440px) - 36px)"
                        src={imgSrc}
                        alt={item.title}
                        style={
                          {
                            display: "block",
                            width: "100%",
                            height: "100%",
                            borderRadius: "inherit",
                            cornerShape: "inherit",
                            objectPosition: "center",
                            objectFit: "cover",
                          } as CSSProperties
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="framer-18i6rbo" data-framer-name="Text">
                  <div className="framer-1mlm4rd" data-framer-name="Meta">
                    <div
                      className="framer-8sqz8i"
                      data-framer-component-type="RichTextContainer"
                      style={{ transform: "none" }}
                    >
                      <p
                        className="framer-text framer-styles-preset-1xlgs71"
                        data-styles-preset="x5FjDutEw"
                        dir="auto"
                        style={
                          {
                            "--framer-text-alignment": "start",
                            "--framer-text-color":
                              "var(--token-df8cbb0e-4de7-46ec-a04c-5c418cda9271)",
                          } as CSSProperties
                        }
                      >
                        {item.orderLabel}
                      </p>
                    </div>
                    <div
                      className="framer-ulz0p"
                      data-framer-component-type="RichTextContainer"
                      style={{ transform: "none" }}
                    >
                      <p
                        className="framer-text framer-styles-preset-1xlgs71"
                        data-styles-preset="x5FjDutEw"
                        dir="auto"
                        style={
                          {
                            "--framer-text-alignment": "start",
                            "--framer-text-color":
                              "var(--token-3435314b-2570-448e-841b-54ca07b7bdb4)",
                          } as CSSProperties
                        }
                      >
                        {item.phase}
                      </p>
                    </div>
                  </div>
                  <div
                    className="framer-l2gk0q"
                    data-framer-component-type="RichTextContainer"
                    style={{ transform: "none" }}
                  >
                    <h2
                      className="framer-text framer-styles-preset-1tsl8u3"
                      data-styles-preset="ITPIX01bM"
                      dir="auto"
                      style={
                        {
                          "--framer-text-alignment": "start",
                          "--framer-text-color": "rgb(255, 255, 255)",
                        } as CSSProperties
                      }
                    >
                      {item.title}
                    </h2>
                  </div>
                  <div
                    className="framer-pg039m"
                    data-framer-component-type="RichTextContainer"
                    style={{ transform: "none" }}
                  >
                    <p
                      className="framer-text framer-styles-preset-1231s3t"
                      data-styles-preset="SRMI29MvE"
                      dir="auto"
                      style={
                        {
                          "--framer-text-alignment": "start",
                          "--framer-text-color":
                            "var(--token-cac81ed6-68d8-4cc6-b1e7-4eef12dbdf12)",
                        } as CSSProperties
                      }
                    >
                      {item.summary}
                    </p>
                  </div>
                </div>
                <div className="framer-18d9r4e" data-framer-name="Price">
                  <div
                    className="framer-1n29f0t"
                    data-framer-component-type="RichTextContainer"
                    style={{ transform: "none" }}
                  >
                    <h3
                      className="framer-text framer-styles-preset-brr62t"
                      data-styles-preset="Kt7vcxS_A"
                      dir="auto"
                      style={
                        {
                          "--framer-text-alignment": "start",
                          "--framer-text-color": "rgb(255, 255, 255)",
                        } as CSSProperties
                      }
                    >
                      {item.priceLabel}
                    </h3>
                  </div>
                  <div
                    className="framer-144xm1e"
                    data-framer-component-type="RichTextContainer"
                    style={{ transform: "none" }}
                  >
                    <p
                      className="framer-text framer-styles-preset-mkxk1l"
                      data-styles-preset="Ni9SQcDo7"
                      dir="auto"
                      style={{ "--framer-text-color": "#ffffff" } as CSSProperties}
                    >
                      {item.ctaLabel || "Details →"}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
        <div className="framer-d3up1c" data-framer-name="hold @0.2"></div>
      </div>
    </div>
  );
}
