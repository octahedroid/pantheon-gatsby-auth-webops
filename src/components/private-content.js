import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CtaBlock from "gatsby-theme-octahedroid/src/components/cta-block";

// check for user credentials here and fetch content if valid or show login link
const PrivateContent = ({ id, type, user, token, isLoggedIn, fetchPrivateContent }) => {
  const [privateContent, setPrivateContent] = useState("<p>loading</p>")
  
  useEffect(() => {
    if(!token){
      isLoggedIn()
      
    }
    if(token){
      fetchPrivateContent(id, type, token).then((response)=>{
        setPrivateContent(response.data.attributes.body.processed)
      })
    }

  });
  // use contentId to fetch content when hidreted and only if auth in valid
  // use Context.fetchPrivateContent

  return (
    <>
      {token && <div
        className="py-1 lg:py-2"
        dangerouslySetInnerHTML={{ __html: privateContent }}
      ></div>}
      {!token && <CtaBlock text="Sign in with your Drupal account to gain instant access to our entire library." ctaText="Log in" link="/login" />}
    </>
  );
};

PrivateContent.propTypes = {};

export default PrivateContent;
