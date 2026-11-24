import type { CSSProperties } from "react";
import { SunsetIn } from "@/components/site/SunsetIn";
import { DEFAULT_FAQS } from "@/lib/sanity/defaults";
import type { FaqItem } from "@/lib/sanity/types";

export function Brief({
  faqs = DEFAULT_FAQS.contact,
}: {
  faqs?: FaqItem[];
}) {
  return (
    <div className="framer-1hn3c80" data-framer-name="§ Brief @0.05">
      <div className="framer-114hfm0" data-framer-name="Inner">
        <div className="framer-19cmv3s" data-framer-name="Columns">
          <div className="framer-j9e9wh" data-framer-name="Info">
            <div
              className="framer-1td5akc"
              data-border="true"
              data-framer-name="General Inquiries"
            >
              <div
                className="framer-r62dua"
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
                  General Inquiries
                </p>
              </div>
              <div
                className="framer-uknmei"
                data-framer-component-type="RichTextContainer"
                style={{ transform: "none" }}
              >
                <p
                  className="framer-text framer-styles-preset-1231s3t"
                  data-styles-preset="SRMI29MvE"
                  dir="auto"
                  style={{ "--framer-text-color": "#ffffff" } as CSSProperties}
                >
                  Please review our FAQ.
                </p>
              </div>
            </div>
            <div
              className="framer-d8w0wa"
              data-border="true"
              data-framer-name="Management"
            >
              <div
                className="framer-1qwf4dz"
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
                  Management
                </p>
              </div>
              <div
                className="framer-4q2aef"
                data-framer-component-type="RichTextContainer"
                style={{ transform: "none" }}
              >
                <p
                  className="framer-text framer-styles-preset-1231s3t"
                  data-styles-preset="SRMI29MvE"
                  dir="auto"
                  style={{ "--framer-text-color": "#ffffff" } as CSSProperties}
                >
                  <a
                    className="framer-text"
                    href="mailto:team@vsimanagement.com"
                    rel=""
                  >
                    team@vsimanagement.com
                  </a>
                </p>
              </div>
            </div>
            <div
              className="framer-fhp61m"
              data-border="true"
              data-framer-name="Bookings"
            >
              <div
                className="framer-175n2ax"
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
                  Bookings
                </p>
              </div>
              <div
                className="framer-7vamek"
                data-framer-component-type="RichTextContainer"
                style={{ transform: "none" }}
              >
                <p
                  className="framer-text framer-styles-preset-1231s3t"
                  data-styles-preset="SRMI29MvE"
                  dir="auto"
                  style={{ "--framer-text-color": "#ffffff" } as CSSProperties}
                >
                  <a
                    className="framer-text"
                    href="mailto:bookings@vimatalent.com"
                    rel=""
                  >
                    bookings@vimatalent.com
                  </a>
                </p>
              </div>
            </div>
            <div
              className="framer-11rkm7-container"
              data-code-component-plugin-id="api"
              data-framer-name="Sunset in"
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "rgb(255, 255, 255)",
                  font: '500 13px/1.3 "Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
                  letterSpacing: ".03em",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "9999px",
                    display: "inline-block",
                    flexShrink: 0,
                    background:
                      "radial-gradient(circle at 32% 30%, #ffffff 0%, #ff3df0 30%, #9b30ff 65%, #00d4ff 100%)",
                    boxShadow:
                      "0 0 8px rgba(255, 61, 240, 0.95), 0 0 16px rgba(155, 48, 255, 0.85), 0 0 24px rgba(0, 212, 255, 0.75)",
                  }}
                ></span>
                <span>
                  <SunsetIn />
                </span>
              </div>
            </div>
          </div>
          <div className="framer-10pt8do" data-framer-name="FAQ wrap">
            <h2
              className="framer-text"
              style={{
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                margin: "0 0 20px 0",
              }}
            >
              Frequently Asked Questions
            </h2>
            <div
              data-framer-name="FAQ list"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              {faqs.map((item, index) => (
                <div
                  key={item._id}
                  className="framer-cLdZW framer-8eqjG framer-iqbJV framer-bfwv1m framer-v-bfwv1m"
                  data-border="true"
                  data-framer-name="Closed"
                  data-highlight="true"
                  tabIndex={0}
                  style={
                    {
                      "--border-bottom-width":
                        index === faqs.length - 1 ? "1px" : "0px",
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
                        className="framer-text framer-styles-preset-1231s3t"
                        data-styles-preset="SRMI29MvE"
                        dir="auto"
                        style={
                          {
                            "--framer-text-alignment": "start",
                            color: "#ffffff",
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
                            "var(--token-cf3913ea-b360-45ec-bf9d-00a2af1cb266, #ffffff)",
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
                            "--framer-font-size": "16px",
                            "--framer-line-height": "1em",
                            "--framer-text-color":
                              "var(--extracted-r6o4lv, var(--token-cf3913ea-b360-45ec-bf9d-00a2af1cb266, #ffffff))",
                          } as CSSProperties
                        }
                      >
                        +
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="framer-x3qab0" data-framer-name="hold @0.25"></div>
      </div>
    </div>
  );
}
