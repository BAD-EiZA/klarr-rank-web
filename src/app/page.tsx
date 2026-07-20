import { MarketingJsonLd } from "@/components/marketing/json-ld";
import { HomePageClient } from "@/features/marketing/home-page-client";

export default function HomePage() {
  return (
    <>
      <MarketingJsonLd />
      <HomePageClient />
    </>
  );
}
