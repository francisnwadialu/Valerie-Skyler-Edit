import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/contact/ContactPage";
import { FramerEffects } from "@/components/FramerEffects";
import { getFaqs, toFaqMap } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Contact · Valerie Skyler",
  description:
    "General inquiries, management, bookings, and frequently asked questions.",
};

export default async function Page() {
  const faqs = await getFaqs("contact");

  return (
    <>
      <ContactPage faqs={faqs} />
      <FramerEffects faq={toFaqMap(faqs)} />
    </>
  );
}
