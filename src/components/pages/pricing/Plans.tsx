import type { CSSProperties } from "react";
import { resolveImageUrl } from "@/lib/sanity/client";
import { DEFAULT_SIGNUP_PLANS } from "@/lib/sanity/defaults";
import type { SignUpPlan } from "@/lib/sanity/types";

export function Plans({
  plans = DEFAULT_SIGNUP_PLANS,
}: {
  plans?: SignUpPlan[];
}) {
  return (
    <div className="framer-d14sou" data-framer-name="§ Plans @0.05">
      <div className="framer-444ky1" data-framer-name="Inner">
        <div className="framer-xvzjcm" data-framer-name="Heading">
          <div
            className="framer-13x55qz"
            data-framer-component-type="RichTextContainer"
            style={{ transform: "none" }}
          >
            <p
              className="framer-text framer-styles-preset-1xlgs71"
              data-styles-preset="x5FjDutEw"
              dir="auto"
              style={
                {
                  "--framer-text-color":
                    "var(--token-df8cbb0e-4de7-46ec-a04c-5c418cda9271)",
                } as CSSProperties
              }
            >
              Packages
            </p>
          </div>
          <div
            className="framer-trcm6o"
            data-framer-component-type="RichTextContainer"
            style={{ transform: "none" }}
          >
            <h2
              className="framer-text framer-styles-preset-1tsl8u3"
              data-styles-preset="ITPIX01bM"
              dir="auto"
              style={{ "--framer-text-color": "#ffffff" } as CSSProperties}
            >
              Pick the hour that suits you.
            </h2>
          </div>
        </div>
        <div className="framer-1pofirc" data-framer-name="Plans">
          {plans.map((plan) => {
            const imgSrc = resolveImageUrl(
              plan.coverImage,
              "/assets/daSvfhVTqOjJPrOX4JdHeMoIAA.webp",
              1400,
            );
            return (
              <div
                key={plan._id}
                className="framer-p51npm"
                data-framer-name={plan.title}
              >
                <div className="ssr-variant">
                  <div className="framer-1kixdjo" data-framer-name="Sky">
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
                        sizes="(min-width: 1200px) max((min(100vw, 1440px) - 168px) / 3, 50px), (min-width: 810px) and (max-width: 1199.98px) max(min(100vw, 1440px) - 64px, 50px), (max-width: 809.98px) max(min(100vw, 1440px) - 36px, 50px)"
                        src={imgSrc}
                        alt={plan.title}
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
                <div className="framer-fnihqz" data-framer-name="Body">
                  <div
                    className="framer-1nluv4m"
                    data-framer-component-type="RichTextContainer"
                    style={{ transform: "none" }}
                  >
                    <p
                      className="framer-text framer-styles-preset-1xlgs71"
                      data-styles-preset="x5FjDutEw"
                      dir="auto"
                      style={
                        {
                          "--framer-text-color": "rgba(244,238,246,0.6)",
                        } as CSSProperties
                      }
                    >
                      {plan.phaseLabel}
                    </p>
                  </div>
                  <div
                    className="framer-pcobnv"
                    data-framer-component-type="RichTextContainer"
                    style={{ transform: "none" }}
                  >
                    <h3
                      className="framer-text framer-styles-preset-brr62t"
                      data-styles-preset="Kt7vcxS_A"
                      dir="auto"
                      style={{ "--framer-text-color": "#F4EEF6" } as CSSProperties}
                    >
                      {plan.title}
                    </h3>
                  </div>
                  <div
                    className="framer-1gbn5bk"
                    data-framer-component-type="RichTextContainer"
                    style={{ transform: "none" }}
                  >
                    <h2
                      className="framer-text framer-styles-preset-1tsl8u3"
                      data-styles-preset="ITPIX01bM"
                      dir="auto"
                      style={{ "--framer-text-color": "#F4EEF6" } as CSSProperties}
                    >
                      {plan.price}
                    </h2>
                  </div>
                  <div
                    className="framer-1c9hxvn"
                    data-framer-component-type="RichTextContainer"
                    style={{ transform: "none" }}
                  >
                    <p
                      className="framer-text framer-styles-preset-17ut4rh"
                      data-styles-preset="nHMnet34M"
                      dir="auto"
                      style={
                        {
                          "--framer-text-color": "rgba(244,238,246,0.7)",
                        } as CSSProperties
                      }
                    >
                      {plan.timeline}
                    </p>
                  </div>
                  {(plan.features ?? []).map((feat, idx) => (
                    <div
                      key={idx}
                      className="framer-t7t1wo"
                      data-framer-component-type="RichTextContainer"
                      style={{ transform: "none" }}
                    >
                      <p
                        className="framer-text framer-styles-preset-17ut4rh"
                        data-styles-preset="nHMnet34M"
                        dir="auto"
                        style={
                          { "--framer-text-color": "#F4EEF6" } as CSSProperties
                        }
                      >
                        {feat}
                      </p>
                    </div>
                  ))}
                  <div className="ssr-variant">
                    <div className="framer-p73dnl-container">
                      <a
                        className="framer-PMrot framer-s67hv2 framer-v-s67hv2 framer-1blynrv"
                        data-framer-name="Light"
                        href={plan.ctaHref || "/contact"}
                        style={
                          {
                            "--border-bottom-width": "0px",
                            "--border-color": "rgba(0, 0, 0, 0)",
                            "--border-left-width": "0px",
                            "--border-right-width": "0px",
                            "--border-style": "solid",
                            "--border-top-width": "0px",
                            backgroundColor: "#1b1b1f",
                            height: "100%",
                            borderBottomLeftRadius: "3px",
                            borderBottomRightRadius: "3px",
                            borderTopLeftRadius: "3px",
                            borderTopRightRadius: "3px",
                          } as CSSProperties
                        }
                      >
                        <div
                          className="framer-1moixfb"
                          data-framer-name="Label"
                          data-framer-component-type="RichTextContainer"
                          style={
                            {
                              "--extracted-r6o4lv":
                                "var(--token-cf3913ea-b360-45ec-bf9d-00a2af1cb266)",
                              transform: "none",
                            } as CSSProperties
                          }
                        >
                          <p
                            dir="auto"
                            className="framer-text"
                            style={
                              {
                                "--font-selector": "R0Y7RmlndHJlZS01MDA=",
                                "--framer-font-family":
                                  '"Figtree", "Figtree Placeholder", sans-serif',
                                "--framer-font-size": "15px",
                                "--framer-font-weight": "500",
                                "--framer-letter-spacing": "-0.01em",
                                "--framer-line-height": "1em",
                                "--framer-text-color":
                                  "var(--extracted-r6o4lv, var(--token-cf3913ea-b360-45ec-bf9d-00a2af1cb266))",
                              } as CSSProperties
                            }
                          >
                            {plan.ctaLabel || "Start with this"}
                          </p>
                        </div>
                        <div
                          className="framer-tduf0x"
                          data-framer-name="Sun"
                          style={{
                            background:
                              "linear-gradient(180deg, rgb(248, 196, 154) 0%, rgb(232, 136, 172) 100%)",
                            borderBottomLeftRadius: "7px",
                            borderBottomRightRadius: "7px",
                            borderTopLeftRadius: "7px",
                            borderTopRightRadius: "7px",
                          }}
                        ></div>
                      </a>
                    </div>
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
