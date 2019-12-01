import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"
import { navigate } from "gatsby";
import ArticlePlaceHolder from './article-placeholder';
import HeroCta from "gatsby-theme-octahedroid/src/components/hero-cta";

const ProtectedRoute = ({ component: Component, user, token, isLoggedIn, fetchProtectedContent, ...rest }) => {
  const [protectedContent, setProtectedContent] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if(!token){
      isLoggedIn().then((resp)=>{
        if(resp.access_token){
          fetchContent()
        }
      })
    }

    if(token && !protectedContent){
      fetchContent()
    }
  });

  const fetchContent = () => {
    fetchProtectedContent(rest.uri, token).then((response)=>{
      if(response && response.data) {
        setProtectedContent(response)
      }
      setIsLoading(false)
    })
  }

  return (
    <>
      {!user && token && <ArticlePlaceHolder />}
      {(user) && <>
        {(token && !protectedContent) && <ArticlePlaceHolder />}
        {protectedContent && 
          <div>
            <HeroCta
              title={protectedContent.data.attributes.title}
              intro={`Protected | ${protectedContent.data.attributes.created}`}
            />
            <hr className="border-b-2 mx-auto w-2/3 border-gray-200 block h-1" />
            <div
              className="py-1 lg:py-2"
              dangerouslySetInnerHTML={{ __html: protectedContent.data.attributes.body.processed }}
            />
          </div>
        }
        {!protectedContent && !isLoading &&
          navigate("/404")
        }
      </>}
    </>
  );
}

ProtectedRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

export default ProtectedRoute