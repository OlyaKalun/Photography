import Head from "next/head";
import { HeadMetaTagsProps } from "./types";

export const HeadMetaTags = ({
  metaTitle,
  metaDescription,
  ogType,
  twitterType = "summary_large_image",
  title,
  image,
}: HeadMetaTagsProps) => {
  return (
    <Head>
      <title>{metaTitle}</title>

      <meta name="description" content={metaDescription} />
      <meta name="twitter:description" content={metaDescription} />

      <meta property="og:type" content={ogType} />
      <meta name="twitter:card" content={twitterType} />

      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />

      <meta
        name="twitter:image"
        content={process.env.NEXT_PUBLIC_DOMAIN_URL + `/${image}`}
      />
      <meta
        property="og:image"
        content={process.env.NEXT_PUBLIC_DOMAIN_URL + `/${image}`}
      />
    </Head>
  );
};
