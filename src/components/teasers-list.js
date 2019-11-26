import React from "react";
import PropTypes from "prop-types";
import Card from "gatsby-theme-octahedroid/src/components/card";

// fetch all content from graphql and render it with card component
const TeasersList = () => {
  const items = [];

  return (
    <div className="bg-lightShade">
      {items &&
        items.map((post, i) => (
          <div className="w-full lg:w-1/2">
            <Card
              title={post.title}
              text={post.excerpt}
              image={post.image}
              link={post.link}
              ctaText="Read more..."
            />
          </div>
        ))}
    </div>
  );
};

TeasersList.propTypes = {};

export default TeasersList;
