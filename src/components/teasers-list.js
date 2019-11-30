import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Card from "gatsby-theme-octahedroid/src/components/card";

const TeasersList = () => {
  const posts = useStaticQuery(graphql`
    {
      allNodePage {
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
          }
        }
      }

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
          }
        }
      }
    }
  `);

  return (
    <div className="bg-lightShade">
      <div className="container mx-auto my-4 flex">
        {posts && posts.allNodePage.edges.map(({ node }) => (
              <div className="w-full lg:w-1/2">
                <Card
                  intro={node.relationships.node_type.name}
                  title={node.title}
                  image="hero.png"
                  link={node.path.alias}
                  ctaText="Read more..."
                />
              </div>
        ))}

        {posts && posts.allNodeArticle.edges.map(({ node }) => (
            <div className="w-full lg:w-1/2">
              <Card
                intro={node.relationships.node_type.name}
                title={node.title}
                image="hero.png"
                link={node.path.alias}
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
