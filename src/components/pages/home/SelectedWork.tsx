import { PinnedWork, WORK_ITEMS, type WorkItem } from "@/components/widgets/PinnedWork";

export function SelectedWork({ items = WORK_ITEMS }: { items?: WorkItem[] }) {
  return (
    <div className="framer-3hy38l" data-framer-name="§ Selected work @0.18">
      <div
        className="framer-9g9jyx-container"
        data-code-component-plugin-id="api"
        data-framer-name="Pinned work"
      >
        <PinnedWork stepVh={70} ink="#ffffff" items={items} />
      </div>
    </div>
  );
}
