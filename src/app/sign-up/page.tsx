import type { Metadata } from "next";
import { PricingPage } from "@/components/pages/pricing/PricingPage";
import { FramerEffects } from "@/components/FramerEffects";
import { getFaqs, getSignUpPlans, toFaqMap } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Sign Up · Valerie Skyler",
  description: "Sign up and packages from Valerie Skyler.",
};

export default async function Page() {
  const [plans, faqs] = await Promise.all([
    getSignUpPlans(),
    getFaqs("sign-up"),
  ]);

  return (
    <>
      <PricingPage plans={plans} faqs={faqs} />
      <FramerEffects faq={toFaqMap(faqs)} />
    </>
  );
}
