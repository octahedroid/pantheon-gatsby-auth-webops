import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const LogoutLink = ({ active, user, handleLogout }) => {
  console.log(user);
  return (
    <>
      {user && (
        <li className="mr-3">
          <a
            href="#"
            className={cx(
              "flex items-center uppercase h-navbar no-underline border-t-4 hover:text-secondary hover:border-secondary py-3 px-1 mx-2",
              {
                "font-bold text-secondary border-secondary": active,
                "text-black border-transparent": !active
              }
            )}
            onClick={async event => {
              event.preventDefault();
              handleLogout();
            }}
          >
            Logout
          </a>
        </li>
      )}
    </>
  );
};

export default LogoutLink;
