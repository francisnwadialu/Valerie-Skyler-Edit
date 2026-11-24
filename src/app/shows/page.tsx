import type { Metadata } from "next";
import { ServicesPage } from "@/components/pages/services/ServicesPage";
import { FramerEffects } from "@/components/FramerEffects";
import { getFaqs, getShowItems, toFaqMap } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Shows · Valerie Skyler",
  description: "Shows, details, and frequently asked questions.",
};

export default async function Page() {
  const [shows, faqs] = await Promise.all([
    getShowItems(),
    getFaqs("shows"),
  ]);

  return (
    <>
      <ServicesPage shows={shows} faqs={faqs} />
      <FramerEffects faq={toFaqMap(faqs)} />
    </>
  );
}
