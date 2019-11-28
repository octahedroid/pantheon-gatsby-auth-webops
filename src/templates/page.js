import React from "react";
import PropTypes from "prop-types";
import { graphql } from 'gatsby'
import Layout from "../components/layout";
import SEO from "gatsby-theme-octahedroid/src/components/seo";

import HeroCta from "gatsby-theme-octahedroid/src/components/hero-cta";

// use this template when generating nodes with flag public
const ArticleTemplate = ({ data }) => {
  const { page } = data;
  return (
    <Layout>
      <SEO
        title="Octahedroid starter"
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
      />
      <div className="container mx-auto">
        <HeroCta
          title={page.title}
          intro={page.created}
        />
        <hr className="border-b-2 mx-auto w-2/3 border-gray-200 block h-1" />
        <div
          className="py-3 lg:py-4"
          dangerouslySetInnerHTML={{ __html: page.body.processed }}
        ></div>
        
      </div>
    </Layout>
  );
};

ArticleTemplate.propTypes = {};

ArticleTemplate.defaultProps = {
};

export default ArticleTemplate;

export const pageQuery = graphql`
  query page($slug: String!) {
    page: nodePage (path: {alias: {eq: $slug}}) {
      id
      title
      path {  
        alias
      }
      body{
        processed
      }
      created(formatString: "MMM d, YYYY")
    }
  }
`