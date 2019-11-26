import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../auth/context";
import Cta from "gatsby-theme-octahedroid/src/components/cta";

// check for user credentials here and fetch content if valid or show login link

const PrivateContent = ({ contentId }) => {
  const Auth = useContext(AuthContext);

  // use contentId to fetch content when hidreted and only if auth in valid
  // use Auth.fetchPrivateContent

  const fetchedContent = "";
  return (
    <>
      {Auth.user && <>{fetchedContent}</>}
      {!Auth.user && <Cta text="Log in" link="/login" />}
    </>
  );
};

PrivateContent.propTypes = {};

export default PrivateContent;
