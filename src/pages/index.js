import React from "react";

import Layout from "../components/layout";
import SEO from "gatsby-theme-octahedroid/src/components/seo";
import TeaserList from '../components/teasers-list';
function IndexPage() {
  return (
    <Layout>
      <SEO
        title="Pantheon Auth site"
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
      />
      <TeaserList />
    </Layout>
  );
}

export default IndexPage;
