import { HeadMetaTags } from "@/components/head-meta-tags/head-meta-tags";
import { Layout } from "@/components/layout";
import React from "react";

const About = () => {
  return (
    <>
      <HeadMetaTags
        metaTitle="OPhotography | About me"
        metaDescription="OPhotography - professional photographer【different types of filming】portraits, travels, weddings, solemn events. Provided photography services to more than 300 people"
      />
      <Layout>Test About</Layout>
    </>
  );
};

export default About;
