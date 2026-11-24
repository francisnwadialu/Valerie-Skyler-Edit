import type { CSSProperties } from "react";
import { PhoneNav } from "./PhoneNav";

/** Top bar: desktop and <1200px variants. `current` is the route of the page being shown. */
export function Navigation({ current }: { current: string }) {
  const isCurrent = (href: string) =>
    href === current ? { "data-framer-page-link-current": "true" } : {};
  return (
    <div className="framer-1nf2x2v" data-framer-name="Nav bar">
      <div className="framer-9bpysq-container" data-framer-name="Navigation">
        <div className="ssr-variant hidden-by2ddw hidden-ojsrpr">
          <div
            className="framer-Y8dCo framer-A1zZ6 framer-pktIJ framer-8eqjG framer-zehiqv framer-v-zehiqv"
            data-framer-name="Desktop"
            style={{ backgroundColor: "rgba(0, 0, 0, 0)", width: "100%" }}
          >
            <div className="framer-18pujws" data-framer-name="Top row">
              <a
                className="framer-arx68d framer-18o3fnm"
                data-framer-name="Brand"
                href="/"
                {...isCurrent("/")}
              >
                <div
                  className="framer-14fliw9"
                  data-framer-name="Wordmark"
                  data-framer-component-type="RichTextContainer"
                  style={
                    {
                      "--extracted-r6o4lv":
                        "var(--token-bcc0560f-a7e0-4e28-a191-14e6da6debe7)",
                      transform: "none",
                    } as CSSProperties
                  }
                >
                  <p
                    dir="auto"
                    className="framer-text"
                    style={
                      {
                        "--font-selector": "R0Y7RmlndHJlZS02MDA=",
                        "--framer-font-family":
                          '"Figtree", "Figtree Placeholder", sans-serif',
                        "--framer-font-size": "18px",
                        "--framer-font-weight": "600",
                        "--framer-letter-spacing": "-0.03em",
                        "--framer-line-height": "1em",
                        "--framer-text-color":
                          "var(--extracted-r6o4lv, var(--token-bcc0560f-a7e0-4e28-a191-14e6da6debe7))",
                      } as CSSProperties
                    }
                  >
                    Valerie Skyler
                  </p>
                </div>
              </a>
              <div className="framer-1s1n2ue vs-nav-right" data-framer-name="Links">
                <div className="framer-1x46y2h" data-framer-name="Music">
                  <div
                    className="framer-k9l6ps"
                    data-framer-component-type="RichTextContainer"
                    style={{ transform: "none" }}
                  >
                    <p
                      className="framer-text framer-styles-preset-mkxk1l"
                      data-styles-preset="Ni9SQcDo7"
                      dir="auto"
                      style={
                        { "--framer-text-alignment": "start" } as CSSProperties
                      }
                    >
                      <a
                        className="framer-text framer-styles-preset-1quc2e3"
                        data-styles-preset="Izo0YZ4KB"
                        href="/music"
                        {...isCurrent("/music")}
                      >
                        Music
                      </a>
                    </p>
                  </div>
                </div>
                <div className="framer-1rfnst8" data-framer-name="Shows">
                  <div
                    className="framer-1m24w15"
                    data-framer-component-type="RichTextContainer"
                    style={{ transform: "none" }}
                  >
                    <p
                      className="framer-text framer-styles-preset-mkxk1l"
                      data-styles-preset="Ni9SQcDo7"
                      dir="auto"
                      style={
                        { "--framer-text-alignment": "start" } as CSSProperties
                      }
                    >
                      <a
                        className="framer-text framer-styles-preset-1quc2e3"
                        data-styles-preset="Izo0YZ4KB"
                        href="/shows"
                        {...isCurrent("/shows")}
                      >
                        Shows
                      </a>
                    </p>
                  </div>
                </div>
                <div className="framer-bettf5" data-framer-name="Shop">
                  <div
                    className="framer-whpcmw"
                    data-framer-component-type="RichTextContainer"
                    style={{ transform: "none" }}
                  >
                    <p
                      className="framer-text framer-styles-preset-mkxk1l"
                      data-styles-preset="Ni9SQcDo7"
                      dir="auto"
                      style={
                        { "--framer-text-alignment": "start" } as CSSProperties
                      }
                    >
                      <a
                        className="framer-text framer-styles-preset-1quc2e3"
                        data-styles-preset="Izo0YZ4KB"
                        href="/shop"
                        {...isCurrent("/shop")}
                      >
                        Shop
                      </a>
                    </p>
                  </div>
                </div>
                <div
                  className="framer-1ga68ow-container"
                  data-framer-name="Sign Up"
                >
                  <a
                    className="framer-a62pn6 vs-signup-box"
                    data-framer-name="Sign Up button"
                    href="/sign-up"
                    {...isCurrent("/sign-up")}
                  >
                    <div
                      className="framer-1moixfb"
                      data-framer-name="Label"
                      data-framer-component-type="RichTextContainer"
                      style={
                        {
                          "--extracted-r6o4lv": "#FFFFFF",
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
                            "--framer-font-size": "14px",
                            "--framer-font-weight": "500",
                            "--framer-letter-spacing": "0em",
                            "--framer-line-height": "1em",
                            "--framer-text-color":
                              "var(--extracted-r6o4lv, #FFFFFF)",
                          } as CSSProperties
                        }
                      >
                        Sign Up
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ssr-variant hidden-zd2ksn">
          <PhoneNav current={current} />
        </div>
      </div>
    </div>
  );
}
