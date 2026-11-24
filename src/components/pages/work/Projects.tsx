import type { CSSProperties } from "react";
import { resolveImageUrl } from "@/lib/sanity/client";
import { DEFAULT_MUSIC_ITEMS } from "@/lib/sanity/defaults";
import type { MusicItem } from "@/lib/sanity/types";

export function Projects({
  items = DEFAULT_MUSIC_ITEMS,
}: {
  items?: MusicItem[];
}) {
  return (
    <div className="framer-5lpzaa" data-framer-name="§ Projects @0.05">
      <div className="framer-zqp8yy" data-framer-name="Inner">
        <div className="framer-sdy7ha" data-framer-name="Projects list">
          {items.map((item, idx) => {
            const imgSrc = resolveImageUrl(
              item.coverImage,
              "/assets/Y2X7sGZkQ49oUsVM1KLmOJ5xHU.webp",
              2000,
            );
            return (
              <div
                key={item._id}
                className="framer-1xv6cp2"
                data-framer-name="Projects item"
              >
                <div className="ssr-variant">
                  <div
                    className="framer-959nda-container"
                    data-framer-name="Project card"
                  >
                    <a
                      className="framer-pvqxw framer-NTbwR framer-9A9u7 framer-qVTq6 framer-1ebuv52 framer-v-1ebuv52 framer-15q2jei"
                      data-framer-name="Default"
                      href={`/music/${item.slug}`}
                      style={{ width: "100%" }}
                    >
                      <div
                        className="framer-1jahj15"
                        data-framer-name="Frame"
                        style={{
                          borderBottomLeftRadius: "3px",
                          borderBottomRightRadius: "3px",
                          borderTopLeftRadius: "3px",
                          borderTopRightRadius: "3px",
                        }}
                      >
                        <div
                          className="framer-1ooms1c"
                          data-framer-name="Image"
                          style={{ transform: "none" }}
                        >
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
                              loading={idx < 2 ? "eager" : "lazy"}
                              width="2000"
                              height="1333"
                              sizes="(min-width: 1200px) max((min(100vw, 1440px) - 160px) / 2, 50px), (max-width: 809.98px) max(min(100vw, 1440px) - 36px, 50px), (min-width: 810px) and (max-width: 1199.98px) max((min(100vw, 1440px) - 96px) / 2, 50px)"
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
                        <div
                          className="framer-52cizn"
                          data-framer-name="Time tag"
                          style={{
                            backgroundColor: "rgba(20, 14, 36, 0.35)",
                            borderBottomLeftRadius: "3px",
                            borderBottomRightRadius: "3px",
                            borderTopLeftRadius: "3px",
                            borderTopRightRadius: "3px",
                          }}
                        >
                          <div
                            className="framer-an8l2p"
                            data-framer-component-type="RichTextContainer"
                            style={
                              {
                                "--extracted-r6o4lv": "rgb(255, 255, 255)",
                                transform: "none",
                              } as CSSProperties
                            }
                          >
                            <p
                              dir="auto"
                              className="framer-text"
                              style={
                                {
                                  "--font-selector": "R0Y7R2Vpc3QgTW9uby01MDA=",
                                  "--framer-font-family":
                                    '"Geist Mono", "Geist Mono Placeholder", monospace',
                                  "--framer-font-size": "11px",
                                  "--framer-font-weight": "500",
                                  "--framer-line-height": "1em",
                                  "--framer-text-color":
                                    "var(--extracted-r6o4lv, rgb(255, 255, 255))",
                                } as CSSProperties
                              }
                            >
                              {item.time}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="framer-1klymy" data-framer-name="Row">
                        <div
                          className="framer-10f08s5"
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
                              } as CSSProperties
                            }
                          >
                            {item.title}
                          </h2>
                        </div>
                        <div
                          className="framer-1bgywxg"
                          data-framer-component-type="RichTextContainer"
                          style={
                            {
                              "--extracted-r6o4lv":
                                "var(--token-df8cbb0e-4de7-46ec-a04c-5c418cda9271)",
                              transform: "none",
                            } as CSSProperties
                          }
                        >
                          <p
                            className="framer-text framer-styles-preset-1xlgs71"
                            data-styles-preset="x5FjDutEw"
                            dir="auto"
                            style={
                              {
                                "--framer-text-alignment": "start",
                                "--framer-text-color":
                                  "var(--extracted-r6o4lv, var(--token-df8cbb0e-4de7-46ec-a04c-5c418cda9271))",
                              } as CSSProperties
                            }
                          >
                            {item.year}
                          </p>
                        </div>
                      </div>
                      <div
                        className="framer-7gc7ds"
                        data-framer-component-type="RichTextContainer"
                        style={
                          {
                            "--extracted-r6o4lv":
                              "var(--token-cac81ed6-68d8-4cc6-b1e7-4eef12dbdf12)",
                            transform: "none",
                          } as CSSProperties
                        }
                      >
                        <p
                          className="framer-text framer-styles-preset-17ut4rh"
                          data-styles-preset="nHMnet34M"
                          dir="auto"
                          style={
                            {
                              "--framer-text-alignment": "start",
                              "--framer-text-color":
                                "var(--extracted-r6o4lv, var(--token-cac81ed6-68d8-4cc6-b1e7-4eef12dbdf12))",
                            } as CSSProperties
                          }
                        >
                          {item.tags}
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="framer-1vkg8hb" data-framer-name="hold @0.25"></div>
      </div>
    </div>
  );
}
