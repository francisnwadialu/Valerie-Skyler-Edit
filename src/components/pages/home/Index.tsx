import { BandsintownWidget } from "@/components/widgets/BandsintownWidget";

/** The Shows list is Bandsintown's own widget; the old static tour rows are archived, not rendered. */
export function Index() {
  return (
    <div className="framer-19v6h0e" data-framer-name="§ Index @0.33">
      <div className="framer-t1ee1h" data-framer-name="Inner">
        <div
          className="framer-ngus19-container"
          data-code-component-plugin-id="api"
          data-framer-name="Work index"
        >
          <BandsintownWidget />
        </div>
      </div>
    </div>
  );
}
