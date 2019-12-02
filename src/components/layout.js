import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Header from "../components/header";
import SEO from "gatsby-theme-octahedroid/src/components/seo";
import ThemeProvider from "gatsby-theme-octahedroid/src/components/theme-provider";
import theme from "../../theme";
import { Auth } from "../auth/context";
import Footer from './footer';

function Layout({ children, title, location }) {
  const [scrolledMenu, setScrolledMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }
  }, []);

  const handleScroll = event => {
    var target = event.target || event.srcElement;
    setScrolledMenu(target.scrollingElement.scrollTop > 30);
  };
  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <ThemeProvider theme={theme}>
      <Auth.Consumer>
        {({ token, isLoggedIn, user }) => {
          if(!token){
            isLoggedIn()
          }
          return (
            <div className="pt-5">
              <SEO title={title} />
              <Header
                location={location}
                scrolled={scrolledMenu}
                handleShowSidebar={handleShowSidebar}
              />
              <div className="min-h-screen">
              {children}
              </div>
              <Footer user={user} />
            </div>
          );
        }}
      </Auth.Consumer>
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
