import type { CSSProperties } from "react";
import { RichBody } from "@/components/sanity/RichBody";
import { DEFAULT_POSTS } from "@/lib/sanity/defaults";
import type { PostItem } from "@/lib/sanity/types";

export function Article({ post = DEFAULT_POSTS[0] }: { post?: PostItem }) {
  return (
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
            {post.title}
          </h2>
        </div>
        {post.excerpt ? (
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
              {post.excerpt}
            </p>
          </div>
        ) : null}
        <div
          className="framer-j0jsf8"
          data-framer-component-type="RichTextContainer"
          style={{ transform: "none" }}
        >
          <RichBody body={post.body} />
        </div>
        <div
          className="framer-1cioe2w"
          data-framer-component-type="RichTextContainer"
          style={{ transform: "none" }}
        >
          <p
            className="framer-text framer-styles-preset-mkxk1l"
            data-styles-preset="Ni9SQcDo7"
            dir="auto"
            style={{ "--framer-text-color": "#ffffff" } as CSSProperties}
          >
            <a className="framer-text" href="/articles">
              ← All articles
            </a>
          </p>
        </div>
        <div className="framer-1zxhaw" data-framer-name="hold @0.25"></div>
      </div>
    </div>
  );
}
