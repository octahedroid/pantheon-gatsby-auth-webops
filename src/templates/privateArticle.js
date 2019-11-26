import React from "react";
import PropTypes from "prop-types";

import Layout from "../components/layout";
import SEO from "gatsby-theme-octahedroid/src/components/seo";
import PrivateContent from '../components/private-content';
import HeroCta from "gatsby-theme-octahedroid/src/components/hero-cta";

// use this template when generating nodes with flag private
const ArticleTemplate = ({ data }) => {
  const { post } = data;
  return (
    <Layout>
      <SEO
        title="Octahedroid starter"
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
      />
      <div className="container mx-auto">
        <HeroCta
          title={post.frontmatter.title}
          text={post.frontmatter.excerpt}
          intro={post.frontmatter.date}
          imageName={post.frontmatter.image}
        />
        <hr className="border-b-2 mx-auto w-2/3 border-gray-200 block h-1" />
        <div
          className="py-3 lg:py-4"
          dangerouslySetInnerHTML={{ __html: post.summary }}
        ></div>
        <PrivateContent contentId={0} />
      </div>
    </Layout>
  );
};

ArticleTemplate.propTypes = {};


export default ArticleTemplate;
