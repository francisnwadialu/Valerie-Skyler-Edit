import type { CSSProperties } from "react";
import { SunsetIn } from "./SunsetIn";
import { EmailSignup } from "./EmailSignup";
import { DuskHero } from "@/components/widgets/DuskHero";

function SocialIcons() {
  const iconStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    opacity: 0.85,
    transition: "opacity 0.2s ease",
  };
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "16px",
      }}
      aria-label="Social links"
    >
      <a
        href="https://instagram.com/valerieskyler"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        style={iconStyle}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      </a>
      <a
        href="https://tiktok.com/@valerieskyler"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok"
        style={iconStyle}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
        </svg>
      </a>
      <a
        href="https://youtube.com/@valerieskyler"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube"
        style={iconStyle}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.54 15.57V8.43L15.82 12l-6.28 3.57z" />
        </svg>
      </a>
      <a
        href="https://open.spotify.com/artist/13n8fbzbH3HmWqcVGVuUHo"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Spotify"
        style={iconStyle}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5zm4.82 15.14a.65.65 0 0 1-.9.22c-2.46-1.5-5.56-1.84-9.21-1.01a.65.65 0 1 1-.29-1.27c4-.91 7.42-.52 10.18 1.16.3.19.4.59.22.9zm1.28-2.86a.82.82 0 0 1-1.12.27c-2.82-1.73-7.12-2.23-10.45-1.22a.82.82 0 1 1-.48-1.57c3.81-1.16 8.55-.6 11.78 1.39.38.23.5.73.27 1.13zm.11-2.98C14.83 8.8 9.25 8.61 6.02 9.59a.98.98 0 0 1-.57-1.88c3.71-1.13 9.88-.91 13.78 1.41a.98.98 0 0 1-1.02 1.68z" />
        </svg>
      </a>
      <a
        href="https://facebook.com/itsvalerieskyler"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        style={iconStyle}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.326V1.326C24 .597 23.403 0 22.675 0z" />
        </svg>
      </a>
    </div>
  );
}

function FooterContent({
  current,
  isPhone,
}: {
  current: string;
  isPhone: boolean;
}) {
  const isCurrent = (href: string) =>
    href === current ? { "data-framer-page-link-current": "true" } : {};

  return (
    <div
      className={`framer-87X6Q framer-9A9u7 framer-qVTq6 framer-UbDG7 framer-15okd02 ${isPhone ? "framer-v-zzg5v7" : "framer-v-15okd02"}`}
      data-framer-name={isPhone ? "Phone" : "Desktop"}
      style={{
        backgroundColor: "rgb(14, 15, 38)",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        className="framer-xw8fxk-container"
        data-code-component-plugin-id="api"
        data-framer-name="Night name"
      >
        <DuskHero
          name=""
          split={4}
          line=""
          sky={{
            src: "https://pub-e41cf51e3602425f820c1ff1e2b4661c.r2.dev/media/valerieskyler-websitefooter.webp",
            alt: "",
          }}
          focus="50% 50%"
          rays={false}
          rayX={30}
          scrim={0.58}
          tint={0.25}
          showLinks={false}
          showLine={false}
          phoneTop={58}
          phoneFocus="70% 40%"
          defaultArt={false}
        />
      </div>
      <div className="framer-6rtpwf" data-framer-name="Top">
        <div className="framer-12mrg43" data-framer-name="Lead">
          <div
            className="framer-zrsz9t-container"
            data-code-component-plugin-id="api"
            data-framer-name="Sunset in"
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                color: "rgb(244, 238, 246)",
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
          <div className="framer-1m0f960" data-framer-name="Email signup">
            <EmailSignup isPhone={isPhone} />
          </div>
        </div>
        <div className="framer-6xbmyx" data-framer-name="Columns">
          <div className="framer-18o8jvw" data-framer-name="Start">
            <div
              className="framer-1kqgd77"
              data-framer-component-type="RichTextContainer"
              style={
                {
                  "--extracted-r6o4lv": "rgba(244,238,246,0.5)",
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
                    "--framer-text-color":
                      "var(--extracted-r6o4lv, rgba(244,238,246,0.5))",
                  } as CSSProperties
                }
              >
                Start
              </p>
            </div>
            <div
              className="framer-kp1kjw"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" }}
            >
              <p
                className="framer-text framer-styles-preset-17ut4rh"
                data-styles-preset="nHMnet34M"
                dir="auto"
              >
                <a
                  className="framer-text framer-styles-preset-tndh8v"
                  data-styles-preset="nreIaaju3"
                  href="/music"
                  {...isCurrent("/music")}
                >
                  Music
                </a>
              </p>
            </div>
            <div
              className="framer-qjw6gk"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" }}
            >
              <p
                className="framer-text framer-styles-preset-17ut4rh"
                data-styles-preset="nHMnet34M"
                dir="auto"
              >
                <a
                  className="framer-text framer-styles-preset-tndh8v"
                  data-styles-preset="nreIaaju3"
                  href="/shows"
                  {...isCurrent("/shows")}
                >
                  Shows
                </a>
              </p>
            </div>
            <div
              className="framer-m54a56"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" }}
            >
              <p
                className="framer-text framer-styles-preset-17ut4rh"
                data-styles-preset="nHMnet34M"
                dir="auto"
              >
                <a
                  className="framer-text framer-styles-preset-tndh8v"
                  data-styles-preset="nreIaaju3"
                  href="/shop"
                  {...isCurrent("/shop")}
                >
                  Shop
                </a>
              </p>
            </div>
            <div
              className="framer-1qukzm1"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" }}
            >
              <p
                className="framer-text framer-styles-preset-17ut4rh"
                data-styles-preset="nHMnet34M"
                dir="auto"
              >
                <a
                  className="framer-text framer-styles-preset-tndh8v"
                  data-styles-preset="nreIaaju3"
                  href="/sign-up"
                  {...isCurrent("/sign-up")}
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
          <div className="framer-1rbj5d3" data-framer-name="Legal">
            <div
              className="framer-ogxx2p"
              data-framer-component-type="RichTextContainer"
              style={
                {
                  "--extracted-r6o4lv": "rgba(244,238,246,0.5)",
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
                    "--framer-text-color":
                      "var(--extracted-r6o4lv, rgba(244,238,246,0.5))",
                  } as CSSProperties
                }
              >
                Legal
              </p>
            </div>
            <div
              className="framer-1nx3yjq"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" }}
            >
              <p
                className="framer-text framer-styles-preset-17ut4rh"
                data-styles-preset="nHMnet34M"
                dir="auto"
              >
                <a
                  className="framer-text framer-styles-preset-tndh8v"
                  data-styles-preset="nreIaaju3"
                  href="/legal/privacy"
                  {...isCurrent("/legal/privacy")}
                >
                  Privacy
                </a>
              </p>
            </div>
            <div
              className="framer-jqrjn1"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" }}
            >
              <p
                className="framer-text framer-styles-preset-17ut4rh"
                data-styles-preset="nHMnet34M"
                dir="auto"
              >
                <a
                  className="framer-text framer-styles-preset-tndh8v"
                  data-styles-preset="nreIaaju3"
                  href="/legal/terms"
                  {...isCurrent("/legal/terms")}
                >
                  Terms
                </a>
              </p>
            </div>
            <div
              className="framer-siwq22"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" }}
            >
              <p
                className="framer-text framer-styles-preset-17ut4rh"
                data-styles-preset="nHMnet34M"
                dir="auto"
              >
                <a
                  className="framer-text framer-styles-preset-tndh8v"
                  data-styles-preset="nreIaaju3"
                  href="/legal/cookies"
                  {...isCurrent("/legal/cookies")}
                >
                  Cookies
                </a>
              </p>
            </div>
            <div
              className="framer-1pihlbt"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" }}
            >
              <p
                className="framer-text framer-styles-preset-17ut4rh"
                data-styles-preset="nHMnet34M"
                dir="auto"
              >
                <a
                  className="framer-text framer-styles-preset-tndh8v"
                  data-styles-preset="nreIaaju3"
                  href="/contact"
                  {...isCurrent("/contact")}
                >
                  Contact
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="framer-1tlef8g" data-framer-name="Bottom">
        <div
          className="framer-1b848tw"
          data-framer-component-type="RichTextContainer"
          style={
            {
              "--extracted-r6o4lv": "rgba(244,238,246,0.6)",
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
                "--framer-text-color":
                  "var(--extracted-r6o4lv, rgba(244,238,246,0.6))",
              } as CSSProperties
            }
          >
            © 2026 VSI Records Inc. All Rights Reserved.
          </p>
        </div>
        <div
          className="framer-4mehxk"
          style={{ transform: "none" }}
        >
          <SocialIcons />
        </div>
      </div>
    </div>
  );
}

/** Footer: desktop/tablet and phone variants. */
export function Footer({ current }: { current: string }) {
  return (
    <>
      <div className="ssr-variant hidden-ojsrpr">
        <div className="framer-1curo5x-container" data-framer-name="Footer @1">
          <div className="ssr-variant hidden-by2ddw">
            <FooterContent current={current} isPhone={false} />
          </div>
          <div className="ssr-variant hidden-zd2ksn">
            <FooterContent current={current} isPhone={true} />
          </div>
        </div>
      </div>
      <div className="ssr-variant hidden-by2ddw hidden-zd2ksn">
        <div className="framer-1curo5x-container" data-framer-name="Footer @1">
          <FooterContent current={current} isPhone={true} />
        </div>
      </div>
    </>
  );
}
