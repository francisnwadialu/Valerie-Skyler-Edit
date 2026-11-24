import type { CSSProperties } from "react";
import { RichBody } from "@/components/sanity/RichBody";
import { resolveImageUrl } from "@/lib/sanity/client";
import { DEFAULT_MUSIC_ITEMS } from "@/lib/sanity/defaults";
import type { MusicItem } from "@/lib/sanity/types";

export function Story({
  item = DEFAULT_MUSIC_ITEMS[0],
}: {
  item?: MusicItem;
}) {
  const stillOne = resolveImageUrl(
    item.stills?.[0],
    "/assets/mHP4XfgJ8bMa1xNgUvt7y0Hlmq0.webp",
    1400,
  );
  const stillTwo = resolveImageUrl(
    item.stills?.[1],
    "/assets/KuzBdrMSkisZvxNb9je1m36fs.webp",
    1400,
  );

  return (
    <div className="framer-wbg7gh" data-framer-name="§ Story @0.05">
      <div className="framer-1l8fvs2" data-framer-name="Inner">
        <div className="framer-1ert63v" data-framer-name="Facts">
          <div
            className="framer-v75jad"
            data-border="true"
            data-framer-name="Sector"
          >
            <div
              className="framer-1cbyy7s"
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
                Sector
              </p>
            </div>
            <div
              className="framer-w3rpyf"
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
                    "--framer-text-color": "rgb(255, 255, 255)",
                  } as CSSProperties
                }
              >
                {item.sector || "Release"}
              </p>
            </div>
          </div>
          <div
            className="framer-1dnctez"
            data-border="true"
            data-framer-name="Year"
          >
            <div
              className="framer-v6s93f"
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
                Year
              </p>
            </div>
            <div
              className="framer-1779ytw"
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
                    "--framer-text-color": "rgb(255, 255, 255)",
                  } as CSSProperties
                }
              >
                {item.year}
              </p>
            </div>
          </div>
          <div
            className="framer-1isv71a"
            data-border="true"
            data-framer-name="Evening"
          >
            <div
              className="framer-1y1ujgw"
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
                Evening
              </p>
            </div>
            <div
              className="framer-12tcwl7"
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
                    "--framer-text-color": "rgb(255, 255, 255)",
                  } as CSSProperties
                }
              >
                {item.time}
              </p>
            </div>
          </div>
          <div
            className="framer-zve6p1"
            data-border="true"
            data-framer-name="Result"
          >
            <div
              className="framer-1s7qwb3"
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
                Result
              </p>
            </div>
            <div
              className="framer-1gtf9dg"
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
                    "--framer-text-color": "rgb(255, 255, 255)",
                  } as CSSProperties
                }
              >
                {item.result || item.tags}
              </p>
            </div>
          </div>
        </div>
        <div className="framer-jlxq70" data-framer-name="Body row">
          <div
            className="framer-1j1x9ah"
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
              {item.headline || item.tags}
            </h3>
          </div>
          <div
            className="framer-10ytj3l"
            data-framer-component-type="RichTextContainer"
            style={{ transform: "none" }}
          >
            {item.body && item.body.length > 0 ? (
              <RichBody body={item.body} />
            ) : (
              <p dir="auto" className="framer-text framer-styles-preset-5uwf5z">
                {item.tags}
              </p>
            )}
          </div>
        </div>
        <div className="framer-1634gvi" data-framer-name="Stills">
          <div className="ssr-variant">
            <div className="framer-b4guj0" data-framer-name="Still">
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
                  height="1470"
                  sizes="(min-width: 1200px) max((min(100vw, 1440px) - 152px) / 2, 50px), (min-width: 810px) and (max-width: 1199.98px) max((min(100vw, 1440px) - 88px) / 2, 50px), (max-width: 809.98px) max(min(100vw, 1440px) - 36px, 50px)"
                  src={stillOne}
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
          <div className="ssr-variant">
            <div className="framer-1g63cul" data-framer-name="Still">
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
                  width="600"
                  height="400"
                  sizes="(min-width: 1200px) max((min(100vw, 1440px) - 152px) / 2, 50px), (min-width: 810px) and (max-width: 1199.98px) max((min(100vw, 1440px) - 88px) / 2, 50px), (max-width: 809.98px) max(min(100vw, 1440px) - 36px, 50px)"
                  src={stillTwo}
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
        </div>
        <div className="framer-1kgz3eb" data-framer-name="hold @0.25"></div>
      </div>
    </div>
  );
}
