import { HourCards } from "@/components/widgets/HourCards";

export function ThreeHours() {
  return (
    <div className="framer-1h50qxa" data-framer-name="§ Three hours @0.12">
      <div className="framer-1y0b1a9" data-framer-name="Inner">
        <div
          className="framer-1pm641w-container"
          data-code-component-plugin-id="api"
          data-framer-name="Hour cards"
        >
          <HourCards
            heading="Latest Releases"
            ink="#ffffff"
            cards={[
              {
                img: {
                  src: "/assets/daSvfhVTqOjJPrOX4JdHeMoIAA.webp",
                  alt: "A woman stands in the sea at golden hour",
                },
                title: "Brand",
                line: "Identities with warmth, built to outlast the launch.",
                link: "/shows/brand-identity",
              },
              {
                img: {
                  src: "/assets/tiYSqeC6a3AAT9qZoZIzZYdno1k.webp",
                  alt: "A woman under a deep blue evening sky",
                },
                title: "Interface",
                line: "Product and UI/UX that stays calm under pressure.",
                link: "/shows/ui-ux-design",
              },
              {
                img: {
                  src: "/assets/qqfZIrcNBNrGIt8lRD3pohMwqS0.webp",
                  alt: "A lone figure on a ridge against a pink afterglow",
                },
                title: "Framer",
                line: "Fast, editable Framer sites your own team can run.",
                link: "/shows/framer-sites",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
