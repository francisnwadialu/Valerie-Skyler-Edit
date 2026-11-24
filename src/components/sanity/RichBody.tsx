import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";
import { resolveImageUrl } from "@/lib/sanity/client";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 dir="auto" className="framer-text framer-styles-preset-1tsl8u3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 dir="auto" className="framer-text framer-styles-preset-brr62t">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote
        dir="auto"
        className="framer-text framer-styles-preset-5uwf5z"
        style={{
          borderLeft: "2px solid rgba(255, 255, 255, 0.3)",
          paddingLeft: "16px",
          margin: "16px 0",
          opacity: 0.9,
        }}
      >
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p dir="auto" className="framer-text framer-styles-preset-5uwf5z">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul
        className="framer-text framer-styles-preset-5uwf5z"
        style={{ paddingLeft: "20px", margin: "10px 0", listStyleType: "disc" }}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        className="framer-text framer-styles-preset-5uwf5z"
        style={{ paddingLeft: "20px", margin: "10px 0", listStyleType: "decimal" }}
      >
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const external = href.startsWith("http");
      return (
        <a
          className="framer-text"
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          style={{ textDecoration: "underline", color: "#ffffff" }}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const url = resolveImageUrl(value, "", 1400);
      if (!url) return null;
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={typeof value?.alt === "string" ? value.alt : ""}
          loading="lazy"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "3px",
            margin: "20px 0",
          }}
        />
      );
    },
  },
};

export function RichBody({
  body,
}: {
  body?: PortableTextBlock[] | string[];
}) {
  if (!body || body.length === 0) return null;
  if (typeof body[0] === "string") {
    return (
      <>
        {(body as string[]).map((text, idx) => (
          <p
            key={idx}
            dir="auto"
            className="framer-text framer-styles-preset-5uwf5z"
          >
            {text}
          </p>
        ))}
      </>
    );
  }
  return (
    <PortableText
      value={body as PortableTextBlock[]}
      components={components}
    />
  );
}
