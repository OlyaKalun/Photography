import { HeadMetaTags } from "@/components/head-meta-tags/head-meta-tags";
import { Layout } from "@/components/layout";
import React from "react";

const Gallery = () => {
  return (
    <>
      <HeadMetaTags
        metaTitle="Website Gallery | Portfolio OPhotography"
        metaDescription="Gallery【different types of filming】portraits, travels, weddings, solemn events. OPhotography"
      />
      <Layout>Test Gallery</Layout>
    </>
  );
};

export default Gallery;
