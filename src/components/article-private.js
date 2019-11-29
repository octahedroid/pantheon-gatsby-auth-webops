import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoginForm from './login-form';
import ArticlePlaceHolder from './article-placeholder';
import Title from 'gatsby-theme-octahedroid/src/components/title'


const ArticlePrivateContent = ({ id, type, user, token, isLoggedIn, fetchPrivateContent }) => {
  const [privateContent, setPrivateContent] = useState(null)
  
  useEffect(() => {
    if(!token){
      isLoggedIn().then((resp)=>{
        if(resp.access_token){
          fetchExtraContent()
        }
      })
    }
    if(token){
      fetchExtraContent()
    }

  });
  
  const fetchExtraContent = () => {
    fetchPrivateContent(id, type, token).then((response)=>{
      if(response.data.attributes.field_body)
        setPrivateContent(response.data.attributes.field_body.processed)
    })
  }

  return (
    <>
      {!user&&token && <ArticlePlaceHolder />}
      {(user) && <>
        {(user&&token&&!privateContent) && <ArticlePlaceHolder />}
        {privateContent && <div
        className="py-1 lg:py-2"
        dangerouslySetInnerHTML={{ __html: privateContent }}
      ></div>}
      </>}
      {(!token&&!user) && <div className="bg-lightShade p-4 rounded">
        <Title as="h3">Sign in with your Drupal account to read the content.</Title>
        <LoginForm noRedirect />
      </div>}
    </>
  );
};

ArticlePrivateContent.propTypes = {};

export default ArticlePrivateContent;
