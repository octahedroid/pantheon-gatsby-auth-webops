import React from "react";

import Layout from "../components/layout";
import SEO from "gatsby-theme-octahedroid/src/components/seo";
import TeaserList from '../components/teasers-list';
function IndexPage({location}) {
  return (
    <Layout location={location}>
      <SEO
        title="Pantheon Auth site"
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
      />
      <TeaserList />
    </Layout>
  );
}

export default IndexPage;
