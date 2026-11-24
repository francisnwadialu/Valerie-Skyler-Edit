import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@/components/pages/journal-golden-hour/page.css";
import { SiteShell } from "@/components/site/SiteShell";
import { DuskHero } from "@/components/widgets/DuskHero";
import { RichBody } from "@/components/sanity/RichBody";
import { FramerEffects } from "@/components/FramerEffects";
import { resolveImageUrl } from "@/lib/sanity/client";
import { getShowBySlug, getShowItems } from "@/lib/sanity/queries";

export const dynamicParams = false;

// Static export: every show slug is prerendered at build time.
export async function generateStaticParams() {
  const shows = await getShowItems();
  return shows.map((show) => ({ slug: show.slug }));
}

const PAGE_STYLE = "html body { background: rgb(255, 255, 255); }";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const show = await getShowBySlug(slug);
  if (!show) {
    return { title: "Show · Valerie Skyler" };
  }
  return {
    title: `${show.title} · Shows · Valerie Skyler`,
    description: show.summary,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const show = await getShowBySlug(slug);
  if (!show) notFound();

  const skySrc = resolveImageUrl(
    show.coverImage,
    "/assets/daSvfhVTqOjJPrOX4JdHeMoIAA.webp",
    2000,
  );

  return (
    <>
      <SiteShell current="/shows" pageStyle={PAGE_STYLE}>
        <div
          data-framer-root=""
          className="framer-Kn2PM framer-NTbwR framer-XzRtY framer-8eqjG framer-A1zZ6 framer-vv6u6v"
          style={{ minHeight: "100vh", width: "auto", display: "contents" }}
        >
          <div className="framer-374557" data-framer-name="§ Head @0">
            <div
              className="framer-10tainj-container"
              data-code-component-plugin-id="api"
              data-framer-name="Page head"
            >
              <DuskHero
                name={show.phase || "Show"}
                split={2}
                line={show.title}
                sky={{ src: skySrc, alt: show.title }}
                focus="50% 50%"
                rays={true}
                rayX={18}
                scrim={0.35}
                tint={0.35}
                showLinks={false}
                showLine={true}
                kicker={
                  [show.orderLabel, show.priceLabel]
                    .filter(Boolean)
                    .join(" · ") || ""
                }
                phoneTop={38}
              />
            </div>
          </div>

          <div className="framer-1fd7wvg" data-framer-name="§ Article @0.05">
            <div className="framer-1m57km8" data-framer-name="Inner">
              <div
                className="framer-11yevav"
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
                  {show.title}
                </h2>
              </div>
              <div
                className="framer-30vouh"
                data-framer-component-type="RichTextContainer"
                style={{ transform: "none" }}
              >
                <p
                  className="framer-text framer-styles-preset-5uwf5z"
                  data-styles-preset="QjdTnwUft"
                  dir="auto"
                  style={
                    {
                      "--framer-text-alignment": "start",
                      "--framer-text-color":
                        "var(--token-cac81ed6-68d8-4cc6-b1e7-4eef12dbdf12)",
                    } as CSSProperties
                  }
                >
                  {show.summary}
                </p>
              </div>
              {show.priceLabel ? (
                <div style={{ margin: "6px 0 18px 0" }}>
                  <p
                    className="framer-text framer-styles-preset-1xlgs71"
                    data-styles-preset="x5FjDutEw"
                    style={
                      {
                        "--framer-text-color": "rgba(255, 255, 255, 0.72)",
                      } as CSSProperties
                    }
                  >
                    {show.orderLabel ? `${show.orderLabel} · ` : ""}
                    {show.priceLabel}
                  </p>
                </div>
              ) : null}
              <div
                className="framer-j0jsf8"
                data-framer-component-type="RichTextContainer"
                style={{ transform: "none" }}
              >
                <RichBody body={show.body} />
              </div>
              <div
                className="framer-1cioe2w"
                data-framer-component-type="RichTextContainer"
                style={{ transform: "none", display: "flex", gap: "28px", flexWrap: "wrap" }}
              >
                <p
                  className="framer-text framer-styles-preset-mkxk1l"
                  data-styles-preset="Ni9SQcDo7"
                  dir="auto"
                  style={{ "--framer-text-color": "#ffffff" } as CSSProperties}
                >
                  <a className="framer-text" href="/shows">
                    ← All shows
                  </a>
                </p>
                <p
                  className="framer-text framer-styles-preset-mkxk1l"
                  data-styles-preset="Ni9SQcDo7"
                  dir="auto"
                  style={{ "--framer-text-color": "#ffffff" } as CSSProperties}
                >
                  <a className="framer-text" href="/sign-up">
                    See packages →
                  </a>
                </p>
              </div>
              <div className="framer-1zxhaw" data-framer-name="hold @0.25"></div>
            </div>
          </div>
        </div>
      </SiteShell>
      <FramerEffects faq={{}} />
    </>
  );
}
