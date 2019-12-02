import React from "react";
import PropTypes from "prop-types";
import { useThemeUI } from "theme-ui";
/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link, useStaticQuery, graphql } from "gatsby";
import { TiThMenuOutline } from "react-icons/ti";
import Navbar from "gatsby-theme-octahedroid/src/components/navbar";
import { Auth } from "../auth/context";
import LogoutLink from "./logout-link";

const Header = ({ scrolled, handleShowSidebar, location }) => {
  const { theme } = useThemeUI();

  const pages = useStaticQuery(graphql`
    {
      allNodePage {
        edges {
          node {
            path {
              alias
            }
            title
          }
        }
      }
    }
  `);
  return (
    <Auth.Consumer>
      {({ user, handleLogout }) => (
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
                    name: `Protected`,
                    route: "/protected/not-public-node ",
                    active: location.pathname === '/protected/not-public-node'
                  }
                ]}
              />
            </div>

            <div
              className="w-full flex-shrink lg:flex lg:items-center lg:w-auto hidden lg:block bg-white text-black z-20"
              id="nav-content"
            >

              {!user && (
                <Navbar
                  navegation={[
                    {
                      name: "Login",
                      route: "/login",
                      active: location.pathname === '/login'
                    }
                  ]}
                />
              )}
              {user && (
                <Navbar
                  navegation={[
                    {
                      name: `${user.attributes.field_display_name || user.attributes.name}`,
                      route: "/account",
                      active: location.pathname === '/account'
                    }
                  ]}
                />
              )}
            </div>

            <div
              className="w-full flex-shrink lg:flex lg:items-center lg:w-auto hidden lg:block bg-white text-black z-20"
              id="nav-content"
            >
              <ul className="list-reset lg:flex justify-end flex-1 items-center">
                <LogoutLink user={user} handleLogout={handleLogout} />
              </ul>
            </div>
            <div className="block lg:hidden flex-shrink ">
              <button onClick={handleShowSidebar}>
                <TiThMenuOutline className="text-5xl text-darkShade p-1 rounded " />
              </button>
            </div>
          </div>
        </nav>
      )}
    </Auth.Consumer>
  );
};

Header.propTypes = {};

export default Header;
