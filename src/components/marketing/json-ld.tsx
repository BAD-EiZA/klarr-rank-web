import {
  MARKETING_FAQS,
  PRO_PRICE_IDR,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/marketing/faqs";
import { getSiteUrl } from "@/lib/site";

export function MarketingJsonLd() {
  const site = getSiteUrl();

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site}/#organization`,
        name: SITE_NAME,
        url: site,
        description: SITE_TAGLINE,
        logo: `${site}/icon.svg`,
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${site}/#app`,
        name: SITE_NAME,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: SITE_TAGLINE,
        url: site,
        offers: [
          {
            "@type": "Offer",
            name: "Free",
            price: "0",
            priceCurrency: "IDR",
            description: "2 scan/hari, 2 keyword, riwayat audit 14 hari",
          },
          {
            "@type": "Offer",
            name: "Pro",
            price: String(PRO_PRICE_IDR),
            priceCurrency: "IDR",
            description:
              "10 scan/hari, 10 keyword, rank harian, riwayat 12 bulan",
          },
        ],
        publisher: { "@id": `${site}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${site}/#faq`,
        mainEntity: MARKETING_FAQS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
