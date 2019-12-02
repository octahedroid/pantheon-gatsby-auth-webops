import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"
import { navigate } from "gatsby";
import ArticlePlaceHolder from './article-placeholder';
import HeroCta from "gatsby-theme-octahedroid/src/components/hero-cta";

const ProtectedRoute = ({ user, token, isLoggedIn, fetchProtectedContent, ...rest }) => {
  const [protectedContent, setProtectedContent] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirect, setIsRedirect] = useState(false);
  
  useEffect(() => {
    if(!token){
      isLoggedIn().then((resp)=>{
        if(resp.access_token){
          fetchContent()
        } else {
          setIsLoading(false)
        }
      })
    }

    if(token && !protectedContent){
      fetchContent()
    }
  });

  const fetchContent = () => {
    if (!token) return;
    fetchProtectedContent(rest.uri, token)
    .then((response)=>{
      if(response && response.data) {
        setProtectedContent(response.data)
      }
    })
    .catch(error => {
      setIsLoading(false)
      setIsRedirect(true)
    })
    .finally(setIsLoading(false))
  }

  return (
    <>
      {!user && token && <ArticlePlaceHolder />}
      {(user) && <>
        {(token && !protectedContent) && <ArticlePlaceHolder />}
        {protectedContent &&
          <>
            <div className="container mx-auto">
              <HeroCta
                title={protectedContent.attributes.title}
                intro={`Protected | ${protectedContent.attributes.created}`}
              />
              <hr className="border-b-2 mx-auto w-2/3 border-gray-200 block h-1" />
              <div
                className="py-1 lg:py-2"
                dangerouslySetInnerHTML={{ __html: protectedContent.attributes.body.processed }}
              />
            </div>
          </>
        }
      </>}
      {(!user && !token && !protectedContent && !isLoading) &&
        navigate("/404")
      }
      { isRedirect &&
        navigate("/404")
      }
    </>
  );
}

export default ProtectedRoute
