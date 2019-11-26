import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useThemeUI } from "theme-ui";
/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { TiThMenuOutline } from "react-icons/ti";
import Navbar from "gatsby-theme-octahedroid/src/components/navbar";
import { AuthContext } from "../auth/context";

const Header = ({ scrolled, handleShowSidebar }) => {
  const { theme } = useThemeUI();
  const Auth = useContext(AuthContext);
  return (
    <nav
      id="header"
      className={`fixed w-full z-30 h-nabvar top-0 text-white bg-white ${
        scrolled ? "shadow" : ""
      }`}
      sx={{
        transition: theme.transitions.shadow
      }}
    >
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 p-3 lg:p-0 ">
        <div className="flex items-center">
          <Link
            className="toggleColour no-underline hover:no-underline font-bold text-2xl lg:text-3xl text-gray-800 py-2"
            to="/"
          >
            Pantheon
          </Link>
        </div>

        <div
          className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block bg-white text-black z-20"
          id="nav-content"
        >
          <Navbar
            navegation={[
              {
                name: "Home",
                route: "/"
              }
            ]}
          />
        </div>

        <div
          className="w-full flex-shrink lg:flex lg:items-center lg:w-auto hidden lg:block bg-white text-black z-20"
          id="nav-content"
        >
          {!Auth.user && (
            <Navbar
              navegation={[
                {
                  name: "Login",
                  route: "/login"
                }
              ]}
            />
          )}
          {Auth.user && (
            <Navbar
              navegation={[
                {
                  name: `Welcome ${Auth.user.name}`,
                  route: "/account"
                }
              ]}
            />
          )}
        </div>
        <div className="block lg:hidden flex-shrink ">
          <button onClick={handleShowSidebar}>
            <TiThMenuOutline className="text-5xl text-darkShade p-1 rounded " />
          </button>
        </div>
      </div>
    </nav>
  );
};

Header.propTypes = {};

export default Header;
