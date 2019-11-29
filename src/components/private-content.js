import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoginForm from './login-form';
import ArticlePlaceHolder from './article-placeholder';
import Title from 'gatsby-theme-octahedroid/src/components/title'

// check for user credentials here and fetch content if valid or show login link
const PrivateContent = ({ id, type, user, token, isLoggedIn, fetchPrivateContent }) => {
  const [privateContent, setPrivateContent] = useState( <ArticlePlaceHolder />)
  
  useEffect(() => {
    if(!token){
      isLoggedIn()
      
    }
    if(token){
      fetchPrivateContent(id, type, token).then((response)=>{
        if(response.data.attributes.field_body)
          setPrivateContent(response.data.attributes.field_body.processed)
      })
    }

  });
  // use contentId to fetch content when hidreted and only if auth in valid
  // use Context.fetchPrivateContent

  return (
    <>
      {(token&&user) && <div
        className="py-1 lg:py-2"
        dangerouslySetInnerHTML={{ __html: privateContent }}
      ></div>}
      {!token && <div className="bg-lightShade p-4 rounded">
        <Title as="h3">Sign in with your Drupal account to read the content.</Title>
        <LoginForm />
      </div>}
    </>
  );
};

PrivateContent.propTypes = {};

export default PrivateContent;
