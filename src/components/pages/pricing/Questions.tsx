import type { CSSProperties } from "react";
import { DEFAULT_FAQS } from "@/lib/sanity/defaults";
import type { FaqItem } from "@/lib/sanity/types";

export function Questions({
  items = DEFAULT_FAQS["sign-up"],
}: {
  items?: FaqItem[];
}) {
  return (
    <div className="framer-pkh70l" data-framer-name="§ Questions @0.15">
      <div className="framer-14ge5d3" data-framer-name="Inner">
        <div className="framer-1346mhu" data-framer-name="Heading">
          <div
            className="framer-ar8yhp"
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
              Questions
            </p>
          </div>
          <div
            className="framer-o8dys5"
            data-framer-component-type="RichTextContainer"
            style={{ transform: "none" }}
          >
            <h2
              className="framer-text framer-styles-preset-1tsl8u3"
              data-styles-preset="ITPIX01bM"
              dir="auto"
              style={{ "--framer-text-color": "#ffffff" } as CSSProperties}
            >
              Before you ask.
            </h2>
          </div>
        </div>
        <div className="framer-1wt8c8y" data-framer-name="FAQ list">
          {items.map((item) => (
            <div
              key={item._id}
              className="framer-eldonm"
              data-framer-name="FAQ item"
            >
              <div className="ssr-variant">
                <div
                  className="framer-1a4dux3-container"
                  data-framer-name="FAQ item"
                >
                  <div
                    className="framer-cLdZW framer-8eqjG framer-iqbJV framer-bfwv1m framer-v-bfwv1m"
                    data-border="true"
                    data-framer-name="Closed"
                    data-highlight="true"
                    tabIndex={0}
                    style={
                      {
                        "--border-bottom-width": "0px",
                        "--border-color": "rgba(255, 255, 255, 0.16)",
                        "--border-left-width": "0px",
                        "--border-right-width": "0px",
                        "--border-style": "solid",
                        "--border-top-width": "1px",
                        width: "100%",
                      } as CSSProperties
                    }
                  >
                    <div className="framer-egf7l8" data-framer-name="Row">
                      <div
                        className="framer-1jn0nc8"
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
                            } as CSSProperties
                          }
                        >
                          {item.question}
                        </h3>
                      </div>
                      <div
                        className="framer-1ufjcpb"
                        data-framer-name="Icon"
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
                              "--font-selector": "R0Y7R2Vpc3QgTW9uby1yZWd1bGFy",
                              "--framer-font-family":
                                '"Geist Mono", "Geist Mono Placeholder", monospace',
                              "--framer-font-size": "20px",
                              "--framer-line-height": "1em",
                              "--framer-text-color":
                                "var(--extracted-r6o4lv, var(--token-cf3913ea-b360-45ec-bf9d-00a2af1cb266))",
                            } as CSSProperties
                          }
                        >
                          +
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="framer-1vo8i4" data-framer-name="hold @0.25"></div>
      </div>
    </div>
  );
}
