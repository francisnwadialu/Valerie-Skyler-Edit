import type { Metadata } from "next";
import { ShopPage } from "@/components/pages/shop/ShopPage";

export const metadata: Metadata = {
  title: "Shop · Valerie Skyler",
  description: "Shop from Valerie Skyler.",
};

export default function Page() {
  return <ShopPage />;
}
