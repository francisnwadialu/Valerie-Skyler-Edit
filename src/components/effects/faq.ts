/**
 * FAQ accordion. The original only rendered the closed state in its HTML; the
 * answers live in the page's CMS data, passed in here as `answers` (question -> answer).
 */
export function initFaq(
  root: ParentNode,
  answers: Record<string, string>,
): () => void {
  const cleanups: Array<() => void> = [];
  root
    .querySelectorAll<HTMLElement>(
      '[data-framer-name="Closed"][data-highlight]',
    )
    .forEach((row) => {
      const question = row.querySelector("h3")?.textContent?.trim() ?? "";
      const answer = answers[question];
      const icon = row.querySelector<HTMLElement>(
        '[data-framer-name="Icon"] p',
      );
      if (!answer) return;

      const panel = document.createElement("div");
      panel.style.cssText =
        "display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s cubic-bezier(.2,.8,.2,1);width:100%";
      const inner = document.createElement("div");
      inner.style.cssText = "overflow:hidden;min-height:0";
      const p = document.createElement("p");
      p.textContent = answer;
      p.style.cssText =
        'margin:0;padding:8px 36px 14px 0;max-width:680px;font:400 15px/1.55 Figtree,"Figtree Placeholder",sans-serif;color:rgba(255,255,255,.72)';
      inner.append(p);
      panel.append(inner);
      row.append(panel);
      row.setAttribute("role", "button");
      row.setAttribute("aria-expanded", "false");
      row.style.cursor = "pointer";

      const toggle = () => {
        const open = row.getAttribute("aria-expanded") !== "true";
        row.setAttribute("aria-expanded", String(open));
        panel.style.gridTemplateRows = open ? "1fr" : "0fr";
        if (icon) icon.textContent = open ? "−" : "+";
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      };
      row.addEventListener("click", toggle);
      row.addEventListener("keydown", onKey);
      cleanups.push(() => {
        row.removeEventListener("click", toggle);
        row.removeEventListener("keydown", onKey);
        panel.remove();
      });
    });
  return () => cleanups.forEach((c) => c());
}
