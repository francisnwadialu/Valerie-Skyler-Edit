import { AwardFan } from "@/components/widgets/AwardFan";

export function Recognition() {
  return (
    <div
      className="framer-wc2vrx"
      data-framer-name="§ Recognition @0.78"
      // Same panel colour as the "Shows" section directly above it.
      // `data-keep-background` stops DuskSkyLayer from clearing it to the sky.
      data-keep-background="true"
      style={{ backgroundColor: "#19191c" }}
    >
      <div className="framer-11ibnjf" data-framer-name="Inner">
        <div
          className="framer-zf1bjy-container"
          data-code-component-plugin-id="api"
          data-framer-name="Award fan"
        >
          <AwardFan />
        </div>
      </div>
    </div>
  );
}
