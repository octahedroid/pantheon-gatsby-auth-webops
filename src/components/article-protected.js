import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoginForm from './login-form';
import ArticlePlaceHolder from './article-placeholder';
import Title from 'gatsby-theme-octahedroid/src/components/title'


const ArticleProtectedContent = ({ id, type, user, token, isLoggedIn, fetchArticleProtectedContent }) => {
  const [protectedContent, setProtectedContent] = useState(null)
  
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
    fetchArticleProtectedContent(id, type, token).then((response)=>{
      if(response.data.attributes.field_body)
        setProtectedContent(response.data.attributes.field_body.processed)
    })
  }

  return (
    <>
      {!user&&token && <ArticlePlaceHolder />}
      {(user) && <>
        {(user&&token&&!protectedContent) && <ArticlePlaceHolder />}
        {protectedContent && 
        <div
          className="py-1 lg:py-2"
          dangerouslySetInnerHTML={{ __html: protectedContent }}
        />
        }
      </>}
      {(!token&&!user) && <div className="bg-lightShade p-4 rounded">
        <Title as="h3">Login to read full article.</Title>
        <LoginForm noRedirect />
      </div>}
    </>
  );
};

ArticleProtectedContent.propTypes = {};

export default ArticleProtectedContent;
