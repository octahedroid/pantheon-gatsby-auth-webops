import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Card from "gatsby-theme-octahedroid/src/components/card";

// fetch all content from graphql and render it with card component
const TeasersList = () => {
  const items = [];
  const posts = useStaticQuery(graphql`
    {
      allNodeArticle {
        edges {
          node {
            path {
              alias
            }
            relationships {
              node_type {
                name
              }
            }
            title
            field_teaser
          }
        }
      }
    }
  `);
  return (
    <div className="bg-lightShade">
      <div className="container mx-auto my-4 flex">
        {posts &&
          posts.allNodeArticle.edges.map(({ node }) => (
            <div className="w-full lg:w-1/3">
              <Card
                intro={node.relationships.node_type.name}
                title={node.title}
                image="hero.png"
                link={node.path.alias}
                text={node.field_teaser}
                ctaText="Read more..."
              />
            </div>
          ))}
      </div>
    </div>
  );
};

TeasersList.propTypes = {};

export default TeasersList;
