import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "gatsby-theme-octahedroid/src/components/seo";
import ArticleProtectedContent from "../components/article-protected";
import HeroCta from "gatsby-theme-octahedroid/src/components/hero-cta";

import { Auth } from "../auth/context";
// use this template when generating nodes with flag private
const ArticleTemplate = ({ data, location }) => {
  const { post } = data;
  return (
    <Layout location={location}>
      <SEO
        title="Octahedroid starter"
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
      />
      <div className="container mx-auto">
        <HeroCta
          title={post.title}
          intro={`${post.relationships.node_type.name} | ${post.created}`}
        />
        <hr className="border-b-2 mx-auto w-2/3 border-gray-200 block h-1" />
        <p className="py-3 lg:py-4 text-lg text-black">{post.field_teaser}</p>
        <Auth.Consumer>
          {({ token, user, isLoggedIn, fetchArticleProtectedContent }) => (
            <ArticleProtectedContent
              id={post.drupal_id}
              type={post.relationships.node_type.drupal_internal__type}
              user={user}
              token={token}
              isLoggedIn={isLoggedIn}
              fetchArticleProtectedContent={fetchArticleProtectedContent}
            />
          )}
        </Auth.Consumer>
      </div>
    </Layout>
  );
};

ArticleTemplate.propTypes = {};

export default ArticleTemplate;

export const pageQuery = graphql`
  query post($slug: String!) {
    post: nodeArticle(path: { alias: { eq: $slug } }) {
      drupal_id
      title
      path {
        alias
      }
      field_teaser
      relationships {
        node_type {
          drupal_internal__type
          name
        }
      }
      created(formatString: "MMM d, YYYY")
    }
  }
`;
