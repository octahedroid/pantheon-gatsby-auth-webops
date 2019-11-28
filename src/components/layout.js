import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Header from "../components/header";
import SEO from "gatsby-theme-octahedroid/src/components/seo";
import ThemeProvider from "gatsby-theme-octahedroid/src/components/theme-provider";
import theme from '../../theme';

function Layout({ children, title }) {
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
      <div className="pt-5">
        <SEO title={title} />
        <Header
          scrolled={scrolledMenu}
          handleShowSidebar={handleShowSidebar}
        />
        {children}
      </div>
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
