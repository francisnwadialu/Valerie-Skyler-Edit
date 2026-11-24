import type { ReactNode } from "react";
import { DuskSky } from "./DuskSky";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

const BODY_STYLE =
  ":root body { background: var(--token-389dc5de-9e21-428a-b8a4-b3ac4289a539); }";

/** Frame shared by every page: sky layer, page content, navigation bar and footer. */
export function SiteShell({
  current,
  pageStyle,
  children,
}: {
  current: string;
  pageStyle: string;
  children: ReactNode;
}) {
  return (
    <>
      <div id="main">
        <style>{BODY_STYLE}</style>
        <div
          className="framer-QKjJh framer-zd2ksn"
          data-layout-template="true"
          style={{ minHeight: "100vh", width: "auto" }}
        >
          <DuskSky />
          <style>{pageStyle}</style>
          {children}
          <div id="overlay"></div>
          <div className="framer-he71no"></div>
          <Navigation current={current} />
          <Footer current={current} />
        </div>
        <div id="template-overlay" />
      </div>
      <div
        id="svg-templates"
        style={{
          position: "absolute",
          overflow: "hidden",
          bottom: "0",
          left: "0",
          width: "0",
          height: "0",
          zIndex: "0",
          contain: "strict",
        }}
        aria-hidden="true"
      >
        {"\n"}
      </div>
    </>
  );
}
