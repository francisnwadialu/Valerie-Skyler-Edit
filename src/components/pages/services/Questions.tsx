import type { CSSProperties } from "react";
import { DEFAULT_FAQS } from "@/lib/sanity/defaults";
import type { FaqItem } from "@/lib/sanity/types";

export function Questions({
  items = DEFAULT_FAQS.shows,
}: {
  items?: FaqItem[];
}) {
  return (
    <div className="framer-wld92d" data-framer-name="§ Questions @0.2">
      <div className="framer-zm6zpr" data-framer-name="Inner">
        <div className="framer-oclz07" data-framer-name="Heading">
          <div
            className="framer-ruqe8n"
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
            className="framer-1fxaia2"
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
        <div className="framer-j1l1k6" data-framer-name="FAQ list">
          {items.map((item) => (
            <div
              key={item._id}
              className="framer-it8znf"
              data-framer-name="FAQ item"
            >
              <div className="ssr-variant">
                <div
                  className="framer-17ct84o-container"
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
        <div className="framer-u0qj6y" data-framer-name="hold @0.28"></div>
      </div>
    </div>
  );
}
