import type { CSSProperties } from "react";
import { resolveImageUrl } from "@/lib/sanity/client";
import { DEFAULT_POSTS } from "@/lib/sanity/defaults";
import type { PostItem } from "@/lib/sanity/types";

export function Journal({ posts = DEFAULT_POSTS }: { posts?: PostItem[] }) {
  const featuredPosts = posts.slice(0, 3);

  return (
    <div className="framer-1xh4z6p" data-framer-name="§ Journal @0.88">
      <div className="framer-1og1d5n" data-framer-name="Inner">
        <div className="framer-fm5emi" data-framer-name="Head">
          <div
            className="framer-ake40a"
            data-framer-component-type="RichTextContainer"
            style={{ transform: "none" }}
          >
            <h2
              className="framer-text framer-styles-preset-1tsl8u3"
              data-styles-preset="ITPIX01bM"
              dir="auto"
              style={{ "--framer-text-color": "#F4EEF6" } as CSSProperties}
            >
              Articles
            </h2>
          </div>
          <div
            className="framer-1ds9lq4"
            data-framer-component-type="RichTextContainer"
            style={{ transform: "none" }}
          >
            <p
              className="framer-text framer-styles-preset-mkxk1l"
              data-styles-preset="Ni9SQcDo7"
              dir="auto"
              style={{ "--framer-text-color": "#F4EEF6" } as CSSProperties}
            >
              <a className="framer-text" href="/articles">
                All articles
              </a>
            </p>
          </div>
        </div>
        <div className="framer-bl9yh3" data-framer-name="Journal list">
          {featuredPosts.map((post) => {
            const imgSrc = resolveImageUrl(
              post.coverImage,
              "/assets/w2UlbKx2Vdo5e7BnZeNPIe1yo.webp",
              1400,
            );
            return (
              <div
                key={post._id}
                className="framer-e34z18"
                data-framer-name="Journal item"
              >
                <div className="ssr-variant">
                  <div
                    className="framer-16fdnnb-container"
                    data-framer-name="Journal card"
                  >
                    <a
                      className="framer-PB8fO framer-9A9u7 framer-8eqjG framer-9vd5dt framer-v-9vd5dt framer-16gxl6d"
                      data-framer-name="Default"
                      href={`/articles/${post.slug}`}
                      style={{ width: "100%" }}
                    >
                      <div
                        className="framer-ap9z3v"
                        data-framer-name="Frame"
                        style={{
                          borderBottomLeftRadius: "3px",
                          borderBottomRightRadius: "3px",
                          borderTopLeftRadius: "3px",
                          borderTopRightRadius: "3px",
                        }}
                      >
                        <div
                          className="framer-w3jo57"
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
                              loading="lazy"
                              width="1400"
                              height="2104"
                              sizes="(min-width: 1200px) max((min(100vw, 1440px) - 176px) / 3, 50px), (min-width: 810px) and (max-width: 1199.98px) max((min(100vw, 1440px) - 88px) / 2, 50px), (max-width: 809.98px) max(min(100vw, 1440px) - 36px, 50px)"
                              src={imgSrc}
                              alt={post.title}
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
                      <div
                        className="framer-l7xupo"
                        data-framer-component-type="RichTextContainer"
                        style={
                          {
                            "--extracted-r6o4lv":
                              "var(--variable-reference-BnqlRb7Sf-cZyPY8X7S)",
                            "--variable-reference-BnqlRb7Sf-cZyPY8X7S":
                              "rgb(244, 238, 246)",
                            opacity: "0.7",
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
                                "var(--extracted-r6o4lv, var(--variable-reference-BnqlRb7Sf-cZyPY8X7S))",
                            } as CSSProperties
                          }
                        >
                          {post.category}
                        </p>
                      </div>
                      <div
                        className="framer-1rasr1p"
                        data-framer-component-type="RichTextContainer"
                        style={
                          {
                            "--extracted-a0htzi":
                              "var(--variable-reference-BnqlRb7Sf-cZyPY8X7S)",
                            "--variable-reference-BnqlRb7Sf-cZyPY8X7S":
                              "rgb(244, 238, 246)",
                            transform: "none",
                          } as CSSProperties
                        }
                      >
                        <h3
                          className="framer-text framer-styles-preset-brr62t"
                          data-styles-preset="Kt7vcxS_A"
                          dir="auto"
                          style={
                            {
                              "--framer-text-alignment": "start",
                              "--framer-text-color":
                                "var(--extracted-a0htzi, var(--variable-reference-BnqlRb7Sf-cZyPY8X7S))",
                            } as CSSProperties
                          }
                        >
                          {post.title}
                        </h3>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
